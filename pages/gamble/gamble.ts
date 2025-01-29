import { uniqBy } from 'lodash'

import { DEFAULT_GAMBLIMH_CHIP_COUNT } from '../../constant/index'

Page({
  data: {
    isTodo: false,
    gamblingChipCount: DEFAULT_GAMBLIMH_CHIP_COUNT,
    lottoryResultList: [], // DesireItem[][]
    todoList: [],
  },

  onShow() {
    this.setTabBar()
    this.loadPageData()
    this.setNavigationBarTitle()
  },

  setTabBar() {
    this.getTabBar().setData({ selected: 'gamble' })
  },

  async loadPageData() {
    const lotteryResult = await this.fetchTodayLotteryResult()
    this.setData({
      isTodo: lotteryResult.some((item) => item.isSelected),
      gamblingChipCount: DEFAULT_GAMBLIMH_CHIP_COUNT - uniqBy(lotteryResult, 'lotteryId').length,
      todoList: lotteryResult.filter((item) => item.isSelected).map((item) => item.event),
    })
  },

  setNavigationBarTitle() {
    wx.setNavigationBarTitle({
      title: this.data.isTodo ? '今日TODO' : 'PaChinGo',
    })
  },

  async fetchTodayLotteryResult() {
    return [
      {
        id: 1,
        lotteryId: '2025012701',
        eventId: 10,
        isSelected: false,
        event: {
          id: 1,
          name: '吃饭',
          description: '店子在福田~再不吃可能就过季了没得吃了！！警惕警惕警惕~~~~~',
          priority: 4,
          startTime: '2024-06-07',
          endTime: '2024-07-08',
          createTime: '2024-12-12',
        }
      },
      {
        id: 2,
        lotteryId: '2025012701',
        eventId: 11,
        isSelected: false,
        event: {
          id: 1,
          name: '打豆豆',
          description: '店子在福田~再不吃可能就过季了没得吃了！！警惕警惕警惕~~~~~',
          priority: 4,
          startTime: '2024-06-07',
          endTime: '2024-07-08',
          createTime: '2024-12-12',
        }
      },
      {
        id: 3,
        lotteryId: '2025012701',
        eventId: 12,
        isSelected: false,
        event: {
          id: 1,
          name: '睡觉',
          description: '店子在福田~再不吃可能就过季了没得吃了！！警惕警惕警惕~~~~~',
          priority: 4,
          startTime: '2024-06-07',
          endTime: '2024-07-08',
          createTime: '2024-12-12',
        },
      },
      {
        id: 4,
        lotteryId: '2025012702',
        eventId: 10,
        isSelected: true,
        event: {
          id: 1,
          name: '开飞机',
          description: '店子在福田~再不吃可能就过季了没得吃了！！警惕警惕警惕~~~~~',
          priority: 3,
          startTime: '2024-06-07',
          endTime: '2024-07-08',
          createTime: '2024-12-12',
        },
      },
      {
        id: 5,
        lotteryId: '2025012702',
        eventId: 10,
        isSelected: true,
        event: {
          id: 1,
          name: '看电影',
          description: '店子在福田~再不吃可能就过季了没得吃了！！警惕警惕警惕~~~~~',
          priority: 4,
          startTime: '2024-06-07',
          endTime: '2024-07-08',
          createTime: '2024-12-12',
        },
      },
      {
        id: 6,
        lotteryId: '2025012702',
        eventId: 10,
        isSelected: true,
        event: {
          id: 1,
          name: '做PaChinGo',
          description: '店子在福田~再不吃可能就过季了没得吃了！！警惕警惕警惕~~~~~',
          priority: 5,
          startTime: '2024-06-07',
          endTime: '2024-07-08',
          createTime: '2024-12-12',
        },
      },
    ]
  },

  async handlePrint() {
    // TODO 选中心愿
    this.loadPageData()
  },

  async handlePlay() {
    const lotteryResult = await this.generateLotteryResult()
     this.setData({
      lottoryResultList: [...this.data.lottoryResultList, lotteryResult.lotteryResult],
      gamblingChipCount: lotteryResult.chipCount,
     })
  },

  async generateLotteryResult() {
    return {
      lotteryResult: [
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
      chipCount: this.data.gamblingChipCount - 1,
    }
  },
})