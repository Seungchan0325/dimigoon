class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <div class="footer-content">
          <div class="footer-section footer-brand">
            <div class="footer-logo">
              <img class="footer-logo-img" src="assets/img/logo.svg" alt="DimigoOn Logo">
              DimigoOn
            </div>
            <p class="footer-description">생각의 흐름을 키우는 알고리즘 학습 플랫폼</p>
            <p class="footer-tagline">코딩테스트 준비부터 알고리즘 마스터까지, 함께 성장해요!</p>
            <div class="footer-stats">
              <div class="stat-item">
                <span class="stat-number">100+</span>
                <span class="stat-label">알고리즘</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">5</span>
                <span class="stat-label">난이도</span>
              </div>
            </div>
          </div>
          
          <div class="footer-section footer-navigation">
            <h4 class="footer-title">바로가기</h4>
            <nav class="footer-nav">
              <a href="algorithms.html">알고리즘 학습</a>
              <a href="solutions.html">문제 풀이</a>
              <a href="about.html">사이트 소개</a>
            </nav>
          </div>
          
          <div class="footer-section footer-resources">
            <h4 class="footer-title">알고리즘 난이도</h4>
            <nav class="footer-nav">
              <a href="algorithms.html#bronze">Bronze</a>
              <a href="algorithms.html#silver">Silver</a>
              <a href="algorithms.html#gold">Gold</a>
              <a href="algorithms.html#platinum">Platinum</a>
              <a href="algorithms.html#diamond">Diamond</a>
            </nav>
          </div>
          
          <div class="footer-section footer-contact">
            <h4 class="footer-title">연락처</h4>
            <div class="contact-info">
              <p class="contact-item">
                <img class="contact-icon" src="assets/img/mail-icon.svg" alt="Email">
                <a href="mailto:imchan0325@gmail.com">imchan0325@gmail.com</a>
              </p>
              <p class="contact-item">
                <img class="contact-icon" src="assets/img/school-icon.svg" alt="School">
                <span>한국디지털미디어고등학교</span>
              </p>
            </div>
            <div class="social-links">
              <a href="https://github.com/Seungchan0325" class="social-link" aria-label="GitHub">
                <img class="social-link-img" src="assets/img/github-mark.svg" alt="GitHub">
                <span>GitHub</span>
              </a>
              <a href="https://www.instagram.com/dimigo_on/" class="social-link" aria-label="Instagram">
                <img class="social-link-img" src="assets/img/instagram-mark.svg" alt="Instagram">
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <p class="copyright">&copy; 2025 Seungchan Lee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
    
    // 다크 모드 로고 설정
    this.initDarkModeLogo();
    
    // 다크 모드 변경 감지
    const observer = new MutationObserver(() => {
      this.updateLogo();
    });
    
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  
  initDarkModeLogo() {
    // 페이지 로드 시 다크 모드 상태 확인
    const isDarkMode = document.body.classList.contains('dark-mode');
    this.updateLogo(isDarkMode);
  }
  
  updateLogo(isDarkMode = document.body.classList.contains('dark-mode')) {
    const logoImg = this.querySelector('.footer-logo-img');
    if (logoImg) {
      logoImg.src = isDarkMode ? 'assets/img/logo-dark.svg' : 'assets/img/logo.svg';
    }
  }
}

customElements.define('site-footer', SiteFooter);
