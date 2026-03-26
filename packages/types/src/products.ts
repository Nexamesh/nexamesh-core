/**
 * Shared product catalog types — single source of truth across apps.
 *
 * Marketing extends these with market/sales metadata.
 * Docs extends these with BOM, tiers, and engineering metadata.
 */

/** Kebab-case product line identifier. Canonical across all apps. */
export type ProductLine =
  | "kestrel"
  | "netsnare"
  | "skywatch"
  | "netsentry"
  | "sentinel-ring"
  | "rkv";

/**
 * Market-facing customer segment (marketing app).
 * Describes who buys it, not what it does.
 */
export type MarketTier =
  | "consumer"
  | "diy-maker"
  | "prosumer"
  | "commercial"
  | "enterprise"
  | "military";

/**
 * Hardware system classification (docs app).
 * Describes what the product does, not who buys it.
 */
export type SystemType = "detection" | "countermeasure";

/** Funding/availability phase. Same in both apps. */
export type ProductPhase =
  | "seed"
  | "series-a"
  | "series-b"
  | "series-c"
  | "scale";

/** Minimal shared product shape. Both apps extend this. */
export interface BaseProduct {
  sku: string;
  name: string;
  line: ProductLine;
  priceMin: number;
  priceMax: number;
}
