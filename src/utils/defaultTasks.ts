import { ITask } from '../types/TaskTypes'

export const defaultTasks: ITask[] = [
  {
    id: 'cm0wrfp4h000008jxbas22ag8',
    icon: '⏰',
    title: 'Task in Progress',
    status: 'IN_PROGRESS',
  },
  {
    id: 'cm0wrir0t000008m99dri1jld',
    icon: '🏋️️',
    title: 'Task Completed',
    status: 'COMPLETED',
  },
  {
    id: 'cm0wriwlu000108m928dc942p',
    icon: '☕',
    title: "Task in Won't Do",
    status: 'WONT_DO',
  },
  {
    id: 'cm0wrj1qx000208m90mbz1wrf',
    icon: '📚',
    title: 'Task To Do',
    description: 'Work on a Challenge on devChallenges.io, learn TypeScript.',
  },
]
