/**
 * Azure Container Apps Environment Module
 *
 * Single shared CAE for all NexaMesh container workloads across environments.
 * Name: nex-global-shared-cae
 *
 * Hosted apps (deployed separately per-env):
 *   nex-{env}-api-ca       — Rust Axum REST API
 *   nex-{env}-keeper-ca    — Rust blockchain keeper (outbox processor)
 *   nex-{env}-detector-ca  — Python detector HTTP API
 */

@description('Container Apps Environment name')
param name string

@description('Azure region')
param location string

@description('Resource tags')
param tags object = {}

@description('Log Analytics workspace resource ID for diagnostics')
param logAnalyticsWorkspaceId string

@description('Log Analytics workspace customer ID')
param logAnalyticsWorkspaceCustomerId string

@description('Log Analytics workspace shared key')
@secure()
param logAnalyticsWorkspaceKey string

@description('Zone redundancy — enable for prod, leave false for cost savings')
param zoneRedundant bool = false

// ---------------------------------------------------------------------------
// Container Apps Environment
// ---------------------------------------------------------------------------

resource cae 'Microsoft.App/managedEnvironments@2024-03-01' = {
  name: name
  location: location
  tags: tags
  properties: {
    // Consumption workload profile — serverless, scale-to-zero
    workloadProfiles: [
      {
        name: 'Consumption'
        workloadProfileType: 'Consumption'
      }
    ]

    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logAnalyticsWorkspaceCustomerId
        sharedKey: logAnalyticsWorkspaceKey
      }
    }

    zoneRedundant: zoneRedundant

    // Peer-to-peer encryption within the environment
    peerTrafficConfiguration: {
      encryption: {
        enabled: true
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Outputs
// ---------------------------------------------------------------------------

@description('Container Apps Environment resource ID')
output id string = cae.id

@description('Container Apps Environment name')
output name string = cae.name

@description('Default domain for apps in this environment')
output defaultDomain string = cae.properties.defaultDomain

@description('Static IP of the environment (for DNS / firewall rules)')
output staticIp string = cae.properties.staticIp
