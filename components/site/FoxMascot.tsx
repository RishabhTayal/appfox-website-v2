'use client'

import { Mascot } from 'page-mascot'

/**
 * Koboyo page-mascot fox character.
 * Perched at the top of the page content, follows cursor, poke to blink.
 * Centered on mobile/tablet, left-aligned on desktop to match copy column.
 * Respects reduced motion and no fine pointer automatically.
 */
export function FoxMascot() {
  return (
    <div className="mb-6 flex justify-center lg:justify-start">
      <div className="pointer-events-auto">
        <Mascot
          directions="/mascots/fox-directions.webp"
          reactions="/mascots/fox-reactions.webp"
          label="Appfox mascot"
          size={110}
        />
      </div>
    </div>
  )
}
