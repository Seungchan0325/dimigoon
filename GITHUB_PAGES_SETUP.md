# GitHub Pages 커스텀 플러그인 사용 완전 가이드

## 🎯 개요
GitHub Pages는 기본적으로 보안상의 이유로 커스텀 플러그인을 허용하지 않습니다. 하지만 **GitHub Actions**를 사용하면 커스텀 플러그인이 포함된 Jekyll 사이트를 빌드하고 배포할 수 있습니다.

## ⚡ **빠른 설정 (자동화 스크립트)**

프로젝트 루트에서 다음 명령어를 실행하면 자동으로 설정됩니다:

```bash
./tools/setup-github-pages.sh
```

이 스크립트는 다음 작업들을 자동으로 수행합니다:
- Gemfile 플러그인 지원으로 업데이트
- Dependencies 재설치
- 플러그인 작동 확인
- 로컬 개발 서버 실행 옵션

## 📚 **상세 설정 (수동)**

자동화 스크립트를 사용하지 않고 수동으로 설정하려면 아래 단계를 따라하세요.

## 🚀 단계별 설정 방법

### 1단계: GitHub 리포지토리 설정 변경

#### 1-1. GitHub.com에서 리포지토리 접속
1. 웹브라우저에서 `https://github.com/[username]/[repository-name]` 접속
2. 리포지토리 메인 페이지에서 상단의 **Settings** 탭 클릭

#### 1-2. Pages 설정 변경
1. 좌측 사이드바에서 **Pages** 메뉴 클릭
2. **Source** 섹션 찾기:
   ```
   Source
   ┌─────────────────────────────────┐
   │ ○ Deploy from a branch          │ ← 기본값 (제거)
   │ ● GitHub Actions               │ ← 이것 선택
   └─────────────────────────────────┘
   ```
3. **GitHub Actions** 라디오 버튼 선택
4. 자동으로 설정이 저장됨

#### 1-3. 설정 확인
- Pages 페이지에서 "Your site is ready to be published at [URL]" 메시지 확인
- Actions 탭에서 워크플로우 실행 대기 상태 확인

### 2단계: 로컬 프로젝트 파일 구성

#### 2-1. Gemfile 설정 확인
현재 프로젝트의 `Gemfile`이 다음과 같이 설정되어 있는지 확인:

```ruby
source "https://rubygems.org"
git_source(:github) {|repo| "https://github.com/#{repo}.git" }

ruby "~> 3.2.0"

# 로컬 개발 및 GitHub Actions용 Jekyll (플러그인 지원)
gem "jekyll", "~> 4.3.0"

# GitHub Pages 배포용 (GitHub Actions 사용 시 주석 처리)
# gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end
```

#### 2-2. GitHub Actions 워크플로우 파일 확인
`.github/workflows/jekyll.yml` 파일이 존재하는지 확인:

```yaml
name: Build and Deploy Jekyll with Custom Plugins

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout 🛎️
      uses: actions/checkout@v4

    - name: Setup Ruby 💎
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: '3.2'
        bundler-cache: true

    - name: Setup Pages 📄
      id: pages
      uses: actions/configure-pages@v4

    - name: Build Jekyll Site 🏗️
      run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
      env:
        JEKYLL_ENV: production

    - name: Upload artifact 📦
      uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
    - name: Deploy to GitHub Pages 🚀
      id: deployment
      uses: actions/deploy-pages@v4
```

### 3단계: 로컬 개발 환경 설정

### 3단계: 로컬 개발 환경 설정

#### 3-1. Ruby 및 Bundler 설치 확인
```bash
# Ruby 버전 확인 (3.0 이상 필요)
ruby --version

# Bundler 설치 (없을 경우)
gem install bundler

# Bundler 버전 확인
bundle --version
```

#### 3-2. 프로젝트 Dependencies 설치
```bash
# 프로젝트 디렉토리로 이동
cd /path/to/your/project

# Gemfile.lock 삭제 (기존 의존성 충돌 방지)
rm Gemfile.lock

# 새로운 의존성 설치
bundle install

# 설치 성공 확인
bundle list | grep jekyll
```

