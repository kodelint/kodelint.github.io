---
layout: portfolio_v4
title: Satyajit Roy - Director of Engineering & SRE
permalink: /portfolio/
description: Engineering leader specializing in hyperscale AI/ML infrastructure, SRE, and cloud cost optimization.
---

<section class="hero-section">
  <div class="container">
    <h1 class="hero-headline">Director of Engineering & SRE</h1>
    <h2 class="hero-subhead">I build reliable, cost-efficient cloud platforms and scale engineering teams to deliver mission-critical AI and SaaS systems.</h2>
    
    <div style="display: flex; gap: 1rem;">
      <a href="/portfolio/case-studies/" class="btn btn-primary">View Case Studies</a>
      <a href="/portfolio/resume/" class="btn btn-outline">Download Resume</a>
    </div>

    <div class="metrics-strip">
      <span>20+ Years Exp</span>
      <span>30B Daily Requests</span>
      <span>99.95%+ Availability</span>
      <span>55+ Engineers Scaled</span>
    </div>
  </div>
</section>

<section class="section-spacer">
  <div class="container">
    <h3 style="margin-bottom: 2rem; border-bottom: 1px solid var(--v4-border); padding-bottom: 1rem;">Featured Case Studies</h3>
    
    <div class="cs-grid">
      {% for case in site.data.portfolio_v4.case_studies limit:3 %}
      <div class="cs-card">
        <h4 class="cs-title">{{ case.title }}</h4>
        <span class="cs-outcome">{{ case.impact | first }}</span>
        <ul class="cs-impact">
          <li>{{ case.impact[1] }}</li>
          <li>{{ case.impact[2] }}</li>
        </ul>
        <a href="/portfolio/case-studies/#{{ case.id }}" class="btn btn-outline" style="font-size: 0.85rem; padding: 0.4rem 1rem;">Read Case Study &rarr;</a>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<section class="section-spacer bg-alt">
  <div class="container">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
      <div>
        <h3 style="margin-bottom: 1.5rem;">Why Work With Me</h3>
        <ul style="list-style: none; padding: 0; font-size: 1.1rem; line-height: 1.8;">
          <li style="margin-bottom: 1rem;"><strong>Hyperscale Leadership:</strong> Architected systems serving tens of billions of requests for Adobe and F5.</li>
          <li style="margin-bottom: 1rem;"><strong>SRE Operating Models:</strong> Transformed reactive ops into proactive SRE cultures, reducing burnout and MTTR.</li>
          <li><strong>FinOps Mastery:</strong> Consistently delivering 20-65% cloud cost reductions through architectural efficiency.</li>
        </ul>
        <br>
        <a href="/portfolio/contact/" class="btn btn-primary">Let's Connect</a>
      </div>
      <div style="border: 1px solid var(--v4-border); background: white; padding: 2rem; border-radius: 6px;">
        <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--v4-text); margin-bottom: 1rem;">Core Stack</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <span style="background: var(--v4-bg-alt); padding: 0.3rem 0.8rem; border-radius: 4px; font-size: 0.9rem;">Kubernetes</span>
          <span style="background: var(--v4-bg-alt); padding: 0.3rem 0.8rem; border-radius: 4px; font-size: 0.9rem;">AWS/Azure/GCP</span>
          <span style="background: var(--v4-bg-alt); padding: 0.3rem 0.8rem; border-radius: 4px; font-size: 0.9rem;">Terraform</span>
          <span style="background: var(--v4-bg-alt); padding: 0.3rem 0.8rem; border-radius: 4px; font-size: 0.9rem;">Python/Go/Rust</span>
          <span style="background: var(--v4-bg-alt); padding: 0.3rem 0.8rem; border-radius: 4px; font-size: 0.9rem;">eBPF</span>
          <span style="background: var(--v4-bg-alt); padding: 0.3rem 0.8rem; border-radius: 4px; font-size: 0.9rem;">OpenTelemetry</span>
        </div>
      </div>
    </div>
  </div>
</section>
