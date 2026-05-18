# =============================================================================
# NexaMesh -- Notification Hub Module
#
# Maps from: infra/azure/modules/notificationhub.bicep
#
# Creates a Notification Hub namespace, a hub, and two authorization rules:
#   SendRule  -- send=true, listen=false, manage=false
#   ManageRule -- send=true, listen=true, manage=true
# =============================================================================

resource "azurerm_notification_hub_namespace" "this" {
  name                = var.namespace_name
  resource_group_name = var.resource_group_name
  location            = var.location
  namespace_type      = "NotificationHub"
  sku_name            = var.sku

  tags = var.tags
}

resource "azurerm_notification_hub" "this" {
  name                = var.hub_name
  namespace_name      = azurerm_notification_hub_namespace.this.name
  resource_group_name = var.resource_group_name
  location            = var.location

  tags = var.tags
}

# Authorization rule: send only (for client devices)
resource "azurerm_notification_hub_authorization_rule" "send" {
  name                  = "SendRule"
  notification_hub_name = azurerm_notification_hub.this.name
  namespace_name        = azurerm_notification_hub_namespace.this.name
  resource_group_name   = var.resource_group_name

  send  = true
  listen = false
  manage = false
}

# Authorization rule: full management (for backend services)
resource "azurerm_notification_hub_authorization_rule" "manage" {
  name                  = "ManageRule"
  notification_hub_name = azurerm_notification_hub.this.name
  namespace_name        = azurerm_notification_hub_namespace.this.name
  resource_group_name   = var.resource_group_name

  send   = true
  listen = true
  manage = true
}
