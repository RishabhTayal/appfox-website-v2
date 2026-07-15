"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

/**
 * Crisp live chat. Same website ID as the two Shopify apps, so visitor
 * chats land in the same inbox as in-app conversations.
 *
 * Configured after hydration (not via next/script) to keep the widget's
 * ~100kb off the critical path - it has no bearing on LCP.
 */
const CRISP_WEBSITE_ID = "a0912d38-696d-4fb3-9a53-92e0ac6ad02c";

export function CrispChat() {
  useEffect(() => {
    Crisp.configure(CRISP_WEBSITE_ID);
  }, []);

  return null;
}
