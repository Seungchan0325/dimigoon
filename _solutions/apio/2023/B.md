---
layout: solution
title: "Sequence"
olympiad: "apio"
year: 2023
problem_id: "B"
difficulty: "platinum"
points: 100
problem_type: "프로그래밍 챌린지"
tags: ["동적계획법", "최적화", "세그먼트트리"]
---

## 문제 설명

N개의 정수로 이루어진 수열이 주어집니다. 이 수열을 K개의 구간으로 나누어 각 구간의 합의 최댓값을 최소화하는 문제입니다.

## 입력

첫 번째 줄에 N과 K가 주어집니다.
두 번째 줄에 N개의 정수가 주어집니다.

## 출력

K개 구간으로 나누었을 때 구간 합의 최댓값의 최솟값을 출력합니다.

## 해결 방법

이 문제는 **이분 탐색**과 **그리디 알고리즘**을 결합하여 해결할 수 있습니다.

### 핵심 아이디어

1. **이분 탐색**: 가능한 최댓값의 범위에서 이분 탐색
2. **그리디 검증**: 주어진 최댓값으로 K개 구간을 만들 수 있는지 확인
3. **누적합**: 구간 합 계산을 위한 전처리

### 구현

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;
using ll = long long;

bool canDivide(const vector<ll>& prefix, int k, ll maxSum) {
    int segments = 1;
    ll currentSum = 0;
    
    for (int i = 1; i < prefix.size(); i++) {
        ll segmentSum = prefix[i] - prefix[i - currentSum - 1];
        
        if (segmentSum > maxSum) {
            segments++;
            currentSum = 0;
            
            if (segments > k) {
                return false;
            }
        } else {
            currentSum++;
        }
    }
    
    return true;
}

ll solve(vector<int>& arr, int k) {
    int n = arr.size();
    vector<ll> prefix(n + 1, 0);
    
    // 누적합 계산
    for (int i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + arr[i];
    }
    
    ll left = *max_element(arr.begin(), arr.end());
    ll right = prefix[n];
    ll answer = right;
    
    while (left <= right) {
        ll mid = left + (right - left) / 2;
        
        if (canDivide(prefix, k, mid)) {
            answer = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return answer;
}

int main() {
    int N, K;
    cin >> N >> K;
    
    vector<int> arr(N);
    for (int i = 0; i < N; i++) {
        cin >> arr[i];
    }
    
    cout << solve(arr, K) << endl;
    
    return 0;
}
```

## 시간 복잡도

- **시간 복잡도**: O(N × log S)
  - N: 수열의 길이, S: 수열의 총합
- **공간 복잡도**: O(N)

## 최적화 기법

1. **누적합 활용**: 구간 합을 O(1)에 계산
2. **이분 탐색 범위**: 최솟값은 배열의 최댓값, 최댓값은 전체 합
3. **조기 종료**: 불가능한 경우 즉시 false 반환

## 대안 해법: 동적계획법

DP를 사용한 O(N²K) 해법도 가능합니다:

```cpp
// dp[i][j] = i번째까지 j개 구간으로 나눈 최적값
vector<vector<ll>> dp(n + 1, vector<ll>(k + 1, INF));
dp[0][0] = 0;

for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= min(i, k); j++) {
        for (int prev = j - 1; prev < i; prev++) {
            ll segmentSum = prefix[i] - prefix[prev];
            dp[i][j] = min(dp[i][j], max(dp[prev][j-1], segmentSum));
        }
    }
}
```
