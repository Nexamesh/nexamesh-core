# =============================================================================
# NexaMesh — Cosmos DB Module
#
# Maps from: infra/azure/modules/cosmosdb.bicep
# =============================================================================

resource "azurerm_cosmosdb_account" "this" {
  name                = var.name
  location            = var.location
  resource_group_name = var.resource_group_name
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"

  consistency_policy {
    consistency_level = "Session"
  }

  geo_location {
    location          = var.location
    failover_priority = 0
    zone_redundant    = false
  }

  dynamic "capabilities" {
    for_each = var.use_serverless ? [1] : []
    content {
      name = "EnableServerless"
    }
  }

  enable_free_tier                = var.enable_free_tier
  enable_automatic_failover       = false
  enable_multiple_write_locations = false
  public_network_access_enabled   = true

  cors_rule {
    allowed_origins    = ["*"]
    allowed_methods    = ["DELETE", "GET", "HEAD", "MERGE", "OPTIONS", "POST", "PUT"]
    allowed_headers    = ["*"]
    exposed_headers    = ["*"]
    max_age_in_seconds = 86400
  }

  tags = var.tags
}

resource "azurerm_cosmosdb_sql_database" "docs" {
  name                = "nexamesh-docs"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.this.name
  throughput          = var.use_serverless ? null : var.throughput
}

# 1. userProgress -- partition /id, full indexing
resource "azurerm_cosmosdb_sql_container" "user_progress" {
  name                = "userProgress"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.this.name
  database_name       = azurerm_cosmosdb_sql_database.docs.name
  partition_key_path  = "/id"

  indexing_policy {
    indexing_mode = "consistent"
    included_path { path = "/*" }
    excluded_path { path = "/\"_etag\"/?"}
  }
}

# 2. userProfiles -- partition /id
resource "azurerm_cosmosdb_sql_container" "user_profiles" {
  name                = "userProfiles"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.this.name
  database_name       = azurerm_cosmosdb_sql_database.docs.name
  partition_key_path  = "/id"
}

# 3. comments -- partition /pageId, composite indexes
resource "azurerm_cosmosdb_sql_container" "comments" {
  name                = "comments"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.this.name
  database_name       = azurerm_cosmosdb_sql_database.docs.name
  partition_key_path  = "/pageId"

  indexing_policy {
    indexing_mode = "consistent"
    included_path { path = "/*" }
    composite_index {
      index { path = "/pageId"    order = "ascending"  }
      index { path = "/createdAt" order = "descending" }
    }
    composite_index {
      index { path = "/status"    order = "ascending" }
      index { path = "/createdAt" order = "ascending" }
    }
  }
}

# 4. analytics_pageviews -- TTL 90 days (7776000s)
resource "azurerm_cosmosdb_sql_container" "analytics_pageviews" {
  name                = "analytics_pageviews"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.this.name
  database_name       = azurerm_cosmosdb_sql_database.docs.name
  partition_key_path  = "/sessionId"
  default_ttl         = 7776000
}

# 5. analytics_sessions -- TTL 30 days (2592000s)
resource "azurerm_cosmosdb_sql_container" "analytics_sessions" {
  name                = "analytics_sessions"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.this.name
  database_name       = azurerm_cosmosdb_sql_database.docs.name
  partition_key_path  = "/sessionId"
  default_ttl         = 2592000
}

# 6. notifications -- partition /userId
resource "azurerm_cosmosdb_sql_container" "notifications" {
  name                = "notifications"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.this.name
  database_name       = azurerm_cosmosdb_sql_database.docs.name
  partition_key_path  = "/userId"
}

# 7. news_articles -- composite index category+publishedAt
resource "azurerm_cosmosdb_sql_container" "news_articles" {
  name                = "news_articles"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.this.name
  database_name       = azurerm_cosmosdb_sql_database.docs.name
  partition_key_path  = "/category"

  indexing_policy {
    indexing_mode = "consistent"
    included_path { path = "/*" }
    composite_index {
      index { path = "/category"    order = "ascending"  }
      index { path = "/publishedAt" order = "descending" }
    }
  }
}

# 8. doc_embeddings -- partition /docId
resource "azurerm_cosmosdb_sql_container" "doc_embeddings" {
  name                = "doc_embeddings"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.this.name
  database_name       = azurerm_cosmosdb_sql_database.docs.name
  partition_key_path  = "/docId"
}

# 9. ai_cache -- TTL 24 hours (86400s)
resource "azurerm_cosmosdb_sql_container" "ai_cache" {
  name                = "ai_cache"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.this.name
  database_name       = azurerm_cosmosdb_sql_database.docs.name
  partition_key_path  = "/cacheKey"
  default_ttl         = 86400
}

# 10. weekly_reports -- composite index status+weekStartDate
resource "azurerm_cosmosdb_sql_container" "weekly_reports" {
  name                = "weekly_reports"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.this.name
  database_name       = azurerm_cosmosdb_sql_database.docs.name
  partition_key_path  = "/id"

  indexing_policy {
    indexing_mode = "consistent"
    included_path { path = "/*" }
    composite_index {
      index { path = "/status"        order = "ascending"  }
      index { path = "/weekStartDate" order = "descending" }
    }
  }
}

# 11. known_emails -- composite index profileKey+createdAt
resource "azurerm_cosmosdb_sql_container" "known_emails" {
  name                = "known_emails"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.this.name
  database_name       = azurerm_cosmosdb_sql_database.docs.name
  partition_key_path  = "/id"

  indexing_policy {
    indexing_mode = "consistent"
    included_path { path = "/*" }
    composite_index {
      index { path = "/profileKey" order = "ascending"  }
      index { path = "/createdAt"  order = "descending" }
    }
  }
}

# 12. access_applications -- two composite indexes
resource "azurerm_cosmosdb_sql_container" "access_applications" {
  name                = "access_applications"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.this.name
  database_name       = azurerm_cosmosdb_sql_database.docs.name
  partition_key_path  = "/userId"

  indexing_policy {
    indexing_mode = "consistent"
    included_path { path = "/*" }
    composite_index {
      index { path = "/status"    order = "ascending"  }
      index { path = "/createdAt" order = "descending" }
    }
    composite_index {
      index { path = "/userId"    order = "ascending"  }
      index { path = "/createdAt" order = "descending" }
    }
  }
}
