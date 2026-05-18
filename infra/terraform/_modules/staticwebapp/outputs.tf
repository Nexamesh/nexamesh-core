# =============================================================================
# NexaMesh -- Static Web App Module Outputs
# =============================================================================

output "name" {
  description = "Static Web App name"
  value       = azurerm_static_web_app.this.name
}

output "id" {
  description = "Static Web App resource ID"
  value       = azurerm_static_web_app.this.id
}

output "url" {
  description = "Static Web App URL"
  value       = format("https://%s", azurerm_static_web_app.this.default_host_name)
}

output "default_host_name" {
  description = "Static Web App default hostname"
  value       = azurerm_static_web_app.this.default_host_name
}

output "api_key" {
  description = "Deployment API key (use in GitHub Actions)"
  value       = azurerm_static_web_app.this.api_key
  sensitive   = true
}
