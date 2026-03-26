# Shared config inherited by all live environments
locals {
  location          = "eastus"
  module_base_path  = "${get_repo_root()}/infra/terraform/_modules"
}
