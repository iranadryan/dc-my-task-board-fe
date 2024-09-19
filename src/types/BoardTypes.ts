import { ITask } from './TaskTypes'

export interface IBoard {
  id: string
  title: string
  description: string
  tasks: ITask[]
}

export interface IUpdateBoardResponse {
  id: string
  title: string
  description: string
}
