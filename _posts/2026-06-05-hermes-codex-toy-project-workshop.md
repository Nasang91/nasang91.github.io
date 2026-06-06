---
layout: post
title: "Hermes + Codex로 Toy Project 진행하기: Mini Block Builder 실전 튜토리얼"
date: 2026-06-05 23:30:00 +0900
categories: [development, workshop]
tags: [hermes, codex, toy-project, tutorial, vibe-coding]
excerpt: "Hermes를 오케스트레이터로, Codex를 구현 agent로 사용해 작은 Toy Project를 단계별로 완성하는 실전 튜토리얼입니다."
---

<div class="callout tip">
  <h3>이 글의 목표</h3>
  <p>이 글은 앞선 두 글에서 설치한 <strong>Hermes와 Codex를 실제로 함께 사용하는 첫 실습</strong>입니다. 목표는 단순히 도구를 아는 것이 아니라, <strong>직접 실행해보면서 “어떻게 협업시키는지”를 체험하는 것</strong>입니다.</p>
</div>

<div class="series-guide">
  <h2>시리즈 읽는 순서</h2>
  <ol class="series-steps">
    <li><a href="{{ '/development/hermes-intro-and-setup-guide/' | relative_url }}">1단계. Hermes 입문</a></li>
    <li><a href="{{ '/development/codex-intro-install-auth-first-run/' | relative_url }}">2단계. Codex 입문</a></li>
    <li><strong>3단계. 현재 글</strong>: Hermes + Codex로 Toy Project 실습</li>
  </ol>
</div>

<div class="diagram-card">
  <h3>전체 협업 흐름</h3>
  <pre><code>[User Request]
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
[Developer: manual test / approve next step]</code></pre>
</div>

## 이 글을 읽고 나면 할 수 있는 것

- React + Vite + TypeScript 기반 Toy Project를 시작할 수 있다.
- Hermes에게 범위를 정리시키고,
- Codex에게 구현을 맡기고,
- 다시 Hermes에게 결과 검토를 맡기는 흐름을 경험할 수 있다.

## 1. 이번 실습에서 만들 것

이번 실습에서는 브라우저에서 실행되는 작은 앱인 <strong>Minecraft-inspired Mini Block Builder</strong>를 만듭니다.

최종 목표:

- 2D grid world 렌더링
- 블록 놓기
- 블록 제거
- 블록 종류 3개 선택
- 툴바 UI
- 저장 / 불러오기 / 초기화

## 2. 왜 둘을 함께 쓰는가

### Hermes가 잘하는 일
- 요구사항 정리
- 작업 범위 제한
- Day 1 / Day 2 / Day 3 식의 단계 분해
- 리뷰 포인트 정리
- 다음 단계 제안

### Codex가 잘하는 일
- 실제 코드 작성
- 여러 파일 수정
- 기능 구현
- 테스트/구조 보강

즉, <strong>생각하는 역할과 구현하는 역할을 분리하면 결과가 더 안정적</strong>입니다.

## 3. 사전 준비물

```bash
hermes --version
codex --version
node -v
npm -v
git --version
```

필요한 것:
- Hermes 설치 완료
- Codex 설치 완료
- 인증 완료
- Node.js 18+
- npm
- Git

## 4. 프로젝트 생성

```bash
mkdir minecraft-mini-block-builder
cd minecraft-mini-block-builder
npm create vite@latest . -- --template react-ts
npm install
git init
git add .
git commit -m "chore: initialize vite react ts project"
npm run dev
```

브라우저에서 기본 Vite 화면이 보이면 준비 완료입니다.

## 5. 우리가 목표로 하는 구조

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

## 6. 전체 워크숍 로드맵

```text
Day 1 -> MVP 만들기
Day 2 -> 핵심 기능 확장
Day 3 -> polish + README + 데모 마감
```

### Day 1 목표
- grid 렌더링
- 셀 클릭 시 블록 놓기

### Day 2 목표
- 블록 타입 3종
- erase 기능
- toolbar UI
- save/load/reset

### Day 3 목표
- UI 정리
- 작은 버그 수정
- README 작성
- 데모 가능한 상태 만들기

