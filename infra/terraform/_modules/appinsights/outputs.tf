# =============================================================================
# NexaMesh — Application Insights Module Outputs
# =============================================================================

output "name" {
  description = "Application Insights component name"
  value       = azurerm_application_insights.this.name
}

output "id" {
  description = "Application Insights resource ID"
  value       = azurerm_application_insights.this.id
}

output "instrumentation_key" {
  description = "Application Insights instrumentation key"
  value       = azurerm_application_insights.this.instrumentation_key
  sensitive   = true
}

output "connection_string" {
  description = "Application Insights connection string"
  value       = azurerm_application_insights.this.connection_string
  sensitive   = true
}

output "workspace_id" {
  description = "Log Analytics workspace resource ID"
  value       = azurerm_log_analytics_workspace.this.id
}

output "workspace_customer_id" {
  description = "Log Analytics workspace customer ID (used by Container Apps Environment)"
  value       = azurerm_log_analytics_workspace.this.workspace_id
}

output "workspace_key" {
  description = "Log Analytics workspace primary shared key"
  value       = azurerm_log_analytics_workspace.this.primary_shared_key
  sensitive   = true
}
