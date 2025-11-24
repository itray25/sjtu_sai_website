# SJTU SAI Website

上海交通大学学生人工智能学院学创中心网站项目。

## 技术栈

### 核心框架

- **Vue 3.5** - 渐进式 JavaScript 框架，采用 Composition API
- **TypeScript 5.9** - JavaScript 的超集，提供静态类型检查
- **Vite 7.1** - 新一代前端构建工具，基于原生 ES 模块

### UI 组件库

- **Naive UI 2.43** - 基于 Vue 3 的组件库，提供 TypeScript 类型支持和现代化设计
- **Vue Router 4** - Vue.js 官方路由管理器，支持单页面应用（SPA）导航
- **@vicons/ionicons5** - Ionicons 5 图标库，与 Naive UI 完美集成

### 代码质量工具

- **ESLint 9** - JavaScript/TypeScript 代码检查工具，采用 Flat Config
- **Prettier 3.6** - 代码格式化工具，与 ESLint 集成
- **TypeScript ESLint** - TypeScript 专用 ESLint 规则集
- **Vue ESLint Plugin** - Vue 单文件组件专用 ESLint 规则集

### 开发工具

- **vue-tsc** - Vue 3 TypeScript 类型检查工具
- **vite-plugin-eslint2** - Vite 开发时 ESLint 实时检查插件

## 系统要求

- **Node.js**: 20.19+ 或 22.12+
- **npm**: 10.0+

## 项目结构

```
sai_website/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD 配置
│       ├── eslint.yml      # ESLint 检查工作流
│       └── lint.yml        # Lint 自动修复工作流
├── public/                 # 静态资源目录
├── src/
│   ├── assets/            # 项目资源文件
│   ├── components/        # Vue 组件
│   ├── router/            # 路由配置
│   │   └── index.js      # 路由定义
│   ├── App.vue           # 根组件
│   ├── main.ts           # 应用入口
│   └── style.css         # 全局样式
├── .prettierignore        # Prettier 忽略配置
├── .prettierrc.json       # Prettier 格式化规则
├── eslint.config.js       # ESLint 配置（Flat Config 格式）
├── index.html            # HTML 入口文件
├── package.json          # 项目依赖和脚本
├── tsconfig.json         # TypeScript 配置
├── tsconfig.app.json     # 应用 TypeScript 配置
├── tsconfig.node.json    # Node.js TypeScript 配置
└── vite.config.ts        # Vite 构建配置
```

## 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/itray25/sjtu_sai_website.git
cd sjtu_sai_website
```

### 2. 安装依赖

```bash
npm install
```

该命令将安装 `package.json` 中声明的所有依赖项，包括生产依赖和开发依赖。

### 3. 启动开发服务器

```bash
npm run dev
```

开发服务器默认运行在 `http://localhost:5173`，支持热模块替换（HMR），代码修改后自动刷新。

## 开发指南

### 可用脚本

| 命令                   | 描述                               |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | 启动开发服务器，支持 HMR           |
| `npm run build`        | 构建生产版本，输出到 `dist/` 目录  |
| `npm run preview`      | 预览生产构建结果                   |
| `npm run lint`         | 检查代码规范问题                   |
| `npm run lint:fix`     | 自动修复可修复的代码规范问题       |
| `npm run format`       | 使用 Prettier 格式化代码           |
| `npm run format:check` | 检查代码格式是否符合 Prettier 规范 |

### 代码规范

#### ESLint 配置要点

项目采用 ESLint 9 的 Flat Config 格式，主要规则包括：

- **Vue 规则**：强制组件命名使用 PascalCase，Props 使用 camelCase
- **TypeScript 规则**：允许 `any` 类型（警告级别），强制未使用变量以 `_` 开头
- **代码风格**：2 空格缩进，单引号，使用分号，行长度限制 120 字符

#### Prettier 配置要点

