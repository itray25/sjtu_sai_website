# 开发规范

本文档定义 SJTU SAI Website 项目的开发规范和最佳实践。

## 代码风格

### TypeScript/JavaScript

#### 命名约定

- **文件名**：kebab-case（如 `user-profile.vue`）
- **组件名**：PascalCase（如 `UserProfile`）
- **函数名**：camelCase（如 `getUserData`）
- **常量**：UPPER_SNAKE_CASE（如 `API_BASE_URL`）
- **接口/类型**：PascalCase（如 `UserInfo`）

```typescript
// ✅ 推荐
interface UserInfo {
  userName: string;
  userId: number;
}

const MAX_RETRY_COUNT = 3;

function fetchUserData(): Promise<UserInfo> {
  // ...
}

// ❌ 不推荐
interface user_info {
  user_name: string;
  user_id: number;
}

const maxRetryCount = 3;

function FetchUserData(): Promise<user_info> {
  // ...
}
```

#### 类型定义

优先使用 `interface` 而非 `type`（除非需要联合类型或映射类型）：

```typescript
// ✅ 推荐
interface Props {
  title: string;
  count?: number;
}

// ✅ 联合类型场景
type Status = 'pending' | 'success' | 'error';

// ❌ 不推荐（简单对象应使用 interface）
type Props = {
  title: string;
  count?: number;
};
```

#### 避免 `any`

尽量避免使用 `any`，使用 `unknown` 或具体类型：

```typescript
// ✅ 推荐
function processData(data: unknown): string {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  return String(data);
}

// ❌ 不推荐
function processData(data: any): string {
  return data.toUpperCase();
}
```

### Vue 组件

#### 组件结构顺序

```vue
<script setup lang="ts">
// 1. 导入语句
import { ref, computed, onMounted } from 'vue';
import { NButton } from 'naive-ui';

// 2. 类型定义
interface Props {
  title: string;
}

interface Emits {
  (e: 'update', value: string): void;
}

// 3. Props 和 Emits
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 4. 响应式数据
const count = ref(0);
const isLoading = ref(false);

// 5. 计算属性
const doubleCount = computed(() => count.value * 2);

// 6. 方法
function increment() {
  count.value++;
  emit('update', String(count.value));
}

// 7. 生命周期钩子
onMounted(() => {
  console.log('Component mounted');
});
</script>

<template>
  <!-- 模板内容 -->
</template>

<style scoped>
/* 样式 */
</style>
```

#### Props 定义规范

```vue
<script setup lang="ts">
// ✅ 推荐：使用 TypeScript 接口
interface Props {
  title: string; // 必需属性
  count?: number; // 可选属性
  status?: 'active' | 'inactive'; // 联合类型
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  status: 'active',
});

// ❌ 不推荐：运行时声明（失去类型检查）
const props = defineProps({
  title: String,
  count: Number,
});
</script>
```

#### Emits 定义规范

```vue
<script setup lang="ts">
// ✅ 推荐：明确事件签名
interface Emits {
  (e: 'update:modelValue', value: string): void;
  (e: 'submit', data: FormData): void;
  (e: 'cancel'): void;
}

const emit = defineEmits<Emits>();

// 使用
emit('update:modelValue', 'new value');
emit('submit', formData);
emit('cancel');
</script>
```

#### Ref 引用规范

```vue
<script setup lang="ts">
import { ref } from 'vue';
import type { FormInst } from 'naive-ui';

// ✅ 推荐：明确类型
const formRef = ref<FormInst | null>(null);

function validateForm() {
  formRef.value?.validate((errors) => {
    // ...
  });
}
</script>

<template>
  <NForm ref="formRef">
    <!-- 表单内容 -->
  </NForm>
</template>
```

### CSS/SCSS

#### 选择器命名

使用 BEM 命名规范（Block Element Modifier）：

```css
/* ✅ 推荐 */
.user-card {
}
.user-card__header {
}
.user-card__title {
}
.user-card__title--large {
}
.user-card--featured {
}

/* ❌ 不推荐 */
.userCard {
}
.user-card-header {
}
.title {
}
```

