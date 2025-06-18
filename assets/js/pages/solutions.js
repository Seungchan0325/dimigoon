// Solutions page functionality - Jekyll 기반 (algorithms.md 방식과 동일)
function initializeSolutionsPage() {
  const selectorButtons = document.querySelectorAll('.selector-btn');
  const olympiadSections = document.querySelectorAll('.olympiad-section');

  // 초기화: 모든 섹션 숨기기
  olympiadSections.forEach(section => {
    section.style.display = 'none';
  });

  // 첫 번째 섹션(APIO)만 보이기
  const firstSection = document.getElementById('apio-section');
  if (firstSection) {
    firstSection.style.display = 'block';
  }

  // 분류 버튼 클릭 이벤트
  selectorButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetOlympiad = this.getAttribute('data-olympiad');
      
      // 모든 버튼에서 active 클래스 제거 및 aria-selected 업데이트
      selectorButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      
      // 클릭된 버튼에 active 클래스 추가 및 aria-selected 업데이트
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      
      // 모든 섹션 숨기기
      olympiadSections.forEach(section => {
        section.style.display = 'none';
      });
      
      // 선택된 섹션만 보이기
      const targetSection = document.getElementById(`${targetOlympiad}-section`);
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

    // 키보드 네비게이션
    button.addEventListener('keydown', function(e) {
      handleKeyboardNavigation(e, selectorButtons);
    });
  });

  // 타임라인 아이템 클릭 이벤트 추가
  addTimelineItemEvents();

  function addTimelineItemEvents() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
      const contestId = item.getAttribute('data-contest-id');
      
      // 클릭 이벤트
      item.addEventListener('click', () => {
        navigateToContest(contestId);
      });

      // 키보드 이벤트
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigateToContest(contestId);
        }
      });
    });
  }

  function navigateToContest(contestId) {
    // solutions/<contest>.html로 이동
    window.location.href = `solutions/${contestId}.html`;
  }

  function handleKeyboardNavigation(e, buttons) {
    const currentIndex = Array.from(buttons).indexOf(e.target);
    let nextIndex = -1;

    switch(e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
        e.preventDefault();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
        e.preventDefault();
        break;
      case 'Home':
        nextIndex = 0;
        e.preventDefault();
        break;
      case 'End':
        nextIndex = buttons.length - 1;
        e.preventDefault();
        break;
    }

    if (nextIndex !== -1) {
      buttons[nextIndex].focus();
      buttons[nextIndex].click();
    }
  }

  // 페이지 전체 키보드 네비게이션 개선
  document.addEventListener('keydown', function(e) {
    if (!document.querySelector('.solutions-page')) return;
    
    // ESC 키로 포커스 초기화
    if (e.key === 'Escape') {
      document.activeElement.blur();
      return;
    }
    
    // 타임라인 아이템 키보드 네비게이션
    const timelineItems = document.querySelectorAll('.timeline-item');
    const currentFocus = document.activeElement;
    const currentIndex = Array.from(timelineItems).indexOf(currentFocus);
    
    if (currentIndex !== -1) {
      let nextIndex = -1;
      
      switch(e.key) {
        case 'ArrowDown':
          nextIndex = currentIndex < timelineItems.length - 1 ? currentIndex + 1 : 0;
          e.preventDefault();
          break;
        case 'ArrowUp':
          nextIndex = currentIndex > 0 ? currentIndex - 1 : timelineItems.length - 1;
          e.preventDefault();
          break;
      }
      
      if (nextIndex !== -1) {
        timelineItems[nextIndex].focus();
      }
    }
  });

  // 접근성 개선: 포커스 표시
  function enhanceAccessibility() {
    const focusableElements = document.querySelectorAll('.selector-btn, .timeline-item');
    
    focusableElements.forEach(element => {
      element.addEventListener('focus', function() {
        this.setAttribute('aria-describedby', 'keyboard-help');
      });
    });
    
    // 키보드 도움말 요소 추가
    if (!document.getElementById('keyboard-help')) {
      const helpElement = document.createElement('div');
      helpElement.id = 'keyboard-help';
      helpElement.className = 'sr-only';
      helpElement.textContent = '방향키로 이동, Enter 또는 Space로 선택, Escape로 포커스 해제';
      document.body.appendChild(helpElement);
    }
  }

  // 접근성 개선 적용
  setTimeout(enhanceAccessibility, 100);
}

// Export for use in main.js
export { initializeSolutionsPage };
