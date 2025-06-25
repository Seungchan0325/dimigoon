# GitHub Pages 커스텀 플러그인 설정 체크리스트

## ✅ **1단계: GitHub 설정**
- [ ] GitHub 리포지토리 → Settings → Pages
- [ ] Source: "GitHub Actions" 선택
- [ ] 설정 저장 확인

## ✅ **2단계: 로컬 파일 설정**
- [ ] `.github/workflows/jekyll.yml` 파일 존재
- [ ] `Gemfile`에서 `jekyll` gem 활성화
- [ ] `Gemfile`에서 `github-pages` gem 비활성화 (주석 처리)

## ✅ **3단계: 로컬 환경 구성**
- [ ] `bundle install` 성공적으로 완료
- [ ] `bundle exec jekyll build` 오류 없이 완료
- [ ] 플러그인 실행 확인:
  - [ ] AlgorithmPagesGenerator
  - [ ] SolutionPagesGenerator  
  - [ ] AlgorithmDataGenerator

## ✅ **4단계: 배포**
- [ ] Git add, commit, push 완료
- [ ] GitHub Actions 워크플로우 실행 확인
- [ ] Actions 탭에서 초록색 체크마크 확인

## ✅ **5단계: 확인**
- [ ] GitHub Pages URL 접속 성공
- [ ] 메인 페이지 정상 로딩
- [ ] 알고리즘 목록 페이지 (`/algorithms/`) 존재
- [ ] 솔루션 목록 페이지 (`/solutions/`) 존재
- [ ] CSS 스타일 정상 적용
- [ ] JavaScript 기능 작동

---

## 🚨 **문제 발생 시 확인 순서**

1. **GitHub Actions 로그 확인** (Actions 탭)
2. **로컬 빌드 테스트** (`bundle exec jekyll build`)
3. **Gemfile 설정 재확인**
4. **Dependencies 재설치** (`rm Gemfile.lock && bundle install`)
5. **플러그인 파일 존재 확인** (`ls _plugins/`)

---

## 📞 **도움이 필요한 경우**

- 📖 상세 가이드: `GITHUB_PAGES_SETUP.md`
- 🔧 자동 설정: `./tools/setup-github-pages.sh`
- 🌐 Jekyll 공식 문서: https://jekyllrb.com/docs/
- 📚 GitHub Pages 문서: https://docs.github.com/pages
