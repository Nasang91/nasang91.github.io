---
layout: post
title: "Codex Symphony를 이용해서 개발하기"
date: 2026-06-05 10:10:00 +0900
categories: [development, workflow]
tags: [codex, symphony, ai-agent, development]
excerpt: "Codex Symphony로 planner, coder, reviewer 역할을 나누고 구조적인 개발 흐름을 설계하는 방법을 정리합니다."
---

> 이 글은 Codex Symphony 활용 글의 초안입니다. 이후 실제 워크플로우와 예제를 단계별로 추가할 예정입니다.

## Codex Symphony를 왜 주목해야 하나

단일 coding agent만 사용할 때는 빠르게 구현할 수 있지만,
작업이 커질수록 계획 수립, 구현, 검토, 검증을 한 번에 관리하기 어려워집니다.

Codex Symphony 같은 다중 역할 기반 접근은 이런 문제를 줄이는 데 도움이 됩니다.

## 역할 기반 개발 흐름

예를 들면 다음과 같은 식으로 역할을 나눌 수 있습니다.

- **Planner agent**: 작업 분해와 우선순위 정리
- **Coder agent**: 실제 구현
- **Reviewer agent**: 결과 검토 및 수정 요청
- **Harness**: 테스트와 실행 검증

이렇게 나누면 각 단계의 책임이 선명해집니다.

## 예시 흐름

```text
Task intake
  -> Planner agent creates plan
  -> Coder agent implements changes
  -> Reviewer agent checks diff
  -> Harness validates execution result
  -> Final approval or retry
```

## 설계 포인트

### 1. Planner의 출력 형식을 고정하기

Planner가 자유 형식으로만 계획을 내놓으면 뒤 단계가 불안정해집니다.
예를 들어 아래 항목은 구조적으로 고정하는 것이 좋습니다.

- 목표
- 작업 단위 목록
- 위험 요소
- 완료 조건

### 2. Reviewer의 판단을 merge gate와 연결하기

Reviewer가 남긴 코멘트가 단순 참고로 끝나지 않도록,
승인/반려/재작업 요청 같은 상태로 연결해야 실제 orchestration에 사용할 수 있습니다.

### 3. Harness를 마지막이 아니라 중간에도 넣기

구현이 끝난 후 한 번만 검증하는 것보다,
중간 단계에서도 lint나 빠른 smoke test를 넣으면 실패 비용을 줄일 수 있습니다.

## 이후 추가할 내용

이 글은 다음 내용을 계속 추가해 확장할 예정입니다.

- 실제 시나리오 기반 워크플로우
- 단계별 orchestration 설계
- GitHub issue / PR / review 흐름 연결
- 실패 복구 전략과 observability 지표
