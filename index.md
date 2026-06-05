---
layout: default
title: Home
---

<section class="home-intro">
  <h2>AI Agent Engineering Blog</h2>
  <p>
    Codex, Hermes 같은 <strong>AI coding agent를 실제 개발 워크플로우에 연결하는 방법</strong>을 기록합니다.
    이 블로그는 AI Agent를 처음 접하는 개발자도 <strong>그대로 따라 하면서 환경을 구축하고, 첫 실습까지 완료</strong>할 수 있도록 튜토리얼 중심으로 작성합니다.
  </p>
  <ul>
    <li>설치부터 인증, 실행, 검증까지 단계별 설명</li>
    <li>복붙해서 바로 실행할 수 있는 명령어와 예제 제공</li>
    <li>Hermes, Codex, 그리고 둘을 함께 쓰는 실전 워크플로 소개</li>
  </ul>
</section>

<section>
  <h2>먼저 읽어보면 좋은 글</h2>
  <div class="category-grid">
    <article class="category-card">
      <h3><a href="{{ '/development/' | relative_url }}">개발 튜토리얼</a></h3>
      <p class="category-label">Hermes 설치, Codex 사용법, 그리고 둘을 함께 쓰는 Toy Project 실습</p>
    </article>
    <article class="category-card">
      <h3><a href="{{ '/life/' | relative_url }}">일상</a></h3>
      <p class="category-label">메모, 생각 정리, 학습 로그</p>
    </article>
    <article class="category-card">
      <h3><a href="{{ '/resume/' | relative_url }}">이력서</a></h3>
      <p class="category-label">경력, 기술 스택, 프로젝트 정리</p>
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
