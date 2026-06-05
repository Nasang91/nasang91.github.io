---
layout: page
title: About
permalink: /about/
---

Nasang Dev Blog는 **Codex, Claude Code, OpenClaw, Hermes** 같은 AI coding agent를 실전 개발 플로우에 연결하는 방법을 정리하는 블로그입니다.

## 이 블로그에서 다루는 것

- agent 역할 분리: planner / coder / reviewer / merger
- orchestration 설계: 상태 전이, 재시도, fallback
- harness 설계: 테스트, 정책 검증, 실행 안전장치
- 운영 관점: 비용, trace, 성공률, 리드타임

## 목표

단순한 도구 소개가 아니라, 아래처럼 **실제로 적용 가능한 구조와 예제**를 남기는 것이 목표입니다.

- Codex에 구현을 맡기고 Hermes가 리뷰/머지 게이트를 담당하는 구조
- Codex Symphony를 기반으로 여러 agent를 조합하는 개발 방식
- GitHub 중심으로 review, test, deploy를 연결하는 흐름

## 앞으로 쓸 예정인 글

- Codex + Hermes로 coding orchestration 구축하기
- Codex Symphony를 이용해서 개발하기
- AI agent harness 설계와 테스트 자동화
- agent 기반 PR 리뷰 및 merge gate 설계
