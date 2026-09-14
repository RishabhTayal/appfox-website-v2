"use client";

import { useState } from "react";
import styles from "./brand.module.css";

const SIZES = ["S", "M", "L"] as const;
type Size = (typeof SIZES)[number];
const ROBE_PRICE = 48;
const GIFT_WRAP_PRICE = 4;
const SUBSCRIBE_DISCOUNT = 0.1;
const money = (amount: number) => `$${amount.toFixed(2)}`;

export function HeroOrderDemo() {
  const [size, setSize] = useState<Size>("M");
  const [giftWrap, setGiftWrap] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const edited = size !== "M" || giftWrap || monthly;
  const subtotal = ROBE_PRICE + (giftWrap ? GIFT_WRAP_PRICE : 0);
  const total = monthly ? subtotal * (1 - SUBSCRIBE_DISCOUNT) : subtotal;

  return (
    <div className={styles.demo}>
      <div className={styles.demoTop}>
        <span className="text-sm font-medium text-ink-900">
          Your order, your way.
        </span>
        <span className={styles.demoBadge}>Interactive demo</span>
      </div>
      <div className={styles.demoBody}>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-ink-500">Order #1042</span>
          <span className="text-xs text-ink-500">
            {edited ? "Changes saved" : "Ready to edit"}
          </span>
        </div>
        <div className={styles.lineItem}>
          <div className={styles.productArt} aria-hidden="true">
            <svg viewBox="0 0 80 96" fill="none">
              <path
                d="m26 8-15 8-8 32 13 4 7-20-5 52h44l-5-52 7 20 13-4-8-32-15-8-14 13L26 8Z"
                fill="#9B9B9B"
              />
              <path
                d="m26 8 14 13-9 23 9 40m14-76L40 21l9 23-9 40M22 51h36"
                stroke="#313131"
                strokeWidth="2"
              />
              <path d="M28 8h24L40 21 28 8Z" fill="#313131" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-medium text-ink-900">
              Waffle knit robe
            </p>
            <p className="mt-1 text-xs text-ink-500">Natural / Size {size}</p>
            <div className={styles.sizes} role="group" aria-label="Change size">
              {SIZES.map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={size === value}
                  onClick={() => setSize(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-ink-900 tabular-nums">
            {money(ROBE_PRICE)}
          </p>
        </div>
        <div className={styles.demoOffer}>
          <span>
            <span className="block text-sm font-medium text-ink-900">
              A little extra, for someone special.
            </span>
            <span className="mt-1 block text-xs text-ink-500">
              Gift wrap + a personal note · {money(GIFT_WRAP_PRICE)}
            </span>
          </span>
          <button
            type="button"
            className={styles.addButton}
            aria-label={giftWrap ? "Remove gift wrap" : "Add gift wrap"}
            aria-pressed={giftWrap}
            onClick={() => setGiftWrap(!giftWrap)}
          >
            {giftWrap ? "Added ✓" : "Add +"}
          </button>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={monthly}
          onClick={() => setMonthly(!monthly)}
          className={styles.subscribeSwitch}
        >
          <span>
            <span className="block text-sm font-medium text-ink-900">
              Make it monthly
            </span>
            <span className="mt-1 block text-xs text-ink-500">
              Subscribe and save 10%
            </span>
          </span>
          <span className={styles.switchTrack} aria-hidden="true">
            <span />
          </span>
        </button>
        <div className={styles.demoTotal}>
          <span className="text-sm text-ink-500">Order total</span>
          <span className="text-2xl font-medium text-ink-900 tabular-nums">
            {money(total)}
            {monthly && <span className="text-sm text-ink-500"> / mo</span>}
          </span>
        </div>
        <p
          className={styles.demoStatus}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {edited
            ? `Changes saved. Size ${size}, ${giftWrap ? "gift wrap added" : "no gift wrap"}, ${monthly ? "monthly delivery" : "one time purchase"}. Total ${money(total)}. No support ticket needed.`
            : "Try a size swap. Add a little extra. See what changes."}
        </p>
      </div>
    </div>
  );
}
