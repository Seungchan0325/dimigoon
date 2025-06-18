---
layout: solution
title: "문제 A"
olympiad: "koi"
year: 2023
problem_id: "A"
difficulty: "silver"
points: 100
problem_type: "알고리즘"
tags: ["그래프", "DFS", "탐색"]
---

## 문제 설명

KOI 2023 A번 문제입니다. 주어진 그래프에서 특정 조건을 만족하는 경로를 찾는 문제입니다.

## 입력

첫 번째 줄에 정점의 수 N과 간선의 수 M이 주어집니다.
다음 M개의 줄에는 간선 정보가 주어집니다.

## 출력

조건을 만족하는 경로의 개수를 출력합니다.

## 해결 방법

이 문제는 DFS(깊이 우선 탐색)를 사용하여 해결할 수 있습니다.

### 핵심 아이디어

1. 모든 정점에서 DFS를 시작
2. 방문한 정점을 체크하여 사이클 방지
3. 조건을 만족하는 경로를 카운트

### 구현

```cpp
#include <iostream>
#include <vector>
#include <cstring>

using namespace std;

vector<vector<int>> graph;
bool visited[1001];
int result = 0;

void dfs(int node, int depth) {
    visited[node] = true;
    
    // 조건 체크
    if (depth >= 3) {
        result++;
        return;
    }
    
    for (int next : graph[node]) {
        if (!visited[next]) {
            dfs(next, depth + 1);
        }
    }
    
    visited[node] = false;
}

int main() {
    int N, M;
    cin >> N >> M;
    
    graph.resize(N + 1);
    
    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    
    for (int i = 1; i <= N; i++) {
        memset(visited, false, sizeof(visited));
        dfs(i, 0);
    }
    
    cout << result << endl;
    
    return 0;
}
```

## 시간 복잡도

- **시간 복잡도**: O(N × 2^N)
- **공간 복잡도**: O(N + M)

## 주의사항

1. 방문 체크 배열을 적절히 초기화
2. 백트래킹을 통한 상태 복원
3. 중복 카운트 방지
