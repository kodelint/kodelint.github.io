---
layout: portfolio
title: Executive Portfolio
description: Engineering leader specializing in hyperscale AI/ML infrastructure, SRE, and cloud cost optimization.
---

<!-- Hero Section -->
<section class="p-hero" style="padding-bottom: 5rem;">
  <div class="p-container">
    <div class="hero-grid" style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 5rem; align-items: left;">
      <!-- Left Column: Primary Content -->
      <div class="hero-content">
        <h1 class="p-name" style="margin-top: 0; margin-bottom: 0.5rem;">Satyajit Roy</h1>
        <h2 class="p-role-subtitle" style="margin-bottom: 1rem;">AI &amp; Cloud Infrastructure Executive | GPU Platforms, Kubernetes at Scale, SRE</h2>
        <p class="p-subhead" style="margin-bottom: 1.5rem;">I build the infrastructure that AI and search products run on delivering reliability, efficiency, and clarity at internet scale.</p>
        <div class="p-cta-group">
          <a href="{{ "/portfolio/case-studies/" | relative_url }}" class="p-btn p-btn-primary">View Case Studies</a>
          <a href="{{ "/portfolio/resume/" | relative_url }}" class="p-btn p-btn-outline">View Resume</a>
        </div>
      </div>
      <!-- Right Column: Visual -->
      <div class="hero-visual">
        <img src="{{ "/assets/uploads/Portfolio.png" | relative_url }}" alt="Satyajit Roy" class="hero-image">
      </div>
    </div>
  </div>
</section>

<!-- Impact Snapshot Section -->
<section class="p-section-impact reveal" style="padding-top: 0; margin-top: 0;">
  <div class="p-container">
    <div class="impact-grid">
      {% for metric in site.data.portfolio.home.metrics %}
      <div class="impact-card">
        <span class="impact-value">{{ metric.value }}</span>
        <span class="impact-caption">{{ metric.title }}</span>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<!-- Strategic Expertise Section -->
<section class="p-section reveal" style="background: var(--color-bg-alt); padding: 2rem 0;">
  <div class="p-container">
    <div class="section-header" style="border-bottom: none; margin-bottom: 3rem; text-align: center; display: block;">
      <h2 class="section-title" style="margin-bottom: 0.5rem;">Strategic Expertise</h2>
      <span style="color: var(--color-text-light); font-weight: 500;">What I bring to engineering organizations</span>
    </div>
    <div class="p-grid-2">
      <ul style="list-style: none; padding: 0;">
        {% for item in site.data.portfolio.home.why_work limit:3 %}
        <li style="margin-bottom: 1.5rem; display: flex; align-items: start; gap: 1rem; font-size: 1.1rem; font-weight: 500; color: var(--color-heading);">
          <i class="fas fa-check-circle" style="color: var(--color-accent); margin-top: 0.35rem; flex-shrink: 0;"></i>
          <span>{{ item }}</span>
        </li>
        {% endfor %}
      </ul>
      <ul style="list-style: none; padding: 0;">
        {% for item in site.data.portfolio.home.why_work offset:3 %}
        <li style="margin-bottom: 1.5rem; display: flex; align-items: start; gap: 1rem; font-size: 1.1rem; font-weight: 500; color: var(--color-heading);">
          <i class="fas fa-check-circle" style="color: var(--color-accent); margin-top: 0.35rem; flex-shrink: 0;"></i>
          <span>{{ item }}</span>
        </li>
        {% endfor %}
      </ul>
    </div>
  </div>
</section>

<!-- Case Studies Section -->
<section class="p-section reveal" style="padding-top: 6rem; padding-bottom: 6rem;">
  <div class="p-container">
    <div class="section-header">
      <h2 class="section-title">Featured Case Studies</h2>
      <a href="{{ "/portfolio/case-studies/" | relative_url }}" class="section-link">View All Work &rarr;</a>
    </div>
    <div class="cs-stack">
      {% for case in site.data.portfolio.case_studies limit:6 %}
      <div class="cs-card">
        <!-- Top Row -->
        <div class="cs-card-header">
          <h3 class="cs-card-title">{{ case.title }}</h3>
          <span class="cs-card-org">{{ case.role }}</span>
        </div>
        <!-- Middle Row -->
        <div class="cs-card-body">
          <div class="cs-card-summary">
            <p class="cs-card-context">{{ case.context }}</p>
            <p>{{ case.problem }}</p>
          </div>
          <div class="cs-card-outcomes">
            <span class="cs-label">Impact & Metrics</span>
            <ul>
              <li><strong style="color: var(--color-accent); font-size: 1.1rem;">{{ case.outcome }}</strong></li>
              {% for point in case.impact limit:2 %}
              <li>{{ point }}</li>
              {% endfor %}
            </ul>
          </div>
        </div>
        <!-- Bottom Row -->
        <div class="cs-card-footer">
          <div class="p-tags">
            {% for tag in case.tags limit:3 %}
            <span class="p-tag">{{ tag }}</span>
            {% endfor %}
          </div>
          <a href="{{ "/portfolio/case-studies/" | relative_url }}#{{ case.id }}" class="cs-card-cta">Read Full Case Study &rarr;</a>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<!-- How I Work Section -->
