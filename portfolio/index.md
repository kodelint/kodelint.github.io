---
layout: portfolio
title: Home
permalink: /portfolio/
description: Engineering leader specializing in hyperscale AI/ML infrastructure, SRE, and cloud cost optimization.
---

<section class="p-hero">
  <div class="p-container">
    <h1 class="p-name">{{ site.data.portfolio.home.name }}</h1>
    <p class="p-role">{{ site.data.portfolio.home.role }}</p>
    <h2 class="p-subhead">{{ site.data.portfolio.home.subhead }}</h2>
    
    <div class="p-cta-group">
      <a href="/portfolio/case-studies/" class="p-btn p-btn-primary">View Case Studies</a>
      <a href="/portfolio/resume/" class="p-btn p-btn-outline">Download Resume</a>
    </div>

    <div class="p-metrics-strip">
      {% for metric in site.data.portfolio.home.metrics %}
      <div class="p-metric-card">
        <span class="p-metric-value">{{ metric.value }}</span>
        <span class="p-metric-title">{{ metric.title }}</span>
      </div>
      {% endfor %}
    </div>

  </div>
</section>

<section class="p-section">
  <div class="p-container">
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2rem;">
      <h3>Selected Case Studies</h3>
      <a href="/portfolio/case-studies/" style="font-size: 0.9rem; font-weight: 500;">View All &rarr;</a>
    </div>
    
    <div class="p-grid-2">
      {% for case in site.data.portfolio.case_studies limit:4 %}
      <div class="p-card">
        <h4 class="p-card-title">{{ case.title }}</h4>
        <span class="p-card-meta">{{ case.outcome }}</span>
        <p style="margin-bottom: 1rem; color: var(--color-text); font-size: 0.95rem;">{{ case.problem }}</p>
        <ul style="padding-left: 1.2rem; margin-bottom: 1.5rem; font-size: 0.9rem;">
          {% for point in case.impact limit:2 %}
          <li style="margin-bottom: 0.5rem;">{{ point }}</li>
          {% endfor %}
        </ul>
        <a href="/portfolio/case-studies/#{{ case.id }}" class="p-btn p-btn-outline" style="font-size: 0.8rem; padding: 0.4rem 1rem;">Read Study</a>
      </div>
      {% endfor %}
    </div>
    
    <div style="text-align: center; margin-top: 3rem;">
      <a href="/portfolio/case-studies/" class="p-btn p-btn-primary">View Full Case Studies</a>
    </div>
  </div>
</section>

<section class="p-section">
  <div class="p-container">
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2rem;">
      <h3>Open Source Projects</h3>
      <a href="/portfolio/oss/" style="font-size: 0.9rem; font-weight: 500;">View All &rarr;</a>
    </div>
    
    <div class="p-grid-2">
      {% for project in site.data.portfolio.oss limit:4 %}
      <div class="p-card">
        <h4 class="p-card-title">{{ project.title }}</h4>
        <p style="margin-bottom: 1rem; color: var(--color-text); font-size: 0.95rem;">{{ project.problem }}</p>
        <p style="font-weight: 600; color: var(--color-accent); margin-bottom: 1.5rem;">Impact: {{ project.impact }}</p>
        <a href="{{ project.repo }}" target="_blank" class="p-btn p-btn-outline" style="font-size: 0.8rem; padding: 0.4rem 1rem;">View Repo ↗</a>
      </div>
      {% endfor %}
    </div>
    
    <div style="text-align: center; margin-top: 3rem;">
      <a href="/portfolio/oss/" class="p-btn p-btn-primary">View All Open Source</a>
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
        <blockquote style="font-size: 1.2rem; font-style: italic; border-left: 4px solid var(--color-accent); padding-left: 1.5rem;">
          "Reliability is a feature, not an afterthought."
        </blockquote>
      </div>
    </div>
  </div>
</section>
