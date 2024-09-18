import { ComponentProps } from 'react'

interface IconCheckRoundProps {
  className?: ComponentProps<'svg'>['className']
}

export function IconCheckRound({ className }: IconCheckRoundProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C15.5229 20 20 15.5229 20 10C20 4.47715 15.5229 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5229 4.47715 20 10 20ZM14.6339 8.38389C15.122 7.89572 15.122 7.10428 14.6339 6.61611C14.1458 6.12796 13.3542 6.12796 12.8661 6.61611L8.75 10.7322L7.13389 9.11611C6.64572 8.62796 5.85428 8.62796 5.36611 9.11611C4.87796 9.60427 4.87796 10.3957 5.36611 10.8839L7.86611 13.3839C8.35427 13.872 9.14573 13.872 9.63389 13.3839L14.6339 8.38389Z"
        fill="#3662E3"
      />
    </svg>
  )
}
