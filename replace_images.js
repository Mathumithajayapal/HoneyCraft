const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const imageDir = path.join(dir, 'image');
const images = fs.readdirSync(imageDir).filter(f => f.endsWith('.jpg'));

let imageIndex = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Replace src="https://..." inside img tags or anything looking like https://picsum.photos or randomuser
    content = content.replace(/src="https:\/\/[^"]+"/g, (match) => {
        const nextImage = images[imageIndex % images.length];
        imageIndex++;
        return `src="image/${nextImage}"`;
    });

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Updated ${file}`);
});
