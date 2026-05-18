# =============================================================================
# NexaMesh -- Container Apps Environment Module Outputs
# =============================================================================

output "id" {
  description = "Container Apps Environment resource ID"
  value       = azurerm_container_app_environment.this.id
}

output "name" {
  description = "Container Apps Environment name"
  value       = azurerm_container_app_environment.this.name
}

output "default_domain" {
  description = "Default domain for apps deployed into this environment"
  value       = azurerm_container_app_environment.this.default_domain
}

output "static_ip" {
  description = "Static IP address of the environment"
  value       = azurerm_container_app_environment.this.static_ip_address
}
