---
layout: solution
title: "문제 C"
olympiad: "koi"
year: 2023
problem_id: "C"
difficulty: "bronze"
points: 100
problem_type: "객관식"
tags: ["구현", "시뮬레이션", "배열"]
---

## 문제 설명

KOI 2023 C번 문제입니다. 배열을 조작하여 특정 조건을 만족시키는 구현 문제입니다.

## 입력

첫 번째 줄에 배열의 크기 N이 주어집니다.
두 번째 줄에 N개의 정수가 주어집니다.

## 출력

조작 후 배열의 상태를 출력합니다.

## 해결 방법

이 문제는 **시뮬레이션**으로 해결할 수 있습니다.

### 핵심 아이디어

1. 주어진 규칙에 따라 배열 조작
2. 단계별로 결과 확인
3. 최종 상태 출력

### 구현

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N;
    cin >> N;
    
    vector<int> arr(N);
    for (int i = 0; i < N; i++) {
        cin >> arr[i];
    }
    
    // 시뮬레이션 수행
    for (int i = 0; i < N - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            swap(arr[i], arr[i + 1]);
        }
    }
    
    // 결과 출력
    for (int i = 0; i < N; i++) {
        cout << arr[i];
        if (i < N - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}
```

## 시간 복잡도

- **시간 복잡도**: O(N)
- **공간 복잡도**: O(N)
