export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* CTA band */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold text-white">
              Start editing orders today.{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                It&apos;s free.
              </span>
            </h3>
            <p className="mt-1 text-gray-400">No credit card required. Setup in 5 minutes.</p>
          </div>
          <a
            href="#install"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity whitespace-nowrap shadow-lg"
          >
            Install on Shopify →
          </a>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="font-bold text-white">AppFox</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              The post-purchase app built for Shopify merchants who want happier customers and higher revenue.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="/#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/#install" className="hover:text-white transition-colors">Install</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">Compare</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/vs" className="hover:text-white transition-colors">All comparisons</a></li>
              <li><a href="/vs/cleverific" className="hover:text-white transition-colors">vs Cleverific</a></li>
              <li><a href="/vs/aftersell" className="hover:text-white transition-colors">vs AfterSell</a></li>
              <li><a href="/vs/edit-order" className="hover:text-white transition-colors">vs Edit Order</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} AppFox. All rights reserved.</p>
          <p>Built for Shopify merchants worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
