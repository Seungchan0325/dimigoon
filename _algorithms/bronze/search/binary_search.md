---
title: "이진 탐색"
description: "정렬된 배열에서 빠른 탐색을 위한 알고리즘"
difficulty: "초급"
tags: ["이진탐색", "분할정복", "O(log n)"]
---

# 이진 탐색 (Binary Search)

정렬된 배열에서 특정 값을 효율적으로 찾는 알고리즘입니다.

## 기본 개념

이진 탐색은 **분할 정복** 기법을 사용하여 탐색 범위를 절반씩 줄여나가는 알고리즘입니다.

**전제 조건**: 배열이 정렬되어 있어야 합니다.

## 알고리즘 과정

1. 배열의 중간 요소를 확인
2. 찾는 값과 비교
3. 찾는 값이 더 작으면 왼쪽 절반 탐색
4. 찾는 값이 더 크면 오른쪽 절반 탐색
5. 값을 찾거나 탐색 범위가 없을 때까지 반복

## 구현

### 반복적 구현

```python
def binary_search_iterative(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # 찾지 못한 경우
```

### 재귀적 구현

```python
def binary_search_recursive(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)
```

## 변형 문제들

### 1. Lower Bound (첫 번째 위치)

```python
def lower_bound(arr, target):
    left, right = 0, len(arr)
    
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    
    return left
```

### 2. Upper Bound (마지막 위치 + 1)

```python
def upper_bound(arr, target):
    left, right = 0, len(arr)
    
    while left < right:
        mid = (left + right) // 2
        if arr[mid] <= target:
            left = mid + 1
        else:
            right = mid
    
    return left
```

### 3. 특정 값의 개수 구하기

```python
def count_occurrences(arr, target):
    return upper_bound(arr, target) - lower_bound(arr, target)
```

## Python bisect 모듈

```python
import bisect

arr = [1, 3, 5, 7, 9, 11, 13]

# 이진 탐색
index = bisect.bisect_left(arr, 7)  # lower_bound
if index < len(arr) and arr[index] == 7:
    print(f"Found at index {index}")

# 삽입 위치 찾기
pos = bisect.bisect_left(arr, 8)  # 8이 들어갈 위치
arr.insert(pos, 8)
```

## 실수 이진 탐색

```python
def binary_search_real(func, left, right, eps=1e-9):
    """
    함수 func가 단조증가할 때, func(x) = 0인 x를 찾기
    """
    while right - left > eps:
        mid = (left + right) / 2
        if func(mid) < 0:
            left = mid
        else:
            right = mid
    
    return (left + right) / 2

# 예: sqrt(2) 구하기
def f(x):
    return x * x - 2

result = binary_search_real(f, 0, 2)
print(f"sqrt(2) ≈ {result}")
```

## 시간 복잡도

- **시간 복잡도**: O(log n)
- **공간 복잡도**: 
  - 반복적: O(1)
  - 재귀적: O(log n) (콜스택)

## 응용 문제

1. **Parametric Search**: 최적화 문제를 결정 문제로 변환
2. **숫자 야구**: 답을 맞추는 게임
3. **제곱근 구하기**: 정수 제곱근 찾기
4. **회전된 정렬 배열**: 최솟값 찾기

## 주의사항

- **오버플로우**: `mid = (left + right) // 2` 대신 `mid = left + (right - left) // 2`
- **무한 루프**: 조건문과 인덱스 업데이트 주의
- **경계 조건**: `left <= right` vs `left < right`
