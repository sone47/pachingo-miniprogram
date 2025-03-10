import { Desire } from './desire'

export interface Lottery {
  id: number
  desireId: number
  isSelected: boolean
  operatorId: number
  createTime: Date
  attempt: number
  desires: Desire[]
}
