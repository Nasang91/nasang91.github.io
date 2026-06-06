---
layout: post
title: "Codex란 무엇인가: 설치, 인증, 첫 실행까지 따라 하는 실전 가이드"
date: 2026-06-05 23:20:00 +0900
categories: [development, codex]
tags: [codex, openai, ai-agent, tutorial, beginner]
excerpt: "Codex를 처음 사용하는 개발자를 위해 설치, 인증, 안전한 실행 방법, 첫 작업 예제를 단계별로 정리한 실전 가이드입니다."
---

> 이 글은 **Codex를 처음 사용하는 개발자**를 대상으로 합니다. 목표는 단순 소개가 아니라, **이 글을 따라 하면 Codex CLI를 설치하고, 인증하고, 첫 작업을 안전하게 실행해보는 것**입니다.

## 이 글을 읽고 나면 할 수 있는 것

이 글을 끝까지 따라 하면 아래를 할 수 있게 됩니다.

- Codex가 어떤 역할의 도구인지 설명할 수 있다.
- Codex CLI를 설치하고 동작 여부를 확인할 수 있다.
- 안전한 실험용 git repository 안에서 첫 작업을 실행할 수 있다.
- 좋은 구현 프롬프트를 만드는 기본 원칙을 이해할 수 있다.

## 1. Codex는 무엇인가

Codex를 처음 보면 흔히 이렇게 생각합니다.

- 그냥 코드 자동완성 도구인가?
- 챗봇에게 “코드 짜줘” 하는 것과 뭐가 다른가?
- 정말 실무에서 쓸 수 있나?

이 글에서는 Codex를 이렇게 이해하면 됩니다.

> **Codex는 구현 작업을 실제 코드 변경으로 연결하는 coding agent다.**

즉, Codex는 아래와 같은 작업에 특히 잘 맞습니다.

- 여러 파일에 걸친 코드 수정
- 반복적인 리팩터링
- 테스트 추가/수정
- 비교적 명확한 구현 요청 수행
- 변경 파일 요약 제공

반대로, 프로젝트 맥락을 넓게 읽고 전략을 세우는 일은 Hermes 같은 도구가 더 잘할 수 있습니다.

## 2. Codex를 언제 쓰면 좋은가

### 상황 A. 구현 범위가 이미 정리되어 있다
예를 들어 “auth 관련 테스트를 보강해줘”, “save/load 버튼을 추가해줘”처럼 작업이 구체적일수록 좋습니다.

### 상황 B. 여러 파일을 함께 수정해야 한다
한 파일만 수정하는 단순 작업보다, 관련 파일 몇 개를 함께 바꿔야 하는 구현에서 효율이 올라갑니다.

### 상황 C. 테스트까지 같이 만지고 싶다
기능 추가와 테스트 보강을 한 번에 요청할 수 있습니다.

## 3. Codex를 잘 쓰기 위한 핵심 원칙

입문자는 아래 세 가지만 기억해도 충분합니다.

1. **막연하게 시키지 말 것**
2. **범위를 좁게 줄 것**
3. **완료 조건을 적을 것**

예를 들어 나쁜 요청은 이렇습니다.

```text
이 프로젝트 전체 개선해줘.
```

좋은 요청은 이렇습니다.

```text
Implement save/load/reset for the current React project.
Constraints:
- use localStorage
- keep the UI simple
- do not add unrelated features
Done criteria:
- save works
- load works
- reset works
- summarize changed files
```

## 4. 설치 전 준비물

Codex CLI를 쓰기 전에 아래를 준비합니다.

- Node.js
- npm
- Git
- 인터넷 연결
- OpenAI/Codex 사용 가능한 인증 수단

먼저 확인합니다.

```bash
node -v
npm -v
git --version
```

## 5. Codex CLI 설치

아래처럼 설치합니다.

```bash
npm install -g @openai/codex
```

설치 후 정상 동작 여부를 확인합니다.

```bash
codex --help
```

또는

```bash
codex --version
```

정상이라면 도움말이나 버전이 출력됩니다.

## 6. 인증 준비

Codex를 사용하려면 인증이 필요합니다.
실행 환경에 따라 방식은 다를 수 있지만, 입문자는 아래 두 가지 흐름 중 하나를 이해하면 충분합니다.

### 방법 A. API 키 사용

```bash
export OPENAI_API_KEY="YOUR_KEY"
```

이 방식은 가장 단순하지만,
키 관리에 주의해야 합니다.

- 터미널 히스토리에 남지 않게 조심
- 공개 저장소에 절대 커밋하지 않기
- `.env` 같은 파일을 쓸 경우 `.gitignore` 확인

### 방법 B. Codex CLI 로그인 흐름 사용

CLI에서 제공하는 로그인 방식을 사용합니다.
이 경우 공식 안내 흐름에 맞춰 진행하면 됩니다.

## 7. 왜 git repository 안에서 실행하는 것이 좋은가

Codex는 실제 파일을 바꾸는 작업에 강합니다.
그래서 **git repository 안에서 실행하는 것이 안전**합니다.

이유:

- 변경 파일을 추적할 수 있음
- diff를 확인할 수 있음
- 문제가 생기면 되돌리기 쉬움
- 실험 작업을 브랜치로 분리할 수 있음

## 8. 가장 먼저 익혀야 하는 습관: diff 보기

Codex를 쓰기 시작하면 초보자는 “와, 코드가 자동으로 생기네”에 먼저 놀랍니다.
하지만 실제로 더 중요한 건 **생성 후 검토**입니다.

