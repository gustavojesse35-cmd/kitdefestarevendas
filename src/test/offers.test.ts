import { describe, expect, it } from "vitest";
import { CHECKOUT, PRODUCT } from "@/lib/offers";

describe("Product offer rules", () => {
  it("includes 15000 molds", () => {
    expect(PRODUCT.moldCount).toBe(15000);
  });

  it("keeps the R$27.90 Premium offer on its original checkout", () => {
    expect(PRODUCT.premiumPrice).toBe(27.9);
    expect(CHECKOUT.premium).toBe("https://pay.cakto.com.br/o3a8rkf_1293052");
  });
});