```json
{
  "semi": true, // 使用分号
  "singleQuote": true, // 使用单引号
  "tabWidth": 2, // 2 空格缩进
  "printWidth": 120, // 行长度限制 120
  "trailingComma": "all" // 多行时尾随逗号
}
```

#### 工作流程建议

1. 编写代码前，确保开发服务器运行（`npm run dev`）
2. 提交代码前，运行 `npm run lint` 和 `npm run format:check`
3. 如有错误，运行 `npm run lint:fix` 和 `npm run format` 自动修复
4. 确保所有检查通过后再提交代码

### Vue Router 路由

#### 路由配置

路由配置位于 `src/router/index.js`：

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../components/About.vue'), // 懒加载
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

#### 在组件中使用

```vue
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 编程式导航
function goToAbout() {
  router.push('/about');
}

// 获取当前路由信息
console.log(route.path); // 当前路径
console.log(route.params); // 路由参数
</script>

<template>
  <!-- 声明式导航 -->
  <router-link to="/">首页</router-link>
  <router-link to="/about">关于</router-link>

  <!-- 路由出口 -->
  <router-view />
</template>
```

#### 路由守卫

```javascript
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 路由跳转前的逻辑
  console.log('导航到:', to.path);
  next();
});

// 全局后置钩子
router.afterEach((to, from) => {
  // 路由跳转后的逻辑
  document.title = to.meta.title || 'SJTU SAI';
});
```

### Naive UI 使用

#### 按需引入（推荐）

```vue
<script setup lang="ts">
import { NButton, NSpace, NCard } from 'naive-ui';
</script>

<template>
  <NSpace>
    <NButton type="primary">主要按钮</NButton>
    <NCard title="卡片标题">卡片内容</NCard>
  </NSpace>
</template>
```

#### 图标使用

```vue
<script setup lang="ts">
import { NIcon, NButton } from 'naive-ui';
import { HomeOutline, PersonOutline } from '@vicons/ionicons5';
</script>

<template>
  <!-- 在按钮中使用图标 -->
  <NButton>
    <template #icon>
      <NIcon>
        <HomeOutline />
      </NIcon>
    </template>
    首页
  </NButton>

  <!-- 单独使用图标 -->
  <NIcon :size="24" color="#18a058">
    <PersonOutline />
  </NIcon>
</template>
```

#### 全局配置

在 `App.vue` 中已配置 `NConfigProvider` 和 `NMessageProvider`，可直接在子组件中使用：

```vue
<script setup lang="ts">
import { useMessage } from 'naive-ui';

const message = useMessage();

const showSuccess = () => {
  message.success('操作成功');
};
</script>
```

### TypeScript 类型检查

项目启用了严格的 TypeScript 类型检查。在构建过程中，会先运行 `vue-tsc -b` 进行类型检查，确保类型安全。

常见类型定义：

```typescript
// 定义 Props
interface Props {
  title: string;
  count?: number; // 可选属性
}

defineProps<Props>();

// 定义 Emits
interface Emits {
  (e: 'update', value: string): void;
}

const emit = defineEmits<Emits>();
```

## 构建与部署

### 本地构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录，包含：

- 优化后的 JavaScript 和 CSS 文件
- 静态资源文件
- HTML 入口文件

### 预览构建结果

```bash
npm run preview
```

在本地启动一个静态服务器，预览构建后的应用。

## CI/CD

项目配置了 GitHub Actions 自动化工作流：

### Lint 自动修复工作流 (`.github/workflows/lint.yml`)

- **触发条件**：推送到 `main` 分支或 Pull Request
- **执行内容**：运行 ESLint 检查，自动修复问题并提交
- **特性**：自动修复格式问题并在 PR 中添加注释

## 常见问题

### 1. Node.js 版本不兼容

**问题**：启动时提示 Node.js 版本不符合要求

**解决**：使用 nvm 切换到兼容版本

```bash
nvm install 22
nvm use 22
```

