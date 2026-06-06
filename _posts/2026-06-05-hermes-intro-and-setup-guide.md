---
layout: post
title: "Hermes란 무엇인가: 설치부터 첫 실행까지 따라 하는 입문 가이드"
date: 2026-06-05 23:10:00 +0900
categories: [development, hermes]
tags: [hermes, ai-agent, tutorial, beginner]
excerpt: "AI Agent가 낯선 개발자를 위해 Hermes의 역할, 설치, 초기 설정, 첫 사용 흐름을 예제 중심으로 정리한 입문 가이드입니다."
---

<div class="callout tip">
  <h3>이 글을 읽기 전에</h3>
  <p>이 글은 <strong>AI Agent나 Vibe Coding이 아직 낯선 초/중급 개발자</strong>를 대상으로 작성했습니다. 목표는 단순 소개가 아니라, <strong>이 글을 그대로 따라 하면 Hermes를 설치하고 첫 분석 요청까지 실행해보는 것</strong>입니다.</p>
</div>

<div class="series-guide">
  <h2>시리즈 읽는 순서</h2>
  <ol class="series-steps">
    <li><strong>현재 글</strong>: Hermes의 역할과 설치, 첫 실행 익히기</li>
    <li><a href="{{ '/development/codex-intro-install-auth-first-run/' | relative_url }}">다음 글</a>: Codex 설치, 인증, 첫 구현 작업 해보기</li>
    <li><a href="{{ '/development/hermes-codex-toy-project-workshop/' | relative_url }}">마지막 글</a>: Hermes + Codex로 Toy Project 실습하기</li>
  </ol>
</div>

<div class="diagram-card">
  <h3>Hermes의 역할 한눈에 보기</h3>
  <pre><code>Developer Request
   -> Hermes inspects repository
   -> Hermes narrows scope
   -> Hermes proposes next action
   -> Hermes reviews result
   -> Hermes reports back</code></pre>
</div>

## 이 글을 읽고 나면 할 수 있는 것

이 글을 끝까지 따라 하면 최소한 아래는 할 수 있게 됩니다.

- Hermes가 어떤 역할의 도구인지 설명할 수 있다.
- Hermes를 설치하고 동작 여부를 확인할 수 있다.
- Hermes에게 저장소 구조 분석을 요청할 수 있다.
- Hermes에게 “좋은 요청”을 만드는 기본 감각을 익힐 수 있다.

## 1. Hermes는 무엇인가

Hermes를 처음 들으면 보통 이런 생각이 듭니다.

- ChatGPT 같은 챗봇과 뭐가 다른가?
- 그냥 코드 생성기인가?
- 왜 굳이 Hermes를 따로 써야 하나?

이 글에서는 Hermes를 이렇게 이해하면 충분합니다.

> **Hermes는 단순히 대화만 하는 챗봇이 아니라, 개발 작업을 읽고, 범위를 좁히고, 다음 행동을 정리하는 오케스트레이터형 에이전트다.**

쉽게 말하면 Hermes는 아래 역할에 강합니다.

- 현재 프로젝트 구조 파악
- 어떤 파일을 먼저 읽어야 할지 정리
- 이슈를 작은 작업 단위로 나누기
- 다른 coding agent(Codex 등)에게 넘길 작업 설명 작성
- 결과 검토 및 요약

## 2. 언제 Hermes를 쓰면 좋은가

예를 들면 아래 상황에서 특히 유용합니다.

### 상황 A. 저장소 구조가 낯설다
새 프로젝트를 받았는데 어디서부터 읽어야 할지 모르겠다면,
Hermes에게 repo를 읽게 하고 핵심 진입점과 주요 폴더를 요약하게 할 수 있습니다.

### 상황 B. 에러 원인을 추적하고 싶다
로그, 실패 테스트, stack trace를 바탕으로 원인 후보를 정리하는 데 유용합니다.

### 상황 C. 다른 coding agent에게 일을 잘 시키고 싶다
Codex 같은 도구에 막연히 “고쳐줘”라고 하기보다,
Hermes가 범위와 제약을 정리한 뒤 넘기면 결과가 더 안정적입니다.

<div class="callout warning">
  <h3>주의</h3>
  <p>Hermes를 처음부터 “모든 코드를 대신 써주는 도구”로 기대하면 실망하기 쉽습니다. 입문 단계에서는 <strong>분석, 범위 제한, 계획, 검토</strong>에 강한 도구로 이해하는 것이 가장 좋습니다.</p>
</div>

## 3. Hermes를 이해하기 위한 핵심 개념 3개

### 3-1. Orchestrator
흐름을 조정하는 역할입니다. 어떤 일을 먼저 하고, 무엇을 검증하고, 어디까지가 이번 작업 범위인지 결정합니다.

### 3-2. Agent
사람 대신 특정 작업을 수행하는 소프트웨어 단위입니다. 각 agent는 잘하는 역할이 다릅니다.

### 3-3. Harness
실행하고 검증하는 장치입니다. 테스트 실행, lint, 결과 검증 스크립트 같은 것이 여기에 해당합니다.

## 4. 설치 전 준비물

