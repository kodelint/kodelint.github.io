---
layout: portfolio_v4
title: Leadership Philosophy
permalink: /portfolio/leadership/
description: Building high-performance engineering cultures through autonomy, reliability, and growth.
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
      <p style="margin-bottom: 1.5rem; font-size: 1.05rem; line-height: 1.8;">{{ item }}</p>
      {% endfor %}
    </div>
    
    <div>
      <div style="background: var(--v4-bg-alt); padding: 2rem; border-radius: 8px; margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1.5rem;">Org Health Snapshots</h3>
        <p style="font-size: 0.9rem; margin-bottom: 1.5rem; color: var(--v4-text);">Typical outcomes after 12-18 months of leadership:</p>
        
        <!-- CSS Charts -->
        <div style="margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.3rem;">
            <span>Team Scaling</span>
            <span>7 &rarr; 55+</span>
          </div>
          <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
            <div style="width: 85%; height: 100%; background: var(--v4-accent);"></div>
          </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.3rem;">
            <span>Internal Promotion Rate</span>
            <span>30%+</span>
          </div>
          <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
            <div style="width: 30%; height: 100%; background: #10b981;"></div>
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.3rem;">
            <span>Unregretted Attrition</span>
            <span>&lt; 10%</span>
          </div>
          <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
            <div style="width: 10%; height: 100%; background: #f59e0b;"></div>
          </div>
        </div>

      </div>
      
      <div style="background: white; border: 1px solid var(--v4-border); padding: 2rem; border-radius: 8px;">
        <h3 style="margin-bottom: 1rem;">Key Metrics</h3>
        <ul style="list-style: none; padding: 0;">
           {% for metric in site.data.portfolio_v4.leadership.metrics %}
           <li style="margin-bottom: 1rem; border-bottom: 1px dashed var(--v4-border); padding-bottom: 0.5rem;">
             <span style="display: block; font-size: 0.8rem; text-transform: uppercase; color: var(--v4-text); margin-bottom: 0.2rem;">{{ metric.label }}</span>
             <span style="font-size: 1.1rem; font-weight: 600;">{{ metric.value }}</span>
           </li>
           {% endfor %}
        </ul>
      </div>

    </div>
  </div>

  <div style="margin-top: 5rem;">
    <h2 style="border-bottom: 1px solid var(--v4-border); padding-bottom: 1rem; margin-bottom: 2rem;">Strategic Programs</h2>
    <div class="cs-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
      {% for prog in site.data.portfolio_v4.leadership.programs %}
      <div class="cs-card">
        <h4 style="color: var(--v4-accent); margin-bottom: 1rem;">{{ prog.title }}</h4>
        <p>{{ prog.desc }}</p>
      </div>
      {% endfor %}
    </div>
  </div>
</div>