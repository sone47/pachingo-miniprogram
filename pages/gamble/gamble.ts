import { uniqBy, groupBy, values, map } from 'lodash'
import { drawLottery, getTodayLottery } from '@/api/lottery'
import { DEFAULT_GAMBLIMH_CHIP_COUNT, EventStatusEnum } from '@/constant/index'
import { Desire, Lottery } from '@/api/types'
import { Message } from 'tdesign-miniprogram'

Page({
  data: {
    isTodo: false,
    gamblingChipCount: DEFAULT_GAMBLIMH_CHIP_COUNT,
    lottoryResultList: [] as Lottery[][],
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
      gamblingChipCount: DEFAULT_GAMBLIMH_CHIP_COUNT - uniqBy(lotteryResult, 'attempt').length,
      todoList: lotteryResult.filter(item => item.isSelected).map(item => item.desire),
      lottoryResultList: values(groupBy(lotteryResult, 'attempt')),
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
    // TODO 选中心愿
    this.loadPageData()
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
    try {
      const lotteryResult = await drawLottery()
      return lotteryResult
    } catch (error: any) {
      Message.error({
        context: this,
        offset: ['20rpx', '32rpx'],
        duration: 5000,
        content: error.message || '抽取失败',
      })
      throw error
    }
  },

  handleSwiperChange(event: any) {
    this.setData({
      swiperCurrent: event.detail.current,
    })
  },

  handleDesireComplete(event) {
    const targetId = event.detail.item.id
    this.setData({
      todoList: this.data.todoList.map(item => ({
        ...item,
        status: item.id === targetId ? EventStatusEnum.Done : item.status,
      })),
    })

    // TODO update data in database
  },
  handleDesireRollback(event) {
    const targetId = event.detail.item.id
    this.setData({
      todoList: this.data.todoList.map(item => ({
        ...item,
        status: item.id === targetId ? EventStatusEnum.Todo : item.status,
      })),
    })

    // TODO update data in database
  },
})
