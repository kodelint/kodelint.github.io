---
layout: portfolio
title: Open Source
permalink: /portfolio/oss/
description: Open source contributions and projects.
---

<div class="p-container">
  <div class="p-section">
    <h1>Open Source</h1>
    <p class="p-subhead">Tools and libraries contributing to the developer ecosystem.</p>
  </div>

  <div class="p-section">
    <div class="p-grid-2">
      {% for project in site.data.portfolio.oss %}
      <div class="p-card">
        <h3 class="p-card-title">{{ project.title }}</h3>
        <p style="margin-bottom: 1rem;">{{ project.problem }}</p>
        <p style="font-weight: 600; color: var(--color-accent); margin-bottom: 1.5rem;">Impact: {{ project.impact }}</p>
        <a href="{{ project.repo }}" target="_blank" class="p-btn p-btn-outline">View Repository</a>
      </div>
      {% endfor %}
    </div>
  </div>
</div>
