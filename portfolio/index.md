---
layout: portfolio
title: Home
permalink: /portfolio/
description: Engineering leader specializing in hyperscale AI/ML infrastructure, SRE, and cloud cost optimization.
---

<section class="p-hero">
  <div class="p-container">
    <h1 class="p-headline">{{ site.data.portfolio.home.headline }}</h1>
    <h2 class="p-subhead">{{ site.data.portfolio.home.subhead }}</h2>
    
    <div class="p-cta-group">
      <a href="/portfolio/case-studies/" class="p-btn p-btn-primary">View Case Studies</a>
      <a href="/portfolio/resume/" class="p-btn p-btn-outline">Download Resume</a>
    </div>

    <div class="p-metrics-strip">
      {% for metric in site.data.portfolio.home.metrics %}
      <span>{{ metric }}</span>
      {% endfor %}
    </div>
  </div>
</section>

<section class="p-section">
  <div class="p-container">
    <h3 style="margin-bottom: 2rem;">Featured Case Studies</h3>
    <div class="p-grid-3">
      {% for case in site.data.portfolio.case_studies %}
      <div class="p-card">
        <h4 class="p-card-title">{{ case.title }}</h4>
        <span class="p-card-meta">{{ case.outcome }}</span>
        <ul style="padding-left: 1.2rem; margin-bottom: 1.5rem; font-size: 0.9rem;">
          {% for point in case.impact limit:2 %}
          <li style="margin-bottom: 0.5rem;">{{ point }}</li>
          {% endfor %}
        </ul>
        <a href="/portfolio/case-studies/#{{ case.id }}" class="p-btn p-btn-outline" style="font-size: 0.8rem; padding: 0.4rem 1rem;">Read Full Study</a>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<section class="p-section" style="background-color: var(--color-bg-alt);">
  <div class="p-container">
    <div class="p-grid-2" style="align-items: center;">
      <div>
        <h3>Why Work With Me</h3>
        <ul style="list-style: none; padding: 0; font-size: 1.1rem; line-height: 1.8;">
          {% for point in site.data.portfolio.home.why_work %}
          <li style="margin-bottom: 1rem; position: relative; padding-left: 1.5rem;">
            <span style="position: absolute; left: 0; color: var(--color-accent); font-weight: bold;">✓</span>
            {{ point }}
          </li>
          {% endfor %}
        </ul>
      </div>
      <div>
        <!-- Optional visual or quote -->
        <blockquote style="font-size: 1.2rem; font-style: italic; border-left: 4px solid var(--color-accent); padding-left: 1.5rem;">
          "Reliability is a feature, not an afterthought."
        </blockquote>
      </div>
    </div>
  </div>
</section>
