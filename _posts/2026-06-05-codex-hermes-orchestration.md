---
layout: post
title: "Codex + Hermes로 Coding Orchestration 구축하기"
date: 2026-06-05 10:00:00 +0900
categories: [orchestration]
tags: [codex, hermes, ai-agent, review, merge]
excerpt: "Codex에 구현을 맡기고 Hermes가 리뷰와 merge gate를 담당하는 기본 orchestration 구조를 설계합니다."
---

> 이 글은 블로그의 첫 실전 글을 위한 초안입니다. 이후 실제 저장소 예제와 프롬프트, 실행 흐름을 추가할 예정입니다.

## 왜 역할을 분리해야 하나

실무에서 coding agent를 바로 쓰기 시작하면, 보통 한 모델에게 구현, 리뷰, 수정, 승인까지 모두 맡기고 싶어집니다.
하지만 그렇게 하면 품질 기준이 흔들리고, 실패 원인을 추적하기도 어렵습니다.

그래서 아래처럼 역할을 나누는 것이 좋습니다.

- **Codex**: 구현 담당
- **Hermes**: 리뷰 담당
- **Harness**: 테스트와 정책 검증 담당
- **Orchestrator**: 흐름 제어 담당

이 구조의 핵심은 **생성 주체와 검증 주체를 분리**하는 것입니다.

## 기본 아키텍처

```text
User Request
  -> Orchestrator
    -> Codex (implementation)
    -> Hermes (review)
    -> Harness (tests / policy / safety checks)
    -> Merge Gate
```

이 흐름에서 Orchestrator는 단순히 요청을 전달하는 레이어가 아니라,
어떤 agent를 언제 호출할지와 실패 시 어떻게 복구할지를 관리합니다.

## 예시 시나리오

예를 들어 "로그인 에러 메시지를 더 명확하게 바꿔 달라"는 요청이 들어오면 다음 순서로 흘러갈 수 있습니다.

1. Orchestrator가 작업 범위를 정리한다.
2. Codex가 관련 파일을 수정한다.
3. Hermes가 변경 사항을 리뷰한다.
4. Harness가 테스트와 정책 검증을 수행한다.
5. 기준을 통과하면 merge gate가 승인한다.

## 구현할 때 중요한 포인트

### 1. 상태를 명시적으로 관리하기

최소한 아래 상태는 분리하는 편이 좋습니다.

- requested
- coding
- review
- validation
- approved
- rejected
- retrying

이렇게 해야 어떤 단계에서 실패했는지 추적할 수 있습니다.

### 2. 리뷰 기준을 구조화하기

Hermes에게 단순히 "리뷰해줘"라고 하기보다 아래처럼 기준을 줘야 합니다.

- 요구사항 충족 여부
- 코드 스타일 위반 여부
- 테스트 필요 여부
- 보안/정책 리스크
- merge 가능 여부

### 3. Harness를 별도 레이어로 두기

테스트 실행, lint, 정책 검증, secret 검사 같은 항목은 reviewer의 자연어 판단만으로 끝내지 않는 것이 좋습니다.
실행 가능한 검증 레이어를 두어야 안정성이 올라갑니다.

## 다음에 확장할 내용

이 글은 이후 아래 내용을 추가해 확장할 예정입니다.

- 실제 GitHub 저장소 예제
- orchestration 상태 전이 다이어그램
- agent별 프롬프트 예시
- 실패 시 retry / fallback 전략
- merge gate 체크리스트
