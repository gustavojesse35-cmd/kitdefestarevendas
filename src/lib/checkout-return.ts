const RETURN_KEY = "kf_checkout_pending_return";

/** Only actual checkout departures qualify, not scrolling to an offer. */
export function markCheckoutDeparture(storage: Pick<Storage, "setItem">): void {
  try {
    storage.setItem(RETURN_KEY, "1");
  } catch {
    // A blocked session store must never prevent checkout navigation.
  }
}

/** Consume once; works on a fresh mount and on a browser back-cache restore. */
export function consumeCheckoutReturn(storage: Pick<Storage, "getItem" | "removeItem">): boolean {
  try {
    if (storage.getItem(RETURN_KEY) !== "1") return false;
    storage.removeItem(RETURN_KEY);
    return true;
  } catch {
    return false;
  }
}

export type ReturnOffer = "return" | "final" | null;

export function declineReturnOffer(offer: ReturnOffer): ReturnOffer {
  return offer === "return" ? "final" : null;
}