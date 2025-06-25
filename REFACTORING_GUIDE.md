# DimigoOn - 코드 리팩토링 가이드

## 개선된 Jekyll 프로젝트 구조

### 🔧 변경사항 요약

#### 1. 중복 컴포넌트 분리 및 모듈화

**새로 생성된 컴포넌트:**
- `_includes/breadcrumb.html` - 브레드크럼 네비게이션
- `_includes/tier-navigator.html` - 난이도 선택 네비게이터
- `_includes/tier-badge.html` - 티어 배지
- `_includes/tags.html` - 태그 렌더링
- `_includes/algorithm-card.html` - 알고리즘 카드
- `_includes/problem-card.html` - 문제 카드
- `_includes/head.html` - HTML head 섹션
- `_includes/scripts.html` - 스크립트 섹션
- `_includes/meta-tags.html` - SEO 메타 태그
- `_includes/google-analytics.html` - 구글 애널리틱스
- `_includes/olympiad-info.html` - 올림피아드 정보

# DimigoOn - 코드 리팩토링 가이드

## 개선된 Jekyll 프로젝트 구조

### 🔧 변경사항 요약

#### 1. 중복 컴포넌트 분리 및 모듈화

**새로 생성된 컴포넌트:**
- `_includes/breadcrumb.html` - 브레드크럼 네비게이션
- `_includes/tier-navigator.html` - 난이도 선택 네비게이터
- `_includes/tier-badge.html` - 티어 배지
- `_includes/tags.html` - 태그 렌더링
- `_includes/algorithm-card.html` - 알고리즘 카드
- `_includes/problem-card.html` - 문제 카드
- `_includes/head.html` - HTML head 섹션
- `_includes/scripts.html` - 스크립트 섹션
- `_includes/meta-tags.html` - SEO 메타 태그
- `_includes/google-analytics.html` - 구글 애널리틱스
- `_includes/olympiad-info.html` - 올림피아드 정보
- `_includes/simple-breadcrumb.html` - 간단한 브레드크럼

#### 2. 통합 설정

**설정 파일:**
- `_config.yml` - 모든 설정을 하나의 파일로 통합

#### 3. 개선된 빌드 스크립트

**스크립트:**
- `tools/serve.sh` - 개발 서버
- `tools/build.sh` - 프로덕션 빌드

### 🎯 컴포넌트 사용법

#### 브레드크럼 네비게이션
```liquid
{% assign breadcrumb_items = "" | split: "" %}
{% assign breadcrumb_items = breadcrumb_items | push: '{"title": "홈", "url": "/"}' | map: "fromjson" %}
{% assign breadcrumb_items = breadcrumb_items | push: '{"title": "현재 페이지"}' | map: "fromjson" %}
{% include breadcrumb.html items=breadcrumb_items separator="›" %}
```

#### 태그 렌더링
```liquid
{% include tags.html tags=page.tags class="algorithm-tags" %}
{% include tags.html tags=page.tags class="problem-tags" limit=3 %}
```

#### 티어 배지
```liquid
{% include tier-badge.html tier=page.tier %}
```

#### 알고리즘/문제 카드
```liquid
{% include algorithm-card.html algorithm=algorithm %}
{% include problem-card.html problem=problem %}
```

### 🚀 개발 환경 실행

```bash
# 개발 서버 시작
./tools/serve.sh

# 프로덕션 빌드
./tools/build.sh
```

### 📊 개선 효과

#### 코드 중복 제거
- **티어 네비게이터**: 2개 파일에서 중복 제거 → 1개 컴포넌트로 통합
- **브레드크럼**: 2개 파일에서 중복 제거 → 1개 컴포넌트로 통합  
- **태그 렌더링**: 5개 파일에서 중복 제거 → 1개 컴포넌트로 통합
- **카드 레이아웃**: 다중 파일에서 중복 제거 → 재사용 가능한 컴포넌트

#### 유지보수성 향상
- 컴포넌트 기반 구조로 변경사항 적용 용이
- 단일 설정 파일로 관리 간소화
- SEO 최적화 및 메타 태그 체계화

#### 성능 최적화
- CSS 압축으로 빠른 로딩
- 불필요한 파일 제외로 빌드 최적화

### 🔄 마이그레이션 가이드

기존 레이아웃 사용 시 새로운 컴포넌트로 교체:

```liquid
<!-- 이전 -->
<div class="tier-badge">
  <img src="{{ "/assets/img/tier_" | append: page.tier | append: ".svg" | relative_url }}">
  <span>{{ page.tier | capitalize }}</span>
</div>

<!-- 이후 -->
{% include tier-badge.html tier=page.tier %}
```

### 📝 추가 개선 사항

1. **통합 설정**: 하나의 _config.yml로 관리 간소화
2. **메타 태그**: Open Graph, Twitter Card 등 SEO 완전 지원
3. **스크립트 로딩**: 페이지별 스크립트 유연한 로드 지원
4. **파비콘**: SVG 로고를 파비콘으로 자동 설정
5. **브레드크럼**: 호환성 좋은 직접 HTML 방식으로 구현
