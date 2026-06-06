---
layout: default
title: Development
description: AI Agent와 Vibe Coding 입문자를 위한 실전 튜토리얼 모음
permalink: /development/
---

<div class="page-card">
  <p>이 섹션은 <strong>AI Agent나 Vibe Coding이 처음인 개발자</strong>를 위해 준비한 실전형 튜토리얼 모음입니다. 설치부터 실행, 검증, 실제 프로젝트 적용까지 순서대로 따라갈 수 있도록 구성했습니다.</p>
</div>

<div class="series-guide">
  <h2>추천 읽는 순서</h2>
  <ol class="series-steps">
    <li>
      <strong>1단계. Hermes 입문</strong><br />
      먼저 Hermes가 어떤 역할을 하는지 이해하고, 설치와 첫 분석 요청까지 따라 해보세요.
      <div><a href="{{ '/development/hermes-intro-and-setup-guide/' | relative_url }}">Hermes 입문 글 보기</a></div>
    </li>
    <li>
      <strong>2단계. Codex 입문</strong><br />
      그다음 Codex를 설치하고, 안전하게 첫 구현 작업을 실행하는 흐름을 익혀보세요.
      <div><a href="{{ '/development/codex-intro-install-auth-first-run/' | relative_url }}">Codex 입문 글 보기</a></div>
    </li>
    <li>
      <strong>3단계. Toy Project 실습</strong><br />
      마지막으로 Hermes와 Codex를 함께 써서 작은 프로젝트를 단계별로 진행해보세요.
      <div><a href="{{ '/development/hermes-codex-toy-project-workshop/' | relative_url }}">Toy Project 실습 글 보기</a></div>
    </li>
  </ol>
</div>

<div class="page-card">
  <h2>이 시리즈에서 배우는 것</h2>
  <ul>
    <li>Hermes와 Codex의 역할 차이</li>
    <li>좋은 프롬프트를 만드는 기본 원칙</li>
    <li>설치 → 실행 → 검증 → 다음 단계로 이어지는 루프</li>
    <li>AI Agent를 실제 개발 실습에 연결하는 가장 작은 패턴</li>
  </ul>
</div>

<ul class="post-list">
  {% assign development_posts = site.categories.development %}
  {% if development_posts and development_posts.size > 0 %}
    {% for post in development_posts %}
      <li class="post-card">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <div class="post-meta">{{ post.date | date: "%Y-%m-%d" }} · {{ post.tags | join: ", " }}</div>
        {% if post.excerpt %}
          <p class="post-excerpt">{{ post.excerpt | strip_html }}</p>
        {% endif %}
      </li>
    {% endfor %}
  {% else %}
    <li class="post-card">아직 개발 섹션 글이 없습니다.</li>
  {% endif %}
</ul>
