/**
 * 网络请求工具
 * 封装微信小程序的网络请求API
 */

import userManager from './user'
import type { ResponseData } from '../api/types/common'

// 声明微信小程序的类型
declare const wx: {
  request: (options: any) => void
  getStorageSync: (key: string) => any
  removeStorageSync: (key: string) => void
  navigateTo: (options: { url: string }) => void
  showLoading: (options: { title: string; mask?: boolean }) => void
  hideLoading: () => void
  showToast: (options: {
    title: string
    icon?: 'success' | 'error' | 'loading' | 'none'
    duration?: number
    mask?: boolean
  }) => void
}

// 请求方法类型
type Method = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'

// 请求选项接口
interface RequestOptions {
  url: string
  method?: Method
  data?: any
  header?: Record<string, string>
  timeout?: number
  enableCache?: boolean
  enableHttp2?: boolean
  enableQuic?: boolean
}

// 微信请求成功回调结果
interface WxRequestSuccessCallbackResult {
  data: any
  statusCode: number
  header: Record<string, string>
  cookies: string[]
  profile?: {
    redirectStart: number
    redirectEnd: number
    fetchStart: number
    domainLookupStart: number
    domainLookupEnd: number
    connectStart: number
    connectEnd: number
    SSLconnectionStart: number
    SSLconnectionEnd: number
    requestStart: number
    requestEnd: number
    responseStart: number
    responseEnd: number
    rtt: number
    estimate_nettype: number
    httpRttEstimate: number
    transportRttEstimate: number
    downstreamThroughputKbpsEstimate: number
    throughputKbps: number
    peerIP: string
    port: number
    socketReused: boolean
    sendBytesCount: number
    receivedBytedCount: number
    protocol: string
  }
}

// 微信请求失败回调结果
interface WxRequestFailCallbackResult {
  errMsg: string
}

/**
 * 网络请求类
 */
class Request {
  // TODO 根据环境配置不同的URL
  private baseURL: string = 'http://localhost:3000'

  /**
   * 构造函数
   * @param baseURL 基础URL
   */
  constructor(baseURL?: string) {
    if (baseURL) {
      this.baseURL = baseURL
    }
  }

  /**
   * 请求拦截器
   * @param options 请求参数
   * @returns 处理后的请求参数
   */
  private requestInterceptor(options: RequestOptions): RequestOptions {
    // 获取 token
    const token = userManager.getToken()
    const header: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.header,
    }

    // 如果有 token，添加到请求头
    if (token) {
      header['Authorization'] = `Bearer ${token}`
    }

    return {
      ...options,
      header,
    }
  }

  /**
   * 响应拦截器
   * @param response 响应结果
   * @returns 处理后的响应结果
   */
  private responseInterceptor<T>(response: WxRequestSuccessCallbackResult): Promise<T> {
    const { statusCode, data } = response

    // 请求成功
    if (statusCode >= 200 && statusCode < 300) {
      // 这里可以根据业务状态码进行处理
      const responseData = data as ResponseData<T>
      if (responseData.code === 0) {
        return Promise.resolve(responseData.data)
      }

      // 处理业务错误
      const error = new Error(responseData.message || '请求失败')
      return Promise.reject(error)
    }

    // 处理HTTP错误
    let message = data.message
    switch (statusCode) {
      case 401:
        message = data.message || '未授权，请重新登录'
        if (!this.isLoginPage()) {
          wx.removeStorageSync('token')
          wx.navigateTo({ url: '/pages/login/login' })
        }
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求错误，未找到该资源'
        break
      case 500:
        message = '服务器错误'
        break
      default:
        message = data.message || `请求失败(${statusCode})`
    }

    const error = new Error(message)
    return Promise.reject(error)
  }

  /**
   * 网络请求
   * @param options 请求参数
   * @returns Promise
   */
  request<T = any>(options: RequestOptions): Promise<T> {
    // 显示加载提示
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })

    // 合并请求参数
    const mergedOptions = this.requestInterceptor({
      ...options,
      url: options.url.indexOf('http') === 0 ? options.url : `${this.baseURL}${options.url}`,
      method: options.method || 'GET',
    })

    return new Promise<T>((resolve, reject) => {
      wx.request({
        ...mergedOptions,
        success: (res: WxRequestSuccessCallbackResult) => {
          // 隐藏加载提示
          wx.hideLoading()
          this.responseInterceptor<T>(res)
            .then(resolve)
            .catch(error => {
              // 显示错误提示
              wx.showToast({
                title: error.message || '请求失败',
                icon: 'error',
                duration: 2000,
              })
              reject(error)
            })
        },
        fail: (err: WxRequestFailCallbackResult) => {
          // 隐藏加载提示
          wx.hideLoading()
          // 显示错误提示
          wx.showToast({
            title: err.errMsg || '网络请求失败',
            icon: 'error',
            duration: 2000,
          })
          reject(new Error(err.errMsg || '网络请求失败'))
        },
      })
    })
  }

  /**
   * GET请求
   * @param url 请求地址
   * @param data 请求参数
   * @param options 其他选项
   * @returns Promise
   */
  get<T = any>(url: string, data?: any, options?: Omit<RequestOptions, 'url' | 'method' | 'data'>): Promise<T> {
    return this.request<T>({
      url,
      method: 'GET',
      data,
      ...options,
    })
  }

  /**
   * POST请求
   * @param url 请求地址
   * @param data 请求参数
   * @param options 其他选项
   * @returns Promise
   */
  post<T = any>(url: string, data?: any, options?: Omit<RequestOptions, 'url' | 'method' | 'data'>): Promise<T> {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...options,
    })
  }

  /**
   * PUT请求
   * @param url 请求地址
   * @param data 请求参数
   * @param options 其他选项
   * @returns Promise
   */
  put<T = any>(url: string, data?: any, options?: Omit<RequestOptions, 'url' | 'method' | 'data'>): Promise<T> {
    return this.request<T>({
      url,
      method: 'PUT',
      data,
      ...options,
    })
  }

  /**
   * DELETE请求
   * @param url 请求地址
   * @param data 请求参数
   * @param options 其他选项
   * @returns Promise
   */
  delete<T = any>(url: string, data?: any, options?: Omit<RequestOptions, 'url' | 'method' | 'data'>): Promise<T> {
    return this.request<T>({
      url,
      method: 'DELETE',
      data,
      ...options,
    })
  }

  /**
   * 设置基础URL
   * @param baseURL 基础URL
   */
  setBaseURL(baseURL: string): void {
    this.baseURL = baseURL
  }

  /**
   * 获取基础URL
   * @returns 基础URL
   */
  getBaseURL(): string {
    return this.baseURL
  }

  /**
   * 检查当前页面是否是登录页
   * @returns 是否是登录页
   */
  isLoginPage() {
    const pages = getCurrentPages()
    if (pages && pages.length > 0) {
      const currentPage = pages[pages.length - 1]
      return currentPage.route === 'pages/login/login'
    }
    return false
  }
}

// 创建单例实例
const request = new Request()

// 导出单例实例
export default request
