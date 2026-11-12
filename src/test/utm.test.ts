import { describe, expect, it } from "vitest";
import { appendUtms, mergeUtms } from "@/lib/utm";

describe("UTM forwarding", () => {
  it("passes all UTMs including utm_content to Cakto", () => {
    const utms = mergeUtms({}, "?utm_source=FB&utm_medium=cpc&utm_campaign=c1&utm_term=t&utm_content=ad123");
    const url = new URL(appendUtms("https://pay.cakto.com.br/o3a8rkf_1293052", utms));
    expect(url.searchParams.get("utm_content")).toBe("ad123");
    expect(url.searchParams.get("utm_source")).toBe("FB");
    expect(url.searchParams.get("utm_term")).toBe("t");
  });
  it("never overwrites stored UTMs with empty values", () => {
    expect(mergeUtms({ utm_content: "ad123" }, "?utm_content=").utm_content).toBe("ad123");
  });
});
