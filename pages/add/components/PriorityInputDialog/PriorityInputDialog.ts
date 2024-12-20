Component({
  /**
   * Component properties
   */
  properties: {
    value: {
      type: Number,
      required: false,
      value: 0,
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

    handlePriorityInputChange(e: { detail: { value: number } }) {
      this.setData({ value: e.detail.value })
    }
  }
})