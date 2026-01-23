# 🔧 Remote Debug CLI

一个基于终端的远程调试工具，通过 Socket.IO 连接浏览器客户端并执行调试命令。

## 🌟 功能特性

- **🖥️ 全屏终端界面** - 使用 React + Ink 构建的专业终端 UI
- **🌐 实时客户端管理** - 自动发现并管理连接的浏览器客户端
- **⚡ 远程命令执行** - 在选中的浏览器中执行 JavaScript 调试命令
- **📊 命令历史记录** - 保存和显示命令执行历史
- **🔌 Socket.IO 通信** - 实时双向通信，支持 CORS
- **🎯 TypeScript 支持** - 完整的类型定义和严格的类型检查

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 运行应用

```bash
npm start
```

## 📋 使用说明

1. **启动应用** - 运行 CLI 工具，Socket.IO 服务器将在端口 7890 启动
2. **连接客户端** - 浏览器访问任意页面并连接到 Socket.IO 服务器
3. **选择客户端** - 使用方向键从客户端列表中选择目标浏览器
4. **执行命令** - 在调试控制台中输入 JavaScript 命令并按回车执行
5. **查看结果** - 实时查看命令执行结果和历史记录

## 🏗️ 项目架构

```
source/
├── cli.tsx              # CLI 入口点
├── app.tsx              # 主应用组件
├── types/
│   └── types.ts         # 共享类型定义
├── components/
│   ├── client-list.tsx  # 客户端列表组件
│   └── content.tsx      # 调试控制台组件
└── socket/
    ├── socket-context.tsx # Socket 状态管理
    └── socket-server.ts   # Socket.IO 服务器实现
```

## 🛠️ 开发命令

### 代码质量

```bash
npm test          # 运行完整测试套件
prettier --write . # 格式化代码
xo --fix          # 修复 linting 问题
oxlint            # 额外 linting 检查
```

### 测试

```bash
ava               # 运行所有测试
ava --watch       # 监听模式测试
```

### 类型检查

```bash
tsc --noEmit      # 仅类型检查
```

## 📡 Socket.IO 协议

### 客户端连接

客户端连接时发送以下信息：

- `id` - 客户端唯一标识
- `url` - 当前页面 URL
- `userAgent` - 浏览器用户代理
- `title` - 页面标题
- `connectedAt` - 连接时间

### 命令执行

- **发送命令**: `exec_command` 事件
- **接收结果**: `debug_result` 事件

## 🎨 代码风格

- **文件命名**: kebab-case (`client-list.tsx`)
- **组件命名**: PascalCase (`ClientList`)
- **函数命名**: camelCase (`handleSelect`)
- **类型命名**: PascalCase (`ClientInfo`)
- **导入**: ES modules 带 `.js` 扩展名
- **格式化**: 制表符缩进，单引号，尾随逗号

## 🔧 技术栈

- **React 18.2.0** - UI 框架
- **Ink 4.1.0** - React 终端渲染器
- **Socket.IO 4.7.2** - 实时通信
- **TypeScript 5.0.3** - 类型系统
- **AVA** - 测试框架
- **XO** - Linting 工具
- **Prettier** - 代码格式化

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**远程调试 CLI 工具** - 让调试更简单 🚀
