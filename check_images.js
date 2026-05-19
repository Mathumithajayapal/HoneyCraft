const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    const matches = content.match(/<img[^>]+src="([^"]+)"/g);
    if (matches) {
        matches.forEach(m => {
            const srcMatch = m.match(/src="([^"]+)"/);
            if (srcMatch && !srcMatch[1].startsWith('image/')) {
                console.log(`${file}: ${srcMatch[1]}`);
            }
        });
    }
});
