# =============================================================================
# NexaMesh — Application Insights Module
#
# Maps from: infra/azure/modules/appinsights.bicep
#
# Creates a Log Analytics workspace (PerGB2018, 30-day retention) and an
# Application Insights component (web type) linked to that workspace.
# =============================================================================

resource "azurerm_log_analytics_workspace" "this" {
  name                = var.workspace_name
  location            = var.location
  resource_group_name = var.resource_group_name
  sku                 = "PerGB2018"
  retention_in_days   = 30

  tags = var.tags
}

resource "azurerm_application_insights" "this" {
  name                = var.name
  location            = var.location
  resource_group_name = var.resource_group_name
  workspace_id        = azurerm_log_analytics_workspace.this.id
  application_type    = "web"

  # Public ingestion and query — matches Bicep publicNetworkAccess* = Enabled
  internet_ingestion_enabled = true
  internet_query_enabled     = true

  tags = var.tags
}
