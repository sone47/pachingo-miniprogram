Component({
  /**
   * Component properties
   */
  properties: {
    value: {
      type: Number,
      required: false,
      value: 1,
    },
    upperLimit: {
      type: Number,
      required: false,
      value: 50,
    },
    lowerLimit: {
      type: Number,
      required: false,
      value: 1,
    },
  },

  /**
   * Component initial data
   */
  data: {
    visible: false,
  },

  /**
   * Component methods
   */
  methods: {
    showDialog() {
      this.setData({ visible: true })
    },

    closeDialog() {
      this.setData({ visible: false })
    },

    handlePriorityInc() {
      this.setPriority(this.data.value + 1)
    },

    handlePriorityDec() {
      this.setPriority(this.data.value - 1)
    },

    handlePriorityInputChange(e: { detail: { value: number } }) {
      console.log()
      this.setPriority(e.detail.value)
    },

    setPriority(value: number) {
      this.setData({
        value: Math.min(Math.max(value, this.properties.lowerLimit), this.properties.upperLimit)
      })
    }
  }
})