#### 使用 scoped 样式

```vue
<style scoped>
/* 组件私有样式 */
.user-profile {
  padding: 20px;
}

/* 深度选择器（修改子组件样式） */
:deep(.n-button) {
  font-size: 14px;
}

/* 全局样式（谨慎使用） */
:global(.app-container) {
  max-width: 1200px;
}
</style>
```

#### CSS 变量

```css
:root {
  --primary-color: #18a058;
  --text-color: #333;
  --border-radius: 4px;
}

.button {
  background-color: var(--primary-color);
  color: var(--text-color);
  border-radius: var(--border-radius);
}
```

## Git 提交规范

### Commit Message 格式

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type 类型

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 重构（不增加功能也不修复 Bug）
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建工具或辅助工具的变动
- `ci`: CI/CD 配置更新

#### 示例

```bash
# 新功能
git commit -m "feat(user): add user profile page"

# 修复 Bug
git commit -m "fix(login): resolve authentication timeout issue"

# 文档更新
git commit -m "docs: update deployment guide"

# 重构
git commit -m "refactor(utils): simplify date formatting logic"

# 破坏性变更（Breaking Change）
git commit -m "feat(api)!: change API response structure

BREAKING CHANGE: API now returns data in nested format"
```

### 分支管理

#### 分支命名规范

- `main`: 生产分支
- `develop`: 开发分支
- `feature/<name>`: 功能分支
- `fix/<name>`: 修复分支
- `hotfix/<name>`: 紧急修复分支
- `release/<version>`: 发布分支

#### 工作流程

```bash
# 1. 从 develop 创建功能分支
git checkout develop
git pull origin develop
git checkout -b feature/user-profile

# 2. 开发并提交
git add .
git commit -m "feat(user): implement user profile component"

# 3. 推送分支
git push origin feature/user-profile

# 4. 创建 Pull Request 到 develop
# 5. Code Review 通过后合并
# 6. 删除功能分支
git branch -d feature/user-profile
```

## 组件开发规范

### 组件设计原则

1. **单一职责**：每个组件只负责一个功能
2. **可复用**：通过 Props 和 Slots 提供灵活性
3. **可组合**：支持组件嵌套和组合
4. **可测试**：逻辑与视图分离

### 组件目录结构

```
components/
├── common/              # 通用组件
│   ├── Button/
│   │   ├── Button.vue
│   │   ├── types.ts
│   │   └── index.ts
│   └── Input/
├── layout/              # 布局组件
│   ├── Header.vue
│   ├── Footer.vue
│   └── Sidebar.vue
└── business/            # 业务组件
    └── UserCard/
        ├── UserCard.vue
        ├── UserAvatar.vue
        └── types.ts
```

### 组件示例

```vue
<!-- components/common/Button/Button.vue -->
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  type?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

interface Emits {
  (e: 'click', event: MouseEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
});

const emit = defineEmits<Emits>();

const buttonClass = computed(() => {
  return [
    'app-button',
    `app-button--${props.type}`,
    `app-button--${props.size}`,
    {
      'app-button--disabled': props.disabled,
      'app-button--loading': props.loading,
    },
  ];
});

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
}
</script>

<template>
  <button :class="buttonClass" :disabled="disabled || loading" @click="handleClick">
    <span v-if="loading" class="app-button__loading">
      <!-- Loading icon -->
    </span>
    <slot />
  </button>
</template>

<style scoped>
.app-button {
  /* 基础样式 */
}

.app-button--primary {
  /* Primary 样式 */
}

.app-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

## API 调用规范

### 统一封装

```typescript
// src/api/request.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 统一错误处理
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);

export default instance;
```

### API 模块化

```typescript
// src/api/user.ts
import request from './request';

export interface UserInfo {
  id: number;
  name: string;
  email: string;
}

