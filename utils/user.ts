import type { LoginResult, LoginParams } from '@/api/types/user'
import { userApi } from '@/api/index'

// 存储键名
const TOKEN_KEY = 'user_token'

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
      // 构建登录参数
      const params: LoginParams = {
        username,
        password,
      }

      // 使用 API 模块发送登录请求
      const result = await userApi.login(params)

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
    const { accessToken } = loginResult

    // 存储 token
    wx.setStorageSync(TOKEN_KEY, accessToken)
  }

  /**
   * 获取存储的 token
   */
  public getToken(): string {
    return wx.getStorageSync(TOKEN_KEY) || ''
  }

  /**
   * 退出登录
   */
  public logout(): void {
    // 清除存储的登录信息
    wx.removeStorageSync(TOKEN_KEY)
  }
}

const userManager = UserManager.getInstance()

export default userManager
