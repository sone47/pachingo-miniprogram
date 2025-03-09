/**
 * 通用类型定义
 */

/**
 * API 响应数据结构
 */
export interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

/**
 * 分页查询参数
 */
export interface PageParams {
  page?: number
  pageSize?: number
}

/**
 * 分页结果
 */
export interface PageResult<T> {
  list: T[]
  total: number
}
