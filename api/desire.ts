import request from '@/utils/request'
import { Desire, AddDesireParams } from './types/desire'
import { PageParams, PageResult } from './types/common'

export async function getDesireValue() {
  return request.get<number>('/action/desire/value')
}

export async function addDesire(desire: AddDesireParams) {
  return request.post<number>('/action/desire', desire)
}

export async function getDesireList(params: PageParams) {
  return request.get<PageResult<Desire>>('/action/desire/list', { params })
}

export async function removeDesire(id: number) {
  return request.delete<number>(`/action/desire/${id}`)
}
