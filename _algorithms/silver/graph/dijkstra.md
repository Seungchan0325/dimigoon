---
title: "다익스트라 알고리즘"
description: "가중치가 있는 그래프에서 최단 경로를 찾는 알고리즘"
difficulty: "중급"
tags: ["다익스트라", "최단경로", "그래프", "우선순위큐"]
---

# 다익스트라 알고리즘 (Dijkstra's Algorithm)

음이 아닌 가중치를 가진 그래프에서 한 정점으로부터 다른 모든 정점까지의 최단 경로를 구하는 알고리즘입니다.

## 알고리즘 개요

- **발견자**: 에츠허르 다익스트라 (1959)
- **시간 복잡도**: O((V + E) log V) (우선순위 큐 사용 시)
- **공간 복잡도**: O(V)
- **제약사항**: 음수 가중치 간선이 없어야 함

## 동작 원리

1. 시작 정점의 거리를 0으로, 나머지 정점의 거리를 무한대로 초기화
2. 방문하지 않은 정점 중 거리가 가장 짧은 정점 선택
3. 선택된 정점을 통해 인접한 정점들의 거리 업데이트 (완화, Relaxation)
4. 모든 정점을 방문할 때까지 2-3 단계 반복

## 구현

### 우선순위 큐를 사용한 구현

```python
import heapq
from collections import defaultdict

def dijkstra(graph, start):
    # 거리 배열 초기화
    distances = defaultdict(lambda: float('inf'))
    distances[start] = 0
    
    # 우선순위 큐 (거리, 정점)
    pq = [(0, start)]
    visited = set()
    
    while pq:
        current_dist, current = heapq.heappop(pq)
        
        # 이미 방문한 정점이면 건너뛰기
        if current in visited:
            continue
        
        visited.add(current)
        
        # 인접한 정점들 확인
        for neighbor, weight in graph[current]:
            if neighbor not in visited:
                new_dist = current_dist + weight
                
                # 더 짧은 경로를 발견한 경우
                if new_dist < distances[neighbor]:
                    distances[neighbor] = new_dist
                    heapq.heappush(pq, (new_dist, neighbor))
    
    return distances
```

### 경로 추적이 포함된 구현

```python
def dijkstra_with_path(graph, start, end=None):
    distances = defaultdict(lambda: float('inf'))
    distances[start] = 0
    
    # 이전 정점 기록
    previous = {}
    pq = [(0, start)]
    visited = set()
    
    while pq:
        current_dist, current = heapq.heappop(pq)
        
        if current in visited:
            continue
        
        visited.add(current)
        
        # 목표 정점에 도달한 경우 (단일 목표)
        if end and current == end:
            break
        
        for neighbor, weight in graph[current]:
            if neighbor not in visited:
                new_dist = current_dist + weight
                
                if new_dist < distances[neighbor]:
                    distances[neighbor] = new_dist
                    previous[neighbor] = current
                    heapq.heappush(pq, (new_dist, neighbor))
    
    # 경로 복원 함수
    def get_path(target):
        if target not in previous and target != start:
            return None
        
        path = []
        current = target
        while current is not None:
            path.append(current)
            current = previous.get(current)
        
        return path[::-1]
    
    return distances, get_path
```

## 사용 예제

```python
# 그래프 생성 (인접 리스트)
graph = defaultdict(list)
edges = [
    (0, 1, 4), (0, 2, 1),
    (1, 3, 1), (2, 1, 2),
    (2, 3, 5), (3, 4, 3)
]

for u, v, w in edges:
    graph[u].append((v, w))

# 다익스트라 실행
distances = dijkstra(graph, 0)
print("최단 거리:", dict(distances))

# 경로 추적
distances, get_path = dijkstra_with_path(graph, 0)
path_to_4 = get_path(4)
print(f"0에서 4로의 경로: {path_to_4}")
print(f"거리: {distances[4]}")
```

## 그래프 표현 방식별 구현

### 인접 행렬 사용

