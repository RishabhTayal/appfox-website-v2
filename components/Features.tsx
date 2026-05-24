import AnimateOnScroll from "./AnimateOnScroll";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h6m0 0l-3-3m3 3l-3 3M5 7h6a4 4 0 014 4v2" />
      </svg>
    ),
    title: "Self-Service Edit Portal",
    description:
      "A tokenized, mobile-first order portal customers reach in one click from their order email — no account login required. Branded to your store.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h7" />
      </svg>
    ),
    title: "Every Edit Type Supported",
    description:
      "Change shipping address, swap variants, update quantities, add new items, remove items, or cancel — all from a single unified portal.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Smart Eligibility Engine",
    description:
      "Define edit windows, fulfillment cutoffs, and per-action rules. The eligibility engine blocks ineligible edits consistently across customer and merchant flows.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Approval Queue or Auto-Apply",
    description:
      "Review and approve sensitive changes from a clean queue, or let safe edits apply instantly. Per-edit-type configuration gives you total control.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Post-Purchase Upsells",
    description:
      "Turn the edit moment into revenue. Show targeted upsells in the portal and let customers one-click add products to their open order — no second checkout.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Automatic Payments & Refunds",
    description:
      "Price deltas from edits are handled automatically — collect the difference via Shopify's payment request API or issue partial refunds. No manual reconciliation.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Address Validation & Autocomplete",
    description:
      "Stop failed deliveries before they happen. Autocomplete suggestions and validation flag undeliverable or incomplete addresses during the correction flow.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Analytics & Audit Trail",
    description:
      "Track edit volume, approval rates, upsell revenue, and time-to-approve. Every action is logged in a per-order audit timeline for support and compliance.",
  },
];

const integrations = [
  {
    name: "Shopify Flow",
    desc: "Custom triggers and actions for end-to-end automation",
  },
  {
    name: "Gorgias",
    desc: "Edit orders directly from the support ticket sidebar",
  },
  {
    name: "Slack",
    desc: "Real-time alerts on new requests and SLA breaches",
  },
  {
    name: "Email",
    desc: "Branded transactional emails at every status change",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-purple-600 uppercase tracking-widest">Features</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              run post-purchase
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            A complete, production-grade order editing platform — not a half-built MVP. Everything below is shipped and battle-tested.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <AnimateOnScroll key={feature.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}>
              <div className="h-full bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center text-purple-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Integrations strip */}
        <AnimateOnScroll className="mt-16">
          <div className="rounded-2xl bg-white border border-gray-100 p-8 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <span className="text-sm font-semibold text-purple-600 uppercase tracking-widest">Integrations</span>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">Plugs into your stack</h3>
                <p className="mt-1 text-gray-500">Native connections to the tools your team already uses.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {integrations.map((i) => (
                <div key={i.name} className="rounded-xl border border-gray-100 p-5 hover:border-purple-200 transition-colors">
                  <p className="font-bold text-gray-900">{i.name}</p>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">{i.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* CTA strip */}
        <AnimateOnScroll className="mt-12">
          <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-violet-600 p-8 sm:p-12 text-center text-white">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to see it in action?</h3>
            <p className="mt-3 text-purple-100 text-lg">
              Install AppFox for free and set it up in under 5 minutes.
            </p>
            <a
              href="#install"
              className="mt-6 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-purple-700 font-semibold hover:bg-purple-50 transition-colors shadow-lg"
            >
              Get started — it&apos;s free
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
