---
layout: portfolio_v4
title: Curated Writing
permalink: /portfolio/writing/
---

<div class="container section-spacer">
  <div class="page-header">
    <h1>Writing & Thoughts</h1>
    <p style="font-size: 1.1rem; max-width: 800px; color: var(--v4-text);">Deep dives into distributed systems, SRE culture, and architectural patterns.</p>
  </div>

  <div class="writing-grid">
    {% for article in site.data.portfolio_v4.writing_curated %}
    <a href="{{ article.link }}" class="cs-card" style="display: block; text-decoration: none; border-left: 4px solid var(--v4-accent);">
      <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--v4-accent); font-weight: 600;">{{ article.type }}</span>
      <h3 style="font-size: 1.25rem; margin: 0.5rem 0;">{{ article.title }}</h3>
      <p style="color: var(--v4-text);">{{ article.summary }}</p>
    </a>
    {% endfor %}
  </div>
  
  <div style="margin-top: 4rem; text-align: center;">
    <a href="/blogs" class="btn btn-primary">View Full Blog Archive</a>
  </div>
</div>
