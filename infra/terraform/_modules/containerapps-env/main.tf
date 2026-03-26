# =============================================================================
# NexaMesh -- Container Apps Environment Module
#
# Maps from: infra/azure/modules/containerapps-env.bicep
#
# Single shared CAE for all NexaMesh container workloads.
# Name: nex-global-shared-cae
# Uses Consumption workload profile with peer-to-peer encryption.
# =============================================================================

resource "azurerm_container_app_environment" "this" {
  name                = var.name
  location            = var.location
  resource_group_name = var.resource_group_name

  log_analytics_workspace_id = var.log_analytics_workspace_id

  # Zone redundancy -- enable for prd, false for dev/stg to save cost
  zone_redundancy_enabled = var.zone_redundancy_enabled

  # Peer-to-peer encryption within the environment
  mutual_tls_enabled = true

  # Consumption workload profile (scale-to-zero, serverless)
  workload_profile {
    name                  = "Consumption"
    workload_profile_type = "Consumption"
  }

  tags = var.tags
}