아래 명령은 습관처럼 익혀두면 좋습니다.

```bash
git status
git diff
```

Codex를 잘 쓰는 개발자는 생성보다 검토를 더 꼼꼼히 합니다.

## 9. 첫 실행: smoke test 해보기

실전 repo에 바로 들어가기 전에 작은 테스트용 저장소를 하나 만들어봅시다.

```bash
mkdir codex-smoke-test
cd codex-smoke-test
git init
```

그 다음 아래처럼 아주 작은 요청을 실행합니다.

```bash
codex exec "Create a tiny hello world html file"
```

실행 후 아래를 확인합니다.

- 파일이 생성되었는가
- 어떤 파일이 바뀌었는가
- 결과 요약이 이해 가능한가

## 10. 첫 실전 요청 템플릿

Codex에게 일을 맡길 때는 보통 아래 4가지를 넣으면 좋습니다.

1. Task
2. Context
3. Constraints
4. Done criteria

예시:

```text
Task: Add a simple notes panel.

Context:
- This is a React + TypeScript app.
- Keep the UI minimal.

Constraints:
- Do not add external state libraries.
- Limit edits to UI-related files.

Done criteria:
- Notes panel is visible.
- User can type text.
- App still runs.
- Return changed files summary.
```

## 11. 좋은 프롬프트와 나쁜 프롬프트 비교

### 나쁜 요청

```text
이 앱을 좀 더 좋게 만들어줘.
```

문제점:
- 너무 추상적임
- 종료 기준이 없음
- 어디까지 바뀌어도 되는지 모름

### 좋은 요청

```text
Add a save button and a load button to the current app.
Constraints:
- use localStorage
- do not change unrelated screens
- keep the UI minimal
Done criteria:
- save button works
- load button works
- summarize changed files
```

## 12. 바로 따라 하는 실습 1: 작은 HTML 파일 만들기

### Step 1. 테스트 저장소 준비

```bash
mkdir codex-playground
cd codex-playground
git init
printf "# Codex Playground\n" > README.md
git add .
git commit -m "init"
```

### Step 2. 작은 HTML 파일 생성 요청

```bash
codex exec "Create an index.html file with a title and a short welcome message. Keep it minimal. Return changed files summary."
```

### Step 3. 결과 확인

```bash
git status
ls
```

가능하면 파일도 직접 열어봅니다.

### Step 4. 변경사항 읽기

```bash
git diff
```

## 13. 바로 따라 하는 실습 2: README 보강하기

이번에는 기존 파일을 수정하는 아주 작은 작업을 해봅니다.

```bash
codex exec "Improve README.md for a beginner project. Add sections for purpose, files, and next steps. Keep it short and practical. Return changed files summary."
```

실행 후 아래를 꼭 확인합니다.

```bash
git diff
cat README.md
```

## 14. 추천 운영 패턴

초보자에게는 아래 패턴을 추천합니다.

```text
1. 작은 범위를 정한다.
2. Codex에게 구현을 맡긴다.
3. git diff를 본다.
4. 직접 실행/테스트한다.
5. 필요한 수정만 다시 요청한다.
```

그림처럼 보면 아래와 같습니다.

```text
Developer defines task
   -> Codex edits files
   -> Developer reviews diff
   -> Developer runs tests/app
   -> Developer accepts or revises
```

## 15. 자주 하는 실수

### 실수 1. 작업 범위를 너무 넓게 주기
“앱을 더 좋게 만들어줘” 같은 요청은 모호합니다.

### 실수 2. 제약을 안 적기
건드리면 안 되는 파일, 바꾸지 말아야 할 API, 유지해야 할 호환성을 적는 것이 좋습니다.

### 실수 3. 완료 조건을 안 적기
테스트 통과, 파일 요약, UI 동작 여부 같은 종료 기준이 있으면 결과가 좋아집니다.

### 실수 4. 생성 결과를 바로 커밋하기
반드시 diff를 보고, 가능한 경우 직접 실행해본 뒤 커밋하는 습관이 필요합니다.

## 16. 설치/인증이 안 될 때 체크리스트

```bash
codex --help
codex --version
node -v
npm -v
git --version
```

추가로 확인할 것:

- 전역 설치 경로가 PATH에 잡혀 있는가
- 인증 정보가 현재 셸 세션에서 유효한가
- git repo 바깥에서 실행 중이지 않은가
- 회사 보안 정책 때문에 CLI 로그인이 막히지 않는가

## 17. 초보자 FAQ

### Q1. Codex는 무조건 좋은 코드를 만들어주나요?
아닙니다. 작업 범위가 명확할수록 결과가 좋아집니다.

### Q2. 테스트도 같이 수정하게 할 수 있나요?
가능합니다. 오히려 완료 조건에 테스트를 넣는 습관이 중요합니다.

### Q3. 왜 꼭 git repo 안에서 실행하라고 하나요?
바뀐 파일을 추적하고 되돌리기 쉬워서입니다.

## 18. 이 글의 핵심 정리

Codex는 아래처럼 이해하면 좋습니다.

- **구현 작업에 강한 coding agent**
- **작업 범위가 분명할수록 잘 작동하는 도구**
- **git diff와 테스트 검증이 함께 가야 제대로 쓸 수 있는 도구**

즉, Codex를 잘 쓰려면 “좋은 프롬프트”와 “좋은 검토 습관”이 함께 필요합니다.

## 19. 다음 글에서 할 것

다음 글에서는 Hermes와 Codex를 함께 써서,
작은 Toy Project를 실제로 진행하는 워크플로를 단계별로 정리합니다.
