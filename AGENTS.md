# AGENTS.md - 开发指南

## 命令

### 构建和开发

- `npm run build` - 编译 TypeScript 到 JavaScript (输出到 `dist/`)
- `npm run dev` - 监听模式编译，自动重建
- `tsc --noEmit` - 仅类型检查

### 代码质量

- `npm test` - 运行完整测试套件 (prettier + xo + ava)
- `prettier --write .` - 自动格式化所有文件
- `xo --fix` - 自动修复 linting 问题
- `oxlint` - 额外的 linting 检查

### 测试

- `ava` - 运行所有测试
- `ava test/specific-test.ts` - 运行单个测试文件
- `ava --watch` - 监听模式运行测试

## 代码风格指南

### 导入和模块

- 使用 ES 模块并带 `.js` 扩展名: `import Component from "./component.js"`
- React 导入: `import React from "react"`
- 类型导入: `import { Type } from "./types.js"`
- JSX 不需要默认 React 导入

### 命名约定

- **文件**: kebab-case (`client-list.tsx`, `socket-server.ts`)
- **组件**: PascalCase (`ClientList`, `Content`)
- **函数**: camelCase (`handleSelect`, `sendCommand`)
- **类型/接口**: PascalCase (`ClientInfo`, `DebugResult`)
- **钩子**: camelCase 带 'use' 前缀 (`useSocket`)
- **常量**: camelCase (`socketServer`, `selectedClientId`)

### 格式化 (Prettier)

- **缩进**: 制表符
- **引号**: 单引号
- **分号**: 始终需要
- **尾随逗号**: 所有位置
- **括号间距**: 禁用
- **箭头函数**: 单参数避免括号

### TypeScript 规则

- 严格模式启用 - 无隐式 any
- 无未使用的局部变量或参数
- 不需要显式返回类型 (推断)
- 导入强制一致的大小写
- 使用可选属性 (`prop?: type`) 实现灵活接口

### React 模式

- 带 TypeScript 的函数组件: `const Component: React.FC<Props> = ({ prop }) => {}`
- Props 接口: `interface ComponentProps { ... }`
- 上下文提供者用于全局状态管理
- 自定义钩子用于可重用逻辑
- 组件接受子项时使用 `PropsWithChildren`

### 错误处理

- 上下文钩子必须在提供者外部使用时抛出描述性错误
- 布尔返回值用于操作成功/失败
- 控制台日志用于调试 (服务器事件使用中文消息)
- 无空 catch 块 - 始终处理或记录错误

### 文件结构

```
source/
├── cli.tsx              # CLI 入口点
├── app.tsx              # 主应用组件
├── types/
│   └── types.ts         # 共享接口
├── components/
│   ├── client-list.tsx  # UI 组件
│   └── content.tsx
└── socket/
    ├── socket-context.tsx  # 状态管理
    └── socket-server.ts    # 业务逻辑
```

### Socket.IO 集成

- 服务器默认运行在 7890 端口
- 为浏览器客户端连接启用 CORS
- 客户端信息包括: id、url、userAgent、title、连接时间
- 命令通过 `exec_command` 事件发送，结果通过 `debug_result`

### 测试方法

- AVA 测试框架支持 TypeScript
- 测试文件在 `test/` 目录
- 组件测试使用 `ink-testing-library`
- 单元测试模拟 Socket.IO 连接

## 常见模式

### 组件模板

```typescript
import React from 'react';
import {Box, Text} from 'ink';

interface ComponentProps {
	prop: string;
}

const Component: React.FC<ComponentProps> = ({prop}) => {
	return (
		<Box>
			<Text>{prop}</Text>
		</Box>
	);
};

export default Component;
```

### 上下文钩子模板

```typescript
export const useCustomHook = () => {
	const context = useContext(CustomContext);
	if (!context) {
		throw new Error('必须在 CustomProvider 内使用 useCustomHook');
	}
	return context;
};
```

````

### Socket.IO 集成

- 服务器默认运行在 7890 端口
- 为浏览器客户端连接启用 CORS
- 客户端信息包括: id、url、userAgent、title、连接时间
- 命令通过 `exec_command` 事件发送，结果通过 `debug_result`

### 测试方法

- AVA 测试框架支持 TypeScript
- 测试文件在 `test/` 目录
- 组件测试使用 `ink-testing-library`
- 单元测试模拟 Socket.IO 连接

## 常见模式

### 组件模板

```typescript
import React from 'react';
import {Box, Text} from 'ink';

interface ComponentProps {
	prop: string;
}

const Component: React.FC<ComponentProps> = ({prop}) => {
	return (
		<Box>
			<Text>{prop}</Text>
		</Box>
	);
};

export default Component;
````

### 上下文钩子模板

```typescript
export const useCustomHook = () => {
	const context = useContext(CustomContext);
	if (!context) {
		throw new Error('必须在 CustomProvider 内使用 useCustomHook');
	}
	return context;
};
```
