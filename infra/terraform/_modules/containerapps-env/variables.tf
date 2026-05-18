# =============================================================================
# NexaMesh -- Container Apps Environment Module Variables
# =============================================================================

variable "name" {
  description = "Container Apps Environment name"
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

variable "log_analytics_workspace_id" {
  description = "Log Analytics workspace resource ID for diagnostics"
  type        = string
}

variable "zone_redundancy_enabled" {
  description = "Enable zone redundancy (recommended for prd)"
  type        = bool
  default     = false
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default     = {}
}
