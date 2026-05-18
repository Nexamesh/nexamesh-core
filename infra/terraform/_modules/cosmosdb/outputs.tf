# =============================================================================
# NexaMesh -- Cosmos DB Module Outputs
# =============================================================================

output "name" {
  description = "Cosmos DB account name"
  value       = azurerm_cosmosdb_account.this.name
}

output "id" {
  description = "Cosmos DB account resource ID"
  value       = azurerm_cosmosdb_account.this.id
}

output "endpoint" {
  description = "Cosmos DB endpoint URL"
  value       = azurerm_cosmosdb_account.this.endpoint
}

output "connection_string" {
  description = "Cosmos DB primary connection string"
  value       = azurerm_cosmosdb_account.this.connection_strings[0]
  sensitive   = true
}

output "primary_key" {
  description = "Cosmos DB primary master key"
  value       = azurerm_cosmosdb_account.this.primary_key
  sensitive   = true
}

output "database_name" {
  description = "SQL database name"
  value       = azurerm_cosmosdb_sql_database.docs.name
}
