---
layout: solution
title: "문제 B"
olympiad: "koi"
year: 2022
problem_id: "B"
difficulty: "ruby"
points: 100
problem_type: "인터랙티브"
tags: ["트리", "DFS", "LCA"]
---

## 문제 설명

KOI 2022 B번 문제입니다. 트리에서 두 노드 간의 거리를 구하는 문제입니다.

## 입력

첫 번째 줄에 노드의 수 N이 주어집니다.
다음 N-1개의 줄에 트리의 간선 정보가 주어집니다.

## 출력

두 노드 간의 거리를 출력합니다.

## 해결 방법

이 문제는 **LCA(Lowest Common Ancestor)**를 사용하여 해결할 수 있습니다.

### 핵심 아이디어

1. 트리의 깊이 계산
2. LCA 전처리
3. 거리 = depth[u] + depth[v] - 2 * depth[lca(u,v)]

### 구현

```cpp
#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

vector<vector<int>> tree;
vector<vector<int>> parent;
vector<int> depth;
int LOG;

void dfs(int node, int par, int d) {
    parent[0][node] = par;
    depth[node] = d;
    
    for (int child : tree[node]) {
        if (child != par) {
            dfs(child, node, d + 1);
        }
    }
}

void preprocess(int N) {
    for (int j = 1; j < LOG; j++) {
        for (int i = 1; i <= N; i++) {
            if (parent[j-1][i] != -1) {
                parent[j][i] = parent[j-1][parent[j-1][i]];
            }
        }
    }
}

int lca(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
    
    int diff = depth[u] - depth[v];
    for (int i = 0; i < LOG; i++) {
        if ((diff >> i) & 1) {
            u = parent[i][u];
        }
    }
    
    if (u == v) return u;
    
    for (int i = LOG - 1; i >= 0; i--) {
        if (parent[i][u] != parent[i][v]) {
            u = parent[i][u];
            v = parent[i][v];
        }
    }
    
    return parent[0][u];
}

int main() {
    int N;
    cin >> N;
    
    LOG = ceil(log2(N)) + 1;
    tree.resize(N + 1);
    parent.assign(LOG, vector<int>(N + 1, -1));
    depth.resize(N + 1);
    
    for (int i = 0; i < N - 1; i++) {
        int u, v;
        cin >> u >> v;
        tree[u].push_back(v);
        tree[v].push_back(u);
    }
    
    dfs(1, -1, 0);
    preprocess(N);
    
    int u, v;
    cin >> u >> v;
    
    int lca_node = lca(u, v);
    int distance = depth[u] + depth[v] - 2 * depth[lca_node];
    
    cout << distance << endl;
    
    return 0;
}
```

## 시간 복잡도

- **전처리**: O(N log N)
- **쿼리**: O(log N)
- **공간 복잡도**: O(N log N)
