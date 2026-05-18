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
  environment = "dev"
  location    = local.common.locals.location

  # Compute — cost-optimised for dev
  gpu_vm_size          = "Standard_NC4as_T4_v3"  # T4, ~$0.53/hr
  min_nodes            = 0
  max_nodes            = 1
  idle_timeout_minutes = 15
  use_spot_instances   = true   # spot saves ~80% in dev

  # Optional resources — disabled for dev to keep costs low
  create_container_registry = false
  create_cpu_cluster        = false

  # Security — relaxed for dev iteration
  enable_public_network_access = true
  enable_purge_protection      = false

  tags = {
    cost_center = "nex-dev"
    owner       = "ml-team"
  }
}
