# =============================================================================
# NexaMesh Core -- Orchestrator Module
#
# This module wires together all NexaMesh Azure resources:
#   keyvault, storage, appinsights, cosmosdb, notificationhub, functions,
#   containerapps-env, staticwebapp (docs + marketing)
#
# Naming convention v3.0: nex-{env}-{product}-{resourcetype}
# Storage names strip hyphens: nex{env}sharedst
# =============================================================================

locals {
  # Common tags merged with caller-supplied tags
  tags = merge(var.tags, {
    project     = "nexamesh"
    environment = var.environment
    managed_by  = "terragrunt"
  })
}

# ---------------------------------------------------------------------------
# Shared Resource Group
# ---------------------------------------------------------------------------
resource "azurerm_resource_group" "shared" {
  name     = format("nex-%s-shared-rg", var.environment)
  location = var.location
  tags     = local.tags
}

# ---------------------------------------------------------------------------
# Key Vault
# Secrets wired in after dependent resources are known.
# ---------------------------------------------------------------------------
module "keyvault" {
  source = "../keyvault"

  name                = format("nex-%s-shared-kv", var.environment)
  location            = azurerm_resource_group.shared.location
  resource_group_name = azurerm_resource_group.shared.name
  tags                = local.tags

  # Secrets injected after dependent resources are resolved
  secrets = merge(
    { "CosmosDbConnectionString" = module.cosmosdb.connection_string },
    var.create_notification_hub ? { "NotificationHubConnectionString" = module.notificationhub[0].connection_string } : {},
    var.azure_openai_api_key != "" ? { "AzureOpenAiApiKey" = var.azure_openai_api_key } : {}
  )

  depends_on = [module.cosmosdb, module.notificationhub]
}

# ---------------------------------------------------------------------------
# Storage Account (name strips hyphens, max 24 chars)
# ---------------------------------------------------------------------------
module "storage" {
  source = "../storage"

  name                = format("nex%ssharedst", var.environment)
  location            = azurerm_resource_group.shared.location
  resource_group_name = azurerm_resource_group.shared.name
  tags                = local.tags
}

# ---------------------------------------------------------------------------
# Application Insights + Log Analytics Workspace
# ---------------------------------------------------------------------------
module "appinsights" {
  source = "../appinsights"

  name                = format("nex-%s-shared-appi", var.environment)
  workspace_name      = format("nex-%s-shared-law", var.environment)
  location            = azurerm_resource_group.shared.location
  resource_group_name = azurerm_resource_group.shared.name
  tags                = local.tags
}

# ---------------------------------------------------------------------------
# Cosmos DB
# ---------------------------------------------------------------------------
module "cosmosdb" {
  source = "../cosmosdb"

  name                = format("nex-%s-docs-cosmos", var.environment)
  location            = azurerm_resource_group.shared.location
  resource_group_name = azurerm_resource_group.shared.name
  # Free tier forces provisioned mode (serverless is incompatible with free tier)
  use_serverless      = var.enable_free_tier_cosmos ? false : var.use_serverless_cosmos_db
  throughput          = var.cosmos_db_throughput
  enable_free_tier    = var.enable_free_tier_cosmos
  tags                = local.tags
}

# ---------------------------------------------------------------------------
# Notification Hub
# ---------------------------------------------------------------------------
module "notificationhub" {
  count  = var.create_notification_hub ? 1 : 0
  source = "../notificationhub"

  namespace_name      = format("nex-%s-docs-nhns", var.environment)
  hub_name            = format("nex-%s-docs-nh", var.environment)
  location            = azurerm_resource_group.shared.location
  resource_group_name = azurerm_resource_group.shared.name
  tags                = local.tags
}

# ---------------------------------------------------------------------------
# Azure Functions
# Depends on: storage (connection string), appinsights (keys), cosmosdb,
#             keyvault (name + id for KV references and RBAC)
# ---------------------------------------------------------------------------
module "functions" {
  source = "../functions"

  name                = format("nex-%s-docs-func", var.environment)
  location            = azurerm_resource_group.shared.location
  resource_group_name = azurerm_resource_group.shared.name
  tags                = local.tags

  sku                        = "Y1"
  storage_account_name       = module.storage.name
  storage_account_access_key = module.storage.primary_access_key
  storage_connection_string  = module.storage.connection_string

  app_insights_instrumentation_key = module.appinsights.instrumentation_key
  app_insights_connection_string   = module.appinsights.connection_string

  cosmos_db_connection_string = module.cosmosdb.connection_string

  key_vault_name = module.keyvault.name
  key_vault_id   = module.keyvault.id

  azure_openai_endpoint            = var.azure_openai_endpoint
  azure_openai_chat_deployment     = var.azure_openai_chat_deployment
  azure_openai_embedding_deployment = var.azure_openai_embedding_deployment

  entra_tenant_id = var.entra_id_tenant_id
  entra_client_id = var.entra_id_client_id

  depends_on = [module.keyvault, module.storage, module.appinsights, module.cosmosdb]
}

# ---------------------------------------------------------------------------
# Container Apps Environment
# Single global instance -- no env suffix in the name.
# Depends on: appinsights (workspace id)
# ---------------------------------------------------------------------------
module "containerapps_env" {
  count  = var.create_container_apps_env ? 1 : 0
  source = "../containerapps-env"

  name                = "nex-global-shared-cae"
  location            = azurerm_resource_group.shared.location
  resource_group_name = azurerm_resource_group.shared.name
  tags                = local.tags

  log_analytics_workspace_id = module.appinsights.workspace_id
  zone_redundancy_enabled    = var.environment == "prd" ? true : false

  depends_on = [module.appinsights]
}

# ---------------------------------------------------------------------------
# Static Web App -- Documentation site
# ---------------------------------------------------------------------------
module "staticwebapp_docs" {
  source = "../staticwebapp"

  name                = format("nex-%s-docs-swa", var.environment)
  location            = azurerm_resource_group.shared.location
  resource_group_name = azurerm_resource_group.shared.name
  tags                = local.tags

  sku             = var.static_web_app_sku
  repository_url  = var.repository_url
  branch          = var.branch
  app_location    = "apps/docs"
  output_location = "build"
  api_location    = ""
}

# ---------------------------------------------------------------------------
# Static Web App -- Marketing site
# ---------------------------------------------------------------------------
module "staticwebapp_marketing" {
  source = "../staticwebapp"

  name                = format("nex-%s-marketing-swa", var.environment)
  location            = azurerm_resource_group.shared.location
  resource_group_name = azurerm_resource_group.shared.name
  tags                = local.tags

  sku             = var.static_web_app_sku
  repository_url  = var.repository_url
  branch          = var.branch
  app_location    = "apps/marketing"
  output_location = ".next"
  api_location    = ""
}
