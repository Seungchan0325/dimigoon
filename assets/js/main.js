import './components/header.js';
import './components/footer.js';

// 알고리즘 페이지 네비게이터 기능
document.addEventListener('DOMContentLoaded', function() {
  const tierButtons = document.querySelectorAll('.tier-btn');
  const difficultySections = document.querySelectorAll('.difficulty-section');

  // 네비게이터 버튼 클릭 이벤트
  tierButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTier = this.getAttribute('data-tier');
      
      // 모든 버튼에서 active 클래스 제거
      tierButtons.forEach(btn => btn.classList.remove('active'));
      
      // 클릭된 버튼에 active 클래스 추가
      this.classList.add('active');
      
      // 모든 섹션 숨기기
      difficultySections.forEach(section => {
        section.style.display = 'none';
      });
      
      // 선택된 섹션만 보이기
      const targetSection = document.getElementById(`${targetTier}-section`);
      if (targetSection) {
        targetSection.style.display = 'block';
        
        // 섹션으로 부드럽게 스크롤
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 페이지 로드 시 첫 번째 섹션(브론즈) 활성화
  const firstSection = document.getElementById('bronze-section');
  if (firstSection) {
    firstSection.style.display = 'block';
  }
});
