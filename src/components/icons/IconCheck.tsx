interface IconCheckProps {
  size?: number
  color?: string
  strokeWidth?: number
}

export function IconCheck({
  size = 24,
  color = '#030616',
  strokeWidth = 4,
}: IconCheckProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 14L8.0797 16.3098C8.59413 16.6956 9.32126 16.6074 9.72846 16.1096L18 6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}
