const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const os = require('os');

/**
 * Web Screenshot Utility (Playwright Based)
 * 
 * Usage: node screenshot.js <url> <filename> [baseDirectory]
 * 
 * Example: node screenshot.js "https://google.com" "Google首页" "~/Downloads/shared-screenshots"
 */

const DEFAULT_OUTPUT_ROOT = path.join(os.homedir(), 'Downloads', 'web-screenshot');

function resolveBaseDir(cliBaseDir) {
    let baseDir = cliBaseDir || process.env.WEB_SCREENSHOT_OUTPUT_DIR || DEFAULT_OUTPUT_ROOT;
    if (baseDir.startsWith('~')) {
        baseDir = path.join(os.homedir(), baseDir.slice(1));
    }

    return path.resolve(baseDir);
}

function sanitizeFileName(input) {
    if (!input) {
        return `screenshot_${Date.now()}`;
    }

    return input
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, '_')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/[. ]+$/g, '') || `screenshot_${Date.now()}`;
}

async function takeScreenshot(url, outputPath) {
    const browser = await chromium.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Cloud compatibility
    });
    
    try {
        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 },
            deviceScaleFactor: 2 // High resolution
        });
        
        const page = await context.newPage();
        
        // Optimize for long pages: set a larger timeout for navigation
        console.log(`[Start] Navigating to: ${url}`);
        await page.goto(url, { 
            waitUntil: 'networkidle', 
            timeout: 90000 
        });
        
        // Wait for lazy-loaded content and animations
        await page.waitForTimeout(3000);
        
        // Optional: Trigger a scroll to the bottom to ensure all lazy images load
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                let distance = 100;
                let timer = setInterval(() => {
                    let scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
        
        // Wait another 1s after scrolling
        await page.waitForTimeout(1000);

        const title = await page.title();
        console.log(`[Success] Page Loaded: ${title}`);
        
        console.log(`[Process] Capturing Full Page Screenshot...`);
        await page.screenshot({
            path: outputPath,
            fullPage: true,
            animations: 'disabled'
        });
        
        console.log(`[Done] Saved to: ${outputPath}`);
    } catch (error) {
        console.error(`[Error] Failed to capture ${url}:`, error.message);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

// --- Main CLI Logic ---

const url = process.argv[2];
const name = process.argv[3];
const userBaseDir = process.argv[4];

if (!url) {
    console.error('Usage: node screenshot.js <url> <filename_without_ext> [base_dir]');
    process.exit(1);
}

// 1. Determine the target directory with MMDD format
const now = new Date();
const mm = String(now.getMonth() + 1).padStart(2, '0');
const dd = String(now.getDate()).padStart(2, '0');
const dateFolder = `截图${mm}${dd}`;

// 2. Resolve Base Directory
const baseDir = resolveBaseDir(userBaseDir);

const targetFolderPath = path.join(baseDir, dateFolder);

// 3. Ensure folder exists
if (!fs.existsSync(targetFolderPath)) {
    fs.mkdirSync(targetFolderPath, { recursive: true });
}

// 4. Construct Final Path
const safeName = sanitizeFileName(name);
const fileName = `${safeName}.png`;
const finalOutputPath = path.join(targetFolderPath, fileName);

takeScreenshot(url, finalOutputPath);
