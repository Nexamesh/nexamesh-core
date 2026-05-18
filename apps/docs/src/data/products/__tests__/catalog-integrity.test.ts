/**
 * Catalog integrity checks.
 *
 * Catalog split is intentional:
 *   - Docs catalog  = hardware component SKUs with full specs and BOMs
 *   - Marketing     = purchasable SKUs, including vertical-market bundles that
 *                     combine multiple components (e.g. AN-PATROL-001, SW-FARM-001)
 *
 * These tests validate internal consistency of the docs catalog only.
 * Cross-catalog SKU parity is NOT enforced here — bundles live in marketing alone.
 */

import { allProducts } from "../index";
import type { ProductLine } from "@nexamesh/types";

const VALID_LINES: ProductLine[] = [
  "skywatch",
  "netsentry",
  "kestrel",
  "netsnare",
  "sentinel-ring",
  "rkv",
];

const SKU_PATTERN = /^[A-Z]{2,4}-[A-Z0-9-]+$/;

describe("Docs product catalog — internal integrity", () => {
  it("exports at least one product", () => {
    expect(allProducts.length).toBeGreaterThan(0);
  });

  it("every product has a valid ProductLine", () => {
    allProducts.forEach((p) => {
      expect(VALID_LINES).toContain(p.line);
    });
  });

  it("every product SKU matches the schema pattern", () => {
    allProducts.forEach((p) => {
      expect(p.sku).toMatch(SKU_PATTERN);
    });
  });

  it("SKUs are unique across the catalog", () => {
    const skus = allProducts.map((p) => p.sku);
    const unique = new Set(skus);
    expect(unique.size).toBe(skus.length);
  });

  it("every product has a positive priceMin and priceMax", () => {
    allProducts.forEach((p) => {
      expect(p.priceMin).toBeGreaterThan(0);
      expect(p.priceMax).toBeGreaterThanOrEqual(p.priceMin);
    });
  });

  it("every product has a positive bomTotal", () => {
    allProducts.forEach((p) => {
      expect(p.bomTotal).toBeGreaterThan(0);
    });
  });

  it("every product line in the catalog is a known ProductLine value", () => {
    allProducts.forEach((p) => {
      expect(VALID_LINES).toContain(p.line);
    });
  });
});
