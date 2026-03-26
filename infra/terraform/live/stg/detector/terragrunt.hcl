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
  environment = "stg"
  location    = local.common.locals.location

  # Compute — mirrors prod sizing, dedicated (no spot)
  gpu_vm_size          = "Standard_NC4as_T4_v3"
  min_nodes            = 0
  max_nodes            = 1
  idle_timeout_minutes = 30
  use_spot_instances   = false

  create_container_registry = true
  create_cpu_cluster        = false

  enable_public_network_access = true
  enable_purge_protection      = false

  tags = {
    cost_center = "nex-stg"
    owner       = "ml-team"
  }
}
