/**
 * NexaMesh - Azure Infrastructure
 *
 * This Bicep template deploys all Azure resources needed for the NexaMesh
 * documentation and marketing sites.
 *
 * Resources deployed:
 * - Azure Static Web Apps (hosting for docs and marketing)
 * - Azure Cosmos DB (database - replaces Firestore)
 * - Azure Application Insights (analytics)
 * - Azure Notification Hub (push notifications - replaces FCM)
 * - Azure Functions (serverless - replaces Cloud Functions)
 * - Azure Entra ID (authentication - replaces Firebase Auth)
 * - Azure Key Vault (secrets management)
 * - Azure Storage (for Functions and static assets)
 */

// ============================================================================
// Parameters
// ============================================================================

@description('Environment name (dev, stg, prd, prv for preview)')
@allowed(['dev', 'stg', 'prd', 'prv'])
param environment string = 'dev'

@description('Azure region for resources')
param location string = resourceGroup().location

@description('GitHub repository URL for Static Web App')
param repositoryUrl string = 'https://github.com/nexamesh/nexamesh-core'

@description('GitHub branch to deploy from')
param branch string = 'main'

@description('Static Web App SKU')
@allowed(['Free', 'Standard'])
param staticWebAppSku string = 'Free'

@description('Cosmos DB throughput (RU/s) - use 400 for free tier')
@minValue(400)
@maxValue(10000)
param cosmosDbThroughput int = 400

@description('Enable serverless Cosmos DB (recommended for variable workloads)')
param useServerlessCosmosDb bool = true

@description('Azure OpenAI API Key for AI features')
@secure()
param azureOpenAiApiKey string = ''

@description('Azure OpenAI endpoint URL (e.g., https://your-resource.openai.azure.com/)')
param azureOpenAiEndpoint string = ''

@description('Azure OpenAI chat deployment name')
param azureOpenAiChatDeployment string = 'gpt-4'

@description('Azure OpenAI embedding deployment name')
param azureOpenAiEmbeddingDeployment string = 'text-embedding-3-small'

@description('Azure Entra ID Tenant ID')
param entraIdTenantId string = ''

@description('Azure Entra ID Client ID for token validation')
param entraIdClientId string = ''

// ============================================================================
// Variables
// ============================================================================

// Naming Convention v3.0: nex-{env}-{product}-{resourcetype}
// - No region suffix
// - Prefix: nex (NexaMesh)
// - Products: docs, marketing, api, detector, shared
// See: docs/azure-naming-conventions.md

// Tags for cost management and organization
var tags = {
  project: 'nexamesh'
  environment: environment
  managedBy: 'bicep'
  costCenter: 'nex-${environment}'
  owner: 'JustAGhosT'
}

// Key Vault for secrets management
// Pattern: [org]-[env]-[project]-[type]-[region]
module keyVault 'modules/keyvault.bicep' = {
  name: 'keyVault'
  params: {
    name: 'nex-${environment}-shared-kv'
    location: location
    tags: tags
  }
}

// Storage Account for Functions and assets (no hyphens, max 24 chars)
module storage 'modules/storage.bicep' = {
  name: 'storage'
  params: {
    name: 'nex${environment}sharedst'
    location: location
    tags: tags
  }
}

// Application Insights for monitoring and analytics
module appInsights 'modules/appinsights.bicep' = {
  name: 'appInsights'
  params: {
    name: 'nex-${environment}-shared-appi'
    location: location
    tags: tags
  }
}

// Cosmos DB for docs database
module cosmosDb 'modules/cosmosdb.bicep' = {
  name: 'cosmosDb'
  params: {
    name: 'nex-${environment}-docs-cosmos'
    location: location
    tags: tags
    throughput: cosmosDbThroughput
    useServerless: useServerlessCosmosDb
  }
}

// Notification Hub for push notifications
module notificationHub 'modules/notificationhub.bicep' = {
  name: 'notificationHub'
  params: {
    namespaceName: 'nex-${environment}-docs-nhns'
    hubName: 'nex-${environment}-docs-nh'
    location: location
    tags: tags
  }
}

// Azure Functions for docs serverless backend
module functions 'modules/functions.bicep' = {
  name: 'functions'
  params: {
    name: 'nex-${environment}-docs-func'
    location: location
    tags: tags
    storageAccountName: storage.outputs.name
    appInsightsInstrumentationKey: appInsights.outputs.instrumentationKey
    appInsightsConnectionString: appInsights.outputs.connectionString
    cosmosDbConnectionString: cosmosDb.outputs.connectionString
    keyVaultName: keyVault.outputs.name
    azureOpenAIEndpoint: azureOpenAiEndpoint
    azureOpenAIChatDeployment: azureOpenAiChatDeployment
    azureOpenAIEmbeddingDeployment: azureOpenAiEmbeddingDeployment
    azureEntraTenantId: entraIdTenantId
    azureEntraClientId: entraIdClientId
  }
}

