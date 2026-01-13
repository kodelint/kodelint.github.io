---
layout: portfolio
title: Writing
permalink: /portfolio/writing/
description: Curated selection of technical writing and talks.
---

<div class="p-container">
  <div class="p-section">
    <h1>Writing & Talks</h1>
    <p class="p-subhead">Curated selection of 6–8 blog posts and conference talks.</p>
  </div>

  <div class="p-section">
    <div class="p-grid-2">
      {% for post in site.data.portfolio.writing %}
      <div class="p-card">
        <h3 class="p-card-title"><a href="{{ post.link }}">{{ post.title }}</a></h3>
        <p style="margin-bottom: 1rem;">{{ post.summary }}</p>
        <span style="font-size: 0.85rem; color: var(--color-text); font-style: italic;">Why it matters: {{ post.why }}</span>
      </div>
      {% endfor %}
    </div>
    
    <div style="margin-top: 3rem; text-align: center;">
      <a href="/blogs" class="p-btn p-btn-primary">Visit Full Blog</a>
    </div>
  </div>
</div>
