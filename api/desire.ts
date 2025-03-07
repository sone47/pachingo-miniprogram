import request from '@/utils/request'
import { Desire } from './types/desire'

export async function getDesireValue() {
  return request.get<number>('/action/desire/value')
}

export async function addDesire(desire: Desire) {
  return request.post<number>('/action/desire', desire)
}
