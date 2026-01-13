---
layout: portfolio_v4
title: Case Studies
permalink: /portfolio/case-studies/
description: Deep dives into solving complex scaling, reliability, and organizational challenges at enterprise scale.
---

<div class="container section-spacer">
  <div class="page-header">
    <h1>Engineering Case Studies</h1>
    <p style="font-size: 1.1rem; max-width: 800px; color: var(--v4-text);">Deep dives into solving complex scaling, reliability, and organizational challenges at enterprise scale.</p>
  </div>

  <div style="display: flex; flex-direction: column; gap: 6rem;">
    {% for case in site.data.portfolio_v4.case_studies %}
    <div id="{{ case.id }}" class="cs-detail-block">
      
      <div style="border-bottom: 2px solid var(--v4-border); padding-bottom: 2rem; margin-bottom: 2rem;">
        <h2 style="font-size: 2.2rem; margin-bottom: 1rem;">{{ case.title }}</h2>
        <p style="font-size: 1.25rem; line-height: 1.6; color: var(--v4-text);">{{ case.context }}</p>
      </div>
      
      <div class="cs-detail-grid">
        <div class="cs-content">
          <!-- Problem & Solution Flow -->
          <div style="background: var(--v4-bg-alt); padding: 2rem; border-radius: 6px; margin-bottom: 2rem; border-left: 4px solid var(--v4-heading);">
             <h3 style="font-size: 1.3rem; margin-top: 0;">The Challenge</h3>
             <p>{{ case.problem }}</p>
             <div style="margin-top: 1rem; font-size: 0.95rem; color: var(--v4-text);"><strong>Constraints:</strong> {{ case.constraints }}</div>
          </div>

          <h3 style="font-size: 1.4rem; border-bottom: 1px solid var(--v4-border); padding-bottom: 0.5rem; margin-bottom: 1.5rem;">Architecture & Solution</h3>
          
          {% if case.diagram_image %}
          <div style="margin-bottom: 2rem; border: 1px solid var(--v4-border); padding: 0.5rem; border-radius: 4px;">
            <img src="{{ case.diagram_image | relative_url }}" alt="Architecture Diagram" style="width: 100%; height: auto; display: block;">
            <div style="font-size: 0.8rem; text-align: center; color: var(--v4-text); padding: 0.5rem;">High-level System Architecture</div>
          </div>
          {% endif %}

          <ul style="margin-bottom: 3rem; padding-left: 1.5rem;">
            {% for item in case.solution %}
            <li style="margin-bottom: 0.8rem; font-size: 1.05rem;">{{ item }}</li>
            {% endfor %}
          </ul>

          <h3 style="font-size: 1.4rem; color: var(--v4-accent); border-bottom: 1px solid var(--v4-accent); padding-bottom: 0.5rem; margin-bottom: 1.5rem;">Measurable Impact</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
            {% for item in case.impact %}
            <div style="background: white; border: 1px solid var(--v4-border); padding: 1.5rem; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
               <div style="font-weight: 600; color: var(--v4-heading);">{{ item }}</div>
            </div>
            {% endfor %}
          </div>
          
          <h3 style="font-size: 1.3rem;">Key Lessons</h3>
          <ul style="margin-bottom: 2rem; padding-left: 1.5rem; color: var(--v4-text);">
            {% for lesson in case.lessons %}
            <li style="margin-bottom: 0.5rem; font-style: italic;">"{{ lesson }}"</li>
            {% endfor %}
          </ul>
        </div>
        
        <div class="cs-sidebar">
          <h4>My Role</h4>
          <p>{{ case.role }}</p>
          
          <h4>Tech Stack</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
            {% for tag in case.tags %}
            <span style="background: white; border: 1px solid var(--v4-border); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem;">{{ tag }}</span>
            {% endfor %}
          </div>
          
          {% if case.artifacts %}
          <h4>Artifacts</h4>
          <ul style="list-style: none; padding: 0; margin-top: 0.5rem;">
            {% for artifact in case.artifacts %}
            <li style="margin-bottom: 0.5rem;">
              <a href="{{ artifact.link }}" style="color: var(--v4-accent); text-decoration: underline;">{{ artifact.text }} ↗</a>
            </li>
            {% endfor %}
          </ul>
          {% endif %}
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
</div>