import request from './request'

// 用户信息接口
export interface UserInfo {
  id: string
  username: string
  avatar: string
  role: string
  [key: string]: any
}

// 登录结果接口
export interface LoginResult {
  token: string
  userInfo: UserInfo
  expiresIn: number
}

// 存储键名
const TOKEN_KEY = 'user_token'
const USER_INFO_KEY = 'user_info'
const EXPIRES_KEY = 'token_expires'

/**
 * 用户管理类 - 单例模式
 */
class UserManager {
  private static instance: UserManager

  /**
   * 获取单例实例
   */
  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager()
    }
    return UserManager.instance
  }

  /**
   * 私有构造函数，防止外部创建实例
   */
  private constructor() {}

  /**
   * 账号密码登录
   * @param username 用户名
   * @param password 密码
   */
  public async login(username: string, password: string): Promise<LoginResult> {
    try {
      // 发送登录请求
      const result = await request.post<LoginResult>('/action/auth/login', {
        username,
        password,
      })

      // 存储登录信息
      this.saveLoginInfo(result)

      return result
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  /**
   * 保存登录信息
   * @param loginResult 登录结果
   */
  public saveLoginInfo(loginResult: LoginResult): void {
    const { token, userInfo, expiresIn } = loginResult

    // 计算过期时间
    const expiresTime = Date.now() + expiresIn * 1000

    // 存储 token
    wx.setStorageSync(TOKEN_KEY, token)

    // 存储用户信息
    wx.setStorageSync(USER_INFO_KEY, userInfo)

    // 存储过期时间
    wx.setStorageSync(EXPIRES_KEY, expiresTime)
  }

  /**
   * 获取存储的 token
   */
  public getToken(): string {
    return wx.getStorageSync(TOKEN_KEY) || ''
  }

  /**
   * 获取存储的用户信息
   */
  public getUserInfo(): UserInfo | null {
    return wx.getStorageSync(USER_INFO_KEY) || null
  }

  /**
   * 检查 token 是否有效
   */
  public isTokenValid(): boolean {
    const token = this.getToken()
    const expiresTime = wx.getStorageSync(EXPIRES_KEY) || 0

    // 检查 token 是否存在且未过期
    return !!token && Date.now() < expiresTime
  }

  /**
   * 退出登录
   */
  public logout(): void {
    // 清除存储的登录信息
    wx.removeStorageSync(TOKEN_KEY)
    wx.removeStorageSync(USER_INFO_KEY)
    wx.removeStorageSync(EXPIRES_KEY)
  }

  /**
   * 更新用户信息
   * @param userInfo 用户信息
   */
  public async updateUserInfo(userInfo: Partial<UserInfo>): Promise<UserInfo> {
    try {
      // 发送更新请求
      const result = await request.put<UserInfo>('/api/user/info', userInfo)

      // 更新本地存储的用户信息
      const oldUserInfo = this.getUserInfo() || {}
      const newUserInfo = { ...oldUserInfo, ...result }
      wx.setStorageSync(USER_INFO_KEY, newUserInfo)

      return newUserInfo
    } catch (error) {
      console.error('更新用户信息失败:', error)
      throw error
    }
  }
}

const userManager = UserManager.getInstance()

export default userManager