먼저 아래가 준비되어 있는지 확인합니다.

- macOS / Linux / Windows
- Node.js 또는 Hermes가 요구하는 실행 환경
- Git
- 인터넷 연결
- 터미널 사용 가능 환경

```bash
node -v
npm -v
git --version
```

## 5. Hermes 설치

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

설치가 끝났다면 터미널을 다시 열거나, 셸 설정이 필요하면 반영합니다.

설치 확인:

```bash
hermes --version
hermes doctor
```

## 6. 초기 설정

```bash
hermes setup
```

또는:

```bash
hermes model
```

이 단계에서 확인할 것:

- 기본 모델/provider 설정이 되었는가
- terminal / file 관련 권한이 정상인가
- 필요한 인증 정보가 누락되지 않았는가

## 7. 첫 실행: 정말 동작하는지 확인하기

```bash
hermes chat -q "Say hello and confirm you can help with software projects"
```

이 명령이 정상적으로 응답하면, 최소한 Hermes CLI가 실행되고 기본 응답이 가능한 상태라고 볼 수 있습니다.

## 8. 첫 실전 예제: 현재 폴더를 분석하게 해보기

```text
Please inspect the current repository and tell me:
1. whether this is a valid git repository
2. what the main folders are
3. which files look like entry points
4. what I should inspect first as a developer
```

이 프롬프트의 목적은 정답을 얻는 것이 아니라,
<strong>Hermes가 프로젝트를 읽고 구조를 요약하는 흐름에 익숙해지는 것</strong>입니다.

## 9. 좋은 프롬프트와 나쁜 프롬프트 ��교

### 나쁜 요청 예시

```text
이 프로젝트 다 분석하고 문제도 고치고 최적화도 해줘.
```

문제점:
- 범위가 너무 넓음
- 지금 당장 무엇을 원하는지 불명확함
- 분석, 구현, 검증이 한 번에 섞여 있음

### 좋은 요청 예시

```text
Please inspect the auth-related code in this repository.
Focus only on:
- likely entry points
- session/token related files
- what I should read first
Do not suggest fixes yet.
```

## 10. 초보자에게 추천하는 Hermes 사용 흐름

```text
1. Inspect   -> 저장소 구조 파악
2. Diagnose  -> 문제 원인/가설 정리
3. Plan      -> 작업 범위와 순서 정리
4. Dispatch  -> 필요한 경우 Codex 같은 구현 agent에 위임
5. Validate  -> 결과 검토 및 테스트 확인
6. Report    -> 최종 요약
```

## 11. 바로 따라 하는 미니 실습

### Step 1. 테스트용 폴더 만들기

```bash
mkdir hermes-playground
cd hermes-playground
git init
printf "# Hermes Playground\n" > README.md
git add .
git commit -m "init"
```

### Step 2. Hermes에게 현재 상태 요약 요청

```text
Inspect this repository and summarize:
- what files exist
- whether it is ready for development work
- the smallest sensible next step
```

### Step 3. README 개선 아이디어 요청

```text
Please suggest 3 small improvements for this repository.
Keep them beginner-friendly and do not write code yet.
```

## 12. 실전에서 자주 쓰는 Hermes 요청 10가지

- 저장소 구조 요약
- 특정 폴더만 읽기
- 에러 원인 후보 찾기
- 실패 테스트 읽기
- 작업 범위 줄이기
- Codex용 프롬프트 작성
- 결과 검토
- 수동 검증 체크리스트 생성
- 다음 단계 제안
- 최종 요약 요청

## 13. 설치가 잘 안 될 때 체크리스트

```bash
hermes --version
hermes doctor
node -v
npm -v
git --version
```

추가로 확인할 것:

- PATH 반영이 되었는가
- 네트워크에서 설치 스크립트 접근이 막히지 않았는가
- 셸을 다시 열었는가
- provider/model 설정이 비어 있지 않은가

## 14. 초보자 FAQ

### Q1. Hermes가 코드를 직접 써주나요?
가능한 경우도 있지만, 입문 단계에서는 Hermes를 먼저 <strong>분석/계획/검토 도구</strong>로 이해하는 것이 더 좋습니다.

### Q2. Hermes만으로 모든 걸 할 수 있나요?
그렇게 기대하면 실망하기 쉽습니다. Hermes는 특히 <strong>정리와 조정</strong>에 강합니다.

### Q3. Hermes를 쓸 때 가장 중요한 습관은 뭔가요?
범위를 좁게 주는 것입니다.

## 15. 이 글의 핵심 정리

Hermes는 아래처럼 이해하면 가장 쉽습니다.

- <strong>무엇을 해야 하는지 정리하는 도구</strong>
- <strong>프로젝트 구조와 문제를 분석하는 도구</strong>
- <strong>다른 coding agent를 잘 쓰기 위한 준비 도구</strong>

## 16. 다음 글에서 할 것

다음 글에서는 <a href="{{ '/development/codex-intro-install-auth-first-run/' | relative_url }}">Codex가 무엇인지, 어떻게 설치하고, 어떤 식으로 코딩 작업을 맡기면 좋은지</a>를 이어서 정리합니다.
