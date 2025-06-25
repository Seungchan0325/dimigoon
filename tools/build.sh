#!/bin/bash

# Jekyll 프로덕션 빌드 스크립트

echo "Jekyll 빌드를 시작합니다..."

# Gemfile이 존재하는지 확인
if [ ! -f "Gemfile" ]; then
    echo "Gemfile이 존재하지 않습니다."
    exit 1
fi

# Dependencies 설치
echo "Dependencies를 설치하고 있습니다..."
bundle install

# 기존 _site 디렉토리 제거
if [ -d "_site" ]; then
    echo "기존 빌드 파일을 제거합니다..."
    rm -rf _site
fi

# 프로덕션 환경 변수 설정
export JEKYLL_ENV=production

# Jekyll 빌드
echo "빌드를 실행합니다..."
bundle exec jekyll build

if [ $? -eq 0 ]; then
    echo "✅ 빌드가 성공적으로 완료되었습니다!"
    echo "빌드된 파일은 _site 디렉토리에 있습니다."
else
    echo "❌ 빌드 중 오류가 발생했습니다."
    exit 1
fi
