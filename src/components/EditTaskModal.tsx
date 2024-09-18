import { useCallback, useRef } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { IconClose } from './icons/IconClose'
import { ITask } from '../types/TaskTypes'
import { TaskForm, TaskFormRef } from './TaskForm'

interface EditTaskModalProps {
  editingTask: ITask | null
  visible: boolean
  onClose: () => void
  onUpdateTask: (task: ITask) => void
  onDeleteTask: (taskId: string) => void
}

export function EditTaskModal({
  editingTask,
  visible,
  onClose,
  onUpdateTask,
  onDeleteTask,
}: EditTaskModalProps) {
  const taskFormRef = useRef<TaskFormRef | null>(null)
  const taskFormCallback = useCallback(
    (node: TaskFormRef | null) => {
      if (node !== null) {
        taskFormRef.current = node

        if (editingTask) {
          node.setFieldsValues(editingTask)
        }
      }
    },
    [editingTask],
  )

  function handleCloseModal() {
    onClose()
    taskFormRef.current?.resetFields()
  }

  function handleUpdateTask(task: ITask) {
    onUpdateTask(task)
    handleCloseModal()
  }

  function handleDeleteTask(taskId: string) {
    onDeleteTask(taskId)
    handleCloseModal()
  }

  return (
    <Dialog open={visible} onClose={handleCloseModal} className="relative z-50">
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

          <TaskForm
            ref={taskFormCallback}
            onSubmit={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        </DialogPanel>
      </div>
    </Dialog>
  )
}
