// pages/gamble/components/FooterButton/index.ts
Component({
  /**
   * Component properties
   */
  properties: {
    gamblingChipCount: {
      type: Number,
      value: 0,
    },
    lottoryResultList: {
      type: Array,
      value: [],
    },
  },

  /**
   * Component initial data
   */
  data: {
    hasChip: false,
    hasPlayed: false,
  },

  observers: {
    lottoryResultList() {
      this.setData({
        hasPlayed: !!this.data.lottoryResultList.length,
      })
    },
    gamblingChipCount() {
      this.setData({
        hasChip: !!this.data.gamblingChipCount,
      })
    },
  },

  /**
   * Component methods
   */
  methods: {
    handlePrintButtonTap() {
      this.triggerEvent('print')
    },

    handlePlayButtonTap() {
      this.triggerEvent('play')
    },
  },
})