#### 3-3. 플러그인 작동 테스트
```bash
# 플러그인이 포함된 로컬 빌드 테스트
bundle exec jekyll build --verbose

# 플러그인 실행 확인 (다음 메시지들이 보여야 함)
# Jekyll::AlgorithmDataGenerator finished
# Jekyll::AlgorithmPagesGenerator finished  
# Jekyll::SolutionPagesGenerator finished

# 생성된 페이지 확인
ls _site/algorithms/
ls _site/solutions/

# 개발 서버 실행
bundle exec jekyll serve
# 브라우저에서 http://localhost:4000 접속하여 확인
```

### 4단계: GitHub에 코드 푸시 및 배포

#### 4-1. 변경사항 커밋
```bash
# 모든 변경사항 추가
git add .

# 커밋 메시지 작성
git commit -m "Setup GitHub Actions for custom Jekyll plugins

- Add .github/workflows/jekyll.yml for automated builds
- Update Gemfile to use Jekyll 4.x with plugin support
- Enable custom plugins: AlgorithmPagesGenerator, SolutionPagesGenerator"

# 브랜치 확인 (main 브랜치인지 확인)
git branch
```

#### 4-2. GitHub에 푸시
```bash
# main 브랜치에 푸시
git push origin main

# 푸시 성공 확인
echo "✅ 코드가 GitHub에 푸시되었습니다!"
echo "🔄 GitHub Actions가 자동으로 빌드를 시작합니다..."
```

#### 4-3. GitHub Actions 실행 모니터링
1. **GitHub 리포지토리로 이동**
2. **Actions** 탭 클릭
3. **가장 최근 워크플로우 실행** 클릭
4. **실시간 로그 확인**:
   ```
   Build → Setup Ruby → Build Jekyll Site → Upload artifact
                ↓
   Deploy → Deploy to GitHub Pages
   ```

### 5단계: 배포 완료 확인

#### 5-1. GitHub Pages URL 확인
1. **Settings** → **Pages**에서 배포된 URL 확인
2. 보통 `https://[username].github.io/[repository-name]` 형태

#### 5-2. 사이트 기능 테스트
```bash
# 배포된 사이트에서 확인할 항목들:
# ✅ 메인 페이지 로딩
# ✅ 알고리즘 목록 페이지 (/algorithms/)
# ✅ 개별 알고리즘 페이지들 (/algorithms/basic-dp/ 등)
# ✅ 솔루션 목록 페이지 (/solutions/)
# ✅ 개별 솔루션 페이지들 (/solutions/koi/2023/A/ 등)
# ✅ CSS 스타일 적용
# ✅ JavaScript 기능 작동
```

### 6단계: 지속적인 개발 워크플로우

### 6단계: 지속적인 개발 워크플로우

#### 6-1. 일상적인 개발 사이클
```bash
# 1. 로컬에서 변경사항 작업
# 2. 로컬 테스트
bundle exec jekyll serve

# 3. 빌드 테스트
bundle exec jekyll build

# 4. 변경사항 커밋 & 푸시
git add .
git commit -m "Add new algorithm: [알고리즘명]"
git push origin main

# 5. GitHub Actions 자동 배포 대기 (2-3분)
# 6. 배포된 사이트에서 확인
```

#### 6-2. 새로운 알고리즘/솔루션 추가 시
```bash
# 알고리즘 파일 추가 예시
# _algorithms/[tier]/[category]/[algorithm-name].md

# 솔루션 파일 추가 예시  
# _solutions/[olympiad]/[year]/[problem-name].md

# 플러그인이 자동으로 페이지 생성
# 수동 페이지 생성 불필요!
```

## 🎁 **설정 완료 후 사용 가능한 기능들**

### ✅ **자동 생성되는 페이지들**
- **알고리즘 목록**: `/algorithms/`
- **개별 알고리즘**: `/algorithms/[algorithm-name]/`
- **솔루션 목록**: `/solutions/`
- **올림피아드별**: `/solutions/[olympiad].html`
- **개별 솔루션**: `/solutions/[olympiad]/[year]/[problem]/`

