# =============================================================================
# NexaMesh — Key Vault Module Variables
# =============================================================================

variable "name" {
  description = "Key Vault name"
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

variable "soft_delete_retention_days" {
  description = "Soft delete retention in days"
  type        = number
  default     = 7
}

variable "secrets" {
  description = "Map of secret names to secret values to store in the vault"
  type        = map(string)
  default     = {}
  sensitive   = true
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default     = {}
}
