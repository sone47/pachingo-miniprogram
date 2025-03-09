export interface Desire {
  id: number
  name: string
  description: string
  tags: string
  priority: number
  startTime?: string
  endTime?: string
  status: number
  createTime: string
  updateTime: string
  finishTime?: string
  creatorId: number
}

export interface AddDesireParams
  extends Pick<Desire, 'name' | 'description' | 'tags' | 'priority' | 'startTime' | 'endTime'> {}
