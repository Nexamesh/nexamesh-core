# =============================================================================
# NexaMesh -- Static Web App Module
#
# Maps from: infra/azure/modules/staticwebapp.bicep
#
# Creates an Azure Static Web App linked to a GitHub repository.
# =============================================================================

resource "azurerm_static_web_app" "this" {
  name                = var.name
  location            = var.location
  resource_group_name = var.resource_group_name
  sku_tier            = var.sku
  sku_size            = var.sku

  app_settings = {}

  tags = var.tags
}
