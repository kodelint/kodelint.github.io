---
layout: portfolio
title: Writing & Thoughts
permalink: /portfolio/writing/
description: Curated selection of technical writing on distributed systems, SRE, and architecture.
---

<div class="p-container">
  <div class="p-section" style="border-bottom: none; padding-bottom: 2rem;">
    <h1>Writing & Thoughts</h1>
    <p class="p-subhead">Deep dives into distributed systems, SRE culture, and architectural patterns.</p>
  </div>

  <div class="p-section">
    <div class="p-grid-2">
      {% for post in site.data.portfolio.writing %}
      <div class="p-card" style="display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
          <span class="cs-badge" style="margin-bottom: 0; background: var(--color-accent); color: white;">{{ post.type }}</span>
        </div>
        <h3 class="p-card-title" style="margin-bottom: 1rem; line-height: 1.4;">
          <a href="{{ post.link }}" style="color: var(--color-heading); font-weight: 800;">{{ post.title }}</a>
        </h3>
        <p style="margin-bottom: 1.5rem; flex-grow: 1; font-size: 0.95rem; color: var(--color-text);">{{ post.summary }}</p>
        
        <div style="border-top: 1px dashed var(--color-border); padding-top: 1rem; margin-top: auto;">
          <div style="font-size: 0.85rem; color: var(--color-text); margin-bottom: 1rem;">
            <strong style="color: var(--color-heading);">Why it matters:</strong> {{ post.why }}
          </div>
          <a href="{{ post.link }}" class="p-btn p-btn-outline" style="width: 100%; text-align: center; font-size: 0.85rem;">Read Article &rarr;</a>
        </div>
      </div>
      {% endfor %}
    </div>
    
    <div style="margin-top: 5rem; text-align: center; background: var(--color-bg-alt); padding: 3rem; border-radius: 12px;">
      <h3 style="margin-bottom: 1rem;">Looking for more?</h3>
      <p style="margin-bottom: 2rem; color: var(--color-text);">I've written dozens of technical articles over the years. You can browse the full history in the main blog archive.</p>
      <a href="/blogs" class="p-btn p-btn-primary">Explore Full Blog Archive</a>
    </div>
  </div>
</div>