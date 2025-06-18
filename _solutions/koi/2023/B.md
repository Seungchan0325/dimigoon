---
layout: solution
title: "문제 B"
olympiad: "koi"
year: 2023
problem_id: "B"
difficulty: "platinum"
points: 100
problem_type: "프로그래밍 챌린지"
tags: ["동적계획법", "최적화", "세그먼트트리"]
---

## 문제 설명

KOI 2023 B번 문제입니다. 동적계획법을 사용하여 최적해를 구하는 문제입니다.

## 입력

첫 번째 줄에 배열의 크기 N이 주어집니다.
두 번째 줄에 N개의 정수가 주어집니다.

## 출력

조건을 만족하는 최댓값을 출력합니다.

## 해결 방법

이 문제는 **동적계획법**을 사용하여 해결할 수 있습니다.

### 핵심 아이디어

1. DP 테이블 정의: `dp[i]` = i번째까지 고려했을 때의 최댓값
2. 점화식 도출
3. 최적화 기법 적용

### 구현

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int N;
    cin >> N;
    
    vector<int> arr(N);
    for (int i = 0; i < N; i++) {
        cin >> arr[i];
    }
    
    vector<long long> dp(N);
    dp[0] = arr[0];
    
    for (int i = 1; i < N; i++) {
        dp[i] = max((long long)arr[i], dp[i-1] + arr[i]);
    }
    
    long long result = *max_element(dp.begin(), dp.end());
    cout << result << endl;
    
    return 0;
}
```

## 시간 복잡도

- **시간 복잡도**: O(N)
- **공간 복잡도**: O(N)

## 최적화

공간 복잡도를 O(1)로 줄일 수 있습니다:

```cpp
long long current_max = arr[0];
long long global_max = arr[0];

for (int i = 1; i < N; i++) {
    current_max = max((long long)arr[i], current_max + arr[i]);
    global_max = max(global_max, current_max);
}
```
