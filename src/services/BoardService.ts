import { IBoard } from '../types/BoardTypes'
import { api } from './utils/api'

interface BoardPayload {
  title: string
  description: string
  tasks: {
    title: string
    description?: string
    icon: string
    status?: 'IN_PROGRESS' | 'COMPLETED' | 'WONT_DO'
  }[]
}

class BoardService {
  async findBoard(id: string) {
    const { data } = await api.get<IBoard>(`/boards/${id}`)

    return data
  }

  async createBoard(payload: BoardPayload) {
    const { data } = await api.post<IBoard>('/boards', payload)

    return data
  }
}

export default new BoardService()
