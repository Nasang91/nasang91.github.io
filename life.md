---
layout: default
title: Life
description: 일상 기록, 메모, 생각 정리
permalink: /life/
---

<div class="page-card">
  <p>일상 섹션은 개인적인 기록과 짧은 메모, 학습 로그를 정리하는 공간입니다.</p>
</div>

<ul class="post-list">
  {% assign life_posts = site.categories.life %}
  {% if life_posts and life_posts.size > 0 %}
    {% for post in life_posts %}
      <li class="post-card">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <div class="post-meta">{{ post.date | date: "%Y-%m-%d" }} · {{ post.tags | join: ", " }}</div>
        {% if post.excerpt %}
          <p class="post-excerpt">{{ post.excerpt | strip_html }}</p>
        {% endif %}
      </li>
    {% endfor %}
  {% else %}
    <li class="post-card">아직 일상 섹션 글이 없습니다.</li>
  {% endif %}
</ul>
