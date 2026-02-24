const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const navItems = `<ul class="nav-links">
                <li><a href="index.html">หน้าแรก</a></li>
                <li class="dropdown">
                    <a href="javascript:void(0)">ข้อมูลพื้นฐาน <i class="fas fa-caret-down"></i></a>
                    <div class="dropdown-content">
                        <a href="about.html">ประวัติและข้อมูลพื้นฐาน</a>
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
                <li class="dropdown">
                    <a href="javascript:void(0)">ผลงาน/สื่อ <i class="fas fa-caret-down"></i></a>
                    <div class="dropdown-content">
                        <a href="awards.html">เกียรติบัตรและผลงาน</a>
                        <a href="innovation.html">นวัตกรรม</a>
                        <a href="learning.html">แหล่งเรียนรู้ต้านยาเสพติด</a>
                        <a href="sema-box.html">ตู้เสมารักษ์ออนไลน์</a>
                    </div>
                </li>
                <li><a href="performance.html">ผลการดำเนินงาน</a></li>
                <li><a href="contact.html">ติดต่อเรา</a></li>
            </ul>`;

files.forEach(file => {
    let text = fs.readFileSync(file, 'utf8');
    text = text.replace(/<ul class="nav-links">[\s\S]*?<\/ul>/, navItems);
    fs.writeFileSync(file, text);
});
console.log('Updated navigation in all HTML files.');
