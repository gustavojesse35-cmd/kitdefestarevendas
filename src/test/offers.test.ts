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
  it("offers returning shoppers Premium for R$15.90 at the supplied checkout", () => {
    expect(PRODUCT.returnPrice).toBe(15.9);
    expect(CHECKOUT.returnPremium).toBe("https://pay.cakto.com.br/34ctqu5");
  });
  it("uses the existing R$10.00 checkout for the final Premium offer", () => {
    expect(PRODUCT.finalPrice).toBe(10);
    expect(CHECKOUT.basic).toBe("https://pay.cakto.com.br/369xz4r");
  });
});