# Dodoshark Project

本仓库包含 Dodoshark 官方网站的前端展示平台（Next.js）和后端内容管理系统（Sanity Studio）。

## 🚀 项目结构

项目分为两个主要部分，各自独立运行：

- `/front/dodoshark`: 基于 **Next.js 16** 和 **React 19** 的响应式前端应用。
- `/studio-dodoshark`: 基于 **Sanity Studio 5** 的 Headless CMS 后台，用于管理网站内容。

### 核心目录说明

| 路径 | 说明 |
| :--- | :--- |
| `front/dodoshark/app` | Next.js 路由和页面入口 |
| `front/dodoshark/components/page-builder` | 页面构建器相关的渲染组件及合并逻辑 |
| `front/dodoshark/components/ui` | 通用 UI 基础组件 |
| `front/dodoshark/app/lib` | Sanity 客户端获取数据的方法与配置 |
| `studio-dodoshark/schemaTypes` | Sanity 文档及对象模型的架构定义 |
| `studio-dodoshark/schemaTypes/objects/pageBuilder` | 页面构建器中具体 Block 的 Schema 定义 |

## 🛠️ 技术栈

### 前端 (Frontend)
- **框架**: Next.js 16 (App Router)
- **核心**: React 19
- **样式**: TailwindCSS 4, CSS Modules
- **轮播**: Swiper 12
- **部署**: 可部署至 Cloudflare Pages 或 Vercel

### 后端管理 (Sanity Studio)
- **框架**: Sanity Studio 5
- **功能**: 实时内容编辑、GraphQL 支持、自定义 Page Builder

## 🏃 快速开始

在开始之前，请确保你已经安装了 `pnpm`。

### 前端开发

```bash
cd front/dodoshark
pnpm install
pnpm run dev
```
访问: [http://localhost:3000](http://localhost:3000)

### 管理后台开发

```bash
cd studio-dodoshark
pnpm install
pnpm run dev
```
访问: [http://localhost:3333](http://localhost:3333)

## 🏗️ 页面构建器 (Page Builder) 与合并逻辑

该项目使用高度解耦的组件化管理。Sanity 中的 Block 与前端组件一一对应。

- **合并逻辑**: 其中包含 `mergeWithPreviousRichSection` 逻辑。当在“特性列表”中启用该功能时：
  - 前端会忽略 Block 标题。
  - 前端渲染器会根据背景和布局进行流式合并（查看 `MergedRichFeatureSection.tsx`）。
- **背景主题**: 共享背景样式定义在 `front/dodoshark/components/page-builder/backgroundTheme.ts` 中。

## 📝 开发规范

- **Schema 变更**: 修改 Studio 后，必须同步更新前端的 TypeScript 类型。
- **UI 对齐**: 尽量使用现有的 UI 组件和渲染方法。
- **响应式**: 任何改动都必须兼顾移动端和桌面端的布局体验。
- **发布流程**: 变更 Page Builder 相关的组件时，请务必同时检查独立渲染路径和合并后的渲染效果。

---

*更多详细的技术细节和操作规范，请参考 [AGENTS.md](./AGENTS.md)。*
