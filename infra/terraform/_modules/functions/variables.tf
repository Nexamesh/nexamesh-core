# =============================================================================
# NexaMesh -- Azure Functions Module Variables
# =============================================================================

variable "name" {
  description = "Function App name"
  type        = string
}

variable "location" {
  description = "Azure region"
  type        = string
}

variable "resource_group_name" {
  description = "Resource group name"
  type        = string
}

variable "sku" {
  description = "App Service Plan SKU: Y1 (Consumption) or EP1/EP2/EP3 (Premium)"
  type        = string
  default     = "Y1"

  validation {
    condition     = contains(["Y1", "EP1", "EP2", "EP3"], var.sku)
    error_message = "SKU must be Y1, EP1, EP2, or EP3."
  }
}

variable "storage_account_name" {
  description = "Storage account name"
  type        = string
}

variable "storage_account_access_key" {
  description = "Storage account access key"
  type        = string
  sensitive   = true
}

variable "storage_connection_string" {
  description = "Storage account primary connection string"
  type        = string
  sensitive   = true
}

variable "app_insights_instrumentation_key" {
  description = "Application Insights instrumentation key"
  type        = string
  sensitive   = true
}

variable "app_insights_connection_string" {
  description = "Application Insights connection string"
  type        = string
  sensitive   = true
}

variable "cosmos_db_connection_string" {
  description = "Cosmos DB connection string"
  type        = string
  sensitive   = true
}

variable "key_vault_name" {
  description = "Key Vault name"
  type        = string
}

variable "key_vault_id" {
  description = "Key Vault resource ID"
  type        = string
}

variable "azure_openai_endpoint" {
  description = "Azure OpenAI endpoint URL"
  type        = string
  default     = ""
}

variable "azure_openai_chat_deployment" {
  description = "Azure OpenAI chat deployment name"
  type        = string
  default     = "gpt-4"
}

variable "azure_openai_embedding_deployment" {
  description = "Azure OpenAI embedding deployment name"
  type        = string
  default     = "text-embedding-3-small"
}

variable "entra_tenant_id" {
  description = "Azure Entra ID tenant ID"
  type        = string
  default     = ""
}

variable "entra_client_id" {
  description = "Azure Entra ID client ID"
  type        = string
  default     = ""
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default     = {}
}
