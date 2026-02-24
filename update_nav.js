const fs = require('fs');
const path = require('path');

const files = [
    'index.html', 'prevention.html', 'search.html', 
    'treatment.html', 'monitoring.html', 'management.html', 
    'learning.html', 'innovation.html', 'sema-box.html',
    'committee.html', 'performance.html', 'documents.html'
];

const newNav = `<ul class="nav-links">
                <li><a href="index.html">หน้าแรก</a></li>
                <li class="dropdown">
                    <a href="javascript:void(0)">ข้อมูลพื้นฐาน <i class="fas fa-caret-down"></i></a>
                    <div class="dropdown-content">
                        <a href="committee.html">คณะกรรมการดำเนินงาน</a>
                        <a href="documents.html">เอกสารดาวน์โหลด</a>
                    </div>
                </li>
                <li class="dropdown">
                    <a href="javascript:void(0)">มาตรการ 5 ด้าน <i class="fas fa-caret-down"></i></a>
                    <div class="dropdown-content">
                        <a href="prevention.html">1. ด้านการป้องกัน</a>
                        <a href="search.html">2. ด้านการค้นหา</a>
                        <a href="treatment.html">3. ด้านการรักษา</a>
                        <a href="monitoring.html">4. ด้านการเฝ้าระวัง</a>
                        <a href="management.html">5. ด้านการบริหารจัดการ</a>
                    </div>
                </li>
                <li><a href="performance.html">ผลการดำเนินงาน</a></li>
                <li class="dropdown">
                    <a href="javascript:void(0)">ผลงาน/สื่อ <i class="fas fa-caret-down"></i></a>
                    <div class="dropdown-content">
                        <a href="innovation.html">นวัตกรรม</a>
                        <a href="learning.html">แหล่งเรียนรู้ต้านยาเสพติด</a>
                        <a href="sema-box.html">ตู้เสมารักษ์ออนไลน์</a>
                    </div>
                </li>
            </ul>`;

const regex = /<ul class="nav-links">[\s\S]*?<\/ul>/;

files.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (!fs.existsSync(fullPath)) {
        console.warn('File not found:', file);
        return;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if the file contains the nav-links block
    if (regex.test(content)) {
        content = content.replace(regex, newNav);
        fs.writeFileSync(fullPath, content);
        console.log('Updated:', file);
    } else {
        console.warn('Could not find nav-links in:', file);
    }
});
console.log('Finished updating navigation.');
