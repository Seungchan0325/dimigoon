# Google Search Console 설정 가이드

## 🔍 개요
Google Search Console은 Google 검색에서 사이트의 성능을 모니터링하고 개선할 수 있는 무료 도구입니다.

## 🚀 설정 단계

### 1단계: Google Search Console 사이트 등록

1. **Google Search Console** 접속
   - URL: https://search.google.com/search-console/
   - Google 계정으로 로그인

2. **속성 추가**
   - "속성 추가" 버튼 클릭
   - "URL 접두어" 방식 선택
   - 사이트 URL 입력: `https://dimigoon.github.io`

### 2단계: 소유권 확인

1. **HTML 메타 태그 방식 선택**
   - Google에서 제공하는 메타 태그 복사
   - 예: `<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />`

2. **_config.yml 설정**
   ```yaml
   # Google 서비스 설정
   google_site_verification: YOUR_VERIFICATION_CODE
   ```
   
   ⚠️ **주의**: `content=""` 안의 값만 복사하세요!

3. **배포 및 확인**
   ```bash
   git add _config.yml
   git commit -m "Add Google Search Console verification"
   git push origin main
   ```
   
   GitHub Actions 빌드 완료 후 Google Search Console에서 "확인" 버튼 클릭

### 3단계: 사이트맵 제출

1. **사이트맵 URL 확인**
   - 자동 생성됨: `https://dimigoon.github.io/sitemap.xml`

2. **Google Search Console에서 사이트맵 제출**
   - 좌측 메뉴 → "Sitemaps"
   - "새 사이트맵 추가"에 `sitemap.xml` 입력
   - "제출" 클릭

### 4단계: 설정 완료 확인

✅ **확인 항목**
- [ ] 사이트 소유권 확인 완료
- [ ] 사이트맵 제출 완료 (정상 처리됨)
- [ ] robots.txt 정상 작동 확인
- [ ] 첫 번째 색인 결과 확인 (몇 일 소요될 수 있음)

## 📊 주요 기능

### 1. 성능 모니터링
- **검색어 분석**: 어떤 키워드로 유입되는지 확인
- **클릭률 분석**: 검색 결과에서의 클릭률 확인
- **노출수 추적**: Google 검색에서 노출되는 횟수

### 2. 색인 상태 확인
- **페이지 색인 현황**: 어떤 페이지가 색인되었는지 확인
- **색인 오류**: 크롤링 또는 색인 중 발생한 문제 확인
- **URL 검사**: 특정 페이지의 색인 상태 검사

### 3. 사용성 개선
- **모바일 친화성**: 모바일에서의 사용성 문제 확인
- **페이지 속도**: Core Web Vitals 성능 지표 확인
- **보안 문제**: 악성 코드나 보안 문제 알림

## 🔧 추가 최적화

### 1. 구조화된 데이터
이미 JSON-LD 구조화된 데이터가 설정되어 있어 Google이 콘텐츠를 더 잘 이해할 수 있습니다.

### 2. SEO 개선 사항
- **메타 설명**: 각 페이지의 적절한 description 설정
- **제목 태그**: 고유하고 설명적인 제목 사용
- **이미지 alt 텍스트**: 이미지에 적절한 alt 속성 추가

### 3. 콘텐츠 최적화
- **정기적인 업데이트**: 새로운 알고리즘 문제 및 풀이 추가
- **내부 링크**: 관련 페이지 간 연결 강화
- **사용자 경험**: 로딩 속도 및 모바일 최적화

## 📈 모니터링 체크리스트

### 주간 확인 사항
- [ ] 새로운 페이지 색인 상태
- [ ] 검색 성능 변화
- [ ] 크롤링 오류 발생 여부

### 월간 확인 사항
- [ ] 주요 키워드 순위 변화
- [ ] 사이트 전체 트래픽 분석
- [ ] Core Web Vitals 성능 지표

### 추가 도구 연동
- **Google Analytics**: 더 상세한 사용자 행동 분석
- **Google PageSpeed Insights**: 페이지 속도 최적화
- **GTmetrix**: 종합적인 성능 분석

## 🚨 문제 해결

### 사이트 소유권 확인 실패
1. `google_site_verification` 값이 올바른지 확인
2. 사이트가 정상적으로 배포되었는지 확인
3. 브라우저 개발자 도구에서 메타 태그 존재 확인

### 사이트맵 제출 오류
1. `sitemap.xml` 파일이 정상 생성되었는지 확인
2. XML 형식이 올바른지 확인
3. 절대 URL이 올바르게 설정되었는지 확인

### 색인 지연
- Google의 색인은 시간이 걸릴 수 있습니다 (몇 일 ~ 몇 주)
- URL 검사 도구로 개별 페이지 색인 요청 가능
- 정기적인 콘텐츠 업데이트로 크롤링 빈도 향상

---

📖 **참고 자료**
- [Google Search Console 고객센터](https://support.google.com/webmasters)
- [Google SEO 시작 가이드](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [구조화된 데이터 가이드](https://developers.google.com/search/docs/guides/intro-structured-data)
