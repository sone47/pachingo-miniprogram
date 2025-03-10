import userManager from '@/utils/user'

Page({
  data: {
    username: '',
    password: '',
    errorMsg: { password: '', username: '' },
    showPassword: false,
  },

  /**
   * 输入用户名
   */
  handleUsernameChange(e: any) {
    this.setData({
      username: e.detail.value,
      errorMsg: { ...this.data.errorMsg, username: '' },
    })
  },

  /**
   * 输入密码
   */
  handlePasswordChange(e: any) {
    this.setData({
      password: e.detail.value,
      errorMsg: { ...this.data.errorMsg, password: '' },
    })
  },

  /**
   * 切换密码显示状态
   */
  togglePasswordVisibility() {
    this.setData({
      showPassword: !this.data.showPassword,
    })
  },

  /**
   * 用户点击登录按钮
   */
  async handleLogin() {
    // 获取表单数据
    const { username, password } = this.data

    // 表单验证
    if (!username) {
      this.setData({ errorMsg: { ...this.data.errorMsg, username: '请输入用户名' } })
      return
    }

    if (!password) {
      this.setData({ errorMsg: { ...this.data.errorMsg, password: '请输入密码' } })
      return
    }

    // 设置加载状态
    this.setData({ errorMsg: { ...this.data.errorMsg, password: '', username: '' } })

    // 发送登录请求
    await userManager.login(username, password)

    // 登录成功，返回上一页或首页
    this.navigateBack()
  },

  /**
   * 返回上一页或首页
   */
  navigateBack() {
    const pages = getCurrentPages()

    if (pages.length > 1) {
      // 有上一页，返回上一页
      wx.navigateBack()
    } else {
      // 没有上一页，跳转到首页
      wx.switchTab({
        url: '/pages/add/add',
      })
    }
  },
})
