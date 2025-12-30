# 🌐 sroy.tech | My Personal Blog

<p align="center">
  <img src="https://raw.githubusercontent.com/kodelint/blog-images/main/common/pic1.png" alt="Satyajit Roy" width="200" style="border-radius: 50%; border: 4px solid #111827; box-shadow: 0 0 30px rgba(56, 189, 248, 0.2);"><br>
  <b>"I turn coffee and Red Bull into code, and existential anxiety into distributed architecture."</b>
</p>

Welcome to my personal corner of the internet. This is more than just a blog; it's my **Engineering Therapy**. It’s where I document my battles with distributed systems, HPC magic, and the occasional struggle with the Rust borrow checker.

📍 **Live Site**: [sroy.tech](https://sroy.tech)

---

## ✨ Features (The Revamp)

This blog has been completely redesigned with a **Modern Glassmorphism Plus** aesthetic.

- 🌌 **Deep Space UI**: A premium dark theme with ambient background glows and rich depth.
- 🧊 **Glassmorphism**: HUD-style navigation and frosted glass cards with real-time reflections.
- 🧠 **Quirky Bio**: An integrated narrative of 20+ years in the industry, from Solaris Zones to AI Plumbing.
- ⚡ **Performance-First**: Built with Jekyll for static-site speed and optimized for both desktop and mobile.
- 🎢 **Micro-Interactions**: Reading progress bars, glowing scrollbars, and bounce-hover animations via GSAP.

---

## 🛠️ Tech Stack

- **Engine**: [Jekyll](https://jekyllrb.com/) (Ruby-based static site generator)
- **Styling**: Modern CSS3 (Custom properties, Grid, Flexbox, Backdrop-filters)
- **Animations**: [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform)
- **Environment**: [Docker](https://www.docker.com/) & Docker Compose
- **Hosting**: GitHub Pages

---

## 🚀 Local Development

The entire development environment is containerized. No need to install Ruby or Jekyll on your host machine.

### 1. Clone and Build
```bash
git clone https://github.com/kodelint/kodelint.github.io.git
cd kodelint.github.io
docker-compose build
```

### 2. Launch the Engine
```bash
docker-compose up
```
Once the container is up, visit: **`http://localhost:4000`**

- **LiveReload**: Enabled (Any changes to your markdown or CSS will refresh the browser automatically).
- **Drafts**: Enabled (See your `_drafts` posts while developing).

---

## 📂 Project Structure

- `_posts/`: Where the technical deep dives live.
- `_data/`: Configuration for navigation (`nav.yml`), projects, and blogger bio.
- `_includes/`: Reusable HTML components (Navbar, Footer, etc.).
- `_layouts/`: The skeletal structures for Blogs, Projects, and Pages.
- `assets/`: The aesthetic engine (CSS, JavaScript, and localized GIFs).

---

## ↩️ Reverting Changes

If you ever need to go back to the "classic" terminal-style look, I've tagged the pre-revamp state:
```bash
git checkout pre-revamp-backup
```

---

<p align="center">
  <i>Maintained with ❤️ and plenty of caffeine by Satyajit Roy.</i>
</p>