<section class="p-section-values reveal">
  <div class="p-container">
    <div class="section-header" style="border-bottom: none; margin-bottom: 3rem;">
      <h2 class="section-title" style="color: var(--color-heading);">How I Work</h2>
      <span style="color: var(--color-text-light); font-weight: 500;">Leadership & Philosophy</span>
    </div>
    <div class="values-grid">
      <div class="value-card">
        <i class="fas fa-network-wired value-icon"></i>
        <h3 class="value-title">Systems Thinking</h3>
        <p class="value-desc">I approach engineering organizations as <strong>distributed systems</strong>—optimizing for <strong>flow</strong>, <strong>feedback loops</strong>, and <strong>resilience</strong> at scale.</p>
      </div>
      <div class="value-card">
        <i class="fas fa-users-cog value-icon"></i>
        <h3 class="value-title">Empowered Teams</h3>
        <p class="value-desc">I build <strong>high-trust cultures</strong> where engineers <strong>own their outcomes</strong>, with clear paths for <strong>growth</strong> and <strong>autonomy</strong>.</p>
      </div>
      <div class="value-card">
        <i class="fas fa-shield-alt value-icon"></i>
        <h3 class="value-title">Operational Excellence</h3>
        <p class="value-desc"><strong>Reliability is a feature</strong>. I champion <strong>SRE principles</strong> to shift from reactive firefighting to <strong>proactive stability</strong>.</p>
      </div>
    </div>
    <div class="text-center" style="margin-top: 3rem;">
        <a href="{{ "/portfolio/contact/" | relative_url }}" class="p-btn p-btn-primary">Work With Me</a>
    </div>
  </div>
</section>

<!-- Open Source & Writing Section -->
<section class="p-section p-section-alt reveal">
  <div class="p-container">
    <div class="p-grid-2">
      <!-- Column A: Open Source -->
      <div class="oss-column">
        <div class="section-header" style="border-bottom: none; margin-bottom: 2rem;">
          <h2 class="section-title"><i class="fab fa-github" style="margin-right: 0.5rem;"></i> Open Source</h2>
          <a href="{{ "/portfolio/oss/" | relative_url }}" class="section-link">View All &rarr;</a>
        </div>
        <div class="oss-stack">
          {% for project in site.data.portfolio.oss limit:3 %}
          <div class="content-card">
            <h4 class="content-title">{{ project.title }}</h4>
            <p class="content-desc">{{ project.problem }}</p>
            <a href="{{ project.repo }}" target="_blank" class="content-link"><i class="fab fa-github"></i> View Repo</a>
          </div>
          {% endfor %}
        </div>
      </div>
      <!-- Column B: Writing -->
      <div class="writing-column">
        <div class="section-header" style="border-bottom: none; margin-bottom: 2rem;">
          <h2 class="section-title"><i class="fas fa-pen-nib" style="margin-right: 0.5rem;"></i> Writing</h2>
          <a href="{{ "/portfolio/writing/" | relative_url }}" class="section-link">View All &rarr;</a>
        </div>
        <div class="writing-stack">
          {% for post in site.data.portfolio.writing limit:3 %}
          <div class="content-card">
            <h4 class="content-title">{{ post.title }}</h4>
            <p class="content-desc">{{ post.summary }}</p>
            <div class="content-footer">
              <span class="content-tag">{{ post.type }}</span>
              <a href="{{ post.link | relative_url }}" class="content-link">Read Article &rarr;</a>
            </div>
          </div>
          {% endfor %}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Final CTA Section -->
<section class="p-section-cta">
  <div class="p-container">
    <div class="cta-content">
      <h2 class="cta-headline">Interested in platform leadership, architecture reviews, or collaboration?</h2>
      <div class="cta-buttons">
        <a href="{{ "/portfolio/contact/" | relative_url }}" class="p-btn p-btn-primary">Contact Me</a>
        <a href="https://www.linkedin.com/in/satyajitroychoudhury/" target="_blank" class="p-btn p-btn-outline">LinkedIn</a>
      </div>
    </div>
  </div>
</section>