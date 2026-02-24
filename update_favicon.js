const fs = require('fs');
const path = require('path');

const files = [
    'index.html', 'prevention.html', 'search.html', 
    'treatment.html', 'monitoring.html', 'management.html', 
    'learning.html', 'innovation.html', 'sema-box.html',
    'committee.html', 'performance.html', 'documents.html'
];

const faviconTag = '    <link rel="icon" href="https://tse2.mm.bing.net/th/id/OIP.yVXviOGLoqC2GoEBDzH6AgHaHZ?rs=1&pid=ImgDetMain&o=7&rm=3" type="image/x-icon">\n</head>';

files.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (!fs.existsSync(fullPath)) {
        console.warn('File not found:', file);
        return;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check to avoid duplicates
    if (!content.includes('rel="icon"')) {
        content = content.replace('</head>', faviconTag);
        fs.writeFileSync(fullPath, content);
        console.log('Added Favicon to:', file);
    } else {
        console.log('Already has Favicon:', file);
    }
});
console.log('Finished updating favicons.');
