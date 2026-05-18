# =============================================================================
# NexaMesh -- Cosmos DB Module Variables
# =============================================================================

variable "name" {
  description = "Cosmos DB account name"
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

variable "throughput" {
  description = "Database throughput in RU/s (ignored when use_serverless = true)"
  type        = number
  default     = 400

  validation {
    condition     = var.throughput >= 400 && var.throughput <= 10000
    error_message = "Throughput must be between 400 and 10000 RU/s."
  }
}

variable "use_serverless" {
  description = "Use serverless capacity mode (throughput is ignored)"
  type        = bool
  default     = true
}

variable "enable_free_tier" {
  description = "Enable free tier (400 RU/s + 25 GB free). Only one account per subscription can use this. Incompatible with serverless."
  type        = bool
  default     = false
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default     = {}
}
