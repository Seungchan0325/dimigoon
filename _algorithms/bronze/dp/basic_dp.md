---
title: "기본 동적 계획법"
description: "DP의 기본 개념과 구현 방법을 학습합니다"
difficulty: "초급"
tags: ["DP", "메모이제이션", "재귀"]
---

# 기본 동적 계획법 (Dynamic Programming)

동적 계획법(Dynamic Programming, DP)은 복잡한 문제를 간단한 여러 개의 하위 문제로 나누어 푸는 방법입니다.

## 개념

DP는 다음 두 가지 조건을 만족하는 문제에서 사용할 수 있습니다:

1. **최적 부분 구조(Optimal Substructure)**: 문제의 최적 해결책이 부분 문제들의 최적 해결책으로 구성됨
2. **중복되는 부분 문제(Overlapping Subproblems)**: 같은 부분 문제가 여러 번 나타남

## 구현 방법

### 1. 메모이제이션 (Top-down)

```python
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    
    if n <= 1:
        return n
    
    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]
```

### 2. 타뷸레이션 (Bottom-up)

```python
def fibonacci_dp(n):
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]
```

## 예제 문제

### 피보나치 수열

가장 기본적인 DP 문제입니다.

**점화식**: `F(n) = F(n-1) + F(n-2)` (단, F(0) = 0, F(1) = 1)

### 계단 오르기

n개의 계단을 오르는 방법의 수를 구하는 문제입니다.

**점화식**: `dp[i] = dp[i-1] + dp[i-2]`

## 시간 복잡도

- **메모이제이션**: O(n)
- **타뷸레이션**: O(n)

기존 재귀 방식의 O(2^n)에서 크게 개선됩니다.

## 공간 복잡도 최적화

```python
def fibonacci_optimized(n):
    if n <= 1:
        return n
    
    prev2, prev1 = 0, 1
    
    for i in range(2, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    
    return prev1
```

공간 복잡도를 O(n)에서 O(1)로 줄일 수 있습니다.
