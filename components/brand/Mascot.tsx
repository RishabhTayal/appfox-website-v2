"use client";

import Image from "next/image";

/**
 * AppFox brand mascot with gentle idle animation.
 * Float animation: 4s ease-in-out, respects prefers-reduced-motion.
 */
export function Mascot() {
  return (
    <div className="mascot-container relative">
      <style jsx>{`
        @keyframes mascot-float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .mascot-image {
          animation: mascot-float 4.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .mascot-image {
            animation: none;
          }
        }
      `}</style>

      <div className="relative">
        <Image
          src="/images/brand/appfox-mascot.png"
          alt="AppFox mascot"
          width={604}
          height={662}
          className="mascot-image w-44 h-auto sm:w-52 lg:w-60 object-contain"
          style={{
            filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12))",
          }}
          priority
        />
      </div>
    </div>
  );
}
