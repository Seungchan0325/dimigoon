import './components/header.js';
import './components/footer.js';
import { initializeSolutionsPage } from './pages/solutions.js';

// 다크모드 토글 기능
function initDarkModeToggle() {
  const toggleBtn = document.getElementById('darkModeToggle');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  const headerLogoImg = document.querySelector('.header-logo-img');
  const footerLogoImg = document.querySelector('.footer-logo-img');
  
  console.log('다크모드 초기화:', {
    toggleBtn: !!toggleBtn,
    sunIcon: !!sunIcon,
    moonIcon: !!moonIcon,
    headerLogoImg: !!headerLogoImg,
    footerLogoImg: !!footerLogoImg
  });
  
  if (!toggleBtn || !sunIcon || !moonIcon) {
    console.warn('다크모드 토글에 필요한 요소가 없습니다.');
    return; // 필수 요소가 없으면 종료
  }
  
  // 로고 변경 함수
  function updateLogos(isDark) {
    // 헤더 로고 변경
    if (headerLogoImg) {
      const currentSrc = headerLogoImg.src;
      if (isDark) {
        headerLogoImg.src = currentSrc.replace('logo.svg', 'logo-dark.svg');
      } else {
        headerLogoImg.src = currentSrc.replace('logo-dark.svg', 'logo.svg');
      }
      console.log('헤더 로고 변경:', headerLogoImg.src);
    }
    
    // 푸터 로고 변경
    if (footerLogoImg) {
      const currentSrc = footerLogoImg.src;
      if (isDark) {
        footerLogoImg.src = currentSrc.replace('logo.svg', 'logo-dark.svg');
      } else {
        footerLogoImg.src = currentSrc.replace('logo-dark.svg', 'logo.svg');
      }
      console.log('푸터 로고 변경:', footerLogoImg.src);
    }
  }
  
  // 저장된 다크 모드 설정 불러오기
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
    updateLogos(true);
  }
  
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isNowDark = document.body.classList.contains('dark-mode');
    
    // 아이콘 변경
    if (isNowDark) {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
    
    // 로고 변경
    updateLogos(isNowDark);
    
    // 설정 저장
    localStorage.setItem('darkMode', isNowDark);
  });
}

// 모바일 네비게이션 토글 기능
function initMobileNavToggle() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navList = document.getElementById('navList');
  
  if (!toggleBtn || !navList) {
    return; // 요소가 없으면 종료
  }
  
  toggleBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', navList.classList.contains('active'));
  });
  
  // 네비게이션 링크 클릭 시 메뉴 닫기
  const navLinks = navList.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM 로드 완료');
  
  // 잠시 대기 후 다크모드 초기화 (footer 로딩 완료 대기)
  setTimeout(() => {
    initDarkModeToggle();
    initMobileNavToggle();
  }, 100);
  
  // Solutions 페이지 초기화
  if (document.querySelector('.solutions-page')) {
    initializeSolutionsPage();
  }

  // 알고리즘 페이지 초기화
  if (document.querySelector('.algorithms-page')) {
    initAlgorithmsPage();
  }
});

// 알고리즘 페이지 기능
function initAlgorithmsPage() {
  const tierButtons = document.querySelectorAll('.tier-btn');
  const difficultySections = document.querySelectorAll('.difficulty-section');

  // 초기화: 모든 섹션 숨기기
  difficultySections.forEach(section => {
    section.style.display = 'none';
  });

  // 첫 번째 섹션(브론즈)만 보이기
  const firstSection = document.getElementById('bronze-section');
  if (firstSection) {
    firstSection.style.display = 'block';
  }

  // 네비게이터 버튼 클릭 이벤트
  tierButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTier = this.getAttribute('data-tier');
      
      // 모든 버튼에서 active 클래스 제거 및 aria-selected 업데이트
      tierButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      
      // 클릭된 버튼에 active 클래스 추가 및 aria-selected 업데이트
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      
      // 모든 섹션 숨기기
      difficultySections.forEach(section => {
        section.style.display = 'none';
      });
      
      // 선택된 섹션만 보이기
      const targetSection = document.getElementById(`${targetTier}-section`);
      if (targetSection) {
        targetSection.style.display = 'block';
        
        // 섹션으로 부드럽게 스크롤
        setTimeout(() => {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    });
  });

  // 카테고리 접기/펴기 기능
  const categoryTitles = document.querySelectorAll('.category-title');
  
  categoryTitles.forEach(title => {
    title.addEventListener('click', function() {
      const categoryContent = this.nextElementSibling;
      
      // 토글 클래스 추가/제거
      this.classList.toggle('collapsed');
      
      if (categoryContent) {
        categoryContent.classList.toggle('collapsed');
      }
    });
  });
}

// 다크모드 상태에 따른 로고 업데이트 (fallback)
function updateAllLogos() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  
  // 헤더 로고
  const headerLogo = document.querySelector('.header-logo-img');
  if (headerLogo) {
    const headerSrc = isDarkMode ? 
      headerLogo.src.replace('logo.svg', 'logo-dark.svg') :
      headerLogo.src.replace('logo-dark.svg', 'logo.svg');
    headerLogo.src = headerSrc;
  }
  
  // 푸터 로고
  const footerLogo = document.querySelector('.footer-logo-img');
  if (footerLogo) {
    const footerSrc = isDarkMode ? 
      footerLogo.src.replace('logo.svg', 'logo-dark.svg') :
      footerLogo.src.replace('logo-dark.svg', 'logo.svg');
    footerLogo.src = footerSrc;
  }
}

// DOM이 변경될 때마다 로고 확인
const observer = new MutationObserver(() => {
  updateAllLogos();
});

// body의 class 변화 감지
observer.observe(document.body, {
  attributes: true,
  attributeFilter: ['class']
});
