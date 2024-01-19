resource "google_sql_database_instance" "url_shortener_db_instance" {
  name = var.database_instance_name
  database_version = var.database_version

  settings {
    # edition = "ENTERPRISE"
    tier = "db-f1-micro"

    disk_size = 10
    deletion_protection_enabled = "true"

    backup_configuration{
        enabled = true
        start_time = "01:00"

        backup_retention_settings{
            retained_backups = 30
        }
    }

    ip_configuration {
      ipv4_enabled = "false"
      private_network = "https://www.googleapis.com/compute/v1/projects/kave-tech-services/global/networks/prod-vpc"
    }
  }  
}

resource "google_sql_database" "url_shortener_db" {
  name = var.database_name
  instance = google_sql_database_instance.url_shortener_db_instance.name
}

resource "google_secret_manager_secret" "url_shortener_db_password" {
  secret_id = var.database_password_id

  replication {
    auto {}
  }
}

resource "random_password" "url_shortener_db_password" {
  length           = 32
  override_special = "&-_=+<>?"
}

resource "google_secret_manager_secret_version" "url_shortener_db_password" {
  secret = google_secret_manager_secret.url_shortener_db_password.id
  secret_data = random_password.url_shortener_db_password.result
  deletion_policy = "DISABLE"
}

resource "google_sql_user" "database_user" {
  instance = google_sql_database_instance.url_shortener_db_instance.name
  name = var.database_user
  password = google_secret_manager_secret_version.url_shortener_db_password.secret_data
}
