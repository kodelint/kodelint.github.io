---
title: Home
layout: page
---

<div class="hero-container">
  <div class="hero-profile">
    <div class="profile-image-wrapper">
      <img src="/assets/png/pic2.png" alt="Satyajit Roy" class="profile-image">
    </div>
  </div>
  
  <div class="hero-content">
    <h1 class="hero-title">Satyajit Roy</h1>
    <h2 class="hero-subtitle">Director of Engineering & Systems Architect</h2>
    <p class="hero-bio">
      Leading high-performance teams to build resilient, distributed systems. 
      Bridging the gap between complex infrastructure and business value with 20+ years of experience in SRE, DevOps, and Platform Engineering.
    </p>
    
    <div class="hero-actions">
      <a href="/blogs" class="button primary">Read the Blog</a>
      <a href="/projects" class="button secondary">View Projects</a>
    </div>
  </div>
</div>

<div class="section-divider"></div>

<div class="home-section">
  <h3 class="section-title">Core Competencies</h3>
  <div class="competencies-grid">
    <div class="competency-card">
      <div class="icon">☁️</div>
      <h4>Cloud Architecture</h4>
      <p>Designing scalable, cost-effective infrastructure on AWS & Azure.</p>
    </div>
    <div class="competency-card">
      <div class="icon">⚙️</div>
      <h4>Platform Engineering</h4>
      <p>Building internal developer platforms (IDPs) that accelerate delivery.</p>
    </div>
    <div class="competency-card">
      <div class="icon">🛡️</div>
      <h4>SRE & Reliability</h4>
      <p>Implementing observability, SLOs, and incident management protocols.</p>
    </div>
    <div class="competency-card">
      <div class="icon">🤝</div>
      <h4>Technical Leadership</h4>
      <p>Mentoring engineers and aligning technical strategy with business goals.</p>
    </div>
  </div>
</div>

<div class="section-divider"></div>

<div class="home-section">
  <div class="section-header-flex">
    <h3 class="section-title">Latest Insights</h3>
    <a href="/blogs" class="text-link">View all posts →</a>
  </div>
  
  <div class="latest-posts-grid">
    {% for post in site.posts limit:3 %}
    <div class="post-card-minimal">
      <div class="post-meta">{{ post.date | date: "%B %d, %Y" }}</div>
      <a href="{{ post.url }}" class="post-link">
        <h4 class="post-title">{{ post.title }}</h4>
      </a>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
    </div>
    {% endfor %}
  </div>
</div>