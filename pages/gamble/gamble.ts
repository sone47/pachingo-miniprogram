Page({
  data: {
    gamblingChipCount: 3,
    lottoryResultList: [], // DesireItem[][]
  },

  onShow() {
    this.getTabBar().setData({ selected: 'gamble' })
    // TODO 抽取完成则是今日TODO
    wx.setNavigationBarTitle({ title: '今日TODO' })
  },

  async handlePrint() {
    // TODO 选中心愿
  },

  async handlePlay() {
    const lotteryResult = await this.getLotteryResult()
    const gamblingChipCount = await this.getNewChipCount()
     this.setData({
      lottoryResultList: [...this.data.lottoryResultList, lotteryResult],
      gamblingChipCount,
     })
  },

  async getNewChipCount() {
    return this.data.gamblingChipCount - 1
  },

  async getLotteryResult() {
    return [
      {
        id: 1,
        name: '吃柿子甜品',
        description: '店子在福田~再不吃可能就过季了没得吃了！！警惕警惕警惕~~~~~',
        priority: 4,
        startTime: '2024-06-07',
        endTime: '2024-07-08',
        createTime: '2024-12-12'
      },
      {
        id: 2,
        name: '吃柿子甜品',
        description: '店子在福田~再不吃可能就过季了没得吃了！！警惕警惕警惕~~~~~',
        priority: 4,
        endTime: '2024-07-08',
        createTime: '2024-12-01'
      },
      {
        id: 3,
        name: '吃柿子甜品',
        description: '店子在福田~再不吃可能就过季了没得吃了！！警惕警惕警惕~~~~~',
        priority: 4,
        endTime: '2024-07-08',
        createTime: '2024-12-01'
      },
    ]
  }
})