import request from '@/utils/request'
import { Lottery } from './types'

export async function drawLottery() {
  return request.post<Lottery[]>('/action/lottery/draw')
}

export async function getTodayLottery() {
  return request.get<Lottery[]>('/action/lottery/today')
}
