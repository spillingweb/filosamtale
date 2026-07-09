interface LogoProps {
  width?: number | string
  height?: number | string
  className?: string
}

export default function Logo({ width = 20, height = 20, className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={width}
      height={height}
      aria-hidden="true"
      className={className}
    >
      <circle cx="10" cy="10" r="9" fill="none" stroke="var(--lagoon)" strokeWidth="1.5" />
      <path
        d="M10 5 C7 5 5 7 5 10 C5 13 7.5 14.5 10 14 C12.5 13.5 14 12 14 10"
        fill="none"
        stroke="var(--palm)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="10" r="2" fill="var(--lagoon)" />
    </svg>
  )
}
