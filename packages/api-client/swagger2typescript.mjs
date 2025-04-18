import { generateApi } from'swagger-typescript-api';
import  path from 'node:path';
import fs from 'node:fs';
const SWAGGER_URL = 'http://localhost:3000/api/docs-json';
const OUTPUT_PATH = path.resolve(process.cwd(), './src');

// 配置选项
const config = {
  name: 'index.ts', // 入口文件名
  output: OUTPUT_PATH, // 输出目录
  url: SWAGGER_URL, // Swagger JSON 地址
  generateClient: true, // 生成 API 客户端
  // httpClientType: 'fetch', // 使用 fetch
  generateRouteTypes: true, // 生成路由类型
  generateResponses: true, // 生成响应类型
  unwrapResponseData: true, // 解包响应数据
  modular: true, // 启用模块化生成
  moduleNameFirstTag: true, // 使用第一个 tag 作为模块名
  singleHttpClient: true, // 使用单一 HTTP 客户端实例
  cleanOutput: true, // 生成前清理输出目录
  enumNamesAsValues: true, // 枚举使用命名值
  extractRequestParams: true, // 提取请求参数
  extractResponseBody: true, // 提取响应体
  extractResponseError: true, // 提取错误响应
  hooks: {
    onCreateRoute: (routeData) => {
      // 可以在这里自定义路由处理逻辑
      return routeData;
    },
  },
  templates: path.resolve(process.cwd(), './api-templates'), // 指定模板目录
};

// 生成 API
generateApi(config)
  .then(({ files, configuration }) => {
    console.log('API 生成完成!');
    
    // 添加自定义的导出逻辑和客户端初始化代码
    addCustomFiles(config.output);
  })
  .catch((e) => {
    console.error('API 生成失败:', e);
    process.exit(1);
  });

/**
 * 创建统一的导出文件和客户端初始化文件
 */
function addCustomFiles(outputPath) {
  // 创建客户端初始化文件
  let clientContent = `
import { HttpClient } from './http-client';

// 默认配置
const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 创建全局 HTTP 客户端实例
export const httpClient = new HttpClient({
  baseUrl: DEFAULT_BASE_URL,
});

// 配置基础 URL
export function configureApi(baseURL: string) {
  httpClient.baseUrl = baseURL;
}

// 导出预配置的 API 实例
`;

  // 获取所有生成的模块文件
  const moduleFiles = fs.readdirSync(outputPath)
    .filter(file => 
      file.endsWith('.ts') 
      && file !== 'index.ts' 
      && file !== 'http-client.ts' 
      && file !== 'data-contracts.ts'
      && !file.endsWith('Route.ts')
    )
    .map(file => file.replace('.ts', ''));

  // 添加每个 API 类的预配置实例
  moduleFiles.forEach(module => {
    // Convert kebab-case to PascalCase for module names
    clientContent += `import { ${module} } from './${module}';\n`;
  });
  
  clientContent += '\n// 预配置的 API 实例\n';
  moduleFiles.forEach(module => {
    clientContent += `export const ${module.charAt(0).toLowerCase() + module.slice(1)} = new ${module}(httpClient);\n`;
  });

  // 写入客户端初始化文件
  fs.writeFileSync(path.join(outputPath, 'api-client.ts'), clientContent);

  // 更新统一导出文件
  let exportContent = `// 自动生成的 API 统一导出文件\n\n`;
  exportContent += `export * from './api-client';\n`;
  moduleFiles.forEach(module => {
    exportContent += `export * from './${module}';\n`;
  });
  exportContent += `export * from './http-client';\n`;

  // 写入导出文件
  fs.writeFileSync(path.join(outputPath, 'index.ts'), exportContent);
  console.log(`自定义文件已创建完成`);
}