export const userApi = {
  // 获取用户信息
  getUserInfo(userId: number): Promise<UserInfo> {
    return request.get(`/users/${userId}`);
  },

  // 更新用户信息
  updateUserInfo(userId: number, data: Partial<UserInfo>): Promise<UserInfo> {
    return request.put(`/users/${userId}`, data);
  },
};
```

### 在组件中使用

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { userApi, type UserInfo } from '@/api/user';

const userInfo = ref<UserInfo | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

async function fetchUser() {
  loading.value = true;
  error.value = null;

  try {
    userInfo.value = await userApi.getUserInfo(1);
  } catch (err) {
    error.value = '获取用户信息失败';
    console.error(err);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchUser();
});
</script>
```

## 状态管理

### 使用 Composables（推荐）

```typescript
// src/composables/useUser.ts
import { ref, readonly } from 'vue';
import { userApi, type UserInfo } from '@/api/user';

const userInfo = ref<UserInfo | null>(null);
const loading = ref(false);

export function useUser() {
  async function fetchUser(userId: number) {
    loading.value = true;
    try {
      userInfo.value = await userApi.getUserInfo(userId);
    } finally {
      loading.value = false;
    }
  }

  return {
    userInfo: readonly(userInfo),
    loading: readonly(loading),
    fetchUser,
  };
}
```

### 使用 Pinia（复杂状态）

```typescript
// src/stores/user.ts
import { defineStore } from 'pinia';
import { userApi, type UserInfo } from '@/api/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null as UserInfo | null,
    loading: false,
  }),

  getters: {
    isLoggedIn: (state) => state.userInfo !== null,
    userName: (state) => state.userInfo?.name ?? '',
  },

  actions: {
    async fetchUser(userId: number) {
      this.loading = true;
      try {
        this.userInfo = await userApi.getUserInfo(userId);
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.userInfo = null;
    },
  },
});
```

## 性能优化

### 组件懒加载

```typescript
// router/index.ts
const routes = [
  {
    path: '/about',
    component: () => import('@/views/About.vue'),
  },
];
```

### 使用 `v-memo` 优化列表渲染

```vue
<template>
  <div v-for="item in list" :key="item.id" v-memo="[item.id, item.name]">
    {{ item.name }}
  </div>
</template>
```

### 避免不必要的响应式

```typescript
// ✅ 推荐：非响应式数据使用普通变量
const CONSTANTS = {
  MAX_SIZE: 100,
  API_URL: 'https://api.example.com',
};

// ❌ 不推荐：常量不需要响应式
const constants = reactive({
  MAX_SIZE: 100,
  API_URL: 'https://api.example.com',
});
```

## 测试规范

### 单元测试

```typescript
// Button.spec.ts
import { mount } from '@vue/test-utils';
import Button from './Button.vue';

describe('Button', () => {
  it('renders properly', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary' },
      slots: { default: 'Click me' },
    });

    expect(wrapper.text()).toContain('Click me');
    expect(wrapper.classes()).toContain('app-button--primary');
  });

  it('emits click event', async () => {
    const wrapper = mount(Button);
    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('disabled state', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });
});
```

## 文档规范

### 组件文档

```typescript
/**
 * 用户卡片组件
 *
 * @example
 * <UserCard
 *   :user="userInfo"
 *   @edit="handleEdit"
 * />
 */

interface Props {
  /** 用户信息 */
  user: UserInfo;
  /** 是否显示编辑按钮 */
  showEdit?: boolean;
}
```

### 函数文档

```typescript
/**
 * 格式化日期
 *
 * @param date - 日期对象或时间戳
 * @param format - 格式字符串，默认 'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 *
 * @example
 * formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
 * // => '2024-01-01 12:00:00'
 */
function formatDate(date: Date | number, format = 'YYYY-MM-DD'): string {
  // ...
}
```

## 代码审查清单

在提交 Pull Request 前，请确认：

- [ ] 代码符合项目命名规范
- [ ] 所有函数和组件都有必要的类型定义
- [ ] ESLint 和 Prettier 检查通过
- [ ] 没有使用 `any` 类型（除非必要）
- [ ] 组件 Props 和 Emits 定义清晰
- [ ] 添加了必要的注释和文档
- [ ] Commit Message 符合规范
- [ ] 删除了 console.log 和调试代码
- [ ] 测试通过（如有）

---

如有疑问或建议，请在团队内讨论或提出 Issue。
