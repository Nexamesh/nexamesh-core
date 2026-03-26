# =============================================================================
# NexaMesh — Key Vault Module Outputs
# =============================================================================

output "name" {
  description = "Key Vault name"
  value       = azurerm_key_vault.this.name
}

output "id" {
  description = "Key Vault resource ID"
  value       = azurerm_key_vault.this.id
}

output "uri" {
  description = "Key Vault URI"
  value       = azurerm_key_vault.this.vault_uri
}