### ✅ **플러그인 기능들**
- **AlgorithmDataGenerator**: 알고리즘 데이터 구조 자동 생성
- **AlgorithmPagesGenerator**: 티어별/카테고리별 알고리즘 페이지 생성
- **SolutionPagesGenerator**: 올림피아드별 솔루션 페이지 생성

### ✅ **개발 환경 장점**
- **로컬 개발**: 즉시 확인 가능
- **자동 빌드**: 푸시만으로 배포
- **오류 방지**: 로컬과 동일한 빌드 환경

## 📋 **중요한 체크리스트**

### 🔍 **설정 전 확인사항**
- [ ] Ruby 3.0+ 설치
- [ ] Git 설정 완료
- [ ] GitHub 계정 및 리포지토리 존재

### 🚀 **설정 중 확인사항**
- [ ] GitHub Pages Source → GitHub Actions 변경
- [ ] `.github/workflows/jekyll.yml` 파일 존재
- [ ] `Gemfile`에서 `jekyll` gem 활성화, `github-pages` 비활성화
- [ ] `bundle install` 성공적으로 완료

### ✅ **설정 후 확인사항**
- [ ] GitHub Actions 워크플로우 성공적으로 완료
- [ ] 배포된 사이트 정상 접속
- [ ] 플러그인 생성 페이지들 존재 확인
- [ ] CSS/JS 파일 정상 로딩

## ⚠️ **트러블슈팅 가이드**

### 🔧 **일반적인 문제들**

#### 문제 1: GitHub Actions 빌드 실패
**증상**: Actions 탭에서 빌드가 빨간색(실패)으로 표시

**해결책**:
```bash
# 1. 로컬에서 빌드 테스트
bundle exec jekyll build

# 2. 로그에서 오류 확인
bundle exec jekyll build --verbose

# 3. Gemfile.lock 다시 생성
rm Gemfile.lock
bundle install
git add Gemfile.lock
git commit -m "Update Gemfile.lock"
git push origin main
```

#### 문제 2: CSS 파일이 로드되지 않음
**증상**: 사이트가 스타일 없이 표시됨

**해결책**:
```bash
# 1. _config.yml의 baseurl 확인
baseurl: ""  # 보통 빈 문자열

# 2. head.html의 CSS 경로 확인
<link rel="stylesheet" href="{{ "/assets/css/style.css" | relative_url }}">

# 3. style.scss 파일 확인
---
---
@import "base";
@import "partials/header";
# ... 나머지 imports
```

#### 문제 3: 플러그인이 작동하지 않음
**증상**: 알고리즘/솔루션 페이지가 자동 생성되지 않음

**해결책**:
```bash
# 1. 플러그인 파일들 확인
ls _plugins/
# algorithm_data_generator.rb
# algorithm_pages_generator.rb  
# solution_pages_generator.rb

# 2. Gemfile에서 jekyll gem 활성화 확인
gem "jekyll", "~> 4.3.0"
# gem "github-pages", group: :jekyll_plugins  # 주석 처리

# 3. 로컬에서 플러그인 실행 확인
bundle exec jekyll build --verbose | grep Generator
```

#### 문제 4: 404 Page Not Found
**증상**: 배포된 사이트 접속 시 404 오류

**해결책**:
1. **Pages 설정 재확인**: Settings → Pages → Source가 "GitHub Actions"인지 확인
2. **워크플로우 완료 대기**: Actions 탭에서 초록색 체크마크 확인
3. **URL 확인**: 올바른 GitHub Pages URL 사용 확인

### 📞 **추가 도움이 필요한 경우**

1. **GitHub Actions 로그 확인**: Actions 탭 → 실패한 워크플로우 → 상세 로그 확인
2. **로컬 환경 재설정**: `bundle clean --force && bundle install`
3. **Jekyll 공식 문서**: https://jekyllrb.com/docs/
4. **GitHub Pages 공식 문서**: https://docs.github.com/pages

---

**🎉 축하합니다! 이제 GitHub Pages에서 커스텀 플러그인을 사용하는 Jekyll 사이트가 완전히 설정되었습니다!**
