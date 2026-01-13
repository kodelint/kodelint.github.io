---
title: Home
layout: page
---

<!-- Full Width Hero Container -->
<div class="hero-container-wide">
  
  <!-- Left: Text Content -->
  <div class="hero-text-col">
    <div class="status-badge-retro">
      <span class="status-blink">●</span> SYSTEM_ONLINE
    </div>
    
    <h1 class="hero-title-wide">
      I'm Satyajit Roy.<br>
      <span class="glitch-text" data-text="I break things professionally.">I break things professionally.</span>
    </h1>
    
    <p class="hero-bio-wide">
      Director of Engineering & Distributed Systems Architect.<br>
      Specializing in <strong>SRE</strong>, <strong>Platform Engineering</strong>, and making <strong>Kubernetes</strong> behave.
    </p>

    <div class="hero-actions-wide">
      <a href="/blogs" class="btn-primary-retro">
        <span class="icon">➜</span> ACCESS_LOGS
      </a>
      <a href="/projects" class="btn-secondary-retro">
        <span class="icon">⚡</span> VIEW_LAB
      </a>
    </div>

    <div class="tech-stack-mini">
      <span>RUST</span>
      <span>GO</span>
      <span>K8S</span>
      <span>AWS</span>
      <span>TERRAFORM</span>
    </div>
  </div>

  <!-- Right: Visual Card -->
  <div class="hero-visual-col">
    <div class="profile-card-v3">
      <div class="card-header">
        <span class="header-text">USER: sroy</span>
        <div class="header-controls">
          <span>_</span><span>□</span><span>x</span>
        </div>
      </div>
      <div class="card-body">
        <div class="profile-img-container">
           <img src="/assets/png/pic2.png" alt="Satyajit Roy" class="profile-img-v3">
        </div>
        <div class="stats-grid">
          <div class="stat-box">
            <span class="stat-label">LVL</span>
            <span class="stat-value">20</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">ROLE</span>
            <span class="stat-value">ARCH</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">EXP</span>
            <span class="stat-value">MAX</span>
          </div>
        </div>
        <div class="status-log">
          <p>> Initializing coffee...</p>
          <p>> Deploying to prod...</p>
          <p class="success">> Success (Surprisingly)</p>
        </div>
      </div>
    </div>
  </div>

</div>

<div class="spacer-xl"></div>

<!-- Widescreen Section: Latest Logs -->
<div class="logs-section-wide">
  <div class="section-header-wide">
    <h2>// LATEST_ENTRIES</h2>
    <a href="/blogs" class="view-all-link">VIEW_ALL_LOGS()</a>
  </div>
  
  <div class="logs-grid-wide">
    {% for post in site.posts limit:3 %}
    <a href="{{ post.url }}" class="log-card-wide">
      <div class="log-date">{{ post.date | date: "%Y-%m-%d" }}</div>
      <h3 class="log-title">{{ post.title }}</h3>
      <div class="log-meta">
        <span class="log-tag">Read: {{ post.content | number_of_words | divided_by: 180 }}m</span>
        <span class="arrow-icon">→</span>
      </div>
    </a>
    {% endfor %}
  </div>
</div>

