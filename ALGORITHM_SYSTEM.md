# 알고리즘 페이지 자동 생성 시스템

이 시스템은 `_algorithms` 디렉토리 구조를 기반으로 알고리즘 페이지를 자동으로 생성합니다.

## 디렉토리 구조

```
_algorithms/
├── bronze/         ← 티어 (Bronze 난이도)
│   ├── dp/         ← 카테고리 (동적 계획법)
│   │   └── basic_dp.md
│   ├── search/     ← 카테고리 (탐색)
│   │   └── binary_search.md
│   └── query/      ← 카테고리 (쿼리 처리)
│       └── prefix_sum.md
├── silver/         ← 티어 (Silver 난이도)
│   ├── dp/
│   │   └── lis.md
│   └── graph/
│       └── dijkstra.md
├── gold/           ← 다른 티어들도 동일한 구조
├── platinum/
├── diamond/
└── ruby/
```

## 작동 방식

### 1. 알고리즘 데이터 생성 (`algorithm_data_generator.rb`)

- `_algorithms` 디렉토리를 스캔하여 알고리즘 파일들을 찾습니다
- 각 `.md` 파일의 front matter를 파싱하여 메타데이터를 추출합니다
- 카테고리 이름을 표준화합니다 (예: `dp` → `Dynamic Programming (DP)`)
- 사이트 데이터로 직접 저장합니다

### 2. 알고리즘 페이지 생성 (`algorithm_pages_generator.rb`)

- 각 알고리즘 `.md` 파일에 대해 개별 HTML 페이지를 생성합니다
- URL 구조: `/algorithms/{tier}/{category}/{filename}/`
- 예: `/algorithms/bronze/dp/basic_dp/`

## 알고리즘 파일 작성 규칙

### Front Matter 예시

```yaml
---
title: "기본 동적 계획법"
description: "DP의 기본 개념과 구현 방법을 학습합니다"
difficulty: "초급"
tags: ["DP", "메모이제이션", "재귀"]
---
```

### 필수 필드
- `title`: 알고리즘 제목
- `description`: 간단한 설명

### 선택 필드
- `difficulty`: 난이도 (초급, 중급, 고급)
- `tags`: 관련 태그 배열

## 카테고리 이름 매핑

| 디렉토리 이름 | 표시 이름 |
|---------------|-----------|
| `dp` | Dynamic Programming (DP) |
| `graph` | Graph |
| `search` | Search |
| `query` | Query Processing |
| `tree` | Tree |
| `string` | String |
| `math` | Mathematics |
| `greedy` | Greedy |

## 지원되는 티어

- `bronze` (브론즈)
- `silver` (실버)  
- `gold` (골드)
- `platinum` (플래티넘)
- `diamond` (다이아몬드)
- `ruby` (루비)

## 새로운 알고리즘 추가하기

1. 적절한 티어/카테고리 디렉토리에 `.md` 파일 생성
2. Front matter와 내용 작성
3. Jekyll 빌드 실행: `bundle exec jekyll build`

파일이 자동으로 감지되어 웹사이트에 반영됩니다.

## 페이지 구조

### 메인 알고리즘 페이지 (`/algorithms/`)
- 티어별 탭 네비게이션
- 카테고리별 알고리즘 목록
- 타임라인 스타일 레이아웃

### 개별 알고리즘 페이지 (`/algorithms/{tier}/{category}/{filename}/`)
- 브레드크럼 네비게이션
- 알고리즘 상세 내용
- 관련 알고리즘 목록
- 뒤로가기 버튼

## 레이아웃 파일

- `_layouts/algorithms.html`: 메인 알고리즘 목록 페이지
- `_layouts/algorithm.html`: 개별 알고리즘 페이지

## CSS 스타일

알고리즘 페이지 관련 스타일은 `_sass/partials/_algorithms.scss`에 정의되어 있습니다.

## 주의사항

1. **기존 UI 유지**: 티어 선택기는 하드코딩된 6개 티어를 사용합니다
2. **완전 자동화**: 모든 데이터는 `_algorithms` 디렉토리에서 자동 생성됩니다
3. **실시간 반영**: 새 파일 추가 시 빌드만 하면 즉시 웹사이트에 반영됩니다
4. **자동 링크**: 새로 추가된 알고리즘은 자동으로 올바른 URL을 가집니다
