const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/lenovo/Desktop/WNY2568';
const files = fs.readdirSync(dir).filter(file => file.endsWith('.html'));

const oldNavPart = `                <li><a href="performance.html">ผลการดำเนินงาน</a></li>
                <li class="dropdown">
                    <a href="javascript:void(0)">ผลงาน/สื่อ <i class="fas fa-caret-down"></i></a>
                    <div class="dropdown-content">
                        <a href="innovation.html">นวัตกรรม</a>
                        <a href="learning.html">แหล่งเรียนรู้ต้านยาเสพติด</a>
                        <a href="sema-box.html">ตู้เสมารักษ์ออนไลน์</a>
                    </div>
                </li>`;

const newNavPart = `                <li class="dropdown">
                    <a href="javascript:void(0)">ผลงาน/สื่อ <i class="fas fa-caret-down"></i></a>
                    <div class="dropdown-content">
                        <a href="innovation.html">นวัตกรรม</a>
                        <a href="learning.html">แหล่งเรียนรู้ต้านยาเสพติด</a>
                        <a href="sema-box.html">ตู้เสมารักษ์ออนไลน์</a>
                    </div>
                </li>
                <li><a href="performance.html">ผลการดำเนินงาน</a></li>`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the exact string exists
    if (content.includes(oldNavPart)) {
        content = content.replace(oldNavPart, newNavPart);
        fs.writeFileSync(filePath, content);
        console.log(`Updated nav order in: ${file}`);
    } else {
        // Fallback with regex in case spaces are slightly different
        const regex = /(<li><a href="performance\.html">ผลการดำเนินงาน<\/a><\/li>)\s*(<li class="dropdown">\s*<a href="javascript:void\(0\)">ผลงาน\/สื่อ <i class="fas fa-caret-down"><\/i><\/a>\s*<div class="dropdown-content">\s*<a href="innovation\.html">นวัตกรรม<\/a>\s*<a href="learning\.html">แหล่งเรียนรู้ต้านยาเสพติด<\/a>\s*<a href="sema-box\.html">ตู้เสมารักษ์ออนไลน์<\/a>\s*<\/div>\s*<\/li>)/;
        if (content.match(regex)) {
             content = content.replace(regex, '$2\n                $1');
             fs.writeFileSync(filePath, content);
             console.log(`Updated nav order (regex) in: ${file}`);
        }
    }
});
console.log('Navigation structure update complete.');