<style>
  /* Local Styles for Index (Widescreen) */
  .hero-container-wide {
    display: grid;
    grid-template-columns: 1.3fr 0.7fr; /* Text takes more space */
    gap: 6rem; /* Increased gap */
    align-items: center;
    padding: 8rem 0; /* More vertical breathing room */
    min-height: 80vh;
  }

  .hero-title-wide {
    font-family: var(--font-heading);
    font-size: 5rem; /* Even larger */
    line-height: 1.05;
    color: var(--text-primary);
    margin-bottom: 2.5rem;
  }

  .hero-bio-wide {
    font-size: 1.25rem;
    color: var(--text-secondary);
    line-height: 1.6;
    max-width: 600px;
    margin-bottom: 3rem;
  }

  .status-badge-retro {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    color: var(--accent-tertiary); /* Yellow/Green */
    border: 1px solid var(--accent-tertiary);
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
    margin-bottom: 2rem;
    font-size: 0.8rem;
  }

  .status-blink {
    animation: blink 2s infinite;
  }

  .hero-actions-wide {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .btn-primary-retro {
    background: var(--accent-primary);
    color: #fff;
    padding: 1rem 2rem;
    font-family: var(--font-mono);
    font-weight: 700;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    box-shadow: 6px 6px 0 rgba(0,0,0,0.5);
    border: 2px solid var(--accent-primary);
    transition: all 0.2s;
  }

  .btn-primary-retro:hover {
    transform: translate(2px, 2px);
    box-shadow: 4px 4px 0 rgba(0,0,0,0.5);
  }

  .btn-secondary-retro {
    background: transparent;
    color: var(--text-primary);
    padding: 1rem 2rem;
    font-family: var(--font-mono);
    font-weight: 700;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    border: 2px solid var(--text-secondary);
    transition: all 0.2s;
  }

  .btn-secondary-retro:hover {
    border-color: var(--text-primary);
    background: rgba(255,255,255,0.05);
  }

  .tech-stack-mini {
    display: flex;
    gap: 1.5rem;
    font-family: var(--font-mono);
    color: var(--text-tertiary);
    font-size: 0.9rem;
    border-top: 1px solid var(--border-subtle);
    padding-top: 1.5rem;
    width: fit-content;
  }

  /* Right Col Visuals */
  .profile-card-v3 {
    background: var(--bg-surface);
    border: 2px solid var(--text-primary);
    box-shadow: 12px 12px 0 var(--accent-secondary);
    max-width: 400px;
    margin-left: auto;
    transform: rotate(2deg);
    transition: transform 0.3s;
  }
  
  .profile-card-v3:hover {
    transform: rotate(0deg);
  }

  .card-header {
    background: var(--text-primary);
    color: var(--bg-depth);
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-weight: 700;
  }

  .card-body {
    padding: 1.5rem;
  }

  .profile-img-container {
    width: 100%;
    height: 350px; /* Increased from 250px */
    background: #000;
    margin-bottom: 1.5rem;
    border: 2px solid var(--text-primary);
    overflow: hidden;
  }

  .profile-img-v3 {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center; /* Focus on face */
    filter: grayscale(100%);
    transition: filter 0.3s;
  }

  .profile-card-v3:hover .profile-img-v3 {
    filter: grayscale(0%);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .stat-box {
    border: 1px solid var(--border-subtle);
    padding: 0.5rem;
    text-align: center;
  }

  .stat-label {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-tertiary);
  }

  .stat-value {
    display: block;
    font-family: var(--font-heading);
    font-size: 1.2rem;
    color: var(--accent-primary);
    font-weight: 700;
  }

  .status-log {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-secondary);
    background: rgba(0,0,0,0.2);
    padding: 0.8rem;
    border-radius: 4px;
  }

  .status-log p { margin: 0.2rem 0; }
  .status-log .success { color: #4ade80; }

  /* Logs Section */
  .logs-section-wide {
    margin-bottom: 6rem;
  }

  .section-header-wide {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2rem;
    border-bottom: 4px solid var(--text-primary);
    padding-bottom: 1rem;
  }

  .section-header-wide h2 {
    font-family: var(--font-heading);
    font-size: 2rem;
    margin: 0;
  }

  .view-all-link {
    font-family: var(--font-mono);
    color: var(--accent-primary);
    text-decoration: none;
    font-weight: 700;
  }

  .logs-grid-wide {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .log-card-wide {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    padding: 2rem;
    text-decoration: none;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .log-card-wide:hover {
    background: var(--code-bg);
    border-color: var(--accent-primary);
    transform: translateY(-5px);
  }

  .log-date {
    font-family: var(--font-mono);
    color: var(--text-tertiary);
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }

  .log-title {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    color: var(--text-primary);
    margin: 0 0 1.5rem 0;
    line-height: 1.2;
    flex-grow: 1;
  }

  .log-meta {
    border-top: 1px dashed var(--border-subtle);
    padding-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .arrow-icon {
    color: var(--accent-primary);
    font-weight: 700;
  }

  .spacer-xl { height: 8rem; }

  @media (max-width: 1024px) {
    .hero-container-wide {
      grid-template-columns: 1fr;
      text-align: center;
      padding: 4rem 0;
    }
    
    .hero-actions-wide, .tech-stack-mini {
      justify-content: center;
      margin: 0 auto;
    }

    .profile-card-v3 {
      margin: 0 auto;
    }

    .logs-grid-wide {
      grid-template-columns: 1fr;
    }

    .hero-title-wide {
      font-size: 3rem;
    }
  }
</style>