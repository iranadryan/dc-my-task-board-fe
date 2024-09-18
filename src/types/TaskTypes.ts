export type taskStatusType = 'IN_PROGRESS' | 'COMPLETED' | 'WONT_DO'

export interface ITask {
  id: string
  title: string
  description?: string
  icon: string
  status?: taskStatusType
}