// Container Apps Environment — single global instance shared across all envs
module containerAppsEnv 'modules/containerapps-env.bicep' = {
  name: 'containerAppsEnv'
  params: {
    name: 'nex-global-shared-cae'
    location: location
    tags: tags
    logAnalyticsWorkspaceId: appInsights.outputs.workspaceId
    logAnalyticsWorkspaceCustomerId: appInsights.outputs.workspaceCustomerId
    logAnalyticsWorkspaceKey: appInsights.outputs.workspaceKey
  }
}

// Static Web App for documentation site
module staticWebAppDocs 'modules/staticwebapp.bicep' = {
  name: 'staticWebAppDocs'
  params: {
    name: 'nex-${environment}-docs-swa'
    location: location
    tags: tags
    sku: staticWebAppSku
    repositoryUrl: repositoryUrl
    branch: branch
    appLocation: 'apps/docs'
    outputLocation: 'build'
    apiLocation: ''
  }
}

// Static Web App for marketing site
module staticWebAppMarketing 'modules/staticwebapp.bicep' = {
  name: 'staticWebAppMarketing'
  params: {
    name: 'nex-${environment}-marketing-swa'
    location: location
    tags: tags
    sku: staticWebAppSku
    repositoryUrl: repositoryUrl
    branch: branch
    appLocation: 'apps/marketing'
    outputLocation: 'out'
    apiLocation: ''
  }
}

// ============================================================================
// Secrets in Key Vault
// ============================================================================

// Store Cosmos DB connection string in Key Vault
module cosmosSecret 'modules/keyvault-secret.bicep' = {
  name: 'cosmosSecret'
  params: {
    keyVaultName: keyVault.outputs.name
    secretName: 'CosmosDbConnectionString'
    secretValue: cosmosDb.outputs.connectionString
  }
}

// Store Azure OpenAI API key if provided
module azureOpenAiSecret 'modules/keyvault-secret.bicep' = if (!empty(azureOpenAiApiKey)) {
  name: 'azureOpenAiSecret'
  params: {
    keyVaultName: keyVault.outputs.name
    secretName: 'AzureOpenAiApiKey'
    secretValue: azureOpenAiApiKey
  }
}

// Store Notification Hub connection string
module notificationHubSecret 'modules/keyvault-secret.bicep' = {
  name: 'notificationHubSecret'
  params: {
    keyVaultName: keyVault.outputs.name
    secretName: 'NotificationHubConnectionString'
    secretValue: notificationHub.outputs.connectionString
  }
}

// ============================================================================
// Outputs
// ============================================================================

@description('Documentation Static Web App URL')
output staticWebAppDocsUrl string = staticWebAppDocs.outputs.url

@description('Documentation Static Web App default hostname')
output staticWebAppDocsHostname string = staticWebAppDocs.outputs.defaultHostname

@description('Marketing Static Web App URL')
output staticWebAppMarketingUrl string = staticWebAppMarketing.outputs.url

@description('Marketing Static Web App default hostname')
output staticWebAppMarketingHostname string = staticWebAppMarketing.outputs.defaultHostname

@description('Functions App URL')
output functionsUrl string = functions.outputs.url

@description('Functions App hostname')
output functionsHostname string = functions.outputs.defaultHostname

@description('Application Insights connection string')
output appInsightsConnectionString string = appInsights.outputs.connectionString

@description('Cosmos DB endpoint')
output cosmosDbEndpoint string = cosmosDb.outputs.endpoint

@description('Key Vault URI')
output keyVaultUri string = keyVault.outputs.uri

@description('Storage Account name')
output storageAccountName string = storage.outputs.name

@description('Notification Hub name')
output notificationHubName string = notificationHub.outputs.hubName

@description('Container Apps Environment resource ID')
output containerAppsEnvId string = containerAppsEnv.outputs.id

@description('Container Apps Environment name')
output containerAppsEnvName string = containerAppsEnv.outputs.name

@description('Container Apps Environment default domain')
output containerAppsEnvDefaultDomain string = containerAppsEnv.outputs.defaultDomain

@description('Configuration for client-side app')
output clientConfig object = {
  functionsBaseUrl: functions.outputs.url
  appInsightsConnectionString: appInsights.outputs.connectionString
  cosmosDbEndpoint: cosmosDb.outputs.endpoint
  entraIdTenantId: entraIdTenantId
}
