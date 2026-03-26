# =============================================================================
# NexaMesh Core -- Orchestrator Module Outputs
#
# Maps from: infra/azure/main.bicep outputs
# =============================================================================

output "static_web_app_docs_url" {
  description = "Documentation Static Web App URL"
  value       = module.staticwebapp_docs.url
}

output "static_web_app_docs_hostname" {
  description = "Documentation Static Web App default hostname"
  value       = module.staticwebapp_docs.default_host_name
}

output "static_web_app_marketing_url" {
  description = "Marketing Static Web App URL"
  value       = module.staticwebapp_marketing.url
}

output "static_web_app_marketing_hostname" {
  description = "Marketing Static Web App default hostname"
  value       = module.staticwebapp_marketing.default_host_name
}

output "functions_url" {
  description = "Functions App URL"
  value       = module.functions.url
}

output "functions_hostname" {
  description = "Functions App hostname"
  value       = module.functions.default_hostname
}

output "app_insights_connection_string" {
  description = "Application Insights connection string"
  value       = module.appinsights.connection_string
  sensitive   = true
}

output "cosmos_db_endpoint" {
  description = "Cosmos DB endpoint URL"
  value       = module.cosmosdb.endpoint
}

output "key_vault_uri" {
  description = "Key Vault URI"
  value       = module.keyvault.uri
}

output "storage_account_name" {
  description = "Storage account name"
  value       = module.storage.name
}

output "notification_hub_name" {
  description = "Notification Hub name"
  value       = module.notificationhub.hub_name
}

output "container_apps_env_id" {
  description = "Container Apps Environment resource ID"
  value       = module.containerapps_env.id
}

output "container_apps_env_name" {
  description = "Container Apps Environment name"
  value       = module.containerapps_env.name
}

output "container_apps_env_default_domain" {
  description = "Container Apps Environment default domain"
  value       = module.containerapps_env.default_domain
}
