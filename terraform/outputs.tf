output "database_container_name" {
  description = "Name of the database container"
  value       = docker_container.database.name
}

output "database_container_id" {
  description = "ID of the database container"
  value       = docker_container.database.id
}

output "database_ip_address" {
  description = "IP address of database container"
  value       = docker_container.database.network_data[0].ip_address
}

output "load_balancer_web_url" {
  description = "URL to access the web application through load balancer"
  value       = "http://localhost:80"
}

output "api_containers" {
  description = "Information about all API containers"
  value = [
    for i, container in docker_container.api : {
      name = container.name
      id   = container.id
      ip   = container.network_data[0].ip_address
      url  = "http://localhost:${var.api_port + i}"
    }
  ]
}

output "api_urls" {
  description = "URLs to access all API replicas"
  value       = [for i in range(var.api_replicas) : "http://localhost:${var.api_port + i}"]
}

output "web_containers" {
  description = "Information about all web containers"
  value = [
    for i, container in docker_container.web : {
      name = container.name
      id   = container.id
      ip   = container.network_data[0].ip_address
      url  = "http://localhost:${var.web_port + i}"
    }
  ]
}

output "web_urls" {
  description = "URLs to access all web replicas"
  value       = [for i in range(var.web_replicas) : "http://localhost:${var.web_port + i}"]
}

output "network_name" {
  description = "Name of the Docker network"
  value       = docker_network.app_network.name
}

output "summary" {
  description = "Summary of the infrastructure"
  value = {
    load_balancer = {
      name    = "${var.project_name}-lb"
      web_url = "http://localhost:80"
      note    = "Single entry point - all traffic routes through port 80"
    }
    network = {
      name   = docker_network.app_network.name
      subnet = "172.25.0.0/16"
      type   = "internal (isolated)"
    }
    database = {
      name     = docker_container.database.name
      ip       = docker_container.database.network_data[0].ip_address
      port     = 5432
      replicas = 1
      access   = "internal only"
    }
    api = {
      replicas  = var.api_replicas
      instances = [
        for i, container in docker_container.api : {
          name = container.name
          ip   = container.network_data[0].ip_address
        }
      ]
      access = "internal only (via /api/* on load balancer)"
    }
    web = {
      replicas  = var.web_replicas
      instances = [
        for i, container in docker_container.web : {
          name = container.name
          ip   = container.network_data[0].ip_address
        }
      ]
      access = "internal only (via load balancer)"
    }
  }
}
