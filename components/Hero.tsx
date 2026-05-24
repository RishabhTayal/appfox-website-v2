import Link from "next/link";

const INSTALL_URL = "#install";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="blob-float absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-100 blur-3xl opacity-60" />
        <div className="blob-float-alt absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-100 blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            Now available on the Shopify App Store
          </div>

          {/* Headline */}
          <h1 className="hero-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight max-w-4xl">
            Let Customers Edit Orders.{" "}
            <span className="gradient-animate bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600 bg-clip-text text-transparent">
              You Keep More Revenue.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="hero-subheadline mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl leading-relaxed">
            AppFox lets shoppers fix mistakes after checkout — and serves smart upsells at the
            perfect moment. Fewer support tickets. Higher AOV. Happier customers.
          </p>

          {/* CTAs */}
          <div className="hero-ctas mt-10 flex flex-col sm:flex-row items-center gap-4">
            <a
              href={INSTALL_URL}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold text-base hover:opacity-90 transition-opacity shadow-lg shadow-purple-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 2.1L14 .6C13.4 0 12.5 0 11.9.6L1.6 10.9c-.6.6-.6 1.5 0 2.1l1.5 1.5c.6.6 1.5.6 2.1 0L8 11.7V21c0 .8.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5v-9.3l2.8 2.8c.6.6 1.5.6 2.1 0l1.5-1.5c.6-.6.6-1.5.1-2.1z"/>
              </svg>
              Install for Free
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-semibold text-base hover:border-purple-300 hover:text-purple-700 transition-colors"
            >
              See how it works
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Social proof */}
          <div className="hero-social-proof mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Free plan available
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              5-minute setup
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              No coding required
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span>4.9 / 5 on Shopify</span>
            </div>
          </div>

          {/* Product mockup */}
          <div className="hero-mockup mt-16 w-full max-w-4xl">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-purple-100/50 bg-white">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4 bg-white rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-400 text-center">
                  mystore.myshopify.com/apps/order-edit
                </div>
              </div>

              {/* Fake app UI */}
              <div className="p-6 sm:p-10 bg-gradient-to-br from-purple-50 via-white to-violet-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Order card */}
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Order #1042</span>
                      <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-medium">Active</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "Classic T-Shirt (M)", qty: 2, price: "$49.98" },
                        { name: "Running Shorts (L)", qty: 1, price: "$34.99" },
                      ].map((item) => (
                        <div key={item.name} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-100 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                            <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{item.price}</span>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 w-full py-2 rounded-lg border-2 border-purple-200 text-purple-700 text-sm font-semibold hover:bg-purple-50 transition-colors">
                      Edit Order
                    </button>
                  </div>

                  {/* Upsell card */}
                  <div className="bg-white rounded-xl border border-purple-200 p-5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-100 to-transparent rounded-bl-full" />
                    <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">✦ Special Offer</span>
                    <p className="mt-2 text-sm font-bold text-gray-900">Complete your look</p>
                    <p className="mt-1 text-xs text-gray-500">Customers who bought this also love...</p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-200 to-violet-200 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Sport Cap</p>
                        <p className="text-xs text-gray-400 line-through">$24.99</p>
                        <p className="text-sm font-bold text-purple-600">$18.99</p>
                      </div>
                    </div>
                    <button className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 text-white text-sm font-semibold">
                      Add to Order →
                    </button>
                  </div>
                </div>

                {/* Stats row */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {[
                    { label: "Edits this month", value: "238" },
                    { label: "Upsell revenue", value: "$4,820" },
                    { label: "Tickets saved", value: "91%" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm">
                      <p className="text-xl font-extrabold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">{stat.value}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
