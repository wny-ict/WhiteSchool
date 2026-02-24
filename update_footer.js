const fs = require('fs');
const path = require('path');

const files = [
    'index.html', 'prevention.html', 'search.html', 
    'treatment.html', 'monitoring.html', 'management.html', 
    'learning.html', 'innovation.html', 'sema-box.html',
    'committee.html', 'performance.html', 'documents.html'
];

const newFooter = `<footer class="footer">
        <p>รายงานผลการปฏิบัติงาน โครงการสถานศึกษาสีขาว ปลอดยาเสพติดและอบายมุข ระดับเพชร</p>
        <p style="font-size: 0.85rem; opacity: 0.8; margin-top: 5px;">&copy; 2568 โรงเรียนวังน้ำเย็นวิทยาคม | ออกแบบและพัฒนา : ครูปณิฏฐา บุญยงค์</p>
    </footer>`;

const regex = /<footer[^>]*>[\s\S]*?<\/footer>/;

files.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (!fs.existsSync(fullPath)) {
        console.warn('File not found:', file);
        return;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    if (regex.test(content)) {
        content = content.replace(regex, newFooter);
        fs.writeFileSync(fullPath, content);
        console.log('Updated:', file);
    } else {
        console.warn('Could not find footer in:', file);
    }
});
console.log('Finished updating footer.');
