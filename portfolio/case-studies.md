---
layout: portfolio
title: Case Studies
permalink: /portfolio/case-studies/
description: Deep dives into SRE transformation, hyperscale ML infra, and cost optimization.
---

<div class="p-container">
  <div class="p-section">
    <h1>Engineering Case Studies</h1>
    <p class="p-subhead">Deep dives into solving complex scaling, reliability, and organizational challenges at enterprise scale.</p>
  </div>

  {% for case in site.data.portfolio.case_studies %}
  <div id="{{ case.id }}" class="cs-detail p-section">
    <div class="cs-header">
      <h2>{{ case.title }}</h2>
      <p class="cs-context">{{ case.context }}</p>
    </div>

    <div class="cs-block">
      <span class="cs-label">Role & Scope</span>
      <p>{{ case.role }}</p>
    </div>

    <div class="p-grid-2">
      <div class="cs-block">
        <span class="cs-label">The Challenge</span>
        <p>{{ case.problem }}</p>
      </div>
      <div class="cs-block">
        <span class="cs-label">Constraints</span>
        <p>{{ case.constraints }}</p>
      </div>
    </div>

    <div class="cs-block">
      <span class="cs-label">Solution Architecture</span>
      <ul class="cs-list">
        {% for step in case.solution %}
        <li>{{ step }}</li>
        {% endfor %}
      </ul>
    </div>

    <div class="cs-block">
      <span class="cs-label" style="color: var(--color-accent);">Measurable Impact</span>
      <div class="p-grid-3">
        {% for result in case.impact %}
        <div style="background: var(--color-bg-alt); padding: 1rem; border-radius: 4px; font-weight: 600;">{{ result }}</div>
        {% endfor %}
      </div>
    </div>

    <div class="cs-block">
      <span class="cs-label">Key Lessons</span>
      <ul class="cs-list">
        {% for lesson in case.lessons %}
        <li style="font-style: italic;">{{ lesson }}</li>
        {% endfor %}
      </ul>
    </div>
    
    {% if case.artifacts %}
    <div class="cs-block">
      <span class="cs-label">Artifacts</span>
      <div style="display: flex; gap: 1rem;">
        {% for art in case.artifacts %}
        <a href="{{ art.link }}" class="p-btn p-btn-outline" style="font-size: 0.8rem;">{{ art.text }}</a>
        {% endfor %}
      </div>
    </div>
    {% endif %}

  </div>
  {% endfor %}
</div>
