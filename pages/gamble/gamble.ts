import { drawLottery, getTodayLottery, selectLottery } from '@/api/lottery'
import { completeDesire, rollbackDesire } from '@/api/desire'
import { DEFAULT_GAMBLIMH_CHIP_COUNT, EventStatusEnum } from '@/constant/index'
import { Desire, Lottery } from '@/api/types'
import { userStore } from '@/store/user'

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

  async handleDesireComplete(event: { detail: Desire }) {
    const targetId = event.detail.id
    await completeDesire(targetId)
    this.handleDesireStatusChange(targetId, EventStatusEnum.Done)
  },

  async handleDesireRollback(event: { detail: Desire }) {
    const targetId = event.detail.id
    await rollbackDesire(targetId)
    this.handleDesireStatusChange(targetId, EventStatusEnum.Todo)
  },

  handleDesireStatusChange(targetId: number, status: EventStatusEnum) {
    this.setData({
      todoList: this.data.todoList.map(item => ({
        ...item,
        status: item.id === targetId ? status : item.status,
      })),
    })
    userStore.getDesireValue()
  },
})
