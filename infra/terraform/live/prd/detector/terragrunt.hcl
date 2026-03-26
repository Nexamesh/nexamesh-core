include "root" {
  path = find_in_parent_folders("root.terragrunt.hcl")
}

locals {
  common = read_terragrunt_config(find_in_parent_folders("_common/common.hcl"))
}

terraform {
  source = "${local.common.locals.module_base_path}/ml-training"
}

inputs = {
  environment = "prd"
  location    = local.common.locals.location

  # Compute — V100 for production throughput
  gpu_vm_size          = "Standard_NC6s_v3"  # V100, ~$3.06/hr
  min_nodes            = 0
  max_nodes            = 2
  idle_timeout_minutes = 30
  use_spot_instances   = false  # dedicated for reliability

  create_container_registry = true
  create_cpu_cluster        = true

  # Security — hardened for production
  enable_public_network_access = false
  enable_purge_protection      = true

  tags = {
    cost_center = "nex-prd"
    owner       = "ml-team"
    criticality = "high"
  }
}
