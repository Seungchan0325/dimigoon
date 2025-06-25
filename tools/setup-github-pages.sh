#!/bin/bash

# GitHub Pages 커스텀 플러그인 설정 자동화 스크립트

echo "🚀 GitHub Pages 커스텀 플러그인 설정을 시작합니다..."

# 1. 현재 디렉토리가 Jekyll 프로젝트인지 확인
if [ ! -f "_config.yml" ]; then
    echo "❌ _config.yml 파일이 없습니다. Jekyll 프로젝트 루트에서 실행해주세요."
    exit 1
fi

echo "✅ Jekyll 프로젝트 확인됨"

# 2. Ruby와 Bundler 버전 확인
echo "🔍 Ruby 및 Bundler 환경 확인 중..."
ruby_version=$(ruby --version)
bundler_version=$(bundle --version)

echo "📍 Ruby: $ruby_version"
echo "📍 Bundler: $bundler_version"

# 3. Gemfile 백업 및 업데이트
if [ -f "Gemfile" ]; then
    echo "💾 기존 Gemfile 백업 중..."
    cp Gemfile Gemfile.backup
fi

echo "🔧 Gemfile 플러그인 지원으로 업데이트 중..."
# Gemfile에서 github-pages를 주석 처리하고 jekyll을 활성화
sed -i.bak 's/^gem "github-pages"/# gem "github-pages"/' Gemfile
sed -i.bak 's/^# gem "jekyll"/gem "jekyll"/' Gemfile

# 4. GitHub Actions 워크플로우 디렉토리 생성
echo "📁 GitHub Actions 워크플로우 디렉토리 생성 중..."
mkdir -p .github/workflows

# 5. Gemfile.lock 재생성
echo "🔄 Dependencies 재설치 중..."
if [ -f "Gemfile.lock" ]; then
    rm Gemfile.lock
fi

bundle install

if [ $? -ne 0 ]; then
    echo "❌ Bundle install 실패. Gemfile을 확인해주세요."
    if [ -f "Gemfile.backup" ]; then
        mv Gemfile.backup Gemfile
        echo "🔙 기존 Gemfile로 복원됨"
    fi
    exit 1
fi

# 6. 플러그인 작동 테스트
echo "🧪 플러그인 작동 테스트 중..."
build_output=$(bundle exec jekyll build --verbose 2>&1)

if echo "$build_output" | grep -q "AlgorithmPagesGenerator"; then
    echo "✅ AlgorithmPagesGenerator 플러그인 작동 확인"
else
    echo "⚠️  AlgorithmPagesGenerator 플러그인이 감지되지 않음"
fi

if echo "$build_output" | grep -q "SolutionPagesGenerator"; then
    echo "✅ SolutionPagesGenerator 플러그인 작동 확인"
else
    echo "⚠️  SolutionPagesGenerator 플러그인이 감지되지 않음"
fi

# 7. 설정 완료 메시지
echo ""
echo "🎉 로컬 환경 설정이 완료되었습니다!"
echo ""
echo "📋 다음 단계:"
echo "1. GitHub 리포지토리 Settings → Pages → Source를 'GitHub Actions'로 변경"
echo "2. 다음 명령어로 GitHub에 푸시:"
echo "   git add ."
echo "   git commit -m 'Setup GitHub Actions for custom Jekyll plugins'"
echo "   git push origin main"
echo ""
echo "3. GitHub Actions 탭에서 빌드 진행 상황 확인"
echo "4. 배포 완료 후 GitHub Pages URL에서 사이트 확인"
echo ""
echo "📖 자세한 가이드: GITHUB_PAGES_SETUP.md 파일 참조"
echo ""

# 8. 개발 서버 실행 옵션
read -p "지금 로컬 개발 서버를 실행하시겠습니까? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌐 개발 서버를 시작합니다..."
    bundle exec jekyll serve
fi

echo "✨ 설정 완료!"
