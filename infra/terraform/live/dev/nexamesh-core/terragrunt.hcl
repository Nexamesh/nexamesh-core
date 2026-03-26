# =============================================================================
# NexaMesh Core -- dev environment
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
  repository_url           = "https://github.com/Nexamesh/nexamesh-core"
  branch                   = "dev"
  static_web_app_sku       = "Free"
  cosmos_db_throughput     = 400
  use_serverless_cosmos_db = true

  azure_openai_chat_deployment      = "gpt-4"
  azure_openai_embedding_deployment = "text-embedding-3-small"

  # Sensitive values -- supply via TF_VAR_ env vars or a secrets manager,
  # never hardcode here.
  # azure_openai_api_key   = ""
  # azure_openai_endpoint  = ""
  # entra_id_tenant_id     = ""
  # entra_id_client_id     = ""

  tags = {
    environment = "dev"
    cost_center = "nex-dev"
    managed_by  = "terragrunt"
  }
}
