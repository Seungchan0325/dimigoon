# DimigoOn

한국디지털미디어고등학교 알고리즘 동아리 O(n)의 웹사이트입니다.

## 📝 프로젝트 소개

**DimigoOn**은 "생각의 흐름을 키우는" 알고리즘 학습 플랫폼입니다. 코딩테스트 준비부터 알고리즘 마스터까지 함께 성장하는 공간을 제공합니다.

## 🎯 주요 기능

- **알고리즘 학습**: Bronze부터 Diamond까지 난이도별 알고리즘 학습
- **문제 풀이**: 다양한 알고리즘 문제의 상세한 풀이 제공
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 환경 지원
- **다크 모드**: 라이트/다크 테마 전환 기능
- **현대적 UI**: 깔끔하고 직관적인 사용자 인터페이스

## 🏗️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Design**: Responsive Design, CSS Grid/Flexbox
- **Fonts**: Pretendard, Kode Mono
- **Icons**: Custom SVG Icons, Feather Icons

## 📁 프로젝트 구조

```
dimigoon/
├── index.html              # 메인 페이지
├── about.html              # 소개 페이지
├── algorithms.html         # 알고리즘 학습 페이지
├── solutions.html          # 문제 풀이 페이지
├── assets/
│   ├── css/
│   │   ├── base.css        # 기본 스타일 및 CSS 변수
│   │   ├── header.css      # 헤더 스타일
│   │   ├── main.css        # 메인 페이지 스타일
│   │   ├── about.css       # 소개 페이지 스타일
│   │   ├── algorithms.css  # 알고리즘 페이지 스타일
│   │   ├── footer.css      # 푸터 스타일
│   │   ├── responsive.css  # 반응형 스타일
│   │   └── styles.css      # 메인 CSS 파일 (모든 CSS import)
│   ├── js/
│   │   ├── main.js         # 메인 JavaScript
│   │   └── components/
│   │       ├── header.js   # 헤더 컴포넌트
│   │       └── footer.js   # 푸터 컴포넌트
│   └── img/
│       ├── logo.svg        # 로고 (라이트 모드)
│       ├── logo-dark.svg   # 로고 (다크 모드)
│       ├── *-icon.svg      # 각종 아이콘들
│       └── tier_*.svg      # 티어별 아이콘들
└── README.md
```

## 🚀 시작하기

1. 프로젝트 클론:
```bash
git clone https://github.com/Seungchan0325/dimigoon.git
cd dimigoon
```

2. 웹서버로 실행:
```bash
# Python 3
python -m http.server 8000

# 또는 Node.js
npx http-server
```

3. 브라우저에서 `http://localhost:8000` 접속

## ✨ 주요 특징

### 🎨 디자인 시스템
- **모듈화된 CSS**: 기능별로 분리된 CSS 파일
- **CSS 변수**: 일관된 색상 시스템 및 테마 관리
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험

### 🌙 다크 모드
- **자동 테마 전환**: 로고, 배경, 텍스트 색상 자동 변경
- **LocalStorage 저장**: 사용자 설정 기억
- **부드러운 전환**: CSS 트랜지션으로 자연스러운 테마 변경

### 📱 반응형 지원
- **모바일**: 햄버거 메뉴, 터치 친화적 인터페이스
- **태블릿**: 최적화된 그리드 레이아웃
- **데스크톱**: 풍부한 콘텐츠 표시

## 👥 기여하기

1. Fork 프로젝트
2. Feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📞 연락처

- **이메일**: imchan0325@gmail.com
- **GitHub**: [Seungchan0325](https://github.com/Seungchan0325)
- **Instagram**: [@dimigo_on](https://www.instagram.com/dimigo_on/)

## 📄 라이선스

이 프로젝트는 개인 교육 목적으로 제작되었습니다.

---

> 💡 **"생각의 흐름을 키우는"** 알고리즘 학습의 여정을 함께 해보세요!