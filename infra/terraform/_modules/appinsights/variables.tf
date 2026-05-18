# =============================================================================
# NexaMesh — Application Insights Module Variables
# =============================================================================

variable "name" {
  description = "Application Insights component name"
  type        = string
}

variable "workspace_name" {
  description = "Log Analytics workspace name (defaults to {name}-workspace)"
  type        = string
  default     = ""
}

variable "location" {
  description = "Azure region"
  type        = string
}

variable "resource_group_name" {
  description = "Resource group name"
  type        = string
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default     = {}
}
