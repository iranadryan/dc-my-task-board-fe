import { Dialog, DialogBackdrop } from '@headlessui/react'

interface LoaderProps {
  visible?: boolean
}

export function Loader({ visible }: LoaderProps) {
  return (
    <Dialog open={visible} onClose={() => {}} className="relative z-[100]">
      <DialogBackdrop className="fixed inset-0 bg-neutral-50/70" />

      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <span className="inline-block h-12 w-12 animate-spin rounded-full border-[5px] border-neutral-400 border-b-neutral-100"></span>
      </div>
    </Dialog>
  )
}
