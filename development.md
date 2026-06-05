---
layout: default
title: Development
description: AI coding agent, orchestration, workflow 관련 글 모음
permalink: /development/
---

<div class="page-card">
  <p>개발 섹션에서는 Codex, Hermes, orchestration, harness, workflow 관련 글을 모아봅니다.</p>
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
