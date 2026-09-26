const fs = require('fs');
const path = require('path');

const LOGS_DIR = path.join(__dirname, '../Minecraft/Logs');
const OUTPUT_FILE = path.join(__dirname, '../_site/logs.json'); 

function getMarkdownFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getMarkdownFiles(filePath));
        } else if (file.endsWith('.md')) {
            results.push(filePath);
        }
    });
    return results;
}

function parseFrontmatter(content) {
    const match = content.match(/^---\s*([\s\S]*?)\s*---/);
    if (!match) return {};
    const frontmatter = {};
    match[1].split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
            let key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim().replace(/^["'](.*)["']$/, '$1');
            if (!isNaN(value) && value !== '') value = Number(value);
            frontmatter[key] = value;
        }
    });
    return frontmatter;
}

function generateLogsJson() {
    console.log('🔍 Scanning for log files...');
    const files = getMarkdownFiles(LOGS_DIR);
    const logs = [];

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const fm = parseFrontmatter(content);
        
        if (fm.project) {
            logs.push({
                fileName: path.basename(file, '.md'),
                project: String(fm.project),
                date: fm.date || '',
                time: fm.time || '00:00',
                category: fm.category || 'Building',
                loggedHours: Number(fm['logged-hours']) || 0,
                url: `/Minecraft/Logs/${path.relative(LOGS_DIR, file).replace(/\\/g, '/').replace('.md', '')}`
            });
        }
    });

    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(logs, null, 2));
    
    console.log(`✅ Success! Generated ${logs.length} logs into ${OUTPUT_FILE}`);
}

generateLogsJson();
