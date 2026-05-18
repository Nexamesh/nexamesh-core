#!/usr/bin/env bash
# bootstrap-tfstate.sh
#
# Creates the Azure storage backend for Terragrunt remote state.
# Run once per environment before the first `terragrunt apply`.
#
# Usage:
#   ./bootstrap-tfstate.sh dev
#   ./bootstrap-tfstate.sh stg
#   ./bootstrap-tfstate.sh prd
#
# Requires: az CLI logged in, appropriate subscription selected.

set -euo pipefail

ENV="${1:?Usage: $0 <dev|stg|prd>}"
LOCATION="${2:-eastus}"

RG_NAME="nex-${ENV}-tfstate-rg"
SA_NAME="nex${ENV}tfstate"
CONTAINER="tfstate"

echo "==> Bootstrapping Terragrunt state backend for env: ${ENV}"
echo "    Resource Group : ${RG_NAME}"
echo "    Storage Account: ${SA_NAME}"
echo "    Container      : ${CONTAINER}"
echo "    Location       : ${LOCATION}"
echo ""

# Resource group
az group create \
  --name "${RG_NAME}" \
  --location "${LOCATION}" \
  --tags project=nexamesh environment="${ENV}" managed_by=manual \
  --output table

# Storage account (LRS, HTTPS-only, min TLS 1.2)
az storage account create \
  --name "${SA_NAME}" \
  --resource-group "${RG_NAME}" \
  --location "${LOCATION}" \
  --sku Standard_LRS \
  --kind StorageV2 \
  --https-only true \
  --min-tls-version TLS1_2 \
  --allow-blob-public-access false \
  --output table

# Blob container
az storage container create \
  --name "${CONTAINER}" \
  --account-name "${SA_NAME}" \
  --auth-mode login \
  --output table

echo ""
echo "==> Done. Remote state backend ready for env: ${ENV}"
echo "    Run 'terragrunt init' in infra/terraform/live/${ENV}/<product>/ to initialise."
