---
layout: default
title: Development
description: AI Agent와 Vibe Coding 입문자를 위한 실전 튜토리얼 모음
permalink: /development/
---

<div class="page-card">
  <p>이 섹션은 <strong>AI Agent나 Vibe Coding이 처음인 개발자</strong>를 위해 준비한 실전형 튜토리얼 모음입니다. 설치부터 실행, 검증, 실제 프로젝트 적용까지 순서대로 따라갈 수 있도록 구성했습니다.</p>
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
