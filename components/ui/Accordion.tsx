"use client";

import { Fragment, useId, useState } from "react";

/**
 * Accessible accordion item with smooth height animation
 * (grid-template-rows 0fr→1fr via the .accordion-panel rules in
 * globals.css — no JS measurement, no inline styles).
 *
 * The collapsed state only exists under `html.js`: without JavaScript the
 * panel renders expanded, so content is never unreachable for no-JS users
 * or crawlers. Visual styling is passed in via classNames; mechanics live
 * here and in globals.css.
 */
export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  className = "",
  buttonClassName = "",
  panelClassName = "",
  icon,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  buttonClassName?: string;
  panelClassName?: string;
  /** rendered after the title; receives open state via data-open attribute */
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className={className} data-open={open || undefined}>
      <button
        type="button"
        className={buttonClassName}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        {/* keyed fragments: prop-passed elements land in a child array the
            jsx runtime can't mark static, which otherwise warns for keys */}
        <Fragment key="title">{title}</Fragment>
        <Fragment key="icon">{icon}</Fragment>
      </button>
      <div id={panelId} role="region" className="accordion-panel">
        <div>
          <div className={`accordion-content ${panelClassName}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
