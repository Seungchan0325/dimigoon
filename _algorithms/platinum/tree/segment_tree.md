---
title: "세그먼트 트리"
description: "구간 쿼리를 효율적으로 처리하는 자료구조"
difficulty: "고급"
tags: ["세그먼트트리", "구간쿼리", "트리", "자료구조"]
---

# 세그먼트 트리 (Segment Tree)

배열의 구간에 대한 쿼리를 효율적으로 처리하는 트리 자료구조입니다.

## 기본 개념

- **시간 복잡도**: 구축 O(n), 쿼리/업데이트 O(log n)
- **공간 복잡도**: O(4n)
- **용도**: 구간 합, 최솟값, 최댓값 등의 쿼리

## 구간 합 세그먼트 트리

```python
class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.build(arr, 0, 0, self.n - 1)
    
    def build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self.build(arr, 2*node+1, start, mid)
            self.build(arr, 2*node+2, mid+1, end)
            self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]
    
    def update(self, node, start, end, idx, val):
        if start == end:
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            if idx <= mid:
                self.update(2*node+1, start, mid, idx, val)
            else:
                self.update(2*node+2, mid+1, end, idx, val)
            self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]
    
    def query(self, node, start, end, l, r):
        if r < start or end < l:
            return 0
        if l <= start and end <= r:
            return self.tree[node]
        
        mid = (start + end) // 2
        return (self.query(2*node+1, start, mid, l, r) + 
                self.query(2*node+2, mid+1, end, l, r))
    
    def update_point(self, idx, val):
        self.update(0, 0, self.n-1, idx, val)
    
    def range_sum(self, l, r):
        return self.query(0, 0, self.n-1, l, r)
```

## 사용 예제

```python
# 배열 초기화
arr = [1, 3, 5, 7, 9, 11]
seg_tree = SegmentTree(arr)

# 구간 합 쿼리
print(seg_tree.range_sum(1, 3))  # 3 + 5 + 7 = 15

# 점 업데이트
seg_tree.update_point(1, 10)  # arr[1] = 3 -> 10

# 업데이트 후 쿼리
print(seg_tree.range_sum(1, 3))  # 10 + 5 + 7 = 22
```

## 최솟값 세그먼트 트리

```python
class MinSegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [float('inf')] * (4 * self.n)
        self.build(arr, 0, 0, self.n - 1)
    
    def build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self.build(arr, 2*node+1, start, mid)
            self.build(arr, 2*node+2, mid+1, end)
            self.tree[node] = min(self.tree[2*node+1], self.tree[2*node+2])
    
    def query(self, node, start, end, l, r):
        if r < start or end < l:
            return float('inf')
        if l <= start and end <= r:
            return self.tree[node]
        
        mid = (start + end) // 2
        return min(self.query(2*node+1, start, mid, l, r),
                   self.query(2*node+2, mid+1, end, l, r))
    
    def range_min(self, l, r):
        return self.query(0, 0, self.n-1, l, r)
```
