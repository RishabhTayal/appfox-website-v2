import Link from "next/link";
import { apps } from "@/data/apps";
import { site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

const AI_SUMMARY_PROMPT = encodeURIComponent(
  `Please summarize ${site.name} for me based on this page: ${site.url}/llms.txt`,
);

/**
 * "Get an AI summary" buttons - each opens an assistant with a pre-filled
 * prompt pointing at /llms.txt. Gemini has no prompt query param, so it
 * links to the app directly.
 */
const AI_ASSISTANTS: { name: string; href: string; iconPath: string }[] = [
  {
    name: "ChatGPT",
    href: `https://chatgpt.com/?hints=search&q=${AI_SUMMARY_PROMPT}`,
    iconPath:
      "M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.998-2.9 6.056 6.056 0 0 0-.748-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.142-.08 4.778-2.758a.795.795 0 0 0 .393-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.495 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855L13.104 8.36 15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.792a4.494 4.494 0 0 1-.676 8.104v-5.677a.79.79 0 0 0-.407-.667zm2.01-3.023l-.142-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.062l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zM8.307 12.863L6.287 11.7a.08.08 0 0 1-.038-.057V6.074a4.5 4.5 0 0 1 7.376-3.454l-.142.081L8.704 5.46a.795.795 0 0 0-.393.681zm1.098-2.365l2.602-1.5 2.607 1.5v3l-2.598 1.5-2.607-1.5z",
  },
  {
    name: "Claude",
    href: `https://claude.ai/new?q=${AI_SUMMARY_PROMPT}`,
    iconPath:
      "M4.709 15.955l4.72-2.647.079-.23-.079-.128h-.23l-.79-.048-2.695-.073-2.337-.097-2.265-.122-.571-.121L0 11.784l.055-.352.479-.321.686.06 1.517.103 2.276.158 1.651.097 2.449.255h.389l.055-.158-.134-.097-.103-.097-2.349-1.595-2.543-1.681-1.329-.964-.722-.49-.365-.461-.158-1.011.654-.722.881.06.225.061.892.686 1.905 1.474 2.491 1.832.365.304.146-.103.018-.073-.164-.273-1.359-2.456-1.451-2.498-.644-1.04-.158-.62a2.967 2.967 0 01-.103-.74l.741-1.011.413-.134.992.134.413.358.61 1.395.985 2.193 1.523 2.973.446.881.237.815.087.255h.146v-.146l.121-1.612.219-1.979.213-2.549.073-.717.346-.84.69-.452.534.255.443.625-.06.401-.255 1.668-.504 2.62-.328 1.749h.188l.225-.225.91-1.207 1.523-1.905.674-.758.785-.834.504-.401h.952l.7 1.044-.31 1.075-.985 1.243-.81 1.049-1.158 1.559-.722 1.243.067.103.176-.018 2.679-.574 1.456-.255 1.736-.298.785.365.085.376-.31.767-1.864.461-2.18.437-3.262.771-.04.03.046.06 1.474.139.628.034h1.541l2.873.213.749.498.452.601-.073.456-1.158.595-1.55-.365-3.62-.864-1.243-.31h-.176v.103l1.025 1.008 1.881 1.7 2.349 2.187.122.547-.31.437-.328-.048-2.13-1.61-.822-.723-1.864-1.572h-.122v.158l.43.625 2.265 3.402.122 1.044-.158.346-.595.213-.65-.115-1.335-1.882-1.382-2.106-1.116-1.9-.134.085-.66 7.097-.31.358-.71.273-.595-.443-.31-.71.31-1.43.376-1.875.31-1.488.273-1.851.158-.61-.013-.043-.134.018-1.376 1.888-2.094 2.83-1.657 1.778-.395.158-.683-.358.06-.625.395-.583 2.36-3.001 1.426-1.864.917-1.073-.012-.158h-.06l-6.39 4.146-1.134.158-.486-.456.06-.747.231-.243 1.918-1.316z",
  },
  {
    name: "Perplexity",
    href: `https://www.perplexity.ai/?q=${AI_SUMMARY_PROMPT}`,
    iconPath:
      "M22.3977 7.0896h-2.3106V.7522l-7.4881 6.3374H2.6699v8.7445h2.8525v5.1303l4.7113-4.2581v4.2581l5.3306-4.7853v3.0805h6.5544V14.0937h2.3106V7.0896zm-3.4189-2.4979v2.4979h-2.9362l2.9362-2.4979zm-9.9305 14.9039v-3.4234l-2.8525 2.5847v-3.5588l5.8077-5.2278v6.0428l-2.9552 3.5825zm6.3766-3.9908-1.3354 1.1986v-5.5631H7.9587v-1.5232h13.6038v5.8877h-2.5376z",
  },
  {
    name: "Grok",
    href: `https://grok.com/?q=${AI_SUMMARY_PROMPT}`,
    iconPath:
      "M9.27 15.29 11.93 18l1.34-1.35-.04-.04L9.27 12 13.23 8 9.27 4l-1.33 1.34L11.95 8l-3.99 4 1.31 3.29zM14.78 20l5.22-8L14.78 4l-1.33 1.34 4.45 6.66-4.45 6.66L14.78 20z",
  },
  {
    name: "Gemini",
    href: "https://gemini.google.com/app",
    iconPath:
      "M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.305 14.305 0 0 0 12 12 14.305 14.305 0 0 0-12 12",
  },
];

export function Footer() {
  return (
    <footer className="bg-paper text-ink-500">
      <div className="mx-auto max-w-7xl px-6 pb-8 sm:px-8">
        <div className="grid gap-10 border-t border-paper-edge pt-12 lg:grid-cols-2">
          <div>
            <Link href="/" aria-label="AppFox home">
              <Wordmark />
            </Link>
            <p className="mt-4 max-w-sm text-sm">
              Thoughtful Shopify apps.
              <br />
              For every step of the order.
            </p>
            <a
              href={`mailto:${site.supportEmail}`}
              className="mt-6 inline-block text-sm hover:text-ink-900"
            >
              {site.supportEmail} ↗
            </a>
          </div>
          <div className="flex flex-col gap-6 lg:items-end">
            <nav
              aria-label="Footer apps"
              className="flex flex-wrap gap-x-6 gap-y-4 text-sm text-ink-900"
            >
              {apps.map((app) => (
                <Link
                  className="hover:text-ink-500"
                  key={app.slug}
                  href={app.href}
                >
                  {app.shortName}
                </Link>
              ))}
            </nav>
            <nav
              aria-label="Footer resources"
              className="flex flex-wrap gap-x-6 gap-y-4 text-sm"
            >
              {[
                { label: "All apps", href: "/apps" },
                { label: "Features", href: "/features" },
                { label: "Pricing", href: "/pricing" },
                { label: "Journal", href: "/blog" },
                { label: "Compare", href: "/vs" },
                { label: "Integrations", href: "/subscription/integrations" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-ink-900"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <details className="text-sm lg:text-right">
              <summary className="hover:text-ink-900">
                Get an AI summary of AppFox
              </summary>
              <div className="mt-4 flex flex-wrap gap-4">
                {AI_ASSISTANTS.map((assistant) => (
                  <a
                    key={assistant.name}
                    href={assistant.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink-900"
                  >
                    {assistant.name} ↗
                  </a>
                ))}
              </div>
            </details>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-paper-edge pt-6 text-xs">
          <p>
            © {new Date().getFullYear()} AppFox. Made for Shopify merchants.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-ink-900">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-ink-900">
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
