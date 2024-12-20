import dayjs from 'dayjs'
import { computed as computedBehavior } from 'miniprogram-computed'

import { formatDate } from '@utils/date'

// pages/add/add.ts
Page({
  /**
   * Page initial data
   */
  data: {
    name: '',
    description: '',
    priority: 0,
    startTime: null,
    endTime: null,
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
  handleSave() {
    console.log(this.data)
  },
})