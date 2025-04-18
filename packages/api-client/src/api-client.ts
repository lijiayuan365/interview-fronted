import { HttpClient } from './http-client';

// 默认配置
const DEFAULT_BASE_URL = 'http://localhost:3000';

// 创建全局 HTTP 客户端实例
export const httpClient = new HttpClient({
  baseUrl: DEFAULT_BASE_URL,
});

// 配置基础 URL
export function configureApi(baseURL: string) {
  httpClient.baseUrl = baseURL;
}

// 导出预配置的 API 实例
import { HelloWorld } from './HelloWorld';

// 预配置的 API 实例
export const helloWorld = new HelloWorld(httpClient);
