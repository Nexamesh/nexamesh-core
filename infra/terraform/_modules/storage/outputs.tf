# =============================================================================
# NexaMesh — Storage Account Module Outputs
# =============================================================================

output "name" {
  description = "Storage account name"
  value       = azurerm_storage_account.this.name
}

output "id" {
  description = "Storage account resource ID"
  value       = azurerm_storage_account.this.id
}

output "blob_endpoint" {
  description = "Primary blob service endpoint"
  value       = azurerm_storage_account.this.primary_blob_endpoint
}

output "connection_string" {
  description = "Primary connection string"
  value       = azurerm_storage_account.this.primary_connection_string
  sensitive   = true
}

output "primary_access_key" {
  description = "Storage account primary access key"
  value       = azurerm_storage_account.this.primary_access_key
  sensitive   = true
}
