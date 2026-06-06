---
layout: post
title: "Hermes란 무엇인가: 설치부터 첫 실행까지 따라 하는 입문 가이드"
date: 2026-06-05 23:10:00 +0900
categories: [development, hermes]
tags: [hermes, ai-agent, tutorial, beginner]
excerpt: "AI Agent가 낯선 개발자를 위해 Hermes의 역할, 설치, 초기 설정, 첫 사용 흐름을 예제 중심으로 정리한 입문 가이드입니다."
---

> 이 글은 **AI Agent나 Vibe Coding이 아직 낯선 초/중급 개발자**를 대상으로 작성했습니다. 목표는 단순 소개가 아니라, **이 글을 그대로 따라 하면 Hermes를 설치하고, 첫 분석 요청까지 실제로 실행해보는 것**입니다.

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

즉, Hermes는 “코드를 대신 다 써주는 도구”라기보다,
**무엇을 해야 하는지 정리하고 구현과 검증의 흐름을 관리하는 도구**라고 생각하면 좋습니다.

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

## 3. Hermes를 이해하기 위한 핵심 개념 3개

Hermes를 잘 쓰려면 아래 세 단어만 익혀도 충분합니다.

### 3-1. Orchestrator
흐름을 조정하는 역할입니다.
어떤 일을 먼저 하고, 무엇을 검증하고, 어디까지가 이번 작업 범위인지 결정합니다.

### 3-2. Agent
사람 대신 특정 작업을 수행하는 소프트웨어 단위입니다.
하지만 “모든 걸 다 잘하는 만능 도구”라고 생각하면 곤란합니다.
각 agent는 잘하는 역할이 다릅니다.

### 3-3. Harness
실행하고 검증하는 장치입니다.
예를 들어 테스트 실행, lint, 결과 검증 스크립트 같은 것이 여기에 해당합니다.

## 4. Hermes가 잘하는 일과 못하는 일

아래처럼 생각하면 꽤 정확합니다.

### Hermes가 잘하는 일
- 프로젝트 구조 읽기
- 요구사항 정리
- 작업 범위 제한
- 단계별 계획 수립
- 결과 검토 및 요약

### Hermes에게 바로 다 맡기면 위험한 일
- 범위가 너무 큰 “전체 리팩터링”
- 검증 없이 바로 배포 결정을 내리는 일
- 테스트와 diff 확인 없이 결과를 그대로 신뢰하는 일

## 5. 설치 전 준비물

먼저 아래가 준비되어 있는지 확인합니다.

- macOS / Linux / Windows
- Node.js 또는 Hermes가 요구하는 실행 환경
- Git
- 인터넷 연결
- 터미널 사용 가능 환경

아래 명령으로 기본 도구가 있는지 확인합니다.

```bash
node -v
npm -v
git --version
```

버전 정보가 출력되면 기본 준비는 끝입니다.

## 6. Hermes 설치

많이 사용하는 설치 예시는 아래와 같습니다.

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

설치가 끝났다면 터미널을 다시 열거나, 셸 설정이 필요하면 반영합니다.

설치 확인은 아래처럼 합니다.

```bash
hermes --version
hermes doctor
```

정상 설치되었다면 버전 정보와 진단 결과가 출력됩니다.

## 7. 초기 설정

처음 한 번은 설정을 해두는 것이 좋습니다.

```bash
hermes setup
```

또는 모델/프로바이더 관련 설정이 분리되어 있다면 아래처럼 확인할 수 있습니다.

```bash
hermes model
```

이 단계에서 확인할 것:

- 기본 모델/provider 설정이 되었는가
- terminal / file 관련 권한이 정상인가
- 필요한 인증 정보가 누락되지 않았는가

## 8. 설치가 잘 되었는지 확인하는 가장 쉬운 방법

설치만 하고 끝내지 말고, 아주 작은 질문을 던져봅니다.

```bash
hermes chat -q "Say hello and confirm you can help with software projects"
```

이 명령이 정상적으로 응답하면,
최소한 **Hermes CLI가 실행되고 기본 응답이 가능한 상태**라고 볼 수 있습니다.

## 9. 첫 실전 예제: 현재 폴더를 분석하게 해보기

Hermes는 “코드를 바로 짜는 것”보다 “상황을 먼저 이해하는 것”에서 빛납니다.
가장 먼저 해볼 만한 실전 예제는 아래와 같습니다.

```text
Please inspect the current repository and tell me:
1. whether this is a valid git repository
2. what the main folders are
3. which files look like entry points
4. what I should inspect first as a developer
```

