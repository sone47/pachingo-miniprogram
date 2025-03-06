Page({
  data: {
    userDesireValue: 24,

    name: '',
    description: '',
    priority: 1,
    startTime: null as string | null,
    endTime: null as string | null,
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

  onShow() {
    this.getTabBar().setData({ selected: 'add' })
    wx.setNavigationBarTitle({ title: '添加心愿' })
  },
})
