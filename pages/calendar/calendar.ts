import { getCompletedDesireList } from '@/api/desire'
import { formatDate } from '@/utils/date'
import { Desire } from '@/api/types'

Page({
  data: {
    date: Date.now(),
    historyData: [] as Desire[],
  },

  onShow() {
    this.getTabBar().setData({ selected: 'calendar' })
    wx.setNavigationBarTitle({ title: '历史清单' })

    this.setDate(Date.now())
  },

  handleCalendarSelect(event: { detail: { value: number } }) {
    this.setDate(event.detail.value)
  },

  setDate(date: number) {
    this.setData({ date })
    this.fetchHistory()
  },

  async fetchHistory() {
    const historyData = await getCompletedDesireList(formatDate(this.data.date))
    this.setData({
      historyData,
    })
  },
})
