import { userStore } from '@/store/user'

import { getDesireList, removeDesire } from '@/api/desire'
import { Desire } from '@/api/types/desire'

Page({
  onLoad() {
    this.fetchDesireList()
  },

  data: {
    listData: [] as Desire[],
  },

  async handleRemove(e: { currentTarget: { dataset: { id: number } } }) {
    const deletedId = e.currentTarget.dataset.id
    await removeDesire(deletedId)
    this.setData({
      listData: this.data.listData.filter(item => item.id !== deletedId),
    })

    userStore.getDesireValue()
  },

  async fetchDesireList() {
    const res = await getDesireList({ page: 1, pageSize: 10 })
    this.setData({
      listData: [...this.data.listData, ...res.list],
    })
  },
})
