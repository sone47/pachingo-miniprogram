import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { userStore } from '@/store/user'

import { addDesire } from '@/api/desire'
import { Message } from 'tdesign-miniprogram'

Page({
  data: {
    name: '',
    description: '',
    priority: 1,
    startTime: null as string | null,
    endTime: null as string | null,

    saveLoading: false,
  },

  async onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: userStore,
      fields: ['desireValue'],
      actions: ['getDesireValue'],
    })
  },

  onShow() {
    this.getTabBar().setData({ selected: 'add' })
    wx.setNavigationBarTitle({ title: '添加心愿' })
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings()
  },

  handleGoToPool() {
    wx.navigateTo({
      url: '/pages/pool/pool',
    })
  },

  handleStartTimeChange(e: { detail: string }) {
    this.setData({ startTime: e.detail })
  },

  handleEndTimeChange(e: { detail: string }) {
    this.setData({ endTime: e.detail })
  },

  async handleSave() {
    this.setData({ saveLoading: true })
    try {
      await addDesire({
        name: this.data.name,
        description: this.data.description || '还没有详细描述o~',
        priority: this.data.priority,
        startTime: this.data.startTime ? new Date(this.data.startTime) : undefined,
        endTime: this.data.endTime ? new Date(this.data.endTime) : undefined,
        tags: ' ',
      })

      this.handleSaveSuccess()
    } catch (error) {
      console.error(error)
    } finally {
      this.setData({ saveLoading: false })
    }
  },

  async handleSaveSuccess() {
    this.setData({
      name: '',
      description: '',
      priority: 1,
      startTime: null,
      endTime: null,
    })

    Message.success({
      context: this,
      duration: 5000,
      content: '心愿添加成功',
      offset: ['180rpx', '32rpx'],
    })

    this.getDesireValue()
  },
})
