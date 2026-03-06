const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const jsonPath = path.join(__dirname, '../references/pconline.json');
const screenshotScript = path.join(__dirname, 'screenshot.js');

if (!fs.existsSync(jsonPath)) {
    console.error("Error: references/pconline.json not found!");
    process.exit(1);
}

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const sites = data.pconline || {};
const entries = Object.entries(sites);

// 用户要求：分成 3 批，每次执行 8 个
const BATCH_SIZE = 8;

async function runBatch() {
    console.log(`[Batch] Found ${entries.length} targets. Processing in batches of ${BATCH_SIZE}...`);
    
    for (let i = 0; i < entries.length; i += BATCH_SIZE) {
        const chunk = entries.slice(i, i + BATCH_SIZE);
        const batchNum = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(entries.length / BATCH_SIZE);
        
        console.log(`\n=== Starting Batch ${batchNum} of ${totalBatches} (${chunk.length} tasks) ===`);
        
        const promises = chunk.map(([name, url]) => {
            return new Promise((resolve) => {
                // 调用已有的 screenshot.js，自动享受按日期分类、高清渲染等特性
                const proc = spawn('node', [screenshotScript, url, name]);
                
                proc.on('close', (code) => {
                    if (code === 0) {
                        console.log(`  [OK] ${name}`);
                    } else {
                        console.error(`  [FAILED] ${name} (Exit code: ${code})`);
                    }
                    resolve(code);
                });
            });
        });

        // 等待当前批次的所有 8 个任务完成
        await Promise.all(promises);
        
        // 批次之间稍作停顿，释放系统资源 (3秒)
        if (i + BATCH_SIZE < entries.length) {
            console.log("Waiting 3 seconds before the next batch...");
            await new Promise(r => setTimeout(r, 3000));
        }
    }
    console.log("\n[Batch] All batches completed successfully! All files are in the Downloads/截图MMDD folder.");
}

runBatch();
