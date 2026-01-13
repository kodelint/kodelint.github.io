---
layout: portfolio_v4
title: Leadership Philosophy
permalink: /portfolio/leadership/
---

<div class="container section-spacer">
  <div class="page-header">
    <h1>Leadership Philosophy</h1>
    <p style="font-size: 1.1rem; max-width: 800px; color: var(--v4-text);">Building high-performance engineering cultures through autonomy, reliability, and growth.</p>
  </div>

  <div class="leadership-grid">
    <div>
      <h3 style="margin-bottom: 1.5rem;">Core Principles</h3>
      {% for item in site.data.portfolio_v4.leadership.philosophy %}
      <p style="margin-bottom: 1.5rem; font-size: 1.05rem;">{{ item }}</p>
      {% endfor %}
    </div>
    
    <div>
      <div style="background: var(--v4-bg-alt); padding: 2rem; border-radius: 8px;">
        <h3 style="margin-bottom: 1.5rem;">Key Metrics</h3>
        {% for metric in site.data.portfolio_v4.leadership.metrics %}
        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--v4-text); margin-bottom: 0.5rem;">{{ metric.label }}</h4>
          <p style="font-size: 1.25rem; font-weight: 600; color: var(--v4-heading);">{{ metric.value }}</p>
        </div>
        {% endfor %}
      </div>
    </div>
  </div>

  <div style="margin-top: 4rem;">
    <h2>Mentorship & Speaking</h2>
    <p style="margin-bottom: 2rem;">I actively mentor senior engineers and speak at industry conferences on topics ranging from SRE culture to cloud cost optimization.</p>
    <div class="leadership-grid">
      <div class="cs-card">
        <h4>Mentorship Framework</h4>
        <p>Implemented structured career ladders and "Tour of Duty" rotation programs to accelerate engineer growth and prevent stagnation.</p>
      </div>
      <div class="cs-card">
        <h4>Incident Command Training</h4>
        <p>Created internal workshops to train engineers on effective incident management, reducing panic and improving MTTR.</p>
      </div>
    </div>
  </div>
</div>
