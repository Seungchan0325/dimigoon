---
title: "배낭 문제"
description: "0-1 배낭 문제의 동적 계획법 해결"
difficulty: "중상급"
tags: ["DP", "최적화", "배낭문제"]
---

# 배낭 문제 (Knapsack Problem)

제한된 무게의 배낭에 최대 가치의 물건들을 넣는 최적화 문제입니다.

## 문제 정의

- **배낭 용량**: W
- **물건들**: n개, 각각 무게 w[i], 가치 v[i]
- **목표**: 배낭 용량을 초과하지 않으면서 최대 가치를 얻기

## 0-1 배낭 문제

각 물건을 0개 또는 1개만 선택할 수 있는 경우입니다.

### DP 접근

```python
def knapsack_01(weights, values, capacity):
    n = len(weights)
    # dp[i][w] = i번째까지 물건을 고려했을 때, 용량 w에서의 최대 가치
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            # i번째 물건을 넣지 않는 경우
            dp[i][w] = dp[i-1][w]
            
            # i번째 물건을 넣을 수 있고, 넣는 것이 더 유리한 경우
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], 
                              dp[i-1][w - weights[i-1]] + values[i-1])
    
    return dp[n][capacity]
```

### 공간 최적화

```python
def knapsack_01_optimized(weights, values, capacity):
    n = len(weights)
    dp = [0] * (capacity + 1)
    
    for i in range(n):
        # 뒤에서부터 업데이트 (중복 사용 방지)
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[capacity]
```

## 무한 배낭 문제

각 물건을 무한히 사용할 수 있는 경우입니다.

```python
def knapsack_unbounded(weights, values, capacity):
    dp = [0] * (capacity + 1)
    
    for w in range(1, capacity + 1):
        for i in range(len(weights)):
            if weights[i] <= w:
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[capacity]
```

## 선택한 물건 추적

```python
def knapsack_with_items(weights, values, capacity):
    n = len(weights)
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]
    
    # DP 테이블 채우기
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], 
                              dp[i-1][w - weights[i-1]] + values[i-1])
    
    # 선택한 물건 역추적
    selected = []
    w = capacity
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i-1][w]:
            selected.append(i-1)  # 0-based index
            w -= weights[i-1]
    
    return dp[n][capacity], selected[::-1]
```

## 시간 복잡도

- **시간 복잡도**: O(n × W)
- **공간 복잡도**: O(n × W) 또는 O(W) (최적화 시)
