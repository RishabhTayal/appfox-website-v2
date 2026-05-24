"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Can customers edit their orders after payment?",
    answer:
      "Yes — that's exactly what AppFox is built for. Once installed, customers can visit their order status page and make changes (address, quantities, variants, or add items) without needing to contact your support team. You control which types of edits are allowed and set a cutoff window (e.g. within 24 hours of purchase).",
  },
  {
    question: "How does the post-purchase upsell feature work?",
    answer:
      "After a customer completes checkout, AppFox shows a targeted offer for a complementary product. The offer appears on the order confirmation page or via email. If the customer accepts, the item is added to their existing order — no new checkout needed. You can create upsell rules based on products purchased, cart value, or customer tags.",
  },
  {
    question: "Will this work with all Shopify plans?",
    answer:
      "AppFox works with all Shopify plans, including Basic, Shopify, Advanced, and Plus. Some advanced features (like API access and custom branding) are better suited to Shopify Plus merchants, but the core order editing and upsell features are available to every store.",
  },
  {
    question: "What happens to my inventory when an order is edited?",
    answer:
      "Inventory is updated in real time. When a customer removes an item, that stock is released back. When they add a new item or swap a variant, inventory is decremented immediately. AppFox respects your existing inventory policies, so overselling is never an issue.",
  },
  {
    question: "Is there a free plan, and what's included?",
    answer:
      "Yes! The free plan includes up to 50 order edits per month, address and quantity editing, and 2 active upsell offers. It's a great way to try AppFox at no risk. When you're ready to scale, you can upgrade to Growth or Pro at any time — no disruption to your store.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most merchants are fully set up in under 5 minutes. Install the app, choose which edit types to allow, configure your upsell offers, and you're live. There's no coding required, and AppFox integrates natively with your Shopify theme.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-gray-900">{question}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${open ? "bg-purple-100" : "bg-gray-100"}`}>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180 text-purple-600" : "text-gray-500"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-gray-500 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-purple-600 uppercase tracking-widest">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Everything you need to know before you install.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Still have questions?{" "}
            <a href="mailto:support@appfox.io" className="text-purple-600 font-semibold hover:underline">
              Chat with our team →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
