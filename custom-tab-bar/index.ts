Component({
  data: {
    selected: 'add',
    list: [
      { value: 'add', icon: 'add-rectangle', ariaLabel: '加入事件' },
      { value: 'gamble', icon: 'bone', ariaLabel: '抽取事件' },
      { value: 'calendar', icon: 'calendar', ariaLabel: '日历' },
    ]
  },

  methods: {
    handleChange(e) {
      const value = e.detail.value
      wx.switchTab({ url: `/pages/${value}/${value}` })
    }
  },
})