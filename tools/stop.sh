#!/bin/bash

# Jekyll 서버 종료 스크립트

echo "Jekyll 서버를 종료합니다..."

# Jekyll 프로세스 찾기 및 종료
JEKYLL_PIDS=$(ps aux | grep "jekyll serve" | grep -v grep | awk '{print $2}')

if [ -z "$JEKYLL_PIDS" ]; then
    echo "실행 중인 Jekyll 서버가 없습니다."
else
    echo "Jekyll 서버 프로세스를 종료합니다..."
    echo "$JEKYLL_PIDS" | xargs kill -9
    echo "Jekyll 서버가 종료되었습니다."
fi

# 포트 4000, 4001 사용 확인
for port in 4000 4001; do
    if lsof -i :$port > /dev/null 2>&1; then
        echo "포트 $port이 여전히 사용 중입니다."
        PID=$(lsof -ti :$port)
        echo "PID $PID를 종료합니다..."
        kill -9 $PID 2>/dev/null || true
    fi
done

echo "모든 Jekyll 서버가 종료되었습니다."
