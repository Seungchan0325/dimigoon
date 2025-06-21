---
title: "최장 증가 부분 수열"
description: "LIS 알고리즘의 다양한 구현 방법을 학습합니다"
difficulty: "중급"
tags: ["LIS", "DP", "이진탐색", "O(n log n)"]
---

# 최장 증가 부분 수열 (Longest Increasing Subsequence)

주어진 수열에서 증가하는 부분 수열 중 가장 긴 것을 찾는 문제입니다.

## 문제 정의

배열 `arr[0...n-1]`에서 `arr[i1] < arr[i2] < ... < arr[ik]` (단, i1 < i2 < ... < ik)를 만족하는 가장 긴 부분 수열을 찾습니다.

## 동적 계획법 접근 (O(n²))

### 기본 DP

```python
def lis_dp(arr):
    n = len(arr)
    dp = [1] * n  # dp[i]: arr[i]로 끝나는 LIS의 길이
    
    for i in range(1, n):
        for j in range(i):
            if arr[j] < arr[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)
```

### 경로 추적

```python
def lis_with_path(arr):
    n = len(arr)
    dp = [1] * n
    parent = [-1] * n
    
    for i in range(1, n):
        for j in range(i):
            if arr[j] < arr[i] and dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
                parent[i] = j
    
    # 최장 길이와 마지막 인덱스 찾기
    max_length = max(dp)
    last_index = dp.index(max_length)
    
    # 경로 복원
    path = []
    current = last_index
    while current != -1:
        path.append(arr[current])
        current = parent[current]
    
    return max_length, path[::-1]
```

## 이진 탐색 접근 (O(n log n))

### Patience Sorting 방식

```python
import bisect

def lis_binary_search(arr):
    tails = []  # tails[i]: 길이 i+1인 증가 수열의 마지막 원소 중 최솟값
    
    for num in arr:
        pos = bisect.bisect_left(tails, num)
        
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num
    
    return len(tails)
```

### 실제 수열 복원

```python
def lis_with_sequence(arr):
    n = len(arr)
    tails = []
    positions = []  # positions[i]: arr[i]가 들어간 tails의 위치
    predecessors = [-1] * n  # 이전 원소의 인덱스
    
    for i, num in enumerate(arr):
        pos = bisect.bisect_left(tails, num)
        
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num
        
        positions.append(pos)
        
        # 이전 원소 찾기
        if pos > 0:
            for j in range(i - 1, -1, -1):
                if positions[j] == pos - 1 and arr[j] < num:
                    predecessors[i] = j
                    break
    
    # 수열 복원
    length = len(tails)
    sequence = []
    
    # 마지막 원소 찾기
    current = -1
    for i in range(n - 1, -1, -1):
        if positions[i] == length - 1:
            current = i
            break
    
    # 역추적
    while current != -1:
        sequence.append(arr[current])
        current = predecessors[current]
    
    return length, sequence[::-1]
```

## 변형 문제들

### 1. 최장 감소 부분 수열 (LDS)

```python
def lds(arr):
    # 배열을 뒤집고 음수를 취한 후 LIS 구하기
    return lis_binary_search([-x for x in reversed(arr)])
```

### 2. 최장 비내림차순 부분 수열

```python
def lis_non_decreasing(arr):
    tails = []
    
    for num in arr:
        pos = bisect.bisect_right(tails, num)  # bisect_left 대신 bisect_right
        
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num
    
    return len(tails)
```

### 3. 바이토닉 수열

```python
def longest_bitonic_subsequence(arr):
    n = len(arr)
    
    # 왼쪽에서 오른쪽으로 LIS
    lis_left = [1] * n
    for i in range(1, n):
        for j in range(i):
            if arr[j] < arr[i]:
                lis_left[i] = max(lis_left[i], lis_left[j] + 1)
    
    # 오른쪽에서 왼쪽으로 LIS (실제로는 LDS)
    lis_right = [1] * n
    for i in range(n - 2, -1, -1):
        for j in range(i + 1, n):
            if arr[j] < arr[i]:
                lis_right[i] = max(lis_right[i], lis_right[j] + 1)
    
    # 각 위치에서 바이토닉 수열의 최대 길이
    max_length = 0
    for i in range(n):
        max_length = max(max_length, lis_left[i] + lis_right[i] - 1)
    
    return max_length
```

## 시간 복잡도 비교

| 방법 | 시간 복잡도 | 공간 복잡도 | 수열 복원 |
|------|------------|------------|----------|
| 기본 DP | O(n²) | O(n) | 쉬움 |
| 이진 탐색 | O(n log n) | O(n) | 복잡 |

## 응용

- **Building Bridges**: 다리 건설 문제
- **Box Stacking**: 상자 쌓기 문제  
- **Activity Selection**: 활동 선택 문제의 변형
