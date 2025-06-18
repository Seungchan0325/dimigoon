document.addEventListener('DOMContentLoaded', function() {
    const tierButtons = document.querySelectorAll('.tier-btn');
    const sections = document.querySelectorAll('.difficulty-section');

    // 티어 버튼 클릭 이벤트
    tierButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tier = this.dataset.tier;
            showTierSection(tier);
        });
    });

    // 티어 섹션 표시 함수
    function showTierSection(tier) {
        // 모든 버튼에서 active 클래스 제거
        tierButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });

        // 모든 섹션 숨기기
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // 선택된 버튼에 active 클래스 추가
        const selectedButton = document.querySelector(`[data-tier="${tier}"]`);
        if (selectedButton) {
            selectedButton.classList.add('active');
            selectedButton.setAttribute('aria-selected', 'true');
        }

        // 선택된 섹션 표시
        const selectedSection = document.getElementById(`${tier}-section`);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }
    }

    // URL hash 처리 (푸터 링크 등에서 오는 경우)
    function handleHashChange() {
        const hash = window.location.hash.substring(1); // # 제거
        if (hash && ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'ruby'].includes(hash)) {
            showTierSection(hash);
        }
    }

    // 페이지 로드 시 hash 확인
    handleHashChange();

    // hash 변경 시 이벤트 처리
    window.addEventListener('hashchange', handleHashChange);

    // 키보드 접근성
    tierButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});
