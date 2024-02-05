terraform {
    backend "gcs" {
        bucket = "shared-terraform-tfstate"
        prefix = "kutt-url-shortener"
    }
}