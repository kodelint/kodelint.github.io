---
layout: portfolio
title: Leadership
permalink: /portfolio/leadership/
description: Building high-performance engineering cultures.
---

<div class="p-container">
  <div class="p-section">
    <h1>Leadership Philosophy</h1>
    <p class="p-subhead">Building high-performance engineering cultures through autonomy, reliability, and growth.</p>
  </div>

  <div class="p-section">
    <div class="p-grid-2">
      <div class="lead-philosophy">
        <h3>Mission</h3>
        <p>{{ site.data.portfolio.leadership.philosophy.mission }}</p>
        
        <h3>Hiring & Growth</h3>
        <p>{{ site.data.portfolio.leadership.philosophy.hiring }}</p>
        
        <h3>Velocity vs Reliability</h3>
        <p>{{ site.data.portfolio.leadership.philosophy.balance }}</p>
      </div>
      
      <div>
        <div style="background: white; border: 1px solid var(--color-border); padding: 2rem; border-radius: 6px;">
          <h3 style="margin-bottom: 1.5rem;">Org Health Snapshots</h3>
          {% for metric in site.data.portfolio.leadership.metrics %}
          <div class="lead-stat-card">
            <div class="lead-stat-label">{{ metric.label }}</div>
            <div class="lead-stat-val">{{ metric.value }}</div>
          </div>
          {% endfor %}
        </div>
      </div>
    </div>
  </div>

  <div class="p-section">
    <h3>Strategic Programs</h3>
    <div class="p-grid-3">
      {% for prog in site.data.portfolio.leadership.programs %}
      <div class="p-card">
        <h4 class="p-card-title">{{ prog.title }}</h4>
        <p style="font-size: 0.95rem;">{{ prog.desc }}</p>
      </div>
      {% endfor %}
    </div>
  </div>
</div>
