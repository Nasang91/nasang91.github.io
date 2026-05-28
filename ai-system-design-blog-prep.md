# AI System 설계 블로그 준비 문서

## 1) 블로그 목표
- AI Agent + Coding Agent를 함께 쓰는 시스템 설계 방법을 실무 관점에서 소개한다.
- Orchestration(흐름 제어)과 Harness(검증/실행 기반)의 역할을 분리해서 설명한다.
- 단순 개념 소개가 아니라, "어떻게 만들고 운영할지"까지 연결한다.

## 2) 핵심 메시지
1. **Agent는 역할 분리**가 핵심이다. (Planner / Executor / Reviewer)
2. **Orchestration은 상태와 실패 처리**가 핵심이다. (재시도, 타임아웃, fallback)
3. **Harness는 신뢰성 확보 장치**다. (테스트, 샌드박스 실행, 정책 검증)
4. **관측 가능성(Observability)** 없이는 운영이 어렵다. (로그, trace, 비용 추적)

## 3) 추천 글 구성(초안)
1. 왜 지금 AI 시스템 설계가 필요한가
2. Agent/Coding Agent 역할 정의
3. Orchestration 레이어 설계
4. Harness 레이어 설계
5. 운영 관점 체크리스트 (보안/품질/비용)
6. 작은 PoC에서 프로덕션으로 확장하는 방법

## 4) 다이어그램 아이디어
- **전체 구조도**: User → Planner Agent → Coding Agent → Review Agent → Deploy Gate
- **실행 흐름도**: Task 생성 → Tool 호출 → 검증(Harness) → 결과 승인
- **실패 처리 흐름도**: 실패 유형 분기(도구 실패/정책 위반/품질 미달) 및 대응

## 5) 글 작성 체크리스트
- [ ] 실제 사례 1개 이상 포함 (예: PR 자동 수정 플로우)
- [ ] Orchestration 상태 전이 예시 포함
- [ ] Harness 검증 항목 표 포함 (보안/테스트/정책)
- [ ] 운영 지표 제안 포함 (성공률, 재시도율, 평균 비용, 리드타임)
- [ ] 도입 시 흔한 실패 패턴과 대응 전략 정리

## 6) 첫 게시글 제목 후보
- "AI Agent + Coding Agent로 만드는 실전 Orchestration 설계"
- "LLM 시스템을 제품으로: Orchestration과 Harness 설계 가이드"
- "PoC를 넘는 AI 시스템 설계: Agent 분업, 검증, 운영"
