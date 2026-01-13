---
title: Myself
layout: page
---

<div class="terminal-header">
  <canvas id="matrix-canvas"></canvas>
  <div class="command">
    <span class="prompt-symbol">λ</span> whoami --detailed
    <span class="cursor"></span>
  </div>
  <div class="status-widget">
    <div class="pulse-dot"></div>
    <span>[STATUS] Currently fighting a race condition in my coffee machine...</span>
  </div>
</div>

<div class="hero-section">
  <div class="intro-container">
    <div class="intro-header">
       <span class="wave">👋</span> <span class="gradient-text">Connection established. Welcome to my local host.</span>
    </div>
    <p>
      I’m <span class="highlight-cyan">Satyajit Roy</span>, better known as <span class="highlight-indigo">Roy</span>. (Because 'Satyajit' is a beautiful name, but 'Roy' is just one syllable—optimized for low-latency communication).
    </p>
    <p class="role-badges">
      <span class="badge">SRE Architect</span>
      <span class="badge">Platform Mechanic</span>
      <span class="badge">YAML Wrangler</span>
    </p>
  </div>

  <div class="content-card story-card">
    <h3>🦖 The Legacy Log <span class="sub-title">(20+ Years of Debugging the Undebuggable)</span></h3>
    
    <p>
      I started my journey when <span class="tooltip-container">"The Cloud"<span class="tooltip-box"><b>Other People's Computers [noun]</b>A magical place where your credit card goes to die and your data goes to live in someone else's basement.</span></span> was still just a weather pattern and <span class="tooltip-container">"scaling"<span class="tooltip-box"><b>Horizontal Expansion [verb]</b>Adding more problems until the original problem looks small by comparison.</span></span> meant buying a bigger physical server. I’ve seen technology evolve from the manual labor of <span class="tooltip-container">Solaris Zones<span class="tooltip-box"><b>Digital Fossils [archaic]</b>A time when we treated servers like precious pets instead of disposable cattle.</span></span> to the automated chaos of <span class="tooltip-container">Kubernetes<span class="tooltip-box"><b>The YAML Generator [tool]</b>A system designed to turn simple ideas into 4,000 lines of configuration.</span></span>.
    </p>

    <div class="story-highlight">
      For two decades, I’ve been the person standing between high-performing systems and total entropy. Whether it's building resilient <span class="tooltip-container">Platform Security<span class="tooltip-box"><b>The Shield [role]</b>Making sure the <span class="tooltip-container">"admin/admin"<span class="tooltip-box"><b>The Hacker's Welcome Mat [phrase]</b>A security strategy based on the hope that nobody checks the obvious.</span></span> strategy dies a quiet, painful death.</span></span> or squeezing peak performance out of <span class="tooltip-container">NVIDIA GPU clusters<span class="tooltip-box"><b>The Furnace [hardware]</b>Where we burn money to make tensors move slightly faster.</span></span>, I thrive where the hardware starts to smoke. Currently, I'm specializing as an <span class="tooltip-container">Infrastructure Alchemist<span class="tooltip-box"><b>Lead into Gold [job]</b>Turning messy data and unstable clusters into high-uptime gold.</span></span>, ensuring that your AI models have enough GPU juice to change the world without bankrupting the company.
    </div>

    <p class="goal-text">
       My philosophy is simple: If a task takes more than two minutes, automate it. If a system wakes me up at 3 AM, fix it so it stays dead until Monday morning.
    </p>

  </div>

  <div class="content-card info-card">
    <h3>🛠️ My Current Stack (and Occasional Nemesis):</h3>
    <ul>
      <li>⚙️ <strong>SRE & Platform Engineering</strong>: Building the bridges that developers cross to get to production.</li>
      <li>☁️ <strong>GPU & AI Orchestration</strong>: Babysitting H100s and making sure <span class="tooltip-container"><strong>InfiniBand</strong><span class="tooltip-box"><b>Black Magic [networking]</b>Networking so fast it violates the laws of physics and my patience.</span></span> doesn't behave like dial-up.</li>
      <li>🏎️ <strong>Performance Optimization</strong>: Using <span class="tooltip-container"><strong>RDMA</strong><span class="tooltip-box"><b>Shortcut [tech]</b>Because the CPU kernel is just a slow middleman we don't need.</span></span> to make data move at the speed of thought.</li>
      <li>🔐 <strong>DevSecOps</strong>: Baking security into the pipeline so it's not a burnt topping at the end.</li>
      <li>🚀 <strong>Mentorship</strong>: Teaching the next generation that <span class="tooltip-container">'Force Push'<span class="tooltip-box"><b>Digital Fire [verb]</b>A desperate attempt to rewrite history that usually ends with a team-wide Slack notification.</span></span> is a tool, not a lifestyle choice.</li>
    </ul>
  </div>
