# =============================================================================
# NexaMesh Core -- Orchestrator Module Outputs
#
# Maps from: infra/azure/main.bicep outputs
# =============================================================================

output "static_web_app_docs_api_key" {
  description = "Docs SWA deployment token — written to GitHub Secrets by CI"
  value       = module.staticwebapp_docs.api_key
  sensitive   = true
}

output "static_web_app_marketing_api_key" {
  description = "Marketing SWA deployment token — written to GitHub Secrets by CI"
  value       = module.staticwebapp_marketing.api_key
  sensitive   = true
}

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
  description = "Functions App URL (null when create_functions = false)"
  value       = var.create_functions ? module.functions[0].url : null
}

output "functions_hostname" {
  description = "Functions App hostname (null when create_functions = false)"
  value       = var.create_functions ? module.functions[0].default_hostname : null
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
  description = "Notification Hub name (null when create_notification_hub = false)"
  value       = var.create_notification_hub ? module.notificationhub[0].hub_name : null
}

output "container_apps_env_id" {
  description = "Container Apps Environment resource ID (null when create_container_apps_env = false)"
  value       = var.create_container_apps_env ? module.containerapps_env[0].id : null
}

output "container_apps_env_name" {
  description = "Container Apps Environment name (null when create_container_apps_env = false)"
  value       = var.create_container_apps_env ? module.containerapps_env[0].name : null
}

output "container_apps_env_default_domain" {
  description = "Container Apps Environment default domain (null when create_container_apps_env = false)"
  value       = var.create_container_apps_env ? module.containerapps_env[0].default_domain : null
}
