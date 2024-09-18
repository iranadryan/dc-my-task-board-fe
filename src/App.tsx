import { useEffect, useRef, useState } from 'react'
import { AutoResizeInput } from './components/AutoResizeInput'
import { IconCheck } from './components/icons/IconCheck'
import { IconEdit } from './components/icons/IconEdit'
import { Logo } from './components/icons/Logo'
import { Task } from './components/Task'
import { Tooltip, TooltipRefProps } from 'react-tooltip'
import { localStorageKeys } from './config/localStorageKeys'
import { NewTaskModal } from './components/NewTaskModal'
import { ITask } from './types/TaskTypes'
import { defaultTasks } from './utils/defaultTasks'
import { EditTaskModal } from './components/EditTaskModal'
import BoardService from './services/BoardService'
import TaskService from './services/TaskService'
import { Loader } from './components/Loader'

export function App() {
  const [loading, setLoading] = useState(false)
  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false)
  const [editingTask, setEditingTask] = useState<ITask | null>(null)
  const [canEditHeader, setCanEditHeader] = useState(false)
  const [title, setTitle] = useState('My Task Board')
  const [description, setDescription] = useState('Tasks to keep organized')
  const [tasks, setTasks] = useState<ITask[]>(defaultTasks)
  const [boardId, setBoardId] = useState<string | null>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const tooltipRef = useRef<TooltipRefProps>(null)

  function handleToggleEditTitle() {
    if (canEditHeader) {
      setCanEditHeader(false)

      if (!boardId) {
        handleCreateBoard()
      }
    } else {
      setCanEditHeader(true)

      if (titleRef.current) {
        titleRef.current.disabled = false
        titleRef.current.focus()
      }

      const alreadyShowedDescriptionTooltip = localStorage.getItem(
        localStorageKeys.SHOWED_DESCRIPTION_TOOLTIP,
      )

      if (alreadyShowedDescriptionTooltip !== 'true') {
        tooltipRef.current?.open({
          anchorSelect: '#description-input',
          content: 'You can also change the description',
          place: 'bottom',
        })

        localStorage.setItem(
          localStorageKeys.SHOWED_DESCRIPTION_TOOLTIP,
          'true',
        )

        setTimeout(() => tooltipRef.current?.close(), 2500)
      }
    }
  }

  function handleEditTask(task: ITask) {
    setEditingTask(task)
    setEditTaskModalVisible(true)
  }

  async function handleFindBoard(boardId: string) {
    try {
      setLoading(true)

      const board = await BoardService.findBoard(boardId)

      setTitle(board.title)
      setDescription(board.description)
      setTasks(board.tasks)
    } catch (error) {
      console.log({ error })
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateTask(task: ITask) {
    try {
      const newTasks = [...tasks, task]

      setTasks(newTasks)

      if (boardId) {
        const createdTask = await TaskService.createTask(boardId, task)

        setTasks((prevState) => {
          const newTasks = [...prevState]
          const taskIndex = newTasks.findIndex(({ id }) => id === task.id)

          newTasks[taskIndex] = createdTask

          return newTasks
        })
      } else {
        handleCreateBoard(newTasks)
      }
    } catch (error) {
      console.log({ error })
    }
  }

  async function handleUpdateTask(task: ITask) {
    try {
      const newTasks = [...tasks]
      const taskIndex = newTasks.findIndex(({ id }) => id === task.id)

      newTasks[taskIndex] = task

      setTasks(newTasks)

      if (boardId) {
        await TaskService.updateTask(boardId, task.id, task)
      } else {
        handleCreateBoard(newTasks)
      }
    } catch (error) {
      console.log({ error })
    }
  }

  async function handleDeleteTask(taskId: string) {
    try {
      setTasks((prevState) => prevState.filter(({ id }) => id !== taskId))

      if (boardId) {
        await TaskService.deleteTask(boardId, taskId)
      }
    } catch (error) {
      console.log({ error })
    }
  }

  async function handleCreateBoard(newTasks?: ITask[]) {
    try {
      const board = await BoardService.createBoard({
        title,
        description,
        tasks: newTasks || tasks,
      })

      updateUrl(board.id)
      setBoardId(board.id)
      setTasks(board.tasks)
    } catch (error) {
      console.log({ error })
    }
  }

  function updateUrl(boardId: string) {
    const newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      boardId
    window.history.pushState({}, '', newurl)
  }

  useEffect(() => {
    const boardIdUrl = window.location.pathname.split('/')[1]

    if (boardIdUrl) {
      setBoardId(boardIdUrl)
      handleFindBoard(boardIdUrl)
    }
  }, [])

  return (
    <div className="mx-auto w-full max-w-xl py-12 max-sm:px-4">
      <Loader visible={loading} />
      <EditTaskModal
        editingTask={editingTask}
        visible={editTaskModalVisible}
        onClose={() => setEditTaskModalVisible(false)}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
      <header>
        <div className="flex items-center gap-3">
          <Logo />
          <AutoResizeInput
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onSubmit={() => setCanEditHeader(false)}
            disabled={!canEditHeader}
            maxLength={20}
            tabIndex={1}
            startWidth={260}
            className="bg-transparent text-4xl outline-none transition focus:bg-neutral-100/50"
          />
          <button
            onClick={handleToggleEditTitle}
            tabIndex={3}
            className="rounded-lg outline-none transition focus:bg-neutral-100"
          >
            {canEditHeader ? <IconCheck /> : <IconEdit />}
          </button>
        </div>
        <AutoResizeInput
          id="description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onSubmit={() => setCanEditHeader(false)}
          disabled={!canEditHeader}
          maxLength={50}
          tabIndex={2}
          startWidth={168}
          className="ml-[52px] mt-3 bg-transparent outline-none transition focus:bg-neutral-100/50"
        />
        <Tooltip
          ref={tooltipRef}
          style={{
            background: '#97A3B6',
            borderRadius: 8,
            color: '#F8FAFC',
            padding: 8,
          }}
        />
      </header>

      <main className="mt-10 flex flex-col gap-5">
        {tasks.map((task) => (
          <Task key={task.id} {...task} onClick={() => handleEditTask(task)} />
        ))}

        <NewTaskModal onCreateTask={handleCreateTask} />
      </main>
    </div>
  )
}
