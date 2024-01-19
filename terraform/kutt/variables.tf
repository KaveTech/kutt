variable "project_id" {
  description = "Project Id for cloud resources"
  default="kave-tech-services"
}

variable "region" {
  description = "Region for cloud resources"
  default     = "europe-west2"
}

variable "zone" {
  description = "Zone for cloud resources"
  default     = "europe-west2-b"
}

variable database_instance_name {
  description = "The name of the master instance to replicate"
  default     = "kutt-url-shortener"
}

variable "database_version" {
  description = "The version of of the database. For example, `MYSQL_5_6` or `POSTGRES_9_6`."
  default     = "POSTGRES_15"
}

variable "database_name" {
  description = "Name of the default database to create"
  default     = "url_shortener_db"
}

variable "database_user" {
  description = "The name of the default user"
  default     = "url_shortener_user"
}

variable "database_password_id" {
  description = "The id of the password on secret manager"
  default     = "url_shortener_password"
}
