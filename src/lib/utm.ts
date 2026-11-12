export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const STORAGE_KEY = "kf_utms";

type Utms = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/** Merge UTMs: non-empty incoming values win, empty values never overwrite stored ones. */
export function mergeUtms(stored: Utms, search: string): Utms {
  const params = new URLSearchParams(search);
  const out: Utms = { ...stored };
  for (const k of UTM_KEYS) {
    const v = params.get(k)?.trim();
    if (v) out[k] = v;
  }
  return out;
}

/** Append UTMs to a checkout URL without overriding non-empty params already on it. */
export function appendUtms(url: string, utms: Utms): string {
  const u = new URL(url);
  for (const k of UTM_KEYS) {
    const v = utms[k];
    if (v && !u.searchParams.get(k)) u.searchParams.set(k, v);
  }
  return u.toString();
}

function readStored(): Utms {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}") as Utms;
  } catch {
    return {};
  }
}

/** Call on page load (browser only). */
export function captureUtms(): Utms {
  if (typeof window === "undefined") return {};
  const utms = mergeUtms(readStored(), window.location.search);
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utms));
  } catch {
    /* storage blocked */
  }
  return utms;
}

export function checkoutUrl(url: string): string {
  if (typeof window === "undefined") return url;
  return appendUtms(url, captureUtms());
}