## 7. Day 1 - Hermes에게 먼저 범위를 정리시키기

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

## 8. Day 1 - Hermes에게 Codex 실행까지 맡기기

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

## 9. Day 1에서 사람이 직접 확인할 것

```bash
npm run dev
```

체크리스트:
- [ ] grid가 보이는가
- [ ] 셀 클릭이 되는가
- [ ] 클릭한 셀에 블록이 놓이는가
- [ ] 앱이 깨지지 않고 실행되는가

## 10. Day 1 후 Hermes에게 리뷰 요청

```text
Review the current implementation of Day 1 for the Minecraft-inspired Mini Block Builder.
Please do these things:
1. Check whether the implementation matches the MVP scope.
2. Point out structural issues if any.
3. Suggest the next Day 2 Codex prompt.
```

## 11. Day 2 - 블록 종류, 삭제, 저장 기능 추가

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

그리고 구현은 아래처럼 맡깁니다.

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

## 12. Day 2에서 사람이 직접 확인할 것

- [ ] 블록 종류 3개 이상 선택 가능
- [ ] 지우기 동작 가능
- [ ] 저장 가능
- [ ] 새로고침 후 불러오기 가능
- [ ] reset 가능

## 13. Day 3 - polish와 마무리

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

## 14. Day 3에서 사람이 직접 확인할 것

- [ ] 버튼과 선택 상태가 직관적인가
- [ ] 레이아웃이 무너지지 않는가
- [ ] 저장/불러오기/초기화가 안정적으로 동작하는가
- [ ] 데모 중 설명하기 쉬운 구조인가

## 15. README 템플릿 예시

````markdown
# Minecraft-inspired Mini Block Builder

A workshop project built with Hermes + Codex collaboration.

## Features
- 2D grid world
- Place blocks
- Erase blocks
- Select block types
- Save/load/reset with localStorage

## Tech Stack
- React
- TypeScript
- Vite

## Run
```bash
npm install
npm run dev
```

## Controls
- Click: place selected block
- Erase mode: remove block
- Save: save world to localStorage
- Load: load saved world
- Reset: clear world

## Workshop Theme
Hermes was used for planning, decomposition, and review.
Codex was used for implementation.
````

## 16. 이 실습에서 중요한 운영 원칙

- <strong>Hermes가 먼저 생각한다</strong>
- <strong>Codex는 구현에 집중시킨다</strong>
- <strong>Hermes가 마무리한다</strong>

## 17. 자주 하는 실수

- Day 1부터 기능을 너무 많이 넣기
- Codex 결과를 무조건 신뢰하기
- Hermes에게 너무 추상적으로 요청하기
- 매 단계마다 수동 검증을 생략하기

<div class="callout warning">
  <h3>실습 팁</h3>
  <p>실습이 잘 굴러가는 핵심은 “한 번에 크게 시키지 않는 것”입니다. Day 1 / Day 2 / Day 3처럼 작은 성공을 쌓는 방식이 훨씬 안정적입니다.</p>
</div>

## 18. 초보자 FAQ

### Q1. 꼭 Hermes를 통해 Codex를 써야 하나요?
꼭 그렇지는 않습니다. 하지만 입문 단계에서는 Hermes를 통해 범위를 먼저 정리한 뒤 Codex를 쓰는 흐름이 훨씬 안정적입니다.

### Q2. 왜 Toy Project가 좋은 실습 주제인가요?
작고 명확해서 성공 경험을 얻기 좋고, Hermes와 Codex의 역할 차이를 설명하기 좋기 때문입니다.

## 19. 이 글의 핵심 요약

1. <strong>Hermes는 분석/계획/검토 담당</strong>
2. <strong>Codex는 구현 담당</strong>
3. <strong>사람은 범위 통제와 최종 검증 담당</strong>

## 20. 다음에 확장해볼 만한 것

- README 자동 정리
- 테스트 코드 추가
- GitHub PR 리뷰 흐름 연결
- worktree 기반 병렬 실험
- Hermes가 여러 Codex 작업을 조정하는 구조 실험
