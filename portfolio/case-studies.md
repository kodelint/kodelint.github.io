---
layout: portfolio_v4
title: Case Studies
permalink: /portfolio/case-studies/
---

<div class="container section-spacer">
  <div class="page-header">
    <h1>Engineering Case Studies</h1>
    <p style="font-size: 1.1rem; max-width: 800px; color: var(--v4-text);">Deep dives into solving complex scaling, reliability, and organizational challenges at enterprise scale.</p>
  </div>

  <div style="display: flex; flex-direction: column; gap: 5rem;">
    {% for case in site.data.portfolio_v4.case_studies %}
    <div id="{{ case.id }}" class="cs-detail-block">
      <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">{{ case.title }}</h2>
      <p style="font-size: 1.2rem; color: var(--v4-text); margin-bottom: 2rem;">{{ case.context }}</p>
      
      <div class="cs-detail-grid">
        <div class="cs-content">
          <h3 style="font-size: 1.4rem;">The Challenge</h3>
          <p style="margin-bottom: 1.5rem;">{{ case.problem }}</p>
          
          <h3 style="font-size: 1.4rem;">Constraints</h3>
          <p style="margin-bottom: 1.5rem;">{{ case.constraints }}</p>

          <h3 style="font-size: 1.4rem;">Solution Strategy</h3>
          <ul style="margin-bottom: 2rem; padding-left: 1.5rem;">
            {% for item in case.solution %}
            <li style="margin-bottom: 0.5rem;">{{ item }}</li>
            {% endfor %}
          </ul>

          <h3 style="font-size: 1.4rem; color: var(--v4-accent);">Impact & Results</h3>
          <ul style="padding-left: 1.5rem; font-weight: 500;">
            {% for item in case.impact %}
            <li style="margin-bottom: 0.5rem;">{{ item }}</li>
            {% endfor %}
          </ul>
        </div>
        
        <div class="cs-sidebar">
          <h4>Role</h4>
          <p>{{ case.role }}</p>
          
          <h4>Tech Stack</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
            {% for tag in case.tags %}
            <span style="background: white; border: 1px solid var(--v4-border); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem;">{{ tag }}</span>
            {% endfor %}
          </div>
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
</div>
