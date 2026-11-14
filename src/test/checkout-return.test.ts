import { describe, it, expect } from "vitest";
import { consumeCheckoutReturn, declineReturnOffer, markCheckoutDeparture } from "@/lib/checkout-return";
import { appendUtms } from "@/lib/utm";
import { CHECKOUT } from "@/lib/offers";

describe("Checkout return offers", () => {
  it("does not show an offer to someone who never entered checkout", () => {
    sessionStorage.clear();
    expect(consumeCheckoutReturn(sessionStorage)).toBe(false);
  });
  it("shows an offer once after a checkout departure", () => {
    sessionStorage.clear();
    markCheckoutDeparture(sessionStorage);
    expect(consumeCheckoutReturn(sessionStorage)).toBe(true);
    expect(consumeCheckoutReturn(sessionStorage)).toBe(false);
  });
  it("moves refusal of the R$15.90 offer to the R$10.00 offer", () => {
    expect(declineReturnOffer("return")).toBe("final");
  });
  it("dismisses the final offer when refused", () => {
    expect(declineReturnOffer("final")).toBe(null);
  });
  it.each([CHECKOUT.returnPremium, CHECKOUT.basic])("preserves all five UTMs for %s", (url) => {
    const utms = { utm_source: "FB", utm_medium: "cpc", utm_campaign: "camp1", utm_term: "t1", utm_content: "AD123" };
    const result = new URL(appendUtms(url, utms));
    for (const [key, value] of Object.entries(utms)) expect(result.searchParams.get(key)).toBe(value);
  });
});