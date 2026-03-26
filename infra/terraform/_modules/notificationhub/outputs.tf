# =============================================================================
# NexaMesh -- Notification Hub Module Outputs
# =============================================================================

output "namespace_name" {
  description = "Notification Hub namespace name"
  value       = azurerm_notification_hub_namespace.this.name
}

output "hub_name" {
  description = "Notification Hub name"
  value       = azurerm_notification_hub.this.name
}

output "namespace_id" {
  description = "Notification Hub namespace resource ID"
  value       = azurerm_notification_hub_namespace.this.id
}

output "hub_id" {
  description = "Notification Hub resource ID"
  value       = azurerm_notification_hub.this.id
}

output "send_connection_string" {
  description = "SendRule primary connection string"
  value       = azurerm_notification_hub_authorization_rule.send.primary_connection_string
  sensitive   = true
}

output "connection_string" {
  description = "ManageRule primary connection string"
  value       = azurerm_notification_hub_authorization_rule.manage.primary_connection_string
  sensitive   = true
}
