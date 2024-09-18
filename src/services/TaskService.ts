import { ITask } from '../types/TaskTypes'
import { api } from './utils/api'

interface TaskPayload {
  title: string
  description?: string
  icon: string
  status?: 'IN_PROGRESS' | 'COMPLETED' | 'WONT_DO'
}

class TaskService {
  async createTask(boardId: string, payload: TaskPayload) {
    const { data } = await api.post<ITask>(`/boards/${boardId}/tasks`, payload)

    return data
  }

  async updateTask(boardId: string, taskId: string, payload: TaskPayload) {
    const { data } = await api.put<ITask>(
      `/boards/${boardId}/tasks/${taskId}`,
      payload,
    )

    return data
  }

  async deleteTask(boardId: string, taskId: string) {
    await api.delete(`/boards/${boardId}/tasks/${taskId}`)
  }
}

export default new TaskService()
