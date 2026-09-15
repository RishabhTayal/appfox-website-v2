'use client'

import { Mascot } from 'page-mascot'

/**
 * Koboyo page-mascot fox character.
 * Fixed position in top-right corner, follows cursor, poke to blink.
 * Renders only on homepage; respects reduced motion and no fine pointer automatically.
 */
export function FoxMascot() {
  return (
    <div className="fixed top-20 right-8 z-20 pointer-events-auto hidden lg:block">
      <Mascot
        directions="/mascots/fox-directions.webp"
        reactions="/mascots/fox-reactions.webp"
        label="Appfox mascot"
        size={120}
      />
    </div>
  )
}
