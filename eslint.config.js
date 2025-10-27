import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  // 忽略文件配置
  {
    ignores: [
      // 构建产物
      'dist/**',
      'dist-ssr/**',
      '*.local',
      // 依赖
      'node_modules/**',
      // 编辑器
      '.vscode/**',
      '!.vscode/extensions.json',
      '.idea/**',
      // 系统文件
      '.DS_Store',
      '*.suo',
      '*.ntvs*',
      '*.njsproj',
      '*.sln',
      '*.sw?',
      // 日志文件
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'pnpm-debug.log*',
      'lerna-debug.log*',
      // 配置文件（可选，如果不想检查配置文件）
      // '*.config.js',
      // '*.config.ts',
      // 公共资源
      'public/**',
      // 环境文件
      '.env',
      '.env.*',
    ],
  },

  // JavaScript 推荐规则
  js.configs.recommended,

  // TypeScript 推荐规则
  ...tseslint.configs.recommended,

  // Vue 3 推荐规则
  ...pluginVue.configs['flat/recommended'],

  // 全局配置
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // 浏览器环境
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        // Node 环境
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },

    rules: {
      // ===== Vue 规则 =====
      // 组件名称必须多单词
      'vue/multi-word-component-names': 'warn',
      // 组件定义名称使用 PascalCase
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      // 组件在模板中使用 PascalCase
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      // 要求 prop 名称使用 camelCase
      'vue/prop-name-casing': ['error', 'camelCase'],
      // 强制自定义事件名称使用 kebab-case
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      // 禁止在模板中使用 this
      'vue/this-in-template': ['error', 'never'],
      // 强制 v-bind 简写
      'vue/v-bind-style': ['error', 'shorthand'],
      // 强制 v-on 简写
      'vue/v-on-style': ['error', 'shorthand'],
      // 强制 v-slot 简写
      'vue/v-slot-style': ['error', 'shorthand'],
      // 要求组件的 props 有默认值
      'vue/require-default-prop': 'off',
      // HTML 属性排序
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
          ],
        },
      ],
      // 限制每行最大属性数量
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: { max: 3 },
          multiline: { max: 1 },
        },
      ],
      // HTML 缩进 2 空格
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
        },
      ],
      // HTML 结束标签换行
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'always',
        },
      ],
      // 单行元素内容换行
      'vue/singleline-html-element-content-newline': 'off',

      // ===== TypeScript 规则 =====
      // 允许使用 any 类型（开发初期可放宽）
      '@typescript-eslint/no-explicit-any': 'warn',
      // 允许未使用的变量（以 _ 开头）
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      // 不强制显式函数返回类型
      '@typescript-eslint/explicit-function-return-type': 'off',
      // 不强制显式模块边界类型
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // 允许使用 require
      '@typescript-eslint/no-require-imports': 'warn',

      // ===== JavaScript 基础规则 =====
      // 强制使用 === 和 !==
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      // 禁止使用 var
      'no-var': 'error',
      // 优先使用 const
      'prefer-const': 'error',
      // 优先使用箭头函数
      'prefer-arrow-callback': 'error',
      // 箭头函数简写
      'arrow-body-style': ['error', 'as-needed'],
      // 禁止 console（仅警告）
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // 禁止 debugger
      'no-debugger': 'error',
      // 禁止未使用的变量
      'no-unused-vars': 'off', // 使用 @typescript-eslint/no-unused-vars
      // 禁止重复导入
      'no-duplicate-imports': 'error',

      // ===== 代码风格规则 =====
      // 缩进 2 空格
      indent: ['error', 2, { SwitchCase: 1 }],
      // 单引号
      quotes: ['error', 'single', { avoidEscape: true }],
      // 要求分号
      semi: ['error', 'always'],
      // 逗号后空格
      'comma-spacing': ['error', { before: false, after: true }],
      // 对象键值间距
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      // 大括号风格
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      // 对象大括号内空格
      'object-curly-spacing': ['error', 'always'],
      // 数组方括号内空格
      'array-bracket-spacing': ['error', 'never'],
      // 函数括号前空格
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      // 最大行长度
      'max-len': [
        'warn',
        {
          code: 120,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      // 尾随逗号
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
  eslintPluginPrettierRecommended,
];
