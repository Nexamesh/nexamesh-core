# =============================================================================
# NexaMesh — Terragrunt Root Config
#
# Naming convention: nex-{env}-{product}-{resourcetype}
# Remote state: Azure blob, one container per environment.
# =============================================================================

locals {
  # Parse env from the directory path: live/{env}/{product}
  path_components = split("/", path_relative_to_include())
  env             = local.path_components[1]  # e.g. "dev", "stg", "prd"
  product         = local.path_components[2]  # e.g. "detector"
}

# ---------------------------------------------------------------------------
# Remote state — Azure blob storage
# State key: live/{env}/{product}/terraform.tfstate
# Storage account exists per-environment, provisioned once manually or via
# bootstrap script: scripts/bootstrap-tfstate.sh
# ---------------------------------------------------------------------------
remote_state {
  backend = "azurerm"

  generate = {
    path      = "backend.tf"
    if_exists = "overwrite"
  }

  config = {
    resource_group_name  = "nex-${local.env}-tfstate-rg"
    storage_account_name = "nex${local.env}tfstate"
    container_name       = "tfstate"
    key                  = "${path_relative_to_include()}/terraform.tfstate"
    use_azuread_auth     = true
  }
}

# ---------------------------------------------------------------------------
# Azure provider — injected into every module so modules stay provider-free
# ---------------------------------------------------------------------------
generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite"
  contents  = <<-EOF
    terraform {
      required_version = ">= 1.5.0"
      required_providers {
        azurerm = {
          source  = "hashicorp/azurerm"
          version = "~> 3.110"
        }
        random = {
          source  = "hashicorp/random"
          version = "~> 3.6"
        }
      }
    }

    provider "azurerm" {
      features {
        key_vault {
          purge_soft_delete_on_destroy    = false
          recover_soft_deleted_key_vaults = true
        }
      }
    }
  EOF
}
