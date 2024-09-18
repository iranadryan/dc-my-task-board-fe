import { useRef, useState } from 'react'
import { IconAdd } from './icons/IconAdd'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { IconClose } from './icons/IconClose'
import { ITask } from '../types/TaskTypes'
import { TaskForm, TaskFormRef } from './TaskForm'

interface NewTaskModalProps {
  onCreateTask: (task: ITask) => void
}

export function NewTaskModal({ onCreateTask }: NewTaskModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const taskFormRef = useRef<TaskFormRef>(null)

  function handleCloseModal() {
    setIsOpen(false)
    taskFormRef.current?.resetFields()
  }

  function handleCreateTask(task: ITask) {
    onCreateTask(task)
    handleCloseModal()
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-5 rounded-2xl bg-yellow-100 p-4 font-semibold outline-yellow-500"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500">
          <IconAdd />
        </div>
        Add new task
      </button>

      <Dialog
        open={isOpen}
        onClose={handleCloseModal}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/20" />

        <div className="fixed inset-0 flex w-screen items-center justify-end p-3">
          <DialogPanel className="flex h-full w-full max-w-2xl flex-col rounded-xl border border-neutral-100 bg-white px-6 pb-5 pt-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-medium">
                Task details
              </DialogTitle>
              <button
                onClick={handleCloseModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-100 transition hover:bg-yellow-100/50"
              >
                <IconClose color="#E9A23B" />
              </button>
            </div>

            <TaskForm ref={taskFormRef} onSubmit={handleCreateTask} />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
