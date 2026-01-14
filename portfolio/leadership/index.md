---
layout: portfolio
title: Leadership
description: Building high-performance engineering cultures.
---

<div class="p-container">
  <div class="p-section" style="border-bottom: none; padding-bottom: 2rem;">
    <h1>Leadership Philosophy</h1>
    <p class="p-subhead">Building high-performance engineering cultures through autonomy, reliability, and growth.</p>
  </div>

  <div class="lead-mission-card">
    <div style="max-width: 700px;">
      <span class="cs-label" style="color: #38bdf8; margin-bottom: 1.5rem;">Core Mission</span>
      <h3 style="font-size: 1.8rem; margin-bottom: 1.5rem;">Removing technical and organizational friction to clear the path for value delivery.</h3>
      <p style="font-size: 1.15rem; line-height: 1.8; opacity: 0.9;">{{ site.data.portfolio.leadership.philosophy.mission }}</p>
    </div>
  </div>

  <div class="p-section">
    <div class="p-grid-2" style="align-items: stretch; gap: 4rem;">
      <div class="lead-philosophy" style="background: white; border: 1px solid var(--color-border); padding: 2.5rem; border-radius: 12px; height: 100%;">
        <h3 style="border-left: 4px solid var(--color-accent); padding-left: 1rem; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2rem;">Philosophy & Approach</h3>
        
        <h4 style="font-weight: 700; color: var(--color-heading); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.75rem;">
          <i class="fas fa-users" style="color: #10b981; font-size: 0.9rem;"></i>
          Hiring & Growth
        </h4>
        <p style="margin-bottom: 2rem;">{{ site.data.portfolio.leadership.philosophy.hiring }}</p>
        
        <h4 style="font-weight: 700; color: var(--color-heading); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.75rem;">
          <i class="fas fa-bolt" style="color: #3b82f6; font-size: 0.9rem;"></i>
          Velocity vs Reliability
        </h4>
        <p style="margin-bottom: 2rem;">{{ site.data.portfolio.leadership.philosophy.balance }}</p>

        <h4 style="font-weight: 700; color: var(--color-heading); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.75rem;">
          <i class="fas fa-check-circle" style="color: #f59e0b; font-size: 0.9rem;"></i>
          Operational Excellence
        </h4>
        <p style="margin-bottom: 0;">{{ site.data.portfolio.leadership.philosophy.excellence }}</p>
      </div>
      
      <div class="p-sticky">
        <div style="background: #f8fafc; border: 1px solid var(--color-border); padding: 2.5rem; border-radius: 12px; height: 100%; box-shadow: inset 0 0 20px rgba(0,0,0,0.02);">
          <h3 style="margin-bottom: 2rem; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-accent);">Org Health Snapshots</h3>
          {% for metric in site.data.portfolio.leadership.metrics %}
          <div class="lead-stat-card">
            <div class="lead-stat-val">{{ metric.value }}</div>
            <div class="lead-stat-label">{{ metric.label }}</div>
          </div>
          {% endfor %}
        </div>
      </div>
    </div>
  </div>

  <div class="p-section" style="border-bottom: none;">
    <h3 style="margin-bottom: 2.5rem;">Strategic Programs & Frameworks</h3>
    <div class="p-grid-3">
      {% for prog in site.data.portfolio.leadership.programs %}
      <div class="p-card lead-prog-card">
        <h4 class="p-card-title" style="color: var(--color-accent);">{{ prog.title }}</h4>
        <p style="font-size: 0.95rem; line-height: 1.7;">{{ prog.desc }}</p>
      </div>
      {% endfor %}
    </div>
  </div>
</div>