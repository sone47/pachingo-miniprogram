import { observable, action } from 'mobx-miniprogram'

import { UserInfo } from '@/api/types/user'
import { getUserInfo } from '@/api/user'
import { getDesireValue } from '@/api/desire'

export interface UserStore {
  userInfo?: UserInfo
  desireValue: number
  getUserInfo: () => Promise<void>
  getDesireValue: () => Promise<void>
}

export const userStore = observable<UserStore>({
  userInfo: undefined,
  desireValue: 0,

  getUserInfo: action(async function () {
    const userInfo = await getUserInfo()
    this.userInfo = userInfo
  }),

  getDesireValue: action(async function () {
    const desireValue = await getDesireValue()
    this.desireValue = desireValue
  }),
})
