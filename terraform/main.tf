terraform {
  required_version = ">= 1.5"
  
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}

# Create a custom network for the infrastructure
resource "docker_network" "app_network" {
  name = "${var.project_name}-network"
  driver = "bridge"
  
  ipam_config {
    subnet  = "172.25.0.0/16"
    gateway = "172.25.0.1"
  }
}

# Database Container (PostgreSQL)
resource "docker_image" "postgres" {
  name = "postgres:16-alpine"
  keep_locally = false
}

resource "docker_container" "database" {
  name  = "${var.project_name}-database"
  image = docker_image.postgres.image_id
  
  restart = "unless-stopped"
  
  env = [
    "POSTGRES_USER=${var.db_username}",
    "POSTGRES_PASSWORD=${var.db_password}",
    "POSTGRES_DB=${var.db_name}"
  ]
  
  networks_advanced {
    name = docker_network.app_network.name
    ipv4_address = "172.25.0.10"
  }
  
  ports {
    internal = 5432
    external = 5432
  }
  
  volumes {
    volume_name    = docker_volume.db_data.name
    container_path = "/var/lib/postgresql/data"
  }
}

# Volume for database persistence
resource "docker_volume" "db_data" {
  name = "${var.project_name}-db-data"
}

# API Container (FastAPI)
resource "docker_image" "api" {
  name = "${var.project_name}-api:latest"
  keep_locally = true
  
  # This will use a locally built image
  # You need to build it first: docker build -t template-project-api:latest ../api
  build {
    context    = "../api"
    dockerfile = "Dockerfile"
    tag        = ["${var.project_name}-api:latest"]
  }
}

resource "docker_container" "api" {
  count = var.api_replicas
  
  name  = "${var.project_name}-api-${count.index + 1}"
  image = docker_image.api.image_id
  
  restart = "unless-stopped"
  
  env = [
    "POSTGRES_USER=${var.db_username}",
    "POSTGRES_PASSWORD=${var.db_password}",
    "POSTGRES_SERVER=${docker_container.database.name}",
    "POSTGRES_PORT=5432",
    "POSTGRES_DB=${var.db_name}"
  ]
  
  networks_advanced {
    name = docker_network.app_network.name
    ipv4_address = "172.25.0.${20 + count.index}"
  }
  
  # No external ports - accessed only through load balancer
  ports {
    internal = 80
  }
  
  depends_on = [docker_container.database]
}

# Web Container (React + Nginx)
resource "docker_image" "web" {
  name = "${var.project_name}-web:latest"
  keep_locally = true
  
  build {
    context    = "../web"
    dockerfile = "Dockerfile"
    tag        = ["${var.project_name}-web:latest"]
  }
}

resource "docker_container" "web" {
  count = var.web_replicas
  
  name  = "${var.project_name}-web-${count.index + 1}"
  image = docker_image.web.image_id
  
  restart = "unless-stopped"
  
  networks_advanced {
    name = docker_network.app_network.name
    ipv4_address = "172.25.0.${30 + count.index}"
  }
  
  # No external ports - accessed only through load balancer
  ports {
    internal = 80
  }
  
  depends_on = [docker_container.api]
}

# Load Balancer Container
resource "docker_container" "load_balancer" {
  name  = "${var.project_name}-lb"
  image = "nginx:alpine"
  
  restart = "unless-stopped"
  
  networks_advanced {
    name = docker_network.app_network.name
    ipv4_address = "172.25.0.100"
  }
  
  # External ports for load balancer
  ports {
    internal = 80
    external = 80
  }
  
  ports {
    internal = 8080
    external = 8080
  }
  
  # Mount the load balancer nginx configuration
  volumes {
    host_path      = abspath("${path.module}/nginx-lb.conf")
    container_path = "/etc/nginx/nginx.conf"
    read_only      = true
  }
  
  depends_on = [docker_container.api, docker_container.web]
}
