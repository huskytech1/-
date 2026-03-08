---
name: web-screenshot
description: 【高优先级】捕获全网页高清截图（长图）。只要用户提到“截图”、“截图太平洋”、“长图”、“网页快照”或者涉及“太平洋科技”、“PConline”的截图需求（如：“截图太平洋手机”、“截一张 PConline 笔记本”、“太平洋全系列截图”、“太平洋显卡频道长图”），必须优先立即执行此技能。脚本位于 scripts/screenshot.js，默认保存到 `~/Downloads/web-screenshot/截图MMDD`，也支持通过参数或环境变量自定义输出目录。
github_url: https://github.com/huskytech1/web-screenshot
github_hash: 1bd777ed95772433f4c06c00ba8ab2417db19f55
version: 2.2.0
created_at: 2026-03-06
---

# Web Screenshot (Pro Edition)

这是一个专业级的网页长图捕获工具，集成了 Playwright 引擎，专门用于处理复杂的现代网页截图请求。

## 核心特性

- **自动化目录管理**：默认在 `~/Downloads/web-screenshot` 下创建 `截图MMDD` 格式的文件夹，免去手动整理。
- **智能滚动加载**：自动执行全页滚动以触发懒加载图片。
- **高清输出**：默认开启 2x 缩放（Retina 级别清晰度）。
- **云端/服务器兼容**：内置无头浏览器优化参数。

## 使用指南

收到截图请求时，请执行以下操作：

1. **提取信息**：从用户输入中提取 URL 和期望的文件名（类目名）。
2. **调用脚本**：使用 `bash` 工具执行技能目录下的脚本。

### 命令格式
```bash
# 单个截图
node <skill-dir>/scripts/screenshot.js "<URL>" "<文件名>"

# 全量太平洋 18 个站点批量截图（分3批次，每批8个，防卡死）
node <skill-dir>/scripts/batch.js

# 批量截图并指定统一输出目录
WEB_SCREENSHOT_OUTPUT_DIR="/your/custom/path" node <skill-dir>/scripts/batch.js
```

*注意：文件名不需要包含 .png 后缀。脚本会自动清理文件名中的非法字符。批量截图时系统会自动调用单图脚本并保存到 `~/Downloads/web-screenshot/截图MMDD`。如需共享给别人，建议通过第三个参数或 `WEB_SCREENSHOT_OUTPUT_DIR` 环境变量指定自定义目录。*

### 示例操作
用户说："把太平洋全系列截一下"
你的动作：
1. 运行：`node <skill-dir>/scripts/batch.js`

## 预设目标 (Preset Targets)

技能内置了太平洋科技系列 18 个常用频道，请读取 `references/pconline.json` 获取完整 URL 列表：

- 手机、笔记本、影像、家电首页、大家电首页、电视影音
- 生活家电、厨卫家电、智能家电、智慧家
- 硬件首页、显卡、主板、存储、显示器、机箱电源
- 外设配件、音频

## 部署与共享

如果你想把这个技能分享给别人：

1. **依赖安装**：在技能根目录执行 `npm install && npx playwright install chromium`
2. **系统库 (Linux/云端)**：如果运行报错，请执行 `npx playwright install-deps` 安装底层依赖

## 输出结果

截图完成后，脚本会打印保存路径。请将路径反馈给用户。
