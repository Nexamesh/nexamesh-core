# =============================================================================
# NexaMesh — Key Vault Module
#
# Maps from: infra/azure/modules/keyvault.bicep
#            infra/azure/modules/keyvault-secret.bicep
#
# Creates an Azure Key Vault (Standard SKU, RBAC auth) and optional secrets
# passed as a map.
# =============================================================================

data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "this" {
  name                = var.name
  location            = var.location
  resource_group_name = var.resource_group_name
  tenant_id           = data.azurerm_client_config.current.tenant_id
  sku_name            = "standard"

  # RBAC auth — matches Bicep enableRbacAuthorization: true
  enable_rbac_authorization = true

  # Soft delete — matches Bicep defaults
  soft_delete_retention_days = var.soft_delete_retention_days
  purge_protection_enabled   = false

  public_network_access_enabled = true

  # Allow ARM deployments to read secrets (enabledForDeployment /
  # enabledForTemplateDeployment in Bicep)
  enabled_for_deployment          = true
  enabled_for_template_deployment = true
  enabled_for_disk_encryption     = false

  tags = var.tags
}

# Secrets passed as a map: { SecretName = "value" }
resource "azurerm_key_vault_secret" "secrets" {
  for_each = var.secrets

  name         = each.key
  value        = each.value
  key_vault_id = azurerm_key_vault.this.id
  content_type = "text/plain"

  depends_on = [azurerm_key_vault.this]
}
