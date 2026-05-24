import AnimateOnScroll from "./AnimateOnScroll";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for new stores just getting started.",
    cta: "Install Free",
    ctaStyle: "border",
    popular: false,
    features: [
      "Up to 50 order edits/month",
      "Address & quantity editing",
      "Basic upsell offers (2 active)",
      "Branded customer portal",
      "Email support",
    ],
    missing: ["Analytics dashboard", "API access", "Priority support"],
  },
  {
    name: "Growth",
    price: "$19",
    period: "/month",
    description: "For growing brands ready to maximise post-purchase revenue.",
    cta: "Start Free Trial",
    ctaStyle: "gradient",
    popular: true,
    features: [
      "Unlimited order edits",
      "All editing options (items, variants, address)",
      "Unlimited upsell offers",
      "AI-powered upsell recommendations",
      "Analytics dashboard",
      "Priority email & chat support",
    ],
    missing: ["API access", "Dedicated account manager"],
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For high-volume merchants who need full control.",
    cta: "Start Free Trial",
    ctaStyle: "border",
    popular: false,
    features: [
      "Everything in Growth",
      "Custom branding & white-label",
      "Full API access",
      "Advanced analytics & exports",
      "Dedicated account manager",
      "SLA-backed support",
    ],
    missing: [],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-purple-600 uppercase tracking-widest">Pricing</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Start free. Upgrade when you&apos;re ready. No surprise fees.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <AnimateOnScroll key={plan.name} delay={(i + 1) as 1 | 2 | 3}>
            <div
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? "border-purple-300 shadow-xl shadow-purple-100 ring-2 ring-purple-500"
                  : "border-gray-200 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xs font-bold shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 mb-1">{plan.period}</span>
                </div>
                <p className="mt-3 text-sm text-gray-500">{plan.description}</p>
              </div>

              <a
                href="#install"
                className={`block w-full text-center py-3 rounded-full text-sm font-semibold transition-all mb-8 ${
                  plan.ctaStyle === "gradient"
                    ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:opacity-90 shadow-md shadow-purple-200"
                    : "border-2 border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-700"
                }`}
              >
                {plan.cta}
              </a>

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {f}
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-400">
                    <svg className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            </AnimateOnScroll>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-400">
          All paid plans include a 14-day free trial. No credit card required to start.
        </p>
      </div>
    </section>
  );
}
