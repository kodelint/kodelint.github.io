---
layout: portfolio
title: Home
description: Engineering leader specializing in hyperscale AI/ML infrastructure, SRE, and cloud cost optimization.
---

<section class="p-hero">
  <div class="p-container">
    <h1 class="p-name">{{ site.data.portfolio.home.name }}</h1>
    <p class="p-role">{{ site.data.portfolio.home.role }}</p>
    <h2 class="p-subhead">{{ site.data.portfolio.home.subhead }}</h2>
    
    <div class="p-cta-group">
      <a href="{{ "/portfolio/case-studies/" | relative_url }}" class="p-btn p-btn-primary">View Case Studies</a>
      <a href="{{ "/portfolio/resume/" | relative_url }}" class="p-btn p-btn-outline">Download Resume</a>
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
      <a href="{{ "/portfolio/case-studies/" | relative_url }}" style="font-size: 0.9rem; font-weight: 500;">View All &rarr;</a>
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
        <a href="{{ "/portfolio/case-studies/" | relative_url }}#{{ case.id }}" class="p-btn p-btn-outline" style="font-size: 0.8rem; padding: 0.4rem 1rem;">Read Study</a>
      </div>
      {% endfor %}
    </div>
    
    <div style="text-align: center; margin-top: 3rem;">
      <a href="{{ "/portfolio/case-studies/" | relative_url }}" class="p-btn p-btn-primary">View Full Case Studies</a>
    </div>
  </div>
</section>

<section class="p-section">
  <div class="p-container">
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2rem;">
      <h3>Open Source Projects</h3>
      <a href="{{ "/portfolio/oss/" | relative_url }}" style="font-size: 0.9rem; font-weight: 500;">View All &rarr;</a>
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
      <a href="{{ "/portfolio/oss/" | relative_url }}" class="p-btn p-btn-primary">View All Open Source</a>
    </div>
  </div>
</section>

<section class="p-section">
  <div class="p-container">
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2rem;">
      <h3>Featured Writing</h3>
      <a href="{{ "/portfolio/writing/" | relative_url }}" style="font-size: 0.9rem; font-weight: 500;">View All &rarr;</a>
    </div>
    
    <div class="p-grid-2">
      {% for post in site.data.portfolio.writing limit:4 %}
      <div class="p-card" style="display: flex; flex-direction: column;">
        <span class="cs-badge" style="width: fit-content; margin-bottom: 1rem; background: var(--color-accent); color: white;">{{ post.type }}</span>
        <h4 class="p-card-title">{{ post.title }}</h4>
        <p style="margin-bottom: 1.5rem; flex-grow: 1; font-size: 0.95rem; color: var(--color-text);">{{ post.summary }}</p>
        <a href="{{ post.link | relative_url }}" class="p-btn p-btn-outline" style="text-align: center; font-size: 0.85rem;">Read Article &rarr;</a>
      </div>
      {% endfor %}
    </div>
    
    <div style="text-align: center; margin-top: 3rem;">
      <a href="{{ "/portfolio/writing/" | relative_url }}" class="p-btn p-btn-primary">View Full Writing Archive</a>
    </div>
  </div>
</section>

<section class="p-section" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white;">
  <div class="p-container">
    <h3 style="color: #38bdf8; margin-bottom: 3rem; text-align: center;">Why Work With Me</h3>
    
    <div class="p-grid-2" style="margin-bottom: 4rem; gap: 4rem;">
      <ul style="list-style: none; padding: 0; font-size: 1.15rem; line-height: 1.8;">
        {% for point in site.data.portfolio.home.why_work limit:3 %}
        <li style="margin-bottom: 1.5rem; position: relative; padding-left: 2.5rem;">
          <span style="position: absolute; left: 0; color: #38bdf8; font-weight: bold; font-size: 1.2rem;">✓</span>
          {{ point }}
        </li>
        {% endfor %}
      </ul>
      <ul style="list-style: none; padding: 0; font-size: 1.15rem; line-height: 1.8;">
        {% for point in site.data.portfolio.home.why_work offset:3 %}
        <li style="margin-bottom: 1.5rem; position: relative; padding-left: 2.5rem;">
          <span style="position: absolute; left: 0; color: #38bdf8; font-weight: bold; font-size: 1.2rem;">✓</span>
          {{ point }}
        </li>
        {% endfor %}
      </ul>
    </div>

    <div style="text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 3rem;">
      <blockquote style="font-size: 1.8rem; font-family: var(--font-serif); font-style: italic; line-height: 1.4; opacity: 0.95; max-width: 800px; margin: 0 auto; color: #f8fafc;">
        "I specialize in turning technical risk into business value by building resilient, high-scale engineering organizations."
      </blockquote>
    </div>
  </div>
</section>
