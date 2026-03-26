# =============================================================================
# NexaMesh -- Azure Functions Module Outputs
# =============================================================================

output "name" {
  description = "Function App name"
  value       = azurerm_linux_function_app.this.name
}

output "id" {
  description = "Function App resource ID"
  value       = azurerm_linux_function_app.this.id
}

output "url" {
  description = "Function App HTTPS URL"
  value       = format("https://%s", azurerm_linux_function_app.this.default_hostname)
}

output "default_hostname" {
  description = "Function App default hostname"
  value       = azurerm_linux_function_app.this.default_hostname
}

output "principal_id" {
  description = "Function App managed identity principal ID"
  value       = azurerm_linux_function_app.this.identity[0].principal_id
}
