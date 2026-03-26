# =============================================================================
# NexaMesh Core -- dev environment
#
# Cost profile: free-tier-first
#   - Cosmos DB free tier (1000 RU/s + 25 GB, one per subscription)
#   - Functions Y1 Consumption (1M executions/month free)
#   - Static Web Apps Free SKU
#   - Notification Hub skipped (not needed until push notifications are wired)
#   - Container Apps Env skipped (enable when deploying Rust API / keeper)
#   - Storage Standard_LRS
# =============================================================================

locals {
  common = read_terragrunt_config(find_in_parent_folders("_common/common.hcl"))
}

include "root" {
  path = find_in_parent_folders()
}

terraform {
  source = "${local.common.locals.module_base_path}/nexamesh-core"
}

inputs = {
  environment  = "dev"
  location     = local.common.locals.location
  branch       = "dev"

  # Cosmos DB: free tier (1000 RU/s + 25 GB free).
  # NOTE: only one free-tier account is allowed per subscription.
  # If another project already uses it, switch to: use_serverless_cosmos_db = true, enable_free_tier_cosmos = false
  enable_free_tier_cosmos  = true
  use_serverless_cosmos_db = false  # free tier requires provisioned mode
  cosmos_db_throughput     = 400   # minimum; free tier covers this

  static_web_app_sku = "Free"

  # Skip these until actively needed — saves provisioning time and clutter
  create_notification_hub   = false
  create_container_apps_env = false

  azure_openai_chat_deployment      = "gpt-4"
  azure_openai_embedding_deployment = "text-embedding-3-small"

  # Sensitive: supply via TF_VAR_azure_openai_api_key etc., never hardcode
  # azure_openai_api_key  = ""
  # azure_openai_endpoint = ""
  # entra_id_tenant_id    = ""
  # entra_id_client_id    = ""

  tags = {
    environment = "dev"
    cost_center = "nex-dev"
    managed_by  = "terragrunt"
  }
}
