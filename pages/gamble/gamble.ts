Page({
  data: {
    gamblingChipCount: 3
  },

  onShow() {
    this.getTabBar().setData({ selected: 'gamble' })
    // TODO 抽取完成则是今日TODO
    wx.setNavigationBarTitle({ title: '今日TODO' })
  },

  handlePlayButtonTap() {
    console.log('抽取心愿')
  },
})