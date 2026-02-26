为了方便其他开源开发者快速上手并参与到 **SafeMask Hub** 的构建中，我为您起草了一份高标准的 **运行与环境配置指南 (Getting Started Guide)**。

这份说明采用了大厂常用的文档结构，逻辑清晰、步骤严谨。

---

# 🛡️ SafeMask Hub 开源贡献指南

欢迎加入 **SafeMask Hub** 社区！本项目致力于构建全球首个 AI 友好型脱敏规则广场。本项目采用 **Next.js (React)** 作为前端框架，并集成了由 **Rust** 编译的 **WebAssembly (WASM)** 脱敏内核，以确保网页端与桌面端逻辑 100% 绝对一致。

## 📋 环境要求 (Prerequisites)

在开始之前，请确保您的开发环境已安装以下工具：

- **Node.js**: v18.17.0 或更高版本
- **Rust**: 2024 Edition (stable)
- **wasm-pack**: 用于将 Rust 编译为 WASM (`cargo install wasm-pack`)
- **Git**

## 📂 项目结构 (Project Structure)

```text
safemask-hub/
├── app/                # Next.js App Router 页面与路由
├── src/
│   ├── components/     # 可复用 React 组件 (采用 Atomic Design 规范)
│   ├── hooks/          # 自定义 React Hooks (含 WASM 加载器)
│   ├── types/          # TypeScript 类型定义
│   └── lib/
│       └── wasm/       # WASM 编译产物存放处 (pkg 内容)
├── wasm-core/          # Rust 脱敏内核源代码 (WASM 专用适配层)
└── tailwind.config.ts  # 琥珀象牙主题配置
```

## 🚀 快速启动步骤 (Quick Start)

### 1. 克隆仓库与依赖安装
```bash
git clone https://github.com/AiToByte/SafeMask-Hub.git
cd SafeMask-Hub
npm install
```

### 2. 编译 Rust WASM 内核
为了实现网页端的实时仿真功能，必须先编译 Rust 内核：
```bash
# 进入 WASM 内核目录
cd wasm-core

# 编译为 Web 目标产物
wasm-pack build --target web

# 返回根目录并将产物同步至前端目录
cd ..
mkdir -p src/lib/wasm
cp -r wasm-core/pkg/* src/lib/wasm/
```

### 3. 启动 Next.js 开发宇宙
```bash
npm run dev
```
打开浏览器访问 [http://localhost:3000](http://localhost:3000)。

## 🧪 核心功能测试

### 1. 实时仿真沙盒 (Live Sandbox)
在首页的“仿真实验室”中输入任意文本。该功能不请求任何后端 API，完全通过 `src/lib/wasm` 中的 Rust 内核在您浏览器内存中实时计算。

### 2. 深度链接测试 (Deep Link)
点击规则卡片上的 **“一键导入”** 按钮。
- **预期行为**：浏览器会尝试唤起 URL `safemask://import?...`。
- **前提**：您本地需要已安装并运行 **SafeMask 桌面端 (v1.2.0+)**。

## 🛠️ 贡献规范 (Contribution Standards)

为了保持“大厂标杆”级的设计，请遵循：
- **类型安全**：所有新增数据必须在 `src/types` 中定义接口。
- **视觉一致性**：强制使用 `Tailwind CSS`，并优先复用 `tailwind.config.ts` 中定义的 `amber-500` (琥珀色) 与 `background` (深咖黑)。
- **WASM 同构**：若需修改脱敏匹配算法，请统一在 `wasm-core/src/engine.rs` 中修改，以保证全平台一致性。

## 📄 许可协议
本项目采用 [MIT License](LICENSE) 协议开源。

---

**XiaoSheng** 倾力打造 | 让每一行数据，都能安全地拥抱 AI。

---