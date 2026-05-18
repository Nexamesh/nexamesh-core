# =============================================================================
# NexaMesh — Storage Account Module
#
# Maps from: infra/azure/modules/storage.bicep
#
# StorageV2, Hot tier, HTTPS-only, min TLS 1.2.
# Creates an "assets" private blob container and sets CORS on the blob service.
# =============================================================================

resource "azurerm_storage_account" "this" {
  name                     = var.name
  location                 = var.location
  resource_group_name      = var.resource_group_name
  account_tier             = "Standard"
  account_replication_type = "LRS"
  account_kind             = "StorageV2"
  access_tier              = "Hot"

  # Security — matches Bicep supportsHttpsTrafficOnly + minimumTlsVersion
  https_traffic_only_enabled      = true
  min_tls_version                 = "TLS1_2"
  allow_nested_items_to_be_public = false

  blob_properties {
    cors_rule {
      allowed_origins    = ["*"]
      allowed_methods    = ["GET", "HEAD", "OPTIONS"]
      allowed_headers    = ["*"]
      exposed_headers    = ["*"]
      max_age_in_seconds = 86400
    }
  }

  tags = var.tags
}

# Private container for static assets — matches Bicep assetsContainer
resource "azurerm_storage_container" "assets" {
  name                  = "assets"
  storage_account_name  = azurerm_storage_account.this.name
  container_access_type = "private"
}
