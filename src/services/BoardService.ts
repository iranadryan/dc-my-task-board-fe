import { IBoard, IUpdateBoardResponse } from '../types/BoardTypes'
import { api } from './utils/api'

interface CreateBoardPayload {
  title: string
  description: string
  tasks: {
    title: string
    description?: string
    icon: string
    status?: 'IN_PROGRESS' | 'COMPLETED' | 'WONT_DO'
  }[]
}

interface UpdateBoardPayload {
  title: string
  description: string
}

class BoardService {
  async findBoard(id: string) {
    const { data } = await api.get<IBoard>(`/boards/${id}`)

    return data
  }

  async createBoard(payload: CreateBoardPayload) {
    const { data } = await api.post<IBoard>('/boards', payload)

    return data
  }

  async updateBoard(id: string, payload: UpdateBoardPayload) {
    const { data } = await api.put<IUpdateBoardResponse>(
      `/boards/${id}`,
      payload,
    )

    return data
  }
}

export default new BoardService()