### 2. 端口被占用

**问题**：`Port 5173 is in use`

**解决**：Vite 会自动尝试下一个可用端口（5174, 5175...），或手动指定端口：

```bash
npm run dev -- --port 3000
```

### 3. ESLint 检查失败

**问题**：提交代码时 CI/CD 失败

**解决**：本地运行检查和修复

```bash
npm run lint:fix
npm run format
```

### 4. TypeScript 类型错误

**问题**：构建时出现类型错误

**解决**：检查 `tsconfig.json` 配置，确保类型定义正确

```bash
npx vue-tsc --noEmit  # 仅检查类型，不生成文件
```

## 学习资源

### 官方文档

- [Vue 3 文档](https://cn.vuejs.org/)
- [Vite 文档](https://cn.vitejs.dev/)
- [Naive UI 文档](https://www.naiveui.com/zh-CN/os-theme)
- [TypeScript 文档](https://www.typescriptlang.org/zh/docs/)
- [ESLint 文档](https://eslint.org/docs/latest/)

### 推荐阅读

1. **Vue 3 Composition API**：理解 `<script setup>` 语法糖
2. **TypeScript 基础**：类型注解、接口、泛型
3. **Vite 原理**：ESM、HMR、构建优化
4. **代码规范**：ESLint 规则配置、Prettier 集成

## 开发环境配置

### VS Code 推荐插件

以下插件可以显著提升开发体验，建议全部安装：

#### 必装插件

1. **Vue - Official** (`Vue.volar`)
   - Vue 3 官方语言支持插件（原 Volar）
   - 提供 Vue 单文件组件（SFC）的语法高亮、智能提示、类型检查
   - 支持 `<script setup>` 语法糖和 TypeScript
   - 与 TypeScript 深度集成，提供完整的类型推断
   - **注意**：安装后需禁用 Vetur（Vue 2 插件）

2. **ESLint** (`dbaeumer.vscode-eslint`)
   - 集成 ESLint 代码检查工具
   - 实时显示代码规范问题和错误
   - 支持保存时自动修复（需配置）
   - 显示错误详情和修复建议
   - 与项目的 ESLint 配置自动同步

3. **Prettier - Code formatter** (`esbenp.prettier-vscode`)
   - 代码格式化工具
   - 支持保存时自动格式化
   - 与 ESLint 无冲突集成
   - 统一团队代码风格
   - 支持多种文件格式（JS/TS/Vue/CSS/JSON/Markdown）

4. **Error Lens** (`usernamehw.errorlens`)
   - 在代码行内直接显示错误和警告信息
   - 无需悬停即可查看问题
   - 支持自定义错误显示样式
   - 提高问题定位效率

### VS Code 配置

在项目根目录创建 `.vscode/settings.json`（已在项目中配置）：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "vue"],
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "vue.inlayHints.parameterTypes": true,
  "vue.inlayHints.parameterNames": "all",
  "vue.inlayHints.functionLikeReturnTypes": true,
  "files.eol": "\n"
}
```

### 配置说明

- `editor.formatOnSave`: 保存时自动格式化
- `editor.codeActionsOnSave`: 保存时自动运行 ESLint 修复
- `editor.defaultFormatter`: 设置 Prettier 为默认格式化工具
- `eslint.validate`: ESLint 检查的文件类型
- `typescript.tsdk`: 使用项目本地的 TypeScript 版本
- `vue.inlayHints.*`: 启用 Vue 类型提示
- `files.eol`: 统一使用 LF 换行符（跨平台兼容）

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

**注意事项：**

- 遵循项目代码规范
- 确保所有测试通过
- 更新相关文档

## 联系方式

- 仓库地址：[https://github.com/itray25/sjtu_sai_website](https://github.com/itray25/sjtu_sai_website)
- 问题反馈：[Issues](https://github.com/itray25/sjtu_sai_website/issues)

---
