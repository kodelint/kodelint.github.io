# 🌐 Satyajit Roy's Blog - Engineering Therapy

<div align="center">
  <img src="/assets/png/pic2.png" alt="Satyajit Roy" width="200" style="border-radius: 50%; border: 4px solid #111827; box-shadow: 0 0 30px rgba(56, 189, 248, 0.2);">
  <br />
  <h3><i>"I turn coffee and Red Bull into code, and existential anxiety into distributed architecture."</i></h3>
  <br />
  <a href="https://sroy.tech"><strong>Explore the Live Site »</strong></a>
  <br />
  <br />
  <a href="https://github.com/kodelint/kodelint.github.io/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/kodelint/kodelint.github.io?style=flat-square" alt="License">
  </a>
</div>

---

## 📖 About

Welcome to my personal corner of the internet. This blog, **Engineering Therapy**, is where I document my journey through the chaotic landscape of software engineering. From the depths of **Distributed Systems** and **HPC** to the nuances of **Rust** and **Golang**, this is my digital garden.

### ✨ Key Features

*   **Glassmorphism UI**: A modern, deep-space aesthetic with frosted glass elements and ambient glows.
*   **Technical Deep Dives**: Articles covering complex topics like Overlay Networking, Terraform, and language internals.
*   **Responsive Design**: Optimized for reading on any device.
*   **Dark Mode Native**: Because light attracts bugs.

## 🛠️ Tech Stack

*   **Core**: [Jekyll](https://jekyllrb.com/) (Ruby Static Site Generator)
*   **Styling**: SCSS, CSS3 Variables, Backdrop-filters
*   **Animations**: [GSAP](https://greensock.com/gsap/)
*   **Infrastructure**: Docker, GitHub Pages

## 🚀 Getting Started

You can run this site locally using either Docker (recommended) or a native Ruby environment.

### Option 1: Docker (Recommended)

This method ensures you have the exact environment without polluting your local machine.

1.  **Clone the repository**
    ```bash
    git clone https://github.com/kodelint/kodelint.github.io.git
    cd kodelint.github.io
    ```

2.  **Build the container**
    ```bash
    docker-compose build
    ```

3.  **Run the site**
    ```bash
    docker-compose up
    ```

    The site will be available at **`http://localhost:4000`**. Changes to files will automatically trigger a rebuild.

### Option 2: Native Ruby

If you prefer running it directly on your machine:

1.  **Prerequisites**: Ensure you have Ruby (v3.2+) and Bundler installed.

2.  **Install Dependencies**
    ```bash
    bundle install
    ```

3.  **Serve the Site**
    ```bash
    bundle exec jekyll serve --livereload
    ```

## 📂 Project Structure

```text
/
├── _posts/        # Blog entries (markdown)
├── _layouts/      # HTML templates for pages/posts
├── _includes/     # Reusable HTML components (header, footer)
├── _sass/         # SCSS partials for styling
├── assets/        # Images, compiled CSS, and JS
├── _config.yml    # Jekyll configuration
├── Dockerfile     # Container definition
└── docker-compose.yml # Container orchestration
```

## 🤝 Contributing

While this is a personal blog, corrections and improvements are welcome!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the **GPL v2** License. See `LICENSE` for more information.

## 📬 Contact

**Satyajit Roy**

*   Twitter: [@__initialized__](https://twitter.com/__initialized__)
*   GitHub: [kodelint](https://github.com/kodelint)
*   Email: [email2sroy@gmail.com](mailto:email2sroy@gmail.com)

---
<div align="center">
  <i>Built with ❤️, ☕, and 🦀 (Rust).</i>
</div>