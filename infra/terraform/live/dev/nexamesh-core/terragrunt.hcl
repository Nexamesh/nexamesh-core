# =============================================================================
# NexaMesh Core -- dev environment
#
# Cost profile: serverless / pay-per-use, zero idle spend
#   - Cosmos DB serverless (pay-per-RU, scales to zero)
#   - Functions Y1 Consumption (1M executions/month free)
#   - Static Web Apps Free SKU
#   - Notification Hub skipped
#   - Container Apps Env skipped (enable when Rust API / keeper need deploying)
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
  environment              = "dev"
  location                 = local.common.locals.location
  branch                   = "dev"
  static_web_app_sku       = "Free"
  use_serverless_cosmos_db = true
  enable_free_tier_cosmos  = false

  create_notification_hub   = false
  create_container_apps_env = false

  azure_openai_chat_deployment      = "gpt-4"
  azure_openai_embedding_deployment = "text-embedding-3-small"

  # Sensitive: supply via TF_VAR_* env vars, never hardcode here
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
