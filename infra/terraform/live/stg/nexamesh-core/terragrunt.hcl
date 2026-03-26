# =============================================================================
# NexaMesh Core -- stg environment
#
# Cost profile: lean pre-production
#   - Cosmos DB serverless (pay-per-RU, ~$0.25 per million RUs)
#   - Functions Y1 Consumption
#   - Static Web Apps Free SKU
#   - Notification Hub skipped until push notifications go live
#   - Container Apps Env skipped until containers are deployed
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
  environment              = "stg"
  location                 = local.common.locals.location
  branch                   = "main"
  static_web_app_sku       = "Free"
  use_serverless_cosmos_db = true  # serverless scales to zero between test runs

  create_notification_hub   = false
  create_container_apps_env = false

  azure_openai_chat_deployment      = "gpt-4"
  azure_openai_embedding_deployment = "text-embedding-3-small"

  tags = {
    environment = "stg"
    cost_center = "nex-stg"
    managed_by  = "terragrunt"
  }
}
