---
layout: portfolio
title: Home
description: Engineering leader specializing in hyperscale AI/ML infrastructure, SRE, and cloud cost optimization.
---

<!-- Hero Section -->
<section class="p-hero">
  <div class="p-container">
    <h1 class="p-name">{{ site.data.portfolio.home.name }}</h1>
    <div class="p-role">{{ site.data.portfolio.home.role }}</div>
    <p class="p-subhead">{{ site.data.portfolio.home.subhead }}</p>
    
    <div class="p-cta-group">
      <a href="{{ "/portfolio/case-studies/" | relative_url }}" class="p-btn p-btn-primary">View Case Studies</a>
      <a href="{{ "/portfolio/resume/" | relative_url }}" class="p-btn p-btn-outline">Download Resume</a>
    </div>

    <div class="p-metrics-strip">
      {% for metric in site.data.portfolio.home.metrics %}
      <div class="p-metric-item">
        <span class="p-metric-value">{{ metric.value }}</span>
        <span class="p-metric-label">{{ metric.title }}</span>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<!-- Case Studies Section -->
<section class="p-section">
  <div class="p-container">
    <div class="section-header">
      <h2 class="section-title">Selected Case Studies</h2>
      <a href="{{ "/portfolio/case-studies/" | relative_url }}" class="section-link">View All Work &rarr;</a>
    </div>
    
    <div class="p-grid-2">
      {% for case in site.data.portfolio.case_studies limit:4 %}
      <div class="p-card">
        <div class="p-card-role">{{ case.role | truncate: 40 }}</div>
        <h3 class="p-card-title">{{ case.title }}</h3>
        
        <div class="p-card-outcome">
          <span class="p-card-outcome-value">{{ case.outcome }}</span>
        </div>
        
        <p class="p-card-summary">{{ case.problem }}</p>
        
        <div class="p-card-footer">
          <div class="p-tags">
            {% for tag in case.tags limit:2 %}
            <span class="p-tag">{{ tag }}</span>
            {% endfor %}
          </div>
          <a href="{{ "/portfolio/case-studies/" | relative_url }}#{{ case.id }}" style="color: var(--color-accent); font-weight: 600; font-size: 0.9rem;">Read Case Study &rarr;</a>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<!-- Why Work With Me Section -->
<section class="p-why-section">
  <div class="p-container">
    <div class="p-why-grid">
      <div>
        <h2 style="color: white; margin-bottom: 2rem;">Why Work With Me</h2>
        <ul class="p-why-list">
          {% for point in site.data.portfolio.home.why_work %}
          <li class="p-why-item">
            <i class="fas fa-check p-why-icon"></i>
            <span>{{ point }}</span>
          </li>
          {% endfor %}
        </ul>
        <div style="margin-top: 3rem;">
          <a href="{{ "/portfolio/contact/" | relative_url }}" class="p-btn p-btn-primary" style="background: white; color: var(--color-bg-dark); border-color: white;">Let's Connect</a>
        </div>
      </div>
      
      <div class="text-center">
         <blockquote class="p-why-quote">
          "I specialize in turning technical risk into business value by building resilient, high-scale engineering organizations."
        </blockquote>
      </div>
    </div>
  </div>
</section>

<!-- Featured Writing & OSS -->
<section class="p-section p-section-alt">
  <div class="p-container">
    <div class="section-header">
      <h2 class="section-title">Writing & Open Source</h2>
      <a href="{{ "/portfolio/writing/" | relative_url }}" class="section-link">View All Writing &rarr;</a>
    </div>
    
    <div class="p-grid-3">
      <!-- Featured Writing -->
      {% for post in site.data.portfolio.writing limit:2 %}
      <div class="p-card" style="border-top: 4px solid var(--color-accent);">
        <div class="p-card-role" style="color: var(--color-accent);">{{ post.type }}</div>
        <h4 class="p-card-title" style="font-size: 1.25rem;">{{ post.title }}</h4>
        <p class="p-card-summary" style="font-size: 0.95rem;">{{ post.summary }}</p>
        <div class="p-card-footer">
          <a href="{{ post.link | relative_url }}" style="font-weight: 600; font-size: 0.9rem;">Read Article &rarr;</a>
        </div>
      </div>
      {% endfor %}

      <!-- Featured OSS -->
       {% for project in site.data.portfolio.oss limit:1 %}
      <div class="p-card" style="border-top: 4px solid #10b981;">
        <div class="p-card-role" style="color: #10b981;">Open Source</div>
        <h4 class="p-card-title" style="font-size: 1.25rem;">{{ project.title }}</h4>
        <p class="p-card-summary" style="font-size: 0.95rem;">{{ project.problem }}</p>
         <div class="p-card-outcome" style="margin-top: 1rem; margin-bottom: 0;">
          <span class="p-card-outcome-value" style="font-size: 1rem; color: #10b981;">{{ project.impact }}</span>
        </div>
        <div class="p-card-footer">
          <a href="{{ project.repo }}" target="_blank" style="font-weight: 600; font-size: 0.9rem;">View Repo &rarr;</a>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>