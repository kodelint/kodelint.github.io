---
layout: portfolio
title: Case Studies
description: Deep dives into SRE transformation, hyperscale ML infra, and cost optimization.
---

<div class="p-container">
  <div class="p-section" style="border-bottom: none;">
    <h1>Engineering Case Studies</h1>
    <p class="p-subhead">Strategic technical initiatives delivered at enterprise scale.</p>
  </div>

  <div style="display: flex; flex-direction: column; gap: 4rem; padding-bottom: 5rem;">
    {% for case in site.data.portfolio.case_studies %}
    <div id="{{ case.id }}" class="cs-detail">
      <div class="cs-header">
        <span class="cs-badge">Case Study</span>
        <h2 style="font-size: 2.2rem;">{{ case.title }}</h2>
        <p class="cs-context" style="font-style: normal; font-weight: 500;">{{ case.context }}</p>
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

      <div class="cs-block cs-block-accent">
        <span class="cs-label" style="color: var(--color-accent);">Strategic Solution</span>
        <ul class="cs-list">
          {% for step in case.solution %}
          <li style="font-weight: 500;">{{ step }}</li>
          {% endfor %}
        </ul>
      </div>

      <div class="cs-block">
        <span class="cs-label">Measurable Outcomes</span>
        <div class="cs-impact-grid">
          {% for result in case.impact %}
          <div class="cs-impact-card">
            <span>{{ result }}</span>
          </div>
          {% endfor %}
        </div>
      </div>

      <div class="p-grid-2">
        <div class="cs-block">
          <span class="cs-label">Role & Scope</span>
          <p style="font-size: 0.95rem;">{{ case.role }}</p>
        </div>
        <div class="cs-block">
          <span class="cs-label">Lessons Learned</span>
          <ul class="cs-list" style="font-size: 0.95rem; color: var(--color-text);">
            {% for lesson in case.lessons %}
            <li>{{ lesson }}</li>
            {% endfor %}
          </ul>
        </div>
      </div>
      
    </div>
    {% endfor %}
  </div>
</div>