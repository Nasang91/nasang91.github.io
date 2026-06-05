---
layout: post
title: "Hermes + Codex로 Toy Project 진행하기: Mini Block Builder 실전 튜토리얼"
date: 2026-06-05 23:30:00 +0900
categories: [development, workshop]
tags: [hermes, codex, toy-project, tutorial, vibe-coding]
excerpt: "Hermes를 오케스트레이터로, Codex를 구현 agent로 사용해 작은 Toy Project를 단계별로 완성하는 실전 튜토리얼입니다."
---

> 이 글은 앞선 두 글에서 설치한 **Hermes와 Codex를 실제로 함께 사용하는 첫 실습**입니다. 목표는 단순히 도구를 아는 것이 아니라, 직접 실행해보면서 “어떻게 협업시키는지”를 익히는 것입니다.

## 1. 이번 실습에서 만들 것

이번 실습에서는 브라우저에서 실행되는 작은 앱인 **Minecraft-inspired Mini Block Builder**를 만듭니다.

최종 목표:

- 2D grid world 렌더링
- 블록 놓기
- 블록 제거
- 블록 종류 3개 선택
- 툴바 UI
- 저장 / 불러오기 / 초기화

이 프로젝트를 고른 이유는 단순합니다.

- 기능이 너무 크지 않다
- React + TypeScript 실습에 적합하다
- Hermes와 Codex의 역할 분담을 설명하기 좋다

## 2. 이번 실습의 핵심 역할 분담

이번 글의 핵심은 아래 구조입니다.

```text
User
  -> Hermes (scope, planning, review)
  -> Codex (implementation)
  -> Hermes (validation, report)
```

한 줄로 요약하면:

- **Hermes는 무엇을 할지 정리한다**
- **Codex는 실제 코드를 작성한다**
- **Hermes가 다시 결과를 검토한다**

즉, Hermes는 오케스트레이터,
Codex는 구현 agent입니다.

## 3. 사전 준비물

아래가 준비되어 있어야 합니다.

- Hermes 설치 완료
- Codex 설치 완료
- 인증 완료
- Node.js 18+
- npm
- Git

확인 명령:

```bash
hermes --version
codex --version
node -v
npm -v
git --version
```

## 4. 프로젝트 생성

작업 폴더를 만듭니다.

```bash
mkdir minecraft-mini-block-builder
cd minecraft-mini-block-builder
```

React + Vite + TypeScript 프로젝트를 생성합니다.

```bash
npm create vite@latest . -- --template react-ts
npm install
```

Git 저장소로 초기화합니다.

```bash
git init
git add .
git commit -m "chore: initialize vite react ts project"
```

실행이 되는지 확인합니다.

```bash
npm run dev
```

브라우저에서 기본 Vite 화면이 보이면 준비 완료입니다.

## 5. 우리가 목표로 하는 구조

이번 실습에서는 아래 정도 구조를 목표로 합니다.

```text
src/
  App.tsx
  main.tsx
  index.css
  components/
    WorldGrid.tsx
    Toolbar.tsx
  hooks/
    useWorld.ts
  lib/
    storage.ts
  types/
    world.ts
```

중요한 점은, 처음부터 이 구조를 사람이 손으로 다 만드는 것이 아니라,
**Hermes가 계획하고 Codex가 구현하도록 유도하는 것**입니다.

## 6. Day 1 - MVP 정의와 첫 구현

### 6-1. 먼저 Hermes에게 범위를 정리시킨다

Hermes를 실행한 뒤 아래처럼 요청합니다.

```text
We are building a Minecraft-inspired Mini Block Builder as a web app.
Keep the MVP small enough for a workshop.
Please do these things:
1. Define the MVP clearly.
2. Propose a simple React + TypeScript file structure.
3. Write a Codex prompt for implementing Day 1 only.

Day 1 scope:
- Render a 2D grid world
- Click a cell to place the selected block
- Keep the implementation simple and maintainable
```

이 프롬프트의 핵심은 “구현”을 바로 시키는 것이 아니라,
먼저 Hermes가 범위를 **작게** 잡게 만드는 것입니다.

### 6-2. 더 실전적인 방식: Hermes에게 Codex 실행까지 맡기기

실제로는 아래처럼 Hermes에게 오케스트레이션 전체를 맡기는 것이 더 좋습니다.

```text
Please act as the orchestrator for this repository.
Use Codex as the coding agent for Day 1 implementation.
Your job:
1. Confirm the Day 1 scope
2. Prepare a precise Codex prompt
3. Run Codex in this repository for the Day 1 task
4. Review the changed files
5. Report what was implemented and what I should verify manually

Day 1 requirements:
- Create a 2D grid world
- Render cells visually
- Clicking a cell places the currently selected block
- Keep the code simple and maintainable
- Do not add saving, erasing, or advanced extra features yet
```

이 프롬프트는 강의/실습에서 특히 좋습니다.
왜냐하면 사용자가 매번 직접 `codex exec ...`를 조작하지 않아도,
Hermes가 역할을 나눠 처리하는 구조를 자연스럽게 경험할 수 있기 때문입니다.

## 7. Day 1에서 사람이 직접 확인할 것

구현이 끝나면 무조건 브라우저에서 직접 확인합니다.