</div>

<div class="hero-section">
  <h3>🌲 Career Git Graph</h3>
  <div class="terminal-prompt">
    <span class="symbol">$</span> career log --all --graph --oneline --color
  </div>
</div>

<div class="tech-graph">
  <div class="graph-commit deploy">
    <div class="graph-lane"><div class="graph-dot l0"></div></div>
    <div class="graph-content">
      <span class="graph-hash">af5c170</span>
      <span class="graph-msg"><span class="type deploy">deploy</span> <span class="ref">(HEAD -> master)</span> finally understood that <strong>Rust</strong>'s compiler is actually a protective parent</span>
    </div>
  </div>

  <div class="graph-commit feat">
    <div class="graph-lane"><div class="graph-dot l0"></div></div>
    <div class="graph-content">
      <span class="graph-hash">7ece5b8</span>
      <span class="graph-msg"><span class="type feat">feat</span> realized the <span class="tooltip-container">"Edge"<span class="tooltip-box"><b>The Frontier [tech]</b>Computing so close to the user you can almost smell their search history.</span></span> is just a server with a better view</span>
    </div>
  </div>
  <div class="graph-commit hotfix">
    <div class="graph-lane">
      <div class="branch-merge"></div>
      <div class="graph-dot l0"></div>
    </div>
    <div class="graph-content">
      <span class="graph-hash">c19feaa</span>
      <span class="graph-msg"><span class="type hotfix">fix</span> learned that <span class="tooltip-container">"cloud native"<span class="tooltip-box"><b>Expensive by Design [concept]</b>A methodology that ensures your cloud provider reaches their quarterly revenue targets.</span></span> usually means "expensive native"</span>
    </div>
  </div>

  <div class="graph-commit feat on-branch">
    <div class="graph-lane"><div class="graph-dot l1"></div></div>
    <div class="graph-content">
      <span class="graph-hash">e18ce41</span>
      <span class="graph-msg"><span class="type feat">feat</span> <span class="ref">(branch/gpu-voodoo)</span> optimized GPU utilization from 'expensive space heater' to 'inference machine'</span>
    </div>
  </div>

  <div class="graph-commit feat on-branch">
    <div class="graph-lane"><div class="graph-dot l1"></div></div>
    <div class="graph-content">
      <span class="graph-hash">bd36139</span>
      <span class="graph-msg"><span class="type feat">feat</span> accepted that <strong>Kubernetes</strong> is just a collection of very angry containers</span>
    </div>
  </div>

  <div class="graph-commit feat on-branch">
    <div class="graph-lane"><div class="graph-dot l1"></div></div>
    <div class="graph-content">
      <span class="graph-hash">9c8c9ca</span>
      <span class="graph-msg"><span class="type feat">feat</span> <span class="ref">(branch/security)</span> survived a security audit without losing my soul</span>
    </div>
  </div>

  <div class="graph-commit merge">
    <div class="graph-lane">
      <div class="branch-fork"></div>
      <div class="graph-dot l0"></div>
    </div>
    <div class="graph-content">
      <span class="graph-hash">0731214</span>
      <span class="graph-msg"><span class="type merge">merge</span> Security is now a feature, not a ticket</span>
    </div>
  </div>

  <div class="graph-commit fix">
    <div class="graph-lane"><div class="graph-dot l0"></div></div>
    <div class="graph-content">
      <span class="graph-hash">f4dff42</span>
      <span class="graph-msg"><span class="type fix">fix</span> fixed a bug that only appeared on Tuesdays during a full moon</span>
    </div>
  </div>

  <div class="graph-commit feat">
    <div class="graph-lane"><div class="graph-dot l0"></div></div>
    <div class="graph-content">
      <span class="graph-hash">f765b47</span>
      <span class="graph-msg"><span class="type feat">feat</span> converted our infrastructure into <strong>GitOps</strong> because clicking buttons is for amateurs</span>
    </div>
  </div>

  <div class="graph-commit perf">
    <div class="graph-lane"><div class="graph-dot l0"></div></div>
    <div class="graph-content">
      <span class="graph-hash">ea21f3c</span>
      <span class="graph-msg"><span class="type perf">perf</span> optimized my coffee consumption for maximum code output</span>

    </div>

  </div>

  <div class="graph-commit feat">
    <div class="graph-lane"><div class="graph-dot l0"></div></div>
    <div class="graph-content">
      <span class="graph-hash">8381d27</span>
      <span class="graph-msg"><span class="type feat">feat</span> learned that <span class="tooltip-container">"Done"<span class="tooltip-box"><b>MVP [state]</b>The exact moment you can hand it off to support and go on vacation.</span></span> is better than <span class="tooltip-container">"Perfect"<span class="tooltip-box"><b>Mythical State [concept]</b>A theoretical point in space-time that developers chase instead of shipping.</span></span>, but <span class="tooltip-container">"Stable"<span class="tooltip-box"><b>The Holy Grail [state]</b>A system that doesn't trigger the pager for at least 72 hours.</span></span> is better than both</span>
    </div>
  </div>

  <div class="graph-commit merge">
    <div class="graph-lane"><div class="graph-dot l0"></div></div>
    <div class="graph-content">
      <span class="graph-hash">bd36139</span>
      <span class="graph-msg"><span class="type merge">merge</span> successfully merged 15 sub-tasks without a single conflict <span class="tooltip-container">(A Miracle)<span class="tooltip-box"><b>Statistical Anomaly [noun]</b>An event so rare it's usually followed by a system-wide crash to restore cosmic balance.</span></span></span>
    </div>
  </div>

  <div class="graph-commit refactor">
    <div class="graph-lane"><div class="graph-dot l0"></div></div>
    <div class="graph-content">
      <span class="graph-hash">c044a82</span>
      <span class="graph-msg"><span class="type refactor">refactor</span> deleted 5,000 lines of code. It was the best day of my life.</span>
    </div>
  </div>

  <div class="graph-commit refactor">
    <div class="graph-lane"><div class="graph-dot l0"></div></div>
    <div class="graph-content">
      <span class="graph-hash">0731214</span>
      <span class="graph-msg"><span class="type refactor">refactor</span> simplified the architecture until a toddler could explain it</span>
    </div>
  </div>

  <div class="graph-commit init">
    <div class="graph-lane"><div class="graph-dot l0"></div></div>
    <div class="graph-content">
      <span class="graph-hash">init_02</span>
      <span class="graph-msg"><span class="type init">init</span> started with a Hello World, now we're here.</span>
    </div>
  </div>

  <div class="graph-stats" style="font-style: normal; display: flex; flex-direction: column; gap: 0.4rem;">
    <div style="color: var(--accent-primary); margin-bottom: 0.6rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; font-size: 0.7rem; display: flex; align-items: center; gap: 0.6rem; opacity: 0.8;">
      <span style="background: rgba(56, 189, 248, 0.1); padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(56, 189, 248, 0.2); font-size: 0.6rem;">[STATUS]</span> 
      <span>FINAL_DEPLOY_SUMMARY_SUCCESS</span>
    </div>
    <span style="font-weight: 700; color: var(--text-secondary); font-size: 0.95rem;">
      <span style="color: #00ff9d;">+++</span> 20 Years of <span style="color: #ff4757;">PagerDuty</span> Trauma (and counting)
    </span>
    <span style="font-weight: 700; color: var(--text-secondary); font-size: 0.95rem;">
      <span style="color: #00ff9d;">+++</span> 1,048,576 Lines of <span style="color: #38bdf8;">Polyglot Code</span> (<span style="color: #94a3af;">YAML</span>, <span style="color: #00ff9d;">Go</span>, <span style="color: #f87171;">Rust</span>)
    </span>
    <span style="font-weight: 700; color: var(--text-secondary); font-size: 0.95rem;">
      <span style="color: #ff4757;">---</span> <span style="color: #ff4757;">0 Regrets</span> (Memory leaks not shown)
    </span>
    <span style="font-weight: 700; color: var(--text-secondary); font-size: 0.95rem;">
      <span style="color: #facc15;">!!!</span> 1 <span style="color: #facc15;">Executive Ego</span> (Critical dependency)
    </span>
  </div>

