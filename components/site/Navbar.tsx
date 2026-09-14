"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { competitorsForApp } from "@/data/competitors";
import { apps } from "@/data/apps";
import { Wordmark } from "./Wordmark";
import styles from "./navbar.module.css";

const RESOURCE_LINKS = [
  { label: "Guides & articles", href: "/blog" },
  { label: "Compare apps", href: "/vs" },
  { label: "How it works", href: "/order-editing#how-it-works" },
  { label: "Common questions", href: "/#faq" },
  { label: "Integrations", href: "/subscription/integrations" },
];

function appForPath(pathname: string) {
  return apps.find(
    (app) =>
      pathname === app.href ||
      pathname.startsWith(`${app.href}/`) ||
      pathname === `/features/${app.slug}` ||
      pathname === `/pricing/${app.slug}` ||
      competitorsForApp(app.slug).some(
        (competitor) => pathname === `/vs/${competitor.slug}`,
      ),
  );
}

function Navigation({ pathname }: { pathname: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const selectedApp = appForPath(pathname);
  const installUrl = selectedApp?.installUrl;
  const current = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setDropdown(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const trigger = header.current?.querySelector<HTMLButtonElement>(
          'button[aria-expanded="true"]',
        );
        setDropdown(null);
        setMobileOpen(false);
        trigger?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    const background = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer, .skip-link"),
    );
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => {
      element.inert = true;
    });
    document.body.style.overflow = "hidden";
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const elements = Array.from(
        header.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ) ?? [],
      ).filter((element) => element.getClientRects().length > 0);
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    desktop.addEventListener("change", onResize);
    document.addEventListener("keydown", trapFocus);
    const trigger = toggle.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      document.removeEventListener("keydown", trapFocus);
      desktop.removeEventListener("change", onResize);
      trigger?.focus();
    };
  }, [mobileOpen]);

  const groups: {
    label: string;
    href: string;
    active: boolean;
    links: { label: string; href: string; detail?: string }[];
  }[] = [
    {
      label: "Apps",
      href: "/apps",
      active: Boolean(selectedApp) || current("/apps"),
      links: apps.map((app) => ({
        label: app.shortName,
        href: app.href,
        detail: app.pricingLine,
      })),
    },
    {
      label: "Resources",
      href: "/blog",
      active: current("/blog") || current("/vs"),
      links: RESOURCE_LINKS,
    },
  ];

  return (
    <header
      ref={header}
      className={styles.header}
      role={mobileOpen ? "dialog" : undefined}
      aria-modal={mobileOpen || undefined}
      aria-label={mobileOpen ? "Site navigation" : undefined}
    >
      <div className={styles.island}>
        <Link
          href="/"
          aria-label="AppFox home"
          onClick={() => setMobileOpen(false)}
        >
          <Wordmark />
        </Link>
        <nav className={styles.desktop} aria-label="Main">
          {groups.slice(0, 1).map((group) => (
            <div className={styles.dropdown} key={group.label}>
              <button
                type="button"
                className={styles.navLink}
                aria-expanded={dropdown === group.label}
                aria-controls={`nav-${group.label}`}
                data-active={group.active || undefined}
                onClick={() =>
                  setDropdown(dropdown === group.label ? null : group.label)
                }
              >
                {group.label}
                <span className={styles.chevron} aria-hidden="true" />
              </button>
              {dropdown === group.label && (
                <div className={styles.panel} id={`nav-${group.label}`}>
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={current(link.href) ? "page" : undefined}
                    >
                      <span>{link.label}</span>
                      {link.detail && <small>{link.detail}</small>}
                    </Link>
                  ))}
                  <Link href={group.href}>
                    Explore all apps <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              )}
            </div>
          ))}
          <Link
            className={styles.navLink}
            href="/features"
            aria-current={current("/features") ? "page" : undefined}
          >
            Features
          </Link>
          <Link
            className={styles.navLink}
            href="/pricing"
            aria-current={current("/pricing") ? "page" : undefined}
          >
            Pricing
          </Link>
          {groups.slice(1).map((group) => (
            <div className={styles.dropdown} key={group.label}>
              <button
                type="button"
                className={styles.navLink}
                aria-expanded={dropdown === group.label}
                aria-controls={`nav-${group.label}`}
                data-active={group.active || undefined}
                onClick={() =>
                  setDropdown(dropdown === group.label ? null : group.label)
                }
              >
                {group.label}
                <span className={styles.chevron} aria-hidden="true" />
              </button>
              {dropdown === group.label && (
                <div className={styles.panel} id={`nav-${group.label}`}>
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={current(link.href) ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className={styles.desktop}>
          <a href={`mailto:${site.supportEmail}`} className={styles.navLink}>
            Support
          </a>
          {installUrl ? (
            <a href={installUrl} className="btn-primary text-sm">
              Install free <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <Link href="/apps" className="btn-primary text-sm">
              Explore apps <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>
        <button
          ref={toggle}
          type="button"
          className={styles.toggle}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => {
            setDropdown(null);
            setMobileOpen(!mobileOpen);
          }}
        >
          <span />
          <span />
        </button>
      </div>
      {mobileOpen && (
        <div className={styles.mobile} id="mobile-navigation">
          <nav aria-label="Mobile">
            {[
              { label: "All apps", href: "/apps" },
              ...apps.map((app) => ({ label: app.shortName, href: app.href })),
              { label: "Features", href: "/features" },
              { label: "Pricing", href: "/pricing" },
              ...RESOURCE_LINKS,
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current(link.href) ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
          <a
            className="btn-primary mt-8"
            href={installUrl ?? "/apps"}
            onClick={() => setMobileOpen(false)}
          >
            {installUrl ? "Install free on Shopify" : "Find your app"}
          </a>
          <a className="mt-6 text-sm" href={`mailto:${site.supportEmail}`}>
            {site.supportEmail}
          </a>
        </div>
      )}
    </header>
  );
}

export function Navbar() {
  const pathname = usePathname() ?? "/";
  return <Navigation key={pathname} pathname={pathname} />;
}
