# =============================================================================
# NexaMesh Core -- prd environment
#
# Cost profile: free-tier where possible, pay-per-use otherwise
#   - Cosmos DB serverless (scales with real traffic, no idle cost)
#   - Functions Y1 Consumption (free up to 1M executions/month)
#   - Static Web Apps Free SKU (upgrade to Standard when custom domains/SLA needed)
#   - Notification Hub enabled (Free SKU: 1M pushes/month free)
#   - Container Apps Env enabled (Consumption, scales to zero)
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
  environment              = "prd"
  location                 = local.common.locals.location
  branch                   = "main"
  static_web_app_sku       = "Free"  # upgrade to Standard when SLA or staging envs are required
  use_serverless_cosmos_db = true    # serverless is cheapest at low-to-moderate traffic

  create_notification_hub   = true
  create_container_apps_env = true  # needed for Rust API + keeper

  azure_openai_chat_deployment      = "gpt-4"
  azure_openai_embedding_deployment = "text-embedding-3-small"

  # Sensitive: supply via TF_VAR_* or a pipeline secret manager
  # azure_openai_api_key  = ""
  # azure_openai_endpoint = ""
  # entra_id_tenant_id    = ""
  # entra_id_client_id    = ""

  tags = {
    environment = "prd"
    cost_center = "nex-prd"
    criticality = "high"
    managed_by  = "terragrunt"
  }
}
