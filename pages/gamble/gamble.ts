import { drawLottery, getTodayLottery, selectLottery } from '@/api/lottery'
import { DEFAULT_GAMBLIMH_CHIP_COUNT, EventStatusEnum } from '@/constant/index'
import { Desire, Lottery } from '@/api/types'
Page({
  data: {
    isTodo: false,
    gamblingChipCount: DEFAULT_GAMBLIMH_CHIP_COUNT,
    lottoryResultList: [] as Lottery[],
    todoList: [] as Desire[],

    swiperCurrent: 0,
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
      isTodo: lotteryResult.some(item => item.isSelected),
      gamblingChipCount: DEFAULT_GAMBLIMH_CHIP_COUNT - lotteryResult.length,
      todoList: lotteryResult.find(item => item.isSelected)?.desires || [],
      lottoryResultList: lotteryResult,
    })
  },

  setNavigationBarTitle() {
    wx.setNavigationBarTitle({
      title: this.data.isTodo ? '今日TODO' : 'PaChinGo',
    })
  },

  async fetchTodayLotteryResult() {
    return getTodayLottery()
  },

  async handlePrint() {
    const lottery = await selectLottery(this.data.lottoryResultList[this.data.swiperCurrent].id)
    this.setData({
      isTodo: true,
      todoList: lottery.desires,
    })
    this.setNavigationBarTitle()
  },

  async handlePlay() {
    const lotteryResult = await this.generateLotteryResult()
    this.setData({
      lottoryResultList: [...this.data.lottoryResultList, lotteryResult],
      gamblingChipCount: DEFAULT_GAMBLIMH_CHIP_COUNT - this.data.lottoryResultList.length - 1,
      swiperCurrent: this.data.lottoryResultList.length,
    })
  },

  async generateLotteryResult() {
    const lotteryResult = await drawLottery()
    return lotteryResult
  },

  handleSwiperChange(event: any) {
    this.setData({
      swiperCurrent: event.detail.current,
    })
  },

  handleDesireComplete(event: { detail: Desire }) {
    const targetId = event.detail.id
    this.setData({
      todoList: this.data.todoList.map(item => ({
        ...item,
        status: item.id === targetId ? EventStatusEnum.Done : item.status,
      })),
    })

    // TODO update data in database
  },
  handleDesireRollback(event: { detail: Desire }) {
    const targetId = event.detail.id
    this.setData({
      todoList: this.data.todoList.map(item => ({
        ...item,
        status: item.id === targetId ? EventStatusEnum.Todo : item.status,
      })),
    })

    // TODO update data in database
  },
})
