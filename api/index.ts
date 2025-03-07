/**
 * API 模块索引
 * 统一导出所有 API 接口
 */

import * as userApi from './user'

export { userApi }

// 默认导出所有 API
export default {
  user: userApi,
}
