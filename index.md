---
title: Myself
layout: page
---

<div class="terminal-header">
  <canvas id="matrix-canvas"></canvas>
  <div class="command">
    <span class="prompt-symbol">λ</span> whoami
    <span class="cursor"></span>
  </div>
</div>

👋 **Oh, hi! You found my corner of the internet.**

I’m <span style="color:var(--accent-primary)"><strong>Satyajit Roy</strong></span>, but you can call me <span style="color:var(--accent-secondary)"><strong>Roy</strong></span>. (It saves syllables for more important things, like variable naming debates).

I am a **Technologist**, **Problem-Solver**, and **Chief Automation Officer** of my own life. My philosophy is simple: <span style="color: var(--accent-tertiary)">_"If I have to do it twice, I’m writing a script. If I have to do it thrice, I’m building a platform."_</span>

### 🦖 The Origin Story (20+ Years of "It Works on My Machine")

I’ve been in the game long enough to remember when "The Cloud" was just something that ruined your picnic. I’ve journeyed from the dark ages of `Solaris Zones` and `LXC` through the shiny, chaotic world of `Kubernetes`, and now into the era of babysitting massive **NVIDIA GPU clusters**.

Basically, I’ve spent two decades watching tech hypes rise, fall, and get rebranded while building high-performing **SRE**, **DevOps**, and **Platform Security** teams. These days, when I'm not wrestling with `YAML`, I'm the **AI Plumber**—making the hardware sweat so the models don't have to. I specialize in squeezing every last drop of performance out of GPUs until the data center smells slightly like ozone and your inference costs stop orbiting Saturn.

My goal has always been the same: building systems that are smart enough to scale and stable enough to **not** wake everyone up at 3 AM on a Saturday.

### 🛠️ What I Actually Do:

- ⚙️ **Engineering & Architecture**: Drawing boxes and arrows that eventually become expensive, resilient infrastructure.
- ☁️ **Cloud & AI Scale**: Turning "It works in dev" into "It works for everyone" without the CFO having a heart attack.
- 🏎️ **HPC & GPU Tuning**: Squeezing performance out of hardware using RDMA, InfiniBand, and sheer willpower.
- 🔐 **Security-First Thinking**: Because "admin/admin" is still not a valid security strategy, even in the age of AI.
*   🚀 **Team Building**: Hiring smart people and then trying hard not to get in their way.

### 🌲 `git log --oneline --graph`

<div class="tech-graph">
  
  <div class="graph-commit deploy">
    <div class="graph-lane"><div class="graph-dot l0"></div></div>
    <div class="graph-content">
      <span class="graph-hash">af5c170</span>
      <span class="graph-msg"><span class="type deploy">deploy:</span> mastering <strong>Rust</strong> and scaling distributed brains</span>
    </div>
  </div>

  <div class="graph-commit hotfix">
    <div class="graph-lane">
      <div class="branch-merge"></div>
      <div class="graph-dot l0"></div>
    </div>
    <div class="graph-content">
      <span class="graph-hash">c19feaa</span>
      <span class="graph-msg"><span class="type hotfix">hotfix:</span> squeezing <strong>p99 performance</strong> for high-load clusters</span>
    </div>
  </div>

  <div class="graph-commit feat on-branch">
    <div class="graph-lane"><div class="graph-dot l1"></div></div>
    <div class="graph-content">
      <span class="graph-hash">e18ce41</span>
      <span class="graph-msg"><span class="type feat">feature:</span> <strong>NVIDIA GPU</strong> scheduling and <strong>RDMA</strong> optimization</span>
    </div>
  </div>

  <div class="graph-commit feat on-branch">
    <div class="graph-lane"><div class="graph-dot l1"></div></div>
    <div class="graph-content">
      <span class="graph-hash">bd36139</span>
      <span class="graph-msg"><span class="type feat">feature:</span> architecting <strong>MLOps</strong> foundations (Kubeflow/MLflow)</span>
    </div>
  </div>

  <div class="graph-commit merge">
    <div class="graph-lane">
      <div class="branch-fork"></div>
      <div class="graph-dot l0"></div>
    </div>
    <div class="graph-content">
      <span class="graph-hash">0731214</span>
      <span class="graph-msg"><span class="type merge">merge:</span> <strong>eBPF</strong> service mesh and <strong>Zero-Trust</strong> security</span>
    </div>
  </div>

  <div class="graph-commit feat">
    <div class="graph-lane"><div class="graph-dot l0"></div></div>
    <div class="graph-content">
      <span class="graph-hash">f765b47</span>
      <span class="graph-msg"><span class="type feat">feature:</span> automating <strong>Kubernetes</strong> via <strong>Terraform</strong> and <strong>GitOps</strong></span>
    </div>
  </div>

  <div class="graph-commit feat">
    <div class="graph-lane"><div class="graph-dot l0"></div></div>
    <div class="graph-content">
      <span class="graph-hash">8381d27</span>
      <span class="graph-msg"><span class="type feat">feature:</span> massive <strong>Cloud-Native</strong> orchestration at scale</span>
    </div>
  </div>

  <div class="graph-commit refactor">
    <div class="graph-lane"><div class="graph-dot l0"></div></div>
    <div class="graph-content">
      <span class="graph-hash">c044a82</span>
      <span class="graph-msg"><span class="type refactor">refactor:</span> from <strong>Solaris Zones</strong> to <strong>Golang</strong> and modern <strong>Containers</strong></span>
    </div>
  </div>

  <div class="graph-commit init">
    <div class="graph-lane"><div class="graph-dot l0"></div></div>
    <div class="graph-content">
      <span class="graph-hash">init_02</span>
      <span class="graph-msg"><span class="type init">init:</span> the first compiled <strong>Hello World</strong></span>
    </div>
  </div>

</div>

### 🧠 Why This Blog Exists

This site is my **Engineering Therapy**. It’s where I document my battles with distributed systems and "HPC magic" before they get lost in the sea of browser tabs I never close. It serves a few noble purposes:

1.  **Public Service**: Helping you solve that obscure, soul-crushing error message you found on Google at 2 AM. If I can save one person from a **Segfault** or a **Deadlock**, I’ve done my job.
2.  **External Brain**: Reminding future me how I fixed that exact same "impossible" bug 6 months ago. Let's be honest, if the compiler didn't catch it and I didn't blog it, it never happened.
3.  **Typed Sanity**: A safe space to celebrate the joy of **Golang** binaries and my ongoing struggle to satisfy the **Rust** borrow checker. You won't find any interpreted chaos here—just pure, statically-linked systems-level sanity.
4.  **Distributed Venting**: Because sometimes you just need to rant about why your cluster state is currently a dumpster fire or why **RDMA** is acting like it's 1995.

Thanks for stopping by. If you see me in a data center, a Slack thread, or wrestling with a borrow checker, say hi!

<div class="about-hero-visual" style="display: flex; align-items: center; justify-content: center; margin-top: 4rem; margin-bottom: 2rem;">
  <img src="/assets/uploads/developer.gif" alt="Coding GIF" style="max-width: 70%; height: auto; "/>
</div>

<blockquote style="margin-top: 2rem; border-left: 4px solid var(--accent-tertiary); padding-left: 2rem; color: var(--text-primary); font-size: 1.5rem; font-family: var(--font-heading); font-style: italic;">
  "I turn <span style="color: #6F4E37;">Coffee</span> and <span style="color: #ed1c24;">Red Bull</span> into code, and existential <span style="color: #ffa726;">anxiety</span> into distributed architecture." <span style="color: var(--accent-primary);"> — That's Me!! </span>
</blockquote>