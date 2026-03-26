# =============================================================================
# NexaMesh Core -- Orchestrator Module Variables
#
# Maps from: infra/azure/main.bicep parameters
# =============================================================================

variable "environment" {
  description = "Environment name"
  type        = string

  validation {
    condition     = contains(["dev", "stg", "prd"], var.environment)
    error_message = "environment must be dev, stg, or prd."
  }
}

variable "location" {
  description = "Azure region for all resources"
  type        = string
}

variable "swa_location" {
  description = "Azure region for Static Web Apps (eastus not supported; use eastus2, westus2, etc.)"
  type        = string
  default     = "eastus2"
}

variable "repository_url" {
  description = "GitHub repository URL for Static Web Apps"
  type        = string
  default     = "https://github.com/Nexamesh/nexamesh-core"
}

variable "branch" {
  description = "GitHub branch to deploy from"
  type        = string
  default     = "main"
}

variable "static_web_app_sku" {
  description = "Static Web App SKU: Free or Standard"
  type        = string
  default     = "Free"

  validation {
    condition     = contains(["Free", "Standard"], var.static_web_app_sku)
    error_message = "static_web_app_sku must be Free or Standard."
  }
}

variable "cosmos_db_throughput" {
  description = "Cosmos DB database throughput in RU/s (ignored when use_serverless_cosmos_db = true)"
  type        = number
  default     = 400

  validation {
    condition     = var.cosmos_db_throughput >= 400 && var.cosmos_db_throughput <= 10000
    error_message = "cosmos_db_throughput must be between 400 and 10000."
  }
}

variable "use_serverless_cosmos_db" {
  description = "Use serverless Cosmos DB capacity mode"
  type        = bool
  default     = true
}

variable "azure_openai_api_key" {
  description = "Azure OpenAI API key (stored in Key Vault)"
  type        = string
  default     = ""
  sensitive   = true
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

variable "entra_id_tenant_id" {
  description = "Azure Entra ID tenant ID"
  type        = string
  default     = ""
}

variable "entra_id_client_id" {
  description = "Azure Entra ID client ID for token validation"
  type        = string
  default     = ""
}

variable "enable_free_tier_cosmos" {
  description = "Enable Cosmos DB free tier (1000 RU/s + 25 GB free). One account per subscription only. Incompatible with serverless — setting this forces use_serverless_cosmos_db = false."
  type        = bool
  default     = false
}

variable "create_notification_hub" {
  description = "Create the Notification Hub namespace and hub. Disable in dev/stg to avoid unnecessary resources."
  type        = bool
  default     = true
}

variable "create_container_apps_env" {
  description = "Create the Container Apps Environment. Disable when no containers are being deployed (Rust API, keeper, detector). Re-enable when ready to deploy container workloads."
  type        = bool
  default     = true
}

variable "tags" {
  description = "Resource tags applied to all resources"
  type        = map(string)
  default     = {}
}
