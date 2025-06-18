---
layout: solution
title: "Cyberland"
olympiad: "apio"
year: 2023
problem_id: "A"
difficulty: "diamond"
points: 100
problem_type: "알고리즘"
tags: ["그래프", "다익스트라", "우선순위큐"]
---

## 문제 설명

사이버랜드는 N개의 도시와 M개의 도로로 구성된 국가입니다. 각 도로는 양방향이며 이동하는 데 일정한 시간이 걸립니다.

특별한 규칙이 있습니다:
- 일부 도시는 "리셋 도시"로, 도착하면 시간이 0으로 초기화됩니다.
- 일부 도시는 "반감 도시"로, 도착하면 소요 시간이 절반으로 줄어듭니다.

시작 도시 S에서 목표 도시 T까지 가는 최소 시간을 구하는 문제입니다.

## 입력

첫 번째 줄에 N, M, S, T가 주어집니다.
다음 M개의 줄에는 도로 정보 (u, v, w)가 주어집니다.
다음 줄에는 각 도시의 타입이 주어집니다. (0: 일반, 1: 리셋, 2: 반감)

## 출력

최소 시간을 출력합니다. 도달할 수 없으면 -1을 출력합니다.

## 해결 방법

이 문제는 **수정된 다익스트라 알고리즘**을 사용하여 해결할 수 있습니다.

### 핵심 아이디어

1. **상태 확장**: 각 도시에서 반감 효과를 몇 번 사용했는지 추적
2. **다중 방문**: 같은 도시라도 다른 상태로 여러 번 방문 가능
3. **우선순위 큐**: 최소 시간 우선으로 탐색

### 구현

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <limits>

using namespace std;
const double INF = 1e18;

struct State {
    int city;
    double time;
    int halvings;
    
    bool operator>(const State& other) const {
        return time > other.time;
    }
};

double solve(int n, int s, int t, vector<vector<pair<int, int>>>& graph, 
             vector<int>& cityType) {
    // cityType: 0=일반, 1=리셋, 2=반감
    
    vector<vector<double>> dist(n, vector<double>(20, INF));
    priority_queue<State, vector<State>, greater<State>> pq;
    
    pq.push({s, 0.0, 0});
    dist[s][0] = 0.0;
    
    while (!pq.empty()) {
        State current = pq.top();
        pq.pop();
        
        if (current.time > dist[current.city][current.halvings]) {
            continue;
        }
        
        for (auto& edge : graph[current.city]) {
            int next = edge.first;
            double weight = edge.second;
            
            double newTime = current.time + weight;
            int newHalvings = current.halvings;
            
            // 도시 타입에 따른 처리
            if (cityType[next] == 1) { // 리셋 도시
                newTime = 0.0;
            } else if (cityType[next] == 2 && newHalvings < 19) { // 반감 도시
                newTime /= 2.0;
                newHalvings++;
            }
            
            if (newTime < dist[next][newHalvings]) {
                dist[next][newHalvings] = newTime;
                pq.push({next, newTime, newHalvings});
            }
        }
    }
    
    double result = INF;
    for (int i = 0; i < 20; i++) {
        result = min(result, dist[t][i]);
    }
    
    return result == INF ? -1 : result;
}

int main() {
    int N, M, S, T;
    cin >> N >> M >> S >> T;
    
    vector<vector<pair<int, int>>> graph(N);
    for (int i = 0; i < M; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        graph[u].push_back({v, w});
        graph[v].push_back({u, w});
    }
    
    vector<int> cityType(N);
    for (int i = 0; i < N; i++) {
        cin >> cityType[i];
    }
    
    double result = solve(N, S, T, graph, cityType);
    
    if (result == -1) {
        cout << -1 << endl;
    } else {
        cout << fixed << result << endl;
    }
    
    return 0;
}
```

## 시간 복잡도

- **시간 복잡도**: O((V + E) × log V × K)
  - V: 도시 수, E: 도로 수, K: 최대 반감 횟수 (20)
- **공간 복잡도**: O(V × K)

## 주의사항

1. **반감 횟수 제한**: 무한 반감을 방지하기 위해 최대 20번으로 제한
2. **실수 정밀도**: double 타입 사용으로 정밀도 문제 해결
3. **상태 관리**: (도시, 반감 횟수) 쌍으로 상태를 관리
