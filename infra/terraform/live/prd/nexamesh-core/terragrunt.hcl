# =============================================================================
# NexaMesh Core -- prd environment
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
  repository_url           = "https://github.com/Nexamesh/nexamesh-core"
  branch                   = "main"
  static_web_app_sku       = "Standard"
  cosmos_db_throughput     = 400
  use_serverless_cosmos_db = true

  azure_openai_chat_deployment      = "gpt-4"
  azure_openai_embedding_deployment = "text-embedding-3-small"

  tags = {
    environment  = "prd"
    cost_center  = "nex-prd"
    criticality  = "high"
    managed_by   = "terragrunt"
  }
}
