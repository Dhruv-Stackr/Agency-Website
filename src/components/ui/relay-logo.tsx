interface RelayLogoProps {
  className?: string;
}

export function RelayLogo({ className = "" }: RelayLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 80"
      fill="none"
      aria-label="Relay"
      className={className}
    >
      <g stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        {/* r: vertical stem + arm */}
        <path d="M 12 61 V 21 C 23 20 33 24 33 37" />
        {/* e: crossbar flowing into large arc; center (62,41) r=17 */}
        <path d="M 45 41 H 79 A 17 17 0 1 0 72 55" />
        {/* l: vertical with ascender */}
        <line x1="93" y1="11" x2="93" y2="61" />
        {/* a: bowl arc (counterclockwise, 270°) + right stem; center (124,41) r=17 */}
        <path d="M 136 29 A 17 17 0 1 0 136 53" />
        <line x1="141" y1="21" x2="141" y2="61" />
        {/* y: right arm + descender, left arm */}
        <path d="M 191 21 L 173 49 L 167 73" />
        <path d="M 155 21 L 173 49" />
      </g>
    </svg>
  );
}
