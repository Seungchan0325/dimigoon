---
layout: algorithm
title: "깊이 우선 탐색 (DFS)"
tier: "bronze"
category: "graph"
description: "재귀와 스택을 이용한 그래프 탐색"
tags: ["그래프", "탐색", "재귀", "스택"]
---

## 문제 설명

깊이 우선 탐색(DFS)은 그래프에서 한 정점을 시작으로 가능한 한 깊이 들어가며 탐색하는 알고리즘입니다.

## 알고리즘 설명

### 1. 재귀를 이용한 DFS

```python
def dfs_recursive(graph, start, visited):
    visited[start] = True
    print(start, end=' ')
    
    for neighbor in graph[start]:
        if not visited[neighbor]:
            dfs_recursive(graph, neighbor, visited)
```

### 2. 스택을 이용한 DFS

```python
def dfs_stack(graph, start):
    visited = [False] * len(graph)
    stack = [start]
    
    while stack:
        node = stack.pop()
        if not visited[node]:
            visited[node] = True
            print(node, end=' ')
            
            for neighbor in reversed(graph[node]):
                if not visited[neighbor]:
                    stack.append(neighbor)
```

## 시간 복잡도

- 인접 리스트: O(V + E)
- 인접 행렬: O(V²)

## 관련 문제

- [백준 1260번 - DFS와 BFS](https://www.acmicpc.net/problem/1260)
- [백준 2606번 - 바이러스](https://www.acmicpc.net/problem/2606)
