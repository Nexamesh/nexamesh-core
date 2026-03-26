# =============================================================================
# NexaMesh -- Notification Hub Module Variables
# =============================================================================

variable "namespace_name" {
  description = "Notification Hub namespace name"
  type        = string
}

variable "hub_name" {
  description = "Notification Hub name"
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
  description = "Namespace SKU: Free, Basic, or Standard"
  type        = string
  default     = "Free"

  validation {
    condition     = contains(["Free", "Basic", "Standard"], var.sku)
    error_message = "SKU must be Free, Basic, or Standard."
  }
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default     = {}
}