```python
def dijkstra_matrix(adj_matrix, start):
    n = len(adj_matrix)
    distances = [float('inf')] * n
    distances[start] = 0
    visited = [False] * n
    
    for _ in range(n):
        # 방문하지 않은 정점 중 최단 거리 정점 찾기
        min_dist = float('inf')
        u = -1
        
        for v in range(n):
            if not visited[v] and distances[v] < min_dist:
                min_dist = distances[v]
                u = v
        
        if u == -1:  # 연결된 정점이 없음
            break
        
        visited[u] = True
        
        # 인접한 정점들의 거리 업데이트
        for v in range(n):
            if (not visited[v] and 
                adj_matrix[u][v] > 0 and 
                distances[u] + adj_matrix[u][v] < distances[v]):
                distances[v] = distances[u] + adj_matrix[u][v]
    
    return distances
```

## 최적화 기법

### 1. 양방향 다익스트라

```python
def bidirectional_dijkstra(graph, start, end):
    # 정방향과 역방향 동시 탐색
    forward_dist = {start: 0}
    backward_dist = {end: 0}
    
    forward_pq = [(0, start)]
    backward_pq = [(0, end)]
    
    forward_visited = set()
    backward_visited = set()
    
    best_distance = float('inf')
    meeting_point = None
    
    while forward_pq or backward_pq:
        # 정방향 한 단계
        if forward_pq:
            f_dist, f_node = heapq.heappop(forward_pq)
            if f_node not in forward_visited:
                forward_visited.add(f_node)
                
                if f_node in backward_visited:
                    distance = forward_dist[f_node] + backward_dist[f_node]
                    if distance < best_distance:
                        best_distance = distance
                        meeting_point = f_node
                
                # 탐색 계속...
        
        # 역방향 한 단계
        if backward_pq:
            b_dist, b_node = heapq.heappop(backward_pq)
            if b_node not in backward_visited:
                backward_visited.add(b_node)
                
                if b_node in forward_visited:
                    distance = forward_dist[b_node] + backward_dist[b_node]
                    if distance < best_distance:
                        best_distance = distance
                        meeting_point = b_node
    
    return best_distance if best_distance != float('inf') else -1
```

### 2. A* 알고리즘 (휴리스틱 포함)

```python
def a_star(graph, start, end, heuristic):
    """
    A* 알고리즘 (다익스트라 + 휴리스틱)
    heuristic(node, end): 노드에서 목표까지의 추정 거리
    """
    g_score = defaultdict(lambda: float('inf'))
    f_score = defaultdict(lambda: float('inf'))
    
    g_score[start] = 0
    f_score[start] = heuristic(start, end)
    
    pq = [(f_score[start], start)]
    visited = set()
    
    while pq:
        current_f, current = heapq.heappop(pq)
        
        if current == end:
            return g_score[current]
        
        if current in visited:
            continue
        
        visited.add(current)
        
        for neighbor, weight in graph[current]:
            if neighbor in visited:
                continue
            
            tentative_g = g_score[current] + weight
            
            if tentative_g < g_score[neighbor]:
                g_score[neighbor] = tentative_g
                f_score[neighbor] = tentative_g + heuristic(neighbor, end)
                heapq.heappush(pq, (f_score[neighbor], neighbor))
    
    return float('inf')
```

## 응용 문제

1. **최단 경로 문제**: 네비게이션, 라우팅
2. **네트워크 분석**: 통신망 최적화
3. **게임 개발**: NPC 경로 찾기
4. **물류 최적화**: 배송 경로 계획

## 다른 알고리즘과의 비교

| 알고리즘 | 시간 복잡도 | 음수 가중치 | 모든 쌍 최단경로 |
|----------|-------------|-------------|------------------|
| 다익스트라 | O(E log V) | ❌ | ❌ |
| 벨만-포드 | O(VE) | ✅ | ❌ |
| 플로이드-워셜 | O(V³) | ✅ | ✅ |

## 문제 해결 팁

1. **그래프 모델링**: 문제를 그래프로 추상화
2. **상태 공간**: 정점이 상태, 간선이 상태 전이
3. **메모리 최적화**: 필요한 경우에만 경로 저장
4. **조기 종료**: 단일 목표 정점인 경우 도달 시 종료
