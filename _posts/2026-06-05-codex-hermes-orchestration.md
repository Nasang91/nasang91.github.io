---
layout: post
title: "Codex + Hermes로 Coding Orchestration 구축하기"
date: 2026-06-05 00:00:00 +0900
categories: [codex, hermes, orchestration]
tags: [ai-agent, coding-agent, review, merge]
---

> 이 글은 초안입니다. 이후 실제 예제와 명령어를 추가해 확장할 예정입니다.

## 왜 이 조합이 중요한가

Coding agent를 실무에 도입할 때 가장 중요한 것은 **한 모델에게 모든 역할을 맡기지 않는 것**입니다.

예를 들어:
- Codex: 구현 담당
- Hermes: 리뷰 담당
- Harness: 테스트 및 정책 검증 담당

이렇게 분리하면 품질과 안정성을 높일 수 있습니다.

## 기본 흐름

1. 사용자가 작업을 요청한다.
2. Orchestrator가 Codex에 구현 작업을 위임한다.
3. 결과물을 Hermes가 리뷰한다.
4. Harness가 테스트와 정책 검증을 수행한다.
5. 기준을 통과하면 머지한다.

## 이후 추가할 내용

- 실제 저장소 예제
- 프롬프트 예시
- 실패 시 재시도 전략
- 리뷰 체크리스트
