---
layout: solution
title: "문제 A"
olympiad: "koi"
year: 2022
problem_id: "A"
difficulty: "gold"
points: 100
problem_type: "객관식"
tags: ["그리디", "정렬", "배열"]
---

## 문제 설명

KOI 2022 A번 문제입니다. 그리디 알고리즘을 사용하여 최적해를 구하는 문제입니다.

## 입력

첫 번째 줄에 N이 주어집니다.
두 번째 줄에 N개의 정수가 주어집니다.

## 출력

최적 해를 출력합니다.

## 해결 방법

이 문제는 **그리디 알고리즘**을 사용하여 해결할 수 있습니다.

### 핵심 아이디어

1. 배열을 정렬
2. 탐욕적 선택
3. 최적해 도출

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
    
    sort(arr.begin(), arr.end());
    
    int result = 0;
    for (int i = 0; i < N; i++) {
        result += arr[i] * (N - i);
    }
    
    cout << result << endl;
    
    return 0;
}
```

## 시간 복잡도

- **시간 복잡도**: O(N log N)
- **공간 복잡도**: O(N)
