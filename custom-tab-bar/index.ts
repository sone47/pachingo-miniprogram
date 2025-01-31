Component({
  data: {
    selected: 'add',
    list: [
      { value: 'add', icon: 'add-rectangle', ariaLabel: '加入事件' },
      { value: 'gamble', icon: 'gamepad-1', ariaLabel: '抽取事件' },
      { value: 'calendar', icon: 'calendar', ariaLabel: '历史清单' },
    ]
  },

  methods: {
    handleChange(e) {
      const value = e.detail.value
      wx.switchTab({ url: `/pages/${value}/${value}` })
    }
  },
})