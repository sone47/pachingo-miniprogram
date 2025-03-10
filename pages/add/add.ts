import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { userStore } from '@/store/user'

import { addDesire } from '@/api/desire'
import { formatDateTime } from '@/utils/date'

Page({
  data: {
    name: '',
    description: '',
    priority: 1,
    startTime: null as string | null,
    endTime: null as string | null,
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

  async handleSave() {
    await addDesire({
      name: this.data.name,
      description: this.data.description || '还没有详细描述o~',
      priority: this.data.priority,
      startTime: this.data.startTime ? formatDateTime(this.data.startTime) : undefined,
      endTime: this.data.endTime ? formatDateTime(this.data.endTime) : undefined,
      tags: ' ',
    })

    this.handleSaveSuccess()
  },

  async handleSaveSuccess() {
    this.setData({
      name: '',
      description: '',
      priority: 1,
      startTime: null,
      endTime: null,
    })

    wx.showToast({
      title: '心愿添加成功',
      icon: 'success',
    })

    this.getDesireValue()
  },
})
