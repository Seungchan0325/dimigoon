---
layout: algorithm
title: "피보나치 수열"
tier: "bronze"
category: "dp"
description: "기본적인 DP 개념을 배우는 첫걸음"
tags: ["동적계획법", "수학", "기초"]
---

## 문제 설명

피보나치 수열은 첫 번째와 두 번째 항이 1이며, 그 뒤의 모든 항은 바로 앞 두 항의 합인 수열입니다.

F(1) = 1, F(2) = 1, F(n) = F(n-1) + F(n-2) (n ≥ 3)

## 알고리즘 설명

### 1. 재귀적 접근 (비효율적)

```python
def fibonacci_recursive(n):
    if n <= 2:
        return 1
    return fibonacci_recursive(n-1) + fibonacci_recursive(n-2)
```

### 2. 동적 계획법 (효율적)

```python
def fibonacci_dp(n):
    if n <= 2:
        return 1
    
    dp = [0] * (n + 1)
    dp[1] = dp[2] = 1
    
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]
```

## 시간 복잡도

- 재귀적 접근: O(2^n)
- 동적 계획법: O(n)

## 관련 문제

- [백준 2747번 - 피보나치 수](https://www.acmicpc.net/problem/2747)
- [백준 2748번 - 피보나치 수 2](https://www.acmicpc.net/problem/2748)
