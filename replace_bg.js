const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Replace url('https://...') with a local image
    const updatedContent = content.replace(/url\(['"]?https:\/\/[^'")]+\.(?:jpg|png|jpeg)[^'")]*['"]?\)/gi, "url('image/bees factory.jpg')")
                                 .replace(/url\(['"]?https:\/\/images\.unsplash\.com[^'")]*['"]?\)/gi, "url('image/honey products.jpg')");
    
    if (content !== updatedContent) {
        fs.writeFileSync(path.join(dir, file), updatedContent, 'utf8');
        console.log(`Updated backgrounds in ${file}`);
    }
});
