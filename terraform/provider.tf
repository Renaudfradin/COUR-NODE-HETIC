terraform {
  required_providers {
    heroku = {
        source = "heroku/heroku"
        version = "3.2.0"
    }
  }
}

provider "heroku" {
    email   = var.email_address
    api_key = var.heroku_api_key
}

resource "heroku_app" "production" {
  name   = "cour-node-hetic"
  region = "us"

  config_vars = {
    DATABASE_URL = var.url_databasse
  }

  buildpacks = [
    "heroku/go"
  ]
}

resource "heroku_app" "staging" {
  name   = "cour-node-hetic-staging"
  region = "us"

  config_vars = {
    DATABASE_URL = var.url_databasse
  }
}

resource "heroku_pipeline" "pipeline_test" {
  name = "demo-cour-node-hetic"
}

resource "heroku_pipeline_coupling" "stage_staging" {
  app = heroku_app.staging.id
  pipeline = heroku_pipeline.pipeline_test.id
  stage = "staging"
}

resource "heroku_pipeline_coupling" "stage_production" {
  app = heroku_app.production.id
  pipeline = heroku_pipeline.pipeline_test.id
  stage = "production"
}

