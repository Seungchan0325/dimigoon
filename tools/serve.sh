#!/bin/bash

# Jekyll 서버 시작 스크립트

echo "Jekyll 개발 서버를 시작합니다..."

# Gemfile이 존재하는지 확인
if [ ! -f "Gemfile" ]; then
    echo "Gemfile이 존재하지 않습니다."
    exit 1
fi

# 기존 Jekyll 프로세스 종료
echo "기존 Jekyll 프로세스를 확인하고 종료합니다..."
pkill -f "jekyll serve" 2>/dev/null || true

# 포트 사용 중인지 확인
PORT=4000
if lsof -i :$PORT > /dev/null 2>&1; then
    echo "포트 $PORT이 사용 중입니다. 다른 포트를 사용합니다..."
    PORT=4001
fi

# Bundle install 실행
echo "Dependencies를 설치하고 있습니다..."
bundle install

# Jekyll 서버 시작
echo "Jekyll 서버를 포트 $PORT에서 시작합니다..."
echo "브라우저에서 http://localhost:$PORT 또는 http://0.0.0.0:$PORT 접속"
bundle exec jekyll serve --host=0.0.0.0 --port=$PORT --livereload
