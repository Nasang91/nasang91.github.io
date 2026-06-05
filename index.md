---
layout: default
title: Home
---

<section class="home-intro">
  <h2>AI Agent Engineering Blog</h2>
  <p>
    Codex, Claude Code, OpenClaw, Hermes 같은 <strong>AI coding agent를 실제 개발 워크플로우에 연결하는 방법</strong>을 기록합니다.
    단순 소개가 아니라, 실제로 따라할 수 있는 예제와 운영 관점의 설계를 함께 다룹니다.
  </p>
  <ul>
    <li>구현, 리뷰, 머지, harness까지 이어지는 흐름</li>
    <li>orchestration 설계, 상태 전이, 실패 처리</li>
    <li>실전형 GitHub 중심 개발 프로세스</li>
  </ul>
</section>

<section>
  <h2>섹션 둘러보기</h2>
  <div class="category-grid">
    <article class="category-card">
      <h3><a href="{{ '/development/' | relative_url }}">개발</a></h3>
      <p class="category-label">AI agent, orchestration, coding workflow 관련 글</p>
    </article>
    <article class="category-card">
      <h3><a href="{{ '/life/' | relative_url }}">일상</a></h3>
      <p class="category-label">개인 기록, 메모, 생각 정리</p>
    </article>
    <article class="category-card">
      <h3><a href="{{ '/resume/' | relative_url }}">이력서</a></h3>
      <p class="category-label">경력, 기술 스택, 프로젝트 이력 정리</p>
    </article>
  </div>
</section>

<section>
  <h2>최신 글</h2>
  <ul class="post-list">
    {% for post in site.posts limit: 10 %}
      <li class="post-card">
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <div class="post-meta">{{ post.date | date: "%Y-%m-%d" }} · {{ post.categories | join: ", " }}</div>
        {% if post.excerpt %}
          <p class="post-excerpt">{{ post.excerpt | strip_html }}</p>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
</section>