</div>
<div class="hero-section">
  <div class="content-card info-card">
    <h3>🧠 The Mission Statement</h3>
    <p>
      This blog is my <span class="tooltip-container">Digital Garden<span class="tooltip-box"><b>Mind Dump [activity]</b>Planting ideas and watching them grow into complex bugs.</span></span>. It's a place where I document my battles with distributed systems and high-performance computing so that I (and you) don't have to fight the same war twice.
    </p>
    <ol>
      <li><strong>Save Your Sanity</strong>: If my post about an obscure <span class="tooltip-container">Segfault<span class="tooltip-box"><b>Memory Oops [error]</b>The digital version of forgetting why you walked into a room.</span></span> saves you an hour of debugging at 2 AM, I've won.</li>
      <li><strong>Future-Proofing Me</strong>: Because I know I’ll forget how I fixed that <span class="tooltip-container">"impossible"<span class="tooltip-box"><b>Murphy's Law [state]</b>A bug that technically shouldn't exist but is currently costing the company $10k an hour.</span></span> networking issue by next quarter.</li>
      <li><strong>Statically-Linked Sanity</strong>: A sanctuary for <span class="tooltip-container">Golang<span class="tooltip-box"><b>Gopher Magic [lang]</b>Simple, fast, and remarkably good at hiding its lack of generics for years.</span></span> and <span class="tooltip-container">Rust<span class="tooltip-box"><b>The Enforcer [lang]</b>A language that treats you like you're irresponsible, and it's usually right.</span></span> lovers. You won't find any loosely-typed nightmares here.</li>
      <li><strong>Ranting with Purpose</strong>: Sometimes the industry needs a reminder that <span class="tooltip-container">Hype<span class="tooltip-box"><b>LinkedIn Fuel [noun]</b>A shiny new technology that promises to solve everything but usually just adds another layer of YAML.</span></span> isn't a replacement for <span class="tooltip-container">Architecture<span class="tooltip-box"><b>Plan B [noun]</b>Drawing boxes that look good in a slideshow until the first packet drop.</span></span>.</li>
    </ol>

  </div>
</div>

<p>Feel free to explore. If you see me in a data center or a GitHub issue, don't be a stranger, unless you're bringing more <strong>YAML</strong>.</p>

<div class="signature-section">
  <div class="signature-visual">
    <img src="/assets/uploads/developer.png" alt="Coding GIF"/>
  </div>
  <blockquote class="signature-quote">
    "I convert <span class="tooltip-container">Coffee<span class="tooltip-box"><b>Core Fuel [food]</b>The only thing that scales as well as my clusters.</span></span> into <span class="tooltip-container">Resilient Infrastructure<span class="tooltip-box"><b>Job Security [outcome]</b>Systems so stable they make me look like I know what I'm doing.</span></span> and deploy <span class="tooltip-container">Confidence<span class="tooltip-box"><b>Fallback Plan [strategy]</b>What I tell the stakeholders while I'm actually praying to the demo gods.</span></span> to production. My <span class="tooltip-container">Cloud Strategy<span class="tooltip-box"><b>Expensive Art [noun]</b>Modern architecture: Paying Jeff Bezos to host my mistakes.</span></span> is 90% logic and 10% hoping the InfiniBand stays connected." <span style="color: var(--accent-primary);"> — Roy </span>
  </blockquote>
</div>
