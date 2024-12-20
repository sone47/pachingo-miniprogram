import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

export function formatDateTime(value: string | number | Dayjs, formatter = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(value).format(formatter)
}

export function formatDate(value: string | number | Dayjs = Date.now(), formatter = 'YYYY-MM-DD') {
  return dayjs(value).format(formatter)
}