```bash
npm run dev
```

체크리스트:

- grid가 보이는가
- 셀 클릭이 되는가
- 클릭한 셀에 블록이 놓이는가
- 앱이 깨지지 않고 실행되는가

## 8. Day 1 후 Hermes에게 리뷰 요청

아래처럼 요청합니다.

```text
Review the current implementation of Day 1 for the Minecraft-inspired Mini Block Builder.
Please do these things:
1. Check whether the implementation matches the MVP scope.
2. Point out structural issues if any.
3. Suggest the next Day 2 Codex prompt.
```

이 단계가 중요합니다.
**Codex 결과를 그대로 끝내지 말고 Hermes가 범위, 구조, 다음 단계까지 정리하게 해야 품질이 안정적**입니다.

## 9. Day 2 - 블록 종류, 삭제, 저장 기능 추가

이제 기능을 조금 확장합니다.

Day 2 목표:

- 블록 타입 3종 추가
- 삭제 기능 추가
- 툴바 UI 추가
- save/load/reset 추가

### 9-1. Hermes에게 Day 2 작업 분해 요청

```text
We finished Day 1.
Now plan Day 2 for the Minecraft-inspired Mini Block Builder.
Please break Day 2 into a small scope and write a Codex prompt.
Day 2 scope:
- Add 3 block types
- Add erase mode
- Add toolbar UI
- Add save/load/reset using localStorage
Keep the implementation workshop-friendly.
```

### 9-2. Hermes에게 Day 2 구현 오케스트레이션 맡기기

```text
Use Codex as the coding agent for Day 2 in this repository.
Please do the following:
1. Restate the Day 2 scope clearly
2. Generate the Codex execution prompt
3. Run Codex for the implementation
4. Review the result against the scope
5. Tell me what to test manually

Day 2 scope:
- Add at least 3 block types
- Add erase functionality
- Add a toolbar for selecting blocks and actions
- Add save/load/reset using localStorage
- Keep the UI simple and clear
- Do not add advanced features beyond this scope
```

## 10. Day 2에서 사람이 직접 확인할 것

브라우저에서 아래를 체크합니다.

- 블록 종류 3개 이상 선택 가능
- 지우기 동작 가능
- 저장 가능
- 새로고침 후 불러오기 가능
- reset 가능

## 11. Day 3 - polish와 마무리

마지막 날은 기능을 크게 늘리는 것이 아니라,
강의/실습용으로 마무리 가능한 상태를 만드는 데 집중합니다.

### 목표

- UI 정리
- 작은 버그 수정
- README 작성
- 데모 가능한 상태로 마감

### Hermes 요청 예시

```text
Use Codex as the coding agent for the final Day 3 polish pass.
Please do the following:
1. Define the smallest useful polish scope
2. Prepare the Codex implementation prompt
3. Run Codex in this repository
4. Review the final changes
5. Report demo readiness and any remaining issues

Focus on:
- button clarity
- selected block visibility
- layout spacing
- small bug fixes
- workshop-friendly simplicity
```

## 12. 이 실습에서 중요한 운영 원칙

### 원칙 1. Hermes가 먼저 생각한다
처음부터 Codex에게 구현만 던지지 말고,
Hermes가 작업 범위와 완료 조건을 정리하게 합니다.

### 원칙 2. Codex는 구현에 집중시킨다
Codex에게는 아래를 분명히 줍니다.

- 오늘 구현할 범위
- 하지 말아야 할 것
- 완료 조건

### 원칙 3. Hermes가 마무리한다
최종 단계는 항상 Hermes가 맡는 것이 좋습니다.

- 변경 파일 리뷰
- 테스트/실행 체크
- 결과 요약
- 남은 리스크 정리

## 13. 그림으로 보는 전체 흐름

```text
[User Request]
      |
      v
[Hermes: scope / plan / prompt]
      |
      v
[Codex: implement code changes]
      |
      v
[Hermes: review / validate / report]
      |
      v
[Developer: manual test / approve next step]
```

## 14. 자주 하는 실수

### 실수 1. Day 1부터 기능을 너무 많이 넣기
작은 성공 경험이 더 중요합니다.

### 실수 2. Codex 결과를 무조건 신뢰하기
반드시 diff와 실제 동작을 확인해야 합니다.

### 실수 3. Hermes에게 너무 추상적으로 요청하기
“잘 만들어줘”보다는,
“오늘은 grid rendering만”,
“이번엔 save/load만”처럼 좁게 요청하는 것이 좋습니다.

## 15. 이 글의 핵심 요약

이 실습에서 기억해야 할 것은 세 가지입니다.

1. **Hermes는 분석/계획/검토 담당**
2. **Codex는 구현 담당**
3. **사람은 범위 통제와 최종 검증 담당**

이 역할 분리를 지키면,
AI Agent에 익숙하지 않은 개발자도 훨씬 안정적으로 실습을 진행할 수 있습니다.

## 16. 다음에 확장해볼 만한 것

이 Mini Block Builder가 끝나면 다음도 해볼 수 있습니다.

- README 자동 정리
- 테스트 코드 추가
- GitHub PR 리뷰 흐름 연결
- worktree 기반 병렬 실험
- Hermes가 여러 Codex 작업을 조정하는 구조 실험
