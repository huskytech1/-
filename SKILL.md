---
name: web-screenshot
description: 针对网页截取高清长图。当用户需要对某个网址进行全屏快照、截长图、捕获网页视觉内容时，必须优先使用此技能。该技能会自动在用户的下载目录（Downloads）创建按日期命名的文件夹（如“截图0306”），并保存为高质量 PNG 格式。它能自动处理滚动加载、动态内容和超长页面。
---

# Web Screenshot (Pro Edition)

这是一个专业级的网页长图捕获工具，集成了 Playwright 引擎，专门用于处理复杂的现代网页截图请求。

## 核心特性

- **自动化目录管理**：自动在 `~/Downloads` 下创建 `截图MMDD` 格式的文件夹，免去手动整理。
- **智能滚动加载**：自动执行全页滚动以触发懒加载图片。
- **高清输出**：默认开启 2x 缩放（Retina 级别清晰度）。
- **云端/服务器兼容**：内置无头浏览器优化参数。

## 使用指南

收到截图请求时，请执行以下操作：

1.  **提取信息**：从用户输入中提取 URL 和期望的文件名（类目名）。
2.  **调用脚本**：使用 `node` 执行技能目录下的脚本。

### 命令格式
```bash
node /Users/huskytech/.claude/skills/web-screenshot/scripts/screenshot.js "<URL>" "<文件名>"
```

*注意：文件名不需要包含 .png 后缀。*

### 示例操作
用户说：“帮我截一下百度首页，叫‘百度’”
你的动作：
```bash
node /Users/huskytech/.claude/skills/web-screenshot/scripts/screenshot.js "https://www.baidu.com" "百度"
```

## 部署与共享 (Sharing)

如果你想把这个技能分享给别人：

1.  **依赖安装**：在技能根目录执行 `npm install && npx playwright install chromium`。
2.  **系统库 (Linux/云端)**：如果运行报错，请执行 `npx playwright install-deps` 安装底层依赖。
3.  **自定义路径**：你可以通过第三个参数指定基础保存目录，例如：
    `node screenshot.js <url> <name> "/custom/path"`

## 预设目标 (Preset Targets)

技能内置了一些常用的预设截图目标，你可以通过类目名直接调用。预设列表保存在 `references/pconline.json` 中。

- **太平洋科技系列**：包含手机、笔记本、显卡、家电等 18 个频道。
- **调用方式**：当用户说“截图太平洋全系列”或“截图太平洋的显卡频道”时，请读取该 JSON 文件获取对应 URL。

## 注意事项

- **超时处理**：脚本默认等待 90 秒，对于极慢的网页可能会失败。
- **权限**：确保 Node.js 有权限写入下载目录。
