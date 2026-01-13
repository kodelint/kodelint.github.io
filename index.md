---
title: Home
layout: page
---

<div class="intro-grid">
  <div class="intro-content">
    <div class="status-badge">
      <span class="status-dot"></span> System Status: <strong>Caffeinated & Dangerous</strong>
    </div>
    
    <h1 class="hero-title">I'm Satyajit Roy. <br> <span class="highlight">I break things professionally.</span></h1>
    
    <p class="hero-bio">
      Director of Engineering by day, distributed systems apologist by night. 
      I have 20+ years of experience in SRE and DevOps, which means I've seen every error code known to man and invented a few new ones.
    </p>

    <div class="action-buttons">
      <a href="/blogs" class="btn-retro">
        Read the Logs <span class="btn-icon">→</span>
      </a>
      <a href="/projects" class="btn-retro secondary">
        See the Damage <span class="btn-icon">⚡</span>
      </a>
    </div>
  </div>

  <div class="intro-visual">
    <div class="profile-card-retro">
      <div class="card-header-bar">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="header-title">sroy_v2.0.exe</span>
      </div>
      <div class="card-image-wrapper">
        <img src="/assets/png/pic2.png" alt="Satyajit Roy" class="retro-profile-img">
      </div>
      <div class="card-stats">
        <div class="stat-row">
          <span class="stat-label">CLASS:</span> <span class="stat-val">Architect</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">STR:</span> <span class="stat-val">Infrastructure</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">WEAKNESS:</span> <span class="stat-val">DNS (It's always DNS)</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="spacer-large"></div>

<div class="section-retro">
  <h2 class="section-header-retro">// THE TOOLKIT (A.K.A. "Why I Drink")</h2>
  
  <div class="tech-grid-retro">
    <div class="tech-item">
      <span class="tech-icon">🦀</span>
      <h3>Rust</h3>
      <p>Because I enjoy the compiler yelling at me for my own good.</p>
    </div>
    <div class="tech-item">
      <span class="tech-icon">🐳</span>
      <h3>Kubernetes</h3>
      <p>Converting money into YAML configuration since 2015.</p>
    </div>
    <div class="tech-item">
      <span class="tech-icon">🐹</span>
      <h3>Golang</h3>
      <p>Simple, fast, and I don't have to explain monads to anyone.</p>
    </div>
    <div class="tech-item">
      <span class="tech-icon">☁️</span>
      <h3>AWS/Azure</h3>
      <p>Building castles in someone else's sky computer.</p>
    </div>
  </div>
</div>

<div class="spacer-large"></div>

<div class="section-retro">
  <div class="flex-between">
    <h2 class="section-header-retro">// LATEST RANTS & REFLECTIONS</h2>
    <a href="/blogs" class="retro-link">View Archive_</a>
  </div>

  <div class="latest-posts-retro">
    {% for post in site.posts limit:3 %}
    <a href="{{ post.url }}" class="post-row-retro">
      <div class="post-date-retro">{{ post.date | date: "%Y-%m-%d" }}</div>
      <div class="post-info-retro">
        <h3 class="post-title-retro">{{ post.title }}</h3>
        <span class="post-tag-retro">
          {% if post.caffeine %}☕ {{ post.caffeine }} cups{% else %}☕ Normal{% endif %}
        </span>
      </div>
      <div class="post-arrow">➜</div>
    </a>
    {% endfor %}
  </div>
</div>