이 프롬프트의 목적은 정답을 얻는 것이 아니라,
**Hermes가 프로젝트를 읽고 구조를 요약하는 흐름에 익숙해지는 것**입니다.

## 10. 좋은 프롬프트와 나쁜 프롬프트 비교

초보자가 가장 많이 하는 실수는 너무 크게 요청하는 것입니다.

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

좋은 프롬프트의 특징:
- 범위가 좁다
- 이번 단계의 목적이 명확하다
- 아직 하지 말아야 할 것도 적혀 있다
- 출력 형식이 비교적 예측 가능하다

## 11. 초보자에게 추천하는 Hermes 사용 흐름

입문자라면 아래 순서를 추천합니다.

```text
1. Inspect   -> 저장소 구조 파악
2. Diagnose  -> 문제 원인/가설 정리
3. Plan      -> 작업 범위와 순서 정리
4. Dispatch  -> 필요한 경우 Codex 같은 구현 agent에 위임
5. Validate  -> 결과 검토 및 테스트 확인
6. Report    -> 최종 요약
```

그림으로 보면 아래와 같습니다.

```text
Developer Request
   -> Hermes inspects repository
   -> Hermes narrows scope
   -> Hermes proposes next action
   -> Hermes reviews result
   -> Hermes reports back
```

## 12. 바로 따라 하는 미니 실습

아래 실습은 가장 작은 Hermes 입문 루프입니다.

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

### Step 4. 결과 읽는 방법

이때 중요한 것은 “Hermes가 코드를 바로 생성했는가”가 아니라,
아래를 확인하는 것입니다.

- 현재 상태를 잘 파악했는가
- 과한 제안을 하지 않았는가
- 다음 행동을 작은 단위로 제안했는가

## 13. 실전에서 자주 쓰는 Hermes 요청 10가지

아래는 초보자가 바로 복붙해 써볼 수 있는 요청들입니다.

### 저장소 구조 요약
```text
Please inspect this repository and summarize the main folders and likely entry points.
```

### 특정 폴더만 읽기
```text
Please inspect only the src/auth folder and tell me what files seem most important.
```

### 에러 원인 후보 찾기
```text
Analyze this error log and give me 3 likely root cause hypotheses.
```

### 실패 테스트 읽기
```text
Inspect the failing tests and summarize what behavior seems broken.
```

### 작업 범위 줄이기
```text
This task feels too large. Please reduce it to the smallest safe next step.
```

### Codex용 프롬프트 작성
```text
Based on this issue summary, write a precise Codex prompt with scope, constraints, and done criteria.
```

### 결과 검토
```text
Review the latest changes and tell me whether they match the intended scope.
```

### 수동 검증 체크리스트 생성
```text
Create a short manual verification checklist for this change.
```

### 다음 단계 제안
```text
What is the smallest useful next step after this implementation?
```

### 최종 요약 요청
```text
Summarize what changed, what is still risky, and what should be done next.
```

## 14. 설치가 잘 안 될 때 체크리스트

```bash
hermes --version
hermes doctor
node -v
npm -v
git --version
```

추가로 확인할 것:

- PATH 반영이 되었는가
- 회사/학교 네트워크에서 설치 스크립트 접근이 막히지 않았는가
- 셸을 다시 열었는가
- provider/model 설정이 비어 있지 않은가

## 15. 초보자 FAQ

### Q1. Hermes가 코드를 직접 써주나요?
가능한 경우도 있지만, 입문 단계에서는 Hermes를 먼저 **분석/계획/검토 도구**로 이해하는 것이 더 좋습니다.

### Q2. Hermes만으로 모든 걸 할 수 있나요?
그렇게 기대하면 실망하기 쉽습니다. Hermes는 특히 **정리와 조정**에 강합니다.

### Q3. Hermes를 쓸 때 가장 중요한 습관은 뭔가요?
범위를 좁게 주는 것입니다.
“전체 분석”보다 “auth 폴더만 분석”이 더 좋은 시작입니다.

## 16. 이 글의 핵심 정리

Hermes는 아래처럼 이해하면 가장 쉽습니다.

- **무엇을 해야 하는지 정리하는 도구**
- **프로젝트 구조와 문제를 분석하는 도구**
- **다른 coding agent를 잘 쓰기 위한 준비 도구**

즉, 처음부터 “코드를 대신 쳐주는 도구”로만 보지 말고,
**개발 작업을 더 잘 구조화해주는 assistant**로 이해하는 것이 좋습니다.

## 17. 다음 글에서 할 것

다음 글에서는 **Codex가 무엇인지, 어떻게 설치하고, 어떤 식으로 코딩 작업을 맡기면 좋은지**를 같은 방식으로 더 자세히 정리합니다.
