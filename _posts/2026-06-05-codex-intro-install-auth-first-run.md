---
layout: post
title: "Codex란 무엇인가: 설치, 인증, 첫 실행까지 따라 하는 실전 가이드"
date: 2026-06-05 23:20:00 +0900
categories: [development, codex]
tags: [codex, openai, ai-agent, tutorial, beginner]
excerpt: "Codex를 처음 사용하는 개발자를 위해 설치, 인증, 안전한 실행 방법, 첫 작업 예제를 단계별로 정리한 실전 가이드입니다."
---

<div class="callout tip">
  <h3>이 글을 읽기 전에</h3>
  <p>이 글은 <strong>Codex를 처음 사용하는 개발자</strong>를 대상으로 합니다. 목표는 단순 소개가 아니라, <strong>Codex CLI를 설치하고, 인증하고, 첫 작업을 안전하게 실행해보는 것</strong>입니다.</p>
</div>

<div class="series-guide">
  <h2>시리즈 읽는 순서</h2>
  <ol class="series-steps">
    <li><a href="{{ '/development/hermes-intro-and-setup-guide/' | relative_url }}">이전 글</a>: Hermes의 역할과 설치 익히기</li>
    <li><strong>현재 글</strong>: Codex 설치, 인증, 첫 구현 작업 익히기</li>
    <li><a href="{{ '/development/hermes-codex-toy-project-workshop/' | relative_url }}">다음 글</a>: Hermes + Codex로 Toy Project 실습하기</li>
  </ol>
</div>

<div class="diagram-card">
  <h3>Codex 사용 흐름 한눈에 보기</h3>
  <pre><code>Developer defines task
   -> Codex edits files
   -> Developer reviews diff
   -> Developer runs tests/app
   -> Developer accepts or revises</code></pre>
</div>

## 이 글을 읽고 나면 할 수 있는 것

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

> <strong>Codex는 구현 작업을 실제 코드 변경으로 연결하는 coding agent다.</strong>

즉, Codex는 아래와 같은 작업에 특히 잘 맞습니다.

- 여러 파일에 걸친 코드 수정
- 반복적인 리팩터링
- 테스트 추가/수정
- 비교적 명확한 구현 요청 수행
- 변경 파일 요약 제공

## 2. 언제 Codex를 쓰면 좋은가

### 상황 A. 구현 범위가 이미 정리되어 있다
예를 들어 “auth 관련 테스트를 보강해줘”, “save/load 버튼을 추가해줘”처럼 작업이 구체적일수록 좋습니다.

### 상황 B. 여러 파일을 함께 수정해야 한다
한 파일만 수정하는 단순 작업보다, 관련 파일 몇 개를 함께 바꿔야 하는 구현에서 효율이 올라갑니다.

### 상황 C. 테스트까지 같이 만지고 싶다
기능 추가와 테스트 보강을 한 번에 요청할 수 있습니다.

<div class="callout warning">
  <h3>주의</h3>
  <p>Codex는 강력하지만, <strong>좋은 프롬프트 + diff 검토 + 직접 실행 확인</strong>이 함께 가지 않으면 품질이 흔들릴 수 있습니다.</p>
</div>

## 3. Codex를 잘 쓰기 위한 핵심 원칙

1. <strong>막연하게 시키지 말 것</strong>
2. <strong>범위를 좁게 줄 것</strong>
3. <strong>완료 조건을 적을 것</strong>

## 4. 설치 전 준비물

```bash
node -v
npm -v
git --version
```

필요한 것:
- Node.js
- npm
- Git
- 인터넷 연결
- OpenAI/Codex 사용 가능한 인증 수단

## 5. Codex CLI 설치

```bash
npm install -g @openai/codex
```

설치 후 확인:

```bash
codex --help
codex --version
```

## 6. 인증 준비

### 방법 A. API 키 사용

```bash
export OPENAI_API_KEY="YOUR_KEY"
```

주의:
- 공개 저장소에 절대 커밋하지 않기
- `.env` 사용 시 `.gitignore` 확인

### 방법 B. Codex CLI 로그인 흐름 사용

CLI에서 제공하는 로그인 방식을 사용합니다.

## 7. 왜 git repository 안에서 실행하는 것이 좋은가

Codex는 실제 파일을 바꾸는 작업에 강합니다. 그래서 <strong>git repository 안에서 실행하는 것이 안전</strong>합니다.

이유:
- 변경 파일 추적 가능
- diff 확인 가능
- 되돌리기 쉬움
- 브랜치 실험 가능

## 8. 가장 먼저 익혀야 하는 습관: diff 보기

```bash
git status
git diff
```

Codex를 잘 쓰는 개발자는 생성보다 검토를 더 꼼꼼히 합니다.

## 9. 첫 실행: smoke test 해보기

```bash
mkdir codex-smoke-test
cd codex-smoke-test
git init
codex exec "Create a tiny hello world html file"
```

확인할 것:
- 파일 생성 여부
- 변경 파일 목록
- 결과 요약 이해 가능 여부

## 10. 첫 실전 요청 템플릿

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

```bash
mkdir codex-playground
cd codex-playground
git init
printf "# Codex Playground\n" > README.md
git add .
git commit -m "init"

codex exec "Create an index.html file with a title and a short welcome message. Keep it minimal. Return changed files summary."
```

확인:

```bash
git status
ls
git diff
```

## 13. 바로 따라 하는 실습 2: README 보강하기

```bash
codex exec "Improve README.md for a beginner project. Add sections for purpose, files, and next steps. Keep it short and practical. Return changed files summary."
```

확인:

```bash
git diff
cat README.md
```

## 14. 추천 운영 패턴

```text
1. 작은 범위를 정한다.
2. Codex에게 구현을 맡긴다.
3. git diff를 본다.
4. 직접 실행/테스트한다.
5. 필요한 수정만 다시 요청한다.
```

## 15. 자주 하는 실수

- 작업 범위를 너무 넓게 주기
- 제약을 안 적기
- 완료 조건을 안 적기
- 생성 결과를 바로 커밋하기

## 16. 설치/인증이 안 될 때 체크리스트

```bash
codex --help
codex --version
node -v
npm -v
git --version
```

추가 확인:
- PATH 문제
- 인증 세션 만료
- git repo 밖에서 실행 중인지
- 회사 보안 정책 여부

## 17. 초보자 FAQ

### Q1. Codex는 무조건 좋은 코드를 만들어주나요?
아닙니다. 작업 범위가 명확할수록 결과가 좋아집니다.

### Q2. 테스트도 같이 수정하게 할 수 있나요?
가능합니다. 완료 조건에 테스트를 넣는 습관이 중요합니다.

### Q3. 왜 꼭 git repo 안에서 실행하라고 하나요?
바뀐 파일을 추적하고 되돌리기 쉬워서입니다.

## 18. 이 글의 핵심 정리

Codex는 아래처럼 이해하면 좋습니다.

- <strong>구현 작업에 강한 coding agent</strong>
- <strong>작업 범위가 분명할수록 잘 작동하는 도구</strong>
- <strong>git diff와 테스트 검증이 함께 가야 제대로 쓸 수 있는 도구</strong>

## 19. 다음 글에서 할 것

다음 글에서는 <a href="{{ '/development/hermes-codex-toy-project-workshop/' | relative_url }}">Hermes와 Codex를 함께 써서 작은 Toy Project를 실제로 진행하는 워크플로</a>를 단계별로 정리합니다.
