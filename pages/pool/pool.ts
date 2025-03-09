import { userStore } from '@/store/user'

import { getDesireList, removeDesire } from '@/api/desire'
import { Desire } from '@/api/types/desire'
import { Message } from 'tdesign-miniprogram'

Page({
  onLoad() {
    this.fetchDesireList()
  },

  data: {
    listData: [] as Desire[],
  },

  async handleRemove(e: { currentTarget: { dataset: { id: number } } }) {
    const deletedId = e.currentTarget.dataset.id
    try {
      await removeDesire(deletedId)
      this.setData({
        listData: this.data.listData.filter(item => item.id !== deletedId),
      })

      userStore.getDesireValue()
    } catch (error) {
      console.error(error)
      Message.error({
        context: this,
        offset: ['20rpx', '32rpx'],
        duration: 5000,
        content: '删除失败',
      })
    }
  },

  async fetchDesireList() {
    const res = await getDesireList({ page: 1, pageSize: 10 })
    this.setData({
      listData: [...this.data.listData, ...res.list],
    })
  },
})
