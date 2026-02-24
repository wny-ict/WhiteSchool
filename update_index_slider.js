const fs = require('fs');

const sliderHtml = `    <section class="hero-slider">
      <div class="slide active" style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop');">
        <div class="slide-content">
          <h2>รวมพลังสร้างสรรค์ สถานศึกษาสีขาว</h2>
          <p>รายงานผลการดำเนินงานโครงการสถานศึกษาสีขาว ปลอดยาเสพติดและอบายมุข ระดับเพชร ประจำปีการศึกษา 2568 โรงเรียนวังน้ำเย็นวิทยาคม</p>
        </div>
      </div>
      <div class="slide" style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop');">
        <div class="slide-content">
          <h2>มุ่งมั่น ป้องกัน แก้ไข</h2>
          <p>สร้างภูมิคุ้มกันยาเสพติดและอบายมุข สถานศึกษาปลอดภัย นักเรียนอุ่นใจ</p>
        </div>
      </div>
      <div class="slide" style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2070&auto=format&fit=crop');">
        <div class="slide-content">
          <h2>บูรณาการความร่วมมือ</h2>
          <p>เครือข่ายเข้มแข็ง ชุมชนร่วมใจ โรงเรียนวังน้ำเย็นวิทยาคมก้าวไกล ปลอดยาเสพติด</p>
        </div>
      </div>
      
      <button class="slider-btn prev-btn" id="prevSlide"><i class="fas fa-chevron-left"></i></button>
      <button class="slider-btn next-btn" id="nextSlide"><i class="fas fa-chevron-right"></i></button>
      
      <div class="slider-dots">
        <span class="dot active" data-index="0"></span>
        <span class="dot" data-index="1"></span>
        <span class="dot" data-index="2"></span>
      </div>
    </section>`;

let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(/<section class="hero">[\s\S]*?<\/section>/, sliderHtml);

fs.writeFileSync('index.html', content);
console.log('Done replacing index.html');
