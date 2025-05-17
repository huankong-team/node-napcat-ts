import { setTimeout } from 'node:timers/promises';

/**
 * HTTP请求选项接口
 */
interface HttpRequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  params?: Record<string, any>; // URL查询参数
}

/**
 * HTTP请求响应接口
 */
interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/**
 * HTTP客户端工具类
 * 封装了常用的HTTP请求方法
 */
export class HttpClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number;

  /**
   * 创建HTTP客户端实例
   * @param baseUrl 基础URL
   * @param defaultHeaders 默认请求头
   * @param defaultTimeout 默认超时时间(毫秒)
   */
  constructor(
    baseUrl: string = '',
    defaultHeaders: Record<string, string> = {},
    defaultTimeout: number = 30000
  ) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders
    };
    this.defaultTimeout = defaultTimeout;
  }

  /**
   * 格式化URL查询参数
   */
  private formatUrlParams(url: string, params?: Record<string, any>): string {
    if (!params) return url;

    const queryString = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
  }

  /**
   * 发送HTTP请求
   */
  private async request<T = any>(
    method: string,
    url: string,
    data?: any,
    options: HttpRequestOptions = {}
  ): Promise<HttpResponse<T>> {
    const { headers = {}, timeout = this.defaultTimeout, params } = options;

    // 格式化URL
    const fullUrl = this.formatUrlParams(
      url.startsWith('http') ? url : `${this.baseUrl}${url}`,
      params
    );

    // 准备请求配置
    const fetchOptions: RequestInit = {
      method,
      headers: { ...this.defaultHeaders, ...headers },
    };

    // 添加请求体
    if (data !== undefined) {
      const contentType = fetchOptions.headers?.['Content-Type'] || '';
      
      if (contentType.includes('application/json')) {
        fetchOptions.body = JSON.stringify(data);
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        fetchOptions.body = new URLSearchParams(data).toString();
      } else if (data instanceof FormData) {
        fetchOptions.body = data;
        // 使用FormData时，让浏览器自动设置Content-Type
        delete (fetchOptions.headers as any)['Content-Type'];
      } else {
        fetchOptions.body = data;
      }
    }

    // 添加超时控制
    const controller = new AbortController();
    fetchOptions.signal = controller.signal;
    
    const timeoutId = setTimeout(timeout).then(() => {
      controller.abort();
      throw new Error(`请求超时 - ${method} ${fullUrl} (${timeout}ms)`);
    });

    try {
      const response = await Promise.race([
        fetch(fullUrl, fetchOptions),
        timeoutId
      ]) as Response;

      // 处理响应头
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      let responseData: T;
      const contentType = response.headers.get('content-type') || '';
      
      if (contentType.includes('application/json')) {
        responseData = await response.json();
      } else if (contentType.includes('text/')) {
        responseData = await response.text() as unknown as T;
      } else {
        responseData = await response.blob() as unknown as T;
      }

      return {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error(`请求被中止 - ${method} ${fullUrl}`);
        }
        throw error;
      }
      throw new Error(`请求失败 - ${method} ${fullUrl}`);
    } finally {
      controller.abort(); // 确保超时Promise被取消
    }
  }

  /**
   * 发送GET请求
   */
  public async get<T = any>(
    url: string,
    options: HttpRequestOptions = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>('GET', url, undefined, options);
  }

  /**
   * 发送POST请求
   */
  public async post<T = any>(
    url: string,
    data?: any,
    options: HttpRequestOptions = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>('POST', url, data, options);
  }

  /**
   * 发送PUT请求
   */
  public async put<T = any>(
    url: string,
    data?: any,
    options: HttpRequestOptions = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>('PUT', url, data, options);
  }

  /**
   * 发送DELETE请求
   */
  public async delete<T = any>(
    url: string,
    data?: any,
    options: HttpRequestOptions = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>('DELETE', url, data, options);
  }

  /**
   * 发送PATCH请求
   */
  public async patch<T = any>(
    url: string,
    data?: any,
    options: HttpRequestOptions = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>('PATCH', url, data, options);
  }
}

// 创建默认导出的HTTP客户端实例
const http = new HttpClient();
export default http;
