export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex-col flex items-center">
        <div className="relative w-full max-w-lg mx-auto">
          {/* Background paper */}
          <div className="absolute top-2 left-2 w-full h-full bg-gray-100 rounded-lg transform rotate-1">
            {/* Texture overlay for background paper */}
            <div className="absolute inset-0 opacity-50 mix-blend-overlay">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <filter id="paper-texture">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.012"
                    numOctaves="5"
                    seed="2"
                  />
                  <feDisplacementMap in="SourceGraphic" scale="5" />
                </filter>
                <rect
                  width="100%"
                  height="100%"
                  filter="url(#paper-texture)"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Main content paper */}
          <div className="relative bg-white rounded-lg p-6 shadow-lg overflow-hidden">
            {/* Paper texture overlay */}
            <div className="absolute inset-0 opacity-30 mix-blend-overlay">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <filter id="crumpled-texture">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.015"
                    numOctaves="4"
                    seed="1"
                  />
                  <feDisplacementMap in="SourceGraphic" scale="3" />
                </filter>
                <rect
                  width="100%"
                  height="100%"
                  filter="url(#crumpled-texture)"
                  fill="none"
                />
              </svg>
            </div>

            <div className="relative z-10">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
