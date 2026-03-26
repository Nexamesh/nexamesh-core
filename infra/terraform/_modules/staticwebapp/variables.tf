# =============================================================================
# NexaMesh -- Static Web App Module Variables
# =============================================================================

variable "name" {
  description = "Static Web App name"
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
  description = "SKU tier: Free or Standard"
  type        = string
  default     = "Free"

  validation {
    condition     = contains(["Free", "Standard"], var.sku)
    error_message = "SKU must be Free or Standard."
  }
}

variable "repository_url" {
  description = "GitHub repository URL"
  type        = string
}

variable "branch" {
  description = "Branch to deploy from"
  type        = string
  default     = "main"
}

variable "app_location" {
  description = "App source location within the repository"
  type        = string
  default     = "apps/docs"
}

variable "output_location" {
  description = "Build output location"
  type        = string
  default     = "build"
}

variable "api_location" {
  description = "API source location within the repository (empty = separate Functions)"
  type        = string
  default     = ""
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default     = {}
}
