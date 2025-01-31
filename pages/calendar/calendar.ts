Page({

  /**
   * Page initial data
   */
  data: {
    date: Date.now(),
    historyData: [],
  },

  onLoad() {
    this.setDate(Date.now())
  },

  onShow() {
    this.getTabBar().setData({ selected: 'calendar' })
    wx.setNavigationBarTitle({ title: '历史清单' })
  },

  handleCalendarSelect(event) {
    this.setDate(event.detail.value)
  },

  setDate(date: number) {
    this.setData({ date })
    this.fetchHistory()
  },

  fetchHistory() {
    // TODO 获取历史数据
    this.setData({
      historyData: [
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
      ],
    })
  },
})