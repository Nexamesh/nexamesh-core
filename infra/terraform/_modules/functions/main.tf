# =============================================================================
# NexaMesh -- Azure Functions Module
#
# Maps from: infra/azure/modules/functions.bicep
#
# Creates an App Service Plan (Consumption Y1 or Premium EP1/EP2/EP3) and a
# Linux Function App (Node.js 20).  App settings, CORS, and a Key Vault RBAC
# role assignment for the function app managed identity are all configured here.
# =============================================================================

data "azurerm_client_config" "current" {}

resource "azurerm_service_plan" "this" {
  name                = format("%s-plan", var.name)
  location            = var.location
  resource_group_name = var.resource_group_name
  os_type             = "Linux"
  sku_name            = var.sku
  tags                = var.tags
}

resource "azurerm_linux_function_app" "this" {
  name                = var.name
  location            = var.location
  resource_group_name = var.resource_group_name
  service_plan_id     = azurerm_service_plan.this.id

  storage_account_name       = var.storage_account_name
  storage_account_access_key = var.storage_account_access_key

  https_only                    = true
  public_network_access_enabled = true

  identity {
    type = "SystemAssigned"
  }

  site_config {
    application_stack {
      node_version = "20"
    }
    ftps_state          = "Disabled"
    minimum_tls_version = "1.2"

    cors {
      allowed_origins = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://*.azurestaticapps.net",
        "https://nexamesh.ai",
        "https://docs.nexamesh.ai",
        "https://www.nexamesh.ai",
      ]
      support_credentials = true
    }
  }

  app_settings = {
    "AzureWebJobsStorage"                      = var.storage_connection_string
    "WEBSITE_CONTENTAZUREFILECONNECTIONSTRING"  = var.storage_connection_string
    "WEBSITE_CONTENTSHARE"                     = lower(var.name)
    "FUNCTIONS_EXTENSION_VERSION"              = "~4"
    "FUNCTIONS_WORKER_RUNTIME"                 = "node"
    "WEBSITE_NODE_DEFAULT_VERSION"             = "~20"
    "APPINSIGHTS_INSTRUMENTATIONKEY"           = var.app_insights_instrumentation_key
    "APPLICATIONINSIGHTS_CONNECTION_STRING"    = var.app_insights_connection_string
    "COSMOS_DB_CONNECTION_STRING"              = var.cosmos_db_connection_string
    "COSMOS_DB_DATABASE"                       = "nexamesh-docs"
    "KEY_VAULT_NAME"                           = var.key_vault_name
    "AZURE_OPENAI_ENDPOINT"                    = var.azure_openai_endpoint
    "AZURE_OPENAI_API_KEY"                     = format("@Microsoft.KeyVault(VaultName=%s;SecretName=AzureOpenAiApiKey)", var.key_vault_name)
    "AZURE_OPENAI_API_VERSION"                 = "2024-10-21"
    "AZURE_OPENAI_CHAT_DEPLOYMENT"             = var.azure_openai_chat_deployment
    "AZURE_OPENAI_EMBEDDING_DEPLOYMENT"        = var.azure_openai_embedding_deployment
    "AZURE_ENTRA_TENANT_ID"                    = var.entra_tenant_id
    "AZURE_ENTRA_CLIENT_ID"                    = var.entra_client_id
  }

  tags = var.tags
}

# Key Vault RBAC role for function app managed identity.
# The keyvault module uses enable_rbac_authorization=true, so we use a role
# assignment (Secrets User) rather than a legacy access policy.
resource "azurerm_role_assignment" "func_kv_secrets_user" {
  scope                = var.key_vault_id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azurerm_linux_function_app.this.identity[0].principal_id
}
