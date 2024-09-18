import { twMerge } from 'tailwind-merge'
import { IconProgress } from './icons/IconProgress'
import { IconCompleted } from './icons/IconCompleted'
import { IconClose } from './icons/IconClose'

interface TaskProps {
  icon: string
  title: string
  description?: string
  status?: 'IN_PROGRESS' | 'COMPLETED' | 'WONT_DO'
  onClick: () => void
}

interface StatusVariant {
  base: string
  iconBase: string
  icon: JSX.Element
}

const STATUS_VARIANTS: Record<Required<TaskProps>['status'], StatusVariant> = {
  IN_PROGRESS: {
    base: 'bg-yellow-300 outline-yellow-500',
    iconBase: 'bg-yellow-500',
    icon: <IconProgress />,
  },
  COMPLETED: {
    base: 'bg-green-300 outline-green-500',
    iconBase: 'bg-green-500',
    icon: <IconCompleted />,
  },
  WONT_DO: {
    base: 'bg-red-300 outline-red-500',
    iconBase: 'bg-red-500',
    icon: <IconClose />,
  },
}

export function Task({ icon, title, description, status, onClick }: TaskProps) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'flex justify-between gap-4 rounded-2xl bg-neutral-100 p-4 outline-neutral-400',
        status && STATUS_VARIANTS[status].base,
      )}
    >
      <div className="flex gap-4">
        <div className="flex h-11 w-11 min-w-11 items-center justify-center rounded-xl bg-neutral-50 text-xl">
          {icon}
        </div>
        <div className="my-[9.5px] flex flex-col">
          <strong className="break-words text-start text-xl font-semibold">
            {title}
          </strong>
          {description && (
            <p className="mt-1 max-w-80 break-words text-start">
              {description}
            </p>
          )}
        </div>
      </div>
      {status && (
        <div
          className={twMerge(
            'flex h-11 w-11 min-w-11 items-center justify-center rounded-xl bg-yellow-500',
            STATUS_VARIANTS[status].iconBase,
          )}
        >
          {STATUS_VARIANTS[status].icon}
        </div>
      )}
    </button>
  )
}
