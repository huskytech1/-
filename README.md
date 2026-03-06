# Web Screenshot Pro (网站长图捕获工具)

一个基于 Playwright 的专业级网页长图捕获工具，专为自动化、高清和长网页设计。

## 🚀 核心特性

- **自动化目录管理**：自动在用户下载目录（Downloads）创建按日期命名的文件夹（如 `截图0306`）。
- **智能滚动加载**：自动执行全页模拟滚动，确保懒加载（Lazy-load）图片完全渲染后再截图。
- **高清输出**：默认开启 2x 缩放（Retina 级别），文字和图片极其清晰。
- **超长页面支持**：针对超长网页优化，支持自定义超时时间（默认 90s）。
- **云端兼容**：内置无头浏览器优化参数，支持 Linux/Docker 等服务器环境运行。

## 📦 安装指南

在使用之前，请确保你的系统中已安装 [Node.js](https://nodejs.org/)。

```bash
# 1. 克隆仓库
git clone https://github.com/huskytech1/-.git
cd -

# 2. 安装依赖
npm install

# 3. 安装浏览器内核
npx playwright install chromium

# (可选) 如果是在 Linux 服务器运行，安装系统依赖库
npx playwright install-deps
```

## 🛠 使用方法

### 基础用法
执行脚本并提供 URL 和期望的文件名（不需要加 .png）：

```bash
node scripts/screenshot.js "https://www.pconline.com.cn" "太平洋科技"
```
*截图将保存至：`~/Downloads/截图MMDD/太平洋科技.png`*

### 进阶用法
你可以通过第三个参数指定自定义的基础保存目录：

```bash
node scripts/screenshot.js "https://google.com" "Google" "/your/custom/path"
```

## 🤖 作为 Claude Skill 使用

如果你使用的是 Claude Code 或类似的 Agent 环境，可以将此目录添加为 Skill。它会自动识别网页截图请求并按预设逻辑分类保存。

## 📄 开源协议

MIT License
