class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <a href="/" class="header-logo">
          <img class="header-logo-img" src="assets/img/logo.svg">
          DimigoOn
        </a>
        <div class="header-controls">
          <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="메뉴 토글">
            ☰
          </button>
          <nav class="header-navs">
            <ul class="header-nav-list" id="navList">
              <li><a href="algorithms.html" class="header-nav">Algorithms</a></li>
              <li><a href="solutions.html" class="header-nav">Solutions</a></li>
              <li><a href="about.html" class="header-nav">About</a></li>
            </ul>
          </nav>
          <button class="dark-mode-toggle" id="darkModeToggle" aria-label="다크 모드 토글">
            <svg class="sun-icon" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <svg class="moon-icon" fill="none" viewBox="0 0 24 24" style="display: none;">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>
        </div>
      </header>
    `;
    
    // 다크 모드 토글 기능 초기화
    this.initDarkModeToggle();
    
    // 모바일 네비게이션 토글 기능 초기화
    this.initMobileNavToggle();
  }
  
  initDarkModeToggle() {
    const toggleBtn = this.querySelector('#darkModeToggle');
    const sunIcon = this.querySelector('.sun-icon');
    const moonIcon = this.querySelector('.moon-icon');
    const logoImg = this.querySelector('.header-logo-img');
    
    // 저장된 다크 모드 설정 불러오기
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
      logoImg.src = 'assets/img/logo-dark.svg';
    }
    
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isNowDark = document.body.classList.contains('dark-mode');
      
      // 아이콘 변경
      if (isNowDark) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        logoImg.src = 'assets/img/logo-dark.svg';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        logoImg.src = 'assets/img/logo.svg';
      }
      
      // 설정 저장
      localStorage.setItem('darkMode', isNowDark);
    });
  }

  initMobileNavToggle() {
    const mobileToggle = this.querySelector('#mobileNavToggle');
    const navList = this.querySelector('#navList');
    
    mobileToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
    });

    // 네비게이션 링크 클릭 시 메뉴 닫기
    const navLinks = this.querySelectorAll('.header-nav');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
      });
    });

    // 화면 크기 변경 시 모바일 메뉴 닫기
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navList.classList.remove('active');
      }
    });
  }
}

customElements.define('site-header', SiteHeader);
