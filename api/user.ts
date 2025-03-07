/**
 * 用户相关 API 接口
 */

import request from '../utils/request'
import { UserInfo, LoginResult, LoginParams } from './types/user'

/**
 * 用户登录
 * @param params 登录参数
 * @returns 登录结果
 */
export async function login(params: LoginParams): Promise<LoginResult> {
  return request.post<LoginResult>('/action/user/login', params)
}

/**
 * 获取用户信息
 * @returns 用户信息
 */
export async function getUserInfo(): Promise<UserInfo> {
  return request.get<UserInfo>('/action/user/profile')
}
