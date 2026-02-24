document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Set active nav link based on current URL
    const currentLocation = location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        // If it's the home page
        if ((currentLocation === '' || currentLocation === 'index.html') && itemHref === 'index.html') {
            item.classList.add('active');
        } 
        // For other pages
        else if (currentLocation !== '' && itemHref.includes(currentLocation)) {
            item.classList.add('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        const prevSlideFunc = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };

        const startSlideShow = () => {
            slideInterval = setInterval(nextSlide, 5000); // Change every 5 seconds
        };

        const stopSlideShow = () => {
            clearInterval(slideInterval);
        };

        // Event Listeners for controls
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideShow();
            startSlideShow(); // Reset timer
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlideFunc();
            stopSlideShow();
            startSlideShow();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                stopSlideShow();
                startSlideShow();
            });
        });

        // Initialize
        startSlideShow();
    }

    // Sema Rak Box Form Handling (Dual Backend Integration)
    const semaForm = document.getElementById('semaForm');
    if (semaForm) {
        semaForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // ป้องกันการเปลี่ยนหน้า เพื่อให้ Google Sheets โหลดเสร็จก่อน
            
            // To provide a nicer UI before redirect, we show loading text
            const submitBtn = event.target.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังส่งข้อมูล...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            const formData = new FormData(semaForm);
            const googleScriptUrl = "https://script.google.com/macros/s/AKfycbxOdHclVRf54cH5nLryWBBjdwraPGEjhvOVsCgZnmK53psNlEacMO2veWNr-Yn7PteFHg/exec"; 
            
            try {
                // 1. ส่งข้อมูลไป Google Sheets เบื้องหลัง
                if (googleScriptUrl) {
                    // Convert FormData to URLSearchParams for better compatibility with Google Apps Script
                    const urlEncodedData = new URLSearchParams(formData);
                    
                    // We don't await this so it happens quickly in the background
                    fetch(googleScriptUrl, {
                        method: 'POST',
                        body: urlEncodedData,
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    }).catch(err => console.error("Google Sheets Error:", err));
                }

                // 2. ส่งข้อมูลไป Web3Forms (Email) แบบ AJAX
                const emailResponse = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                if (emailResponse.ok) {
                    showSuccessMessage(submitBtn, originalText);
                } else {
                    alert("เกิดข้อผิดพลาดในการส่งข้อมูลไปที่อีเมล แต่รับเข้าระบบแล้ว");
                    resetButton(submitBtn, originalText);
                }

            } catch(error) {
                console.error('Submission Error:', error);
                alert("เกิดปัญหาการเชื่อมต่ออินเทอร์เน็ต กรุณาลองใหม่อีกครั้ง");
                resetButton(submitBtn, originalText);
            }
        });
    }
});

// Helper Functions for Form UI
function showSuccessMessage(submitBtn, originalText) {
    const successMsg = document.getElementById('success-message');
    successMsg.style.display = 'block';
    
    // Clear the form
    document.getElementById('semaForm').reset();
    resetButton(submitBtn, originalText);
    
    // Scroll so the user sees the message
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto hide after 8 seconds
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 8000);
}

function resetButton(btn, originalText) {
    btn.innerHTML = originalText;
    btn.disabled = false;
    btn.style.opacity = '1';
}
