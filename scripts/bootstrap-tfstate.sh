#!/usr/bin/env bash
# Bootstrap Terragrunt remote state storage for a given environment.
# Run once per environment before the first `terragrunt apply`.
#
# Usage: ./scripts/bootstrap-tfstate.sh <env> [location]
#   env      — dev | stg | prd
#   location — Azure region (default: eastus)
#
# Requires: az CLI, logged in with Contributor on the subscription.

set -euo pipefail

ENV="${1:?Usage: bootstrap-tfstate.sh <env> [location]}"
LOCATION="${2:-eastus}"

RG="nex-${ENV}-tfstate-rg"
SA="nex${ENV}tfstate"
CONTAINER="tfstate"

echo "Bootstrapping tfstate backend for env=${ENV}"
echo "  Resource Group : ${RG}"
echo "  Storage Account: ${SA}"
echo "  Container      : ${CONTAINER}"
echo "  Location       : ${LOCATION}"
echo ""

# Resource group
az group create \
  --name "${RG}" \
  --location "${LOCATION}" \
  --tags project=nexamesh environment="${ENV}" managed_by=bootstrap \
  --output none
echo "✓ Resource group: ${RG}"

# Storage account (LRS, hot tier, versioning on for state protection)
az storage account create \
  --name "${SA}" \
  --resource-group "${RG}" \
  --location "${LOCATION}" \
  --sku Standard_LRS \
  --kind StorageV2 \
  --allow-blob-public-access false \
  --min-tls-version TLS1_2 \
  --output none
echo "✓ Storage account: ${SA}"

# Enable versioning on the blob service (protects tfstate from accidental deletion)
az storage account blob-service-properties update \
  --account-name "${SA}" \
  --resource-group "${RG}" \
  --enable-versioning true \
  --output none
echo "✓ Blob versioning enabled"

# State container
az storage container create \
  --name "${CONTAINER}" \
  --account-name "${SA}" \
  --auth-mode login \
  --output none
echo "✓ Container: ${CONTAINER}"

echo ""
echo "Bootstrap complete. You can now run:"
echo "  cd infra/terraform/live/${ENV}/detector"
echo "  terragrunt init && terragrunt plan"
