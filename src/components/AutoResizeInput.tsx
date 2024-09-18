import { ComponentProps, forwardRef, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface AutoResizeInputProps {
  className?: ComponentProps<'input'>['className']
  disabled?: ComponentProps<'input'>['disabled']
  value?: ComponentProps<'input'>['value']
  onChange?: ComponentProps<'input'>['onChange']
  maxLength?: ComponentProps<'input'>['maxLength']
  tabIndex?: ComponentProps<'input'>['tabIndex']
  id?: ComponentProps<'input'>['id']
  onSubmit?: () => void
  startWidth?: number
}

export const AutoResizeInput = forwardRef<
  HTMLInputElement,
  AutoResizeInputProps
>(({ className, value, startWidth, onSubmit, ...props }, ref) => {
  const [inputWidth, setInputWidth] = useState(startWidth || 0)
  const spanRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth)
    }
  }, [value])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        if (onSubmit) {
          onSubmit()
        }
      }}
    >
      <p
        ref={spanRef}
        className={twMerge(
          'invisible absolute whitespace-pre break-all',
          className,
        )}
      >
        {value}
      </p>
      <input
        ref={ref}
        type="text"
        value={value}
        className={twMerge('whitespace-pre', className)}
        style={{ width: `${inputWidth}px` }}
        {...props}
      />
    </form>
  )
})

AutoResizeInput.displayName = 'AutoResizeInput'
