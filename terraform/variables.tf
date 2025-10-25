variable "project_name" {
  description = "Project name used for container and network naming"
  type        = string
  default     = "template-project"
}

variable "db_username" {
  description = "PostgreSQL username"
  type        = string
  default     = "myuser"
}

variable "db_password" {
  description = "PostgreSQL password"
  type        = string
  default     = "mypassword"
  sensitive   = true
}

variable "db_name" {
  description = "PostgreSQL database name"
  type        = string
  default     = "mydatabase"
}

variable "api_port" {
  description = "External port for API access"
  type        = number
  default     = 8000
}

variable "web_port" {
  description = "External port for web access"
  type        = number
  default     = 3000
}

variable "api_replicas" {
  description = "Number of API container replicas"
  type        = number
  default     = 2
}

variable "web_replicas" {
  description = "Number of web container replicas"
  type        = number
  default     = 2
}
