---
layout: algorithm
title: "최장 증가 부분 수열 (LIS)"
tier: "silver"
category: "dp"
description: "동적 계획법의 대표적인 문제"
tags: ["동적계획법", "수열", "이분탐색"]
---

## 문제 설명

주어진 수열에서 가장 긴 증가하는 부분 수열을 찾는 문제입니다.

예: [10, 9, 2, 5, 3, 7, 101, 18]에서 LIS는 [2, 3, 7, 18] 또는 [2, 3, 7, 101]입니다.

## 알고리즘 설명

### 1. 동적 계획법 O(n²)

```python
def lis_dp(arr):
    n = len(arr)
    dp = [1] * n
    
    for i in range(1, n):
        for j in range(i):
            if arr[j] < arr[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)
```

### 2. 이분 탐색 O(n log n)

```python
from bisect import bisect_left

def lis_binary_search(arr):
    tails = []
    
    for num in arr:
        pos = bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num
    
    return len(tails)
```

## 시간 복잡도

- DP 방법: O(n²)
- 이분 탐색 방법: O(n log n)

## 관련 문제

- [백준 11053번 - 가장 긴 증가하는 부분 수열](https://www.acmicpc.net/problem/11053)
- [백준 12015번 - 가장 긴 증가하는 부분 수열 2](https://www.acmicpc.net/problem/12015)
