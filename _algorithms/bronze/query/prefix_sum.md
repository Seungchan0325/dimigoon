---
title: "구간 합 쿼리"
description: "누적 합을 이용한 효율적인 구간 합 계산"
difficulty: "초급"
tags: ["누적합", "prefix sum", "쿼리"]
---

# 구간 합 쿼리 (Range Sum Query)

배열에서 특정 구간의 합을 빠르게 계산하는 방법을 학습합니다.

## 문제 정의

배열 `arr[0...n-1]`이 주어졌을 때, 구간 `[i, j]`의 합을 구하는 쿼리를 여러 번 처리해야 합니다.

## 나이브한 접근

```python
def range_sum_naive(arr, i, j):
    return sum(arr[i:j+1])
```

**시간 복잡도**: O(n) per query

## 누적 합 (Prefix Sum) 접근

### 전처리

```python
def build_prefix_sum(arr):
    n = len(arr)
    prefix = [0] * (n + 1)
    
    for i in range(n):
        prefix[i + 1] = prefix[i] + arr[i]
    
    return prefix
```

### 쿼리 처리

```python
def range_sum_query(prefix, i, j):
    return prefix[j + 1] - prefix[i]
```

**시간 복잡도**: 
- 전처리: O(n)
- 쿼리: O(1)

## 구현 예제

```python
class RangeSumQuery:
    def __init__(self, nums):
        self.prefix = [0]
        for num in nums:
            self.prefix.append(self.prefix[-1] + num)
    
    def sumRange(self, left, right):
        return self.prefix[right + 1] - self.prefix[left]

# 사용 예제
arr = [1, 3, 5, 7, 9, 11]
rsq = RangeSumQuery(arr)

print(rsq.sumRange(1, 3))  # 3 + 5 + 7 = 15
print(rsq.sumRange(2, 5))  # 5 + 7 + 9 + 11 = 32
```

## 2차원 누적 합

2차원 배열에서도 같은 원리를 적용할 수 있습니다.

```python
def build_2d_prefix_sum(matrix):
    m, n = len(matrix), len(matrix[0])
    prefix = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            prefix[i][j] = (matrix[i-1][j-1] + 
                           prefix[i-1][j] + 
                           prefix[i][j-1] - 
                           prefix[i-1][j-1])
    
    return prefix

def range_sum_2d(prefix, r1, c1, r2, c2):
    return (prefix[r2+1][c2+1] - 
            prefix[r1][c2+1] - 
            prefix[r2+1][c1] + 
            prefix[r1][c1])
```

## 응용 문제

1. **구간 평균**: 구간 합을 구간 길이로 나누기
2. **구간 최소/최대 개수**: 특정 값보다 작거나 큰 원소의 개수
3. **부분 배열 합 문제**: 특정 합을 갖는 부분 배열 찾기

## 관련 자료구조

- **세그먼트 트리**: 구간 합 + 업데이트 쿼리
- **펜윅 트리**: 공간 효율적인 구간 합 + 업데이트
