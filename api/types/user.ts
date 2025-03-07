/**
 * 用户相关类型定义
 */

/**
 * 用户信息接口
 */
export interface UserInfo {
  id: string
  username: string
  desireValue: number
}

/**
 * 登录结果接口
 */
export interface LoginResult {
  accessToken: string
}

/**
 * 登录参数接口
 */
export interface LoginParams {
  username: string
  password: string
}
