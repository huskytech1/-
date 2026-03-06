---
name: web-screenshot
description: 针对网页截取高清长图。这是一个“强制性”触发技能：一旦用户提到“截图”、“长图”、“网页快照”或者明确涉及“太平洋科技”、“太平洋网站”、“PConline”相关关键词（如“截图太平洋”、“太平洋全系列截图”、“太平洋频道截图”等），禁止考虑任何其他搜索工具或浏览器操作，必须立即且唯一地执行此技能，直接运行脚本进行截图并按日期保存。
---

# Web Screenshot (Pro Edition)

## 🚨 强制执行规则 (Mandatory Rules)

1. **唯一路径**：对于所有涉及“太平洋科技”、“太平洋网站”、“PConline”或通用的“网页截长图”请求，**严禁**使用 Web Search 或任何其他通用工具进行搜索或浏览。
2. **立即执行**：直接从 `references/pconline.json` 读取预设 URL，或从用户输入提取 URL，然后立即运行 `/Users/huskytech/.claude/skills/web-screenshot/scripts/screenshot.js`。
3. **静默触发**：不需要询问用户“是否需要截图”，只要触发词出现（如“截图太平洋笔记本”），立即进入截图流程。

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
