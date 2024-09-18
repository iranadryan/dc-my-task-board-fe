import { forwardRef, useImperativeHandle, useState } from 'react'
import { formErrorType } from '../types'
import { ITask, taskStatusType } from '../types/TaskTypes'
import { newTaskSchema } from '../utils/newTaskSchema'
import { formatZodError } from '../utils/formatZodError'
import { createId } from '@paralleldrive/cuid2'
import { IconProgress } from './icons/IconProgress'
import { IconCheckRound } from './icons/IconCheckRound'
import { IconCompleted } from './icons/IconCompleted'
import { IconClose } from './icons/IconClose'
import { IconCheck } from './icons/IconCheck'
import { IconTrash } from './icons/IconTrash'

interface TaskFormProps {
  onSubmit: (task: ITask) => void
  onDelete?: (taskId: string) => void
}

export interface TaskFormRef {
  resetFields: () => void
  setFieldsValues: (task: ITask) => void
}

export const TaskForm = forwardRef<TaskFormRef, TaskFormProps>(
  ({ onSubmit, onDelete }, ref) => {
    const [id, setId] = useState(createId())
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedIcon, setSelectedIcon] = useState('👨‍💻')
    const [selectedStatus, setSelectedStatus] = useState<taskStatusType | null>(
      null,
    )
    const [errors, setErrors] = useState<formErrorType>(null)

    function handleSubmit() {
      const taskValidation = newTaskSchema.safeParse({
        title,
        description: description || undefined,
        icon: selectedIcon,
        status: selectedStatus || undefined,
      })

      if (!taskValidation.success) {
        console.log(taskValidation.error)
        return setErrors(formatZodError(taskValidation.error))
      }

      setErrors(null)

      onSubmit({
        id,
        ...taskValidation.data,
      })
    }

    function handleToggleStatus(status: taskStatusType) {
      setSelectedStatus((prevState) => (prevState === status ? null : status))
    }

    useImperativeHandle(
      ref,
      () => ({
        resetFields: () => {
          setId(createId())
          setTitle('')
          setDescription('')
          setSelectedIcon('👨‍💻')
          setSelectedStatus(null)
          setErrors(null)
        },
        setFieldsValues: (task) => {
          setId(task.id)
          setTitle(task.title)
          setDescription(task.description || '')
          setSelectedIcon(task.icon)
          setSelectedStatus(task.status || null)
        },
      }),
      [],
    )

    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
          className="mt-4 space-y-5 overflow-auto"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-xs font-medium text-neutral-400"
            >
              Task name
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter a task name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-neutral-100 px-3.5 py-2.5 outline-none"
            />
            {errors?.title && (
              <span className="text-xs font-medium text-red-500">
                {errors.title}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-xs font-medium text-neutral-400"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter a short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 h-40 w-full resize-none rounded-lg border border-neutral-100 px-3.5 py-2.5 outline-none"
            />
          </div>

          <div className="relative">
            <label className="block text-xs font-medium text-neutral-400">
              Icon
            </label>

            <div className="mt-1.5 flex flex-wrap gap-3">
              <button
                type="button"
                data-selected={selectedIcon === '👨‍💻'}
                onClick={() => setSelectedIcon('👨‍💻')}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-xl transition-all hover:brightness-105 data-[selected=true]:bg-yellow-300"
              >
                👨‍💻
              </button>

              <button
                type="button"
                data-selected={selectedIcon === '💬'}
                onClick={() => setSelectedIcon('💬')}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-xl transition-all hover:brightness-105 data-[selected=true]:bg-yellow-300"
              >
                💬
              </button>

              <button
                type="button"
                data-selected={selectedIcon === '☕'}
                onClick={() => setSelectedIcon('☕')}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-xl transition-all hover:brightness-105 data-[selected=true]:bg-yellow-300"
              >
                ☕
              </button>

              <button
                type="button"
                data-selected={selectedIcon === '🏋️'}
                onClick={() => setSelectedIcon('🏋️')}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-xl transition-all hover:brightness-105 data-[selected=true]:bg-yellow-300"
              >
                🏋️
              </button>

              <button
                type="button"
                data-selected={selectedIcon === '📚'}
                onClick={() => setSelectedIcon('📚')}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-xl transition-all hover:brightness-105 data-[selected=true]:bg-yellow-300"
              >
                📚
              </button>

              <button
                type="button"
                data-selected={selectedIcon === '⏰'}
                onClick={() => setSelectedIcon('⏰')}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-xl transition-all hover:brightness-105 data-[selected=true]:bg-yellow-300"
              >
                ⏰
              </button>
            </div>

            {errors?.icon && (
              <span className="text-xs font-medium text-red-500">
                {errors.icon}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400">
              Status
            </label>

            <div className="mt-1.5 grid grid-cols-2 gap-x-4 gap-y-3 max-md:grid-cols-1">
              <button
                type="button"
                data-selected={selectedStatus === 'IN_PROGRESS'}
                onClick={() => handleToggleStatus('IN_PROGRESS')}
                className="group relative flex h-13 w-full items-center gap-3 rounded-2xl border-2 border-neutral-100 p-[3px] transition-all hover:bg-neutral-50 data-[selected=true]:border-blue-500"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500">
                  <IconProgress />
                </div>
                In Progress
                <IconCheckRound className="absolute right-3.5 opacity-0 transition-all group-data-[selected=true]:opacity-100" />
              </button>

              <button
                type="button"
                data-selected={selectedStatus === 'COMPLETED'}
                onClick={() => handleToggleStatus('COMPLETED')}
                className="group relative flex h-13 w-full items-center gap-3 rounded-2xl border-2 border-neutral-100 p-[3px] transition-all hover:bg-neutral-50 data-[selected=true]:border-blue-500"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500">
                  <IconCompleted />
                </div>
                Completed
                <IconCheckRound className="absolute right-3.5 opacity-0 transition-all group-data-[selected=true]:opacity-100" />
              </button>

              <button
                type="button"
                data-selected={selectedStatus === 'WONT_DO'}
                onClick={() => handleToggleStatus('WONT_DO')}
                className="group relative flex h-13 w-full items-center gap-3 rounded-2xl border-2 border-neutral-100 p-[3px] transition-all hover:bg-neutral-50 data-[selected=true]:border-blue-500"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500">
                  <IconClose />
                </div>
                Won't Do
                <IconCheckRound className="absolute right-3.5 opacity-0 transition-all group-data-[selected=true]:opacity-100" />
              </button>
            </div>
          </div>
        </form>

        <div className="mt-auto flex justify-end gap-4 max-md:pt-4">
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(id)}
              className="flex items-center gap-1.5 rounded-full bg-neutral-400 px-6 py-2 text-sm font-medium text-neutral-50 transition-all hover:brightness-105"
            >
              Delete
              <IconTrash />
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-neutral-50 transition-all hover:brightness-105"
          >
            Save
            <IconCheck color="#f8fafc" size={20} strokeWidth={3} />
          </button>
        </div>
      </>
    )
  },
)

TaskForm.displayName = 'TaskForm'
