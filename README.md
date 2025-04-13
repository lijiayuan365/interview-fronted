# 微前端 Monorepo 项目

基于 pnpm workspace 的微前端项目基础结构。

## 项目结构

```
├── apps                    # 应用目录
│   ├── main-app           # 主应用
│   ├── sub-app1           # 子应用1
│   └── sub-app2           # 子应用2
├── packages                # 共享包目录
│   └── utils              # 共享工具库
├── pnpm-workspace.yaml    # 工作区配置
└── package.json           # 根配置文件
```

## 开发指南

### 环境要求

- Node.js >= 16
- pnpm >= 7

### 安装依赖

```bash
pnpm install
```

### 开发命令

```bash
# 开发所有应用和包
pnpm dev

# 构建所有应用和包
pnpm build

# 只开发某个应用
pnpm --filter main-app dev
```

## 添加依赖

```bash
# 向根目录添加开发依赖
pnpm add -Dw typescript

# 向特定应用添加依赖
pnpm --filter main-app add react

# 向特定应用添加工作区内的依赖
pnpm --filter main-app add @微前端/shared-ui
``` 