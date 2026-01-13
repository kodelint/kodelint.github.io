---
layout: portfolio_v4
title: Open Source Projects
permalink: /portfolio/oss/
---

<div class="container section-spacer">
  <div class="page-header">
    <h1>Open Source</h1>
    <p style="font-size: 1.1rem; max-width: 800px; color: var(--v4-text);">Tools and libraries contributing to the developer ecosystem.</p>
  </div>

  <div class="oss-grid">
    {% for project in site.data.portfolio_v4.oss_projects %}
    <div class="cs-card">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
        <h3 style="font-size: 1.3rem; margin: 0;">{{ project.title }}</h3>
        <a href="{{ project.repo }}" target="_blank" class="btn btn-outline" style="font-size: 0.8rem; padding: 0.2rem 0.6rem;">GitHub ↗</a>
      </div>
      <p style="margin-bottom: 1rem;">{{ project.description }}</p>
      <p style="font-size: 0.9rem; margin-bottom: 1rem; color: var(--v4-text);"><strong>Impact:</strong> {{ project.impact }}</p>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        {% for tag in project.tags %}
        <span style="background: var(--v4-bg-alt); font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 4px;">{{ tag }}</span>
        {% endfor %}
      </div>
    </div>
    {% endfor %}
  </div>
</div>
