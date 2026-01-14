---
layout: portfolio
title: Resume
description: Resume of Satyajit Roy Choudhury.
---

<div class="p-container">
  <div class="p-section" style="text-align: center;">
    <a href="/Resume.pdf" class="p-btn p-btn-primary">Download PDF Resume</a>
  </div>

  <div class="p-section">
    <div style="max-width: 800px; margin: 0 auto;">
      <div class="r-header">
        <h1 class="r-name">Satyajit Roy Choudhury</h1>
        <p>Director of Engineering & SRE &bull; San Mateo, CA &bull; <a href="mailto:talk2sroy.ch@gmail.com">talk2sroy.ch@gmail.com</a></p>
      </div>

      <div class="r-item">
        <h3>Executive Summary</h3>
        <p>{{ site.data.portfolio.resume.summary }}</p>
      </div>

      <div class="r-item">
        <h3 style="border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem; margin-bottom: 1.5rem;">Experience</h3>
        
        {% for job in site.data.portfolio.resume.experience %}
        <div style="margin-bottom: 2rem;">
          <div class="r-role-row">
            <span>{{ job.role }}</span>
            <span>{{ job.date }}</span>
          </div>
          <div class="r-company">{{ job.company }}</div>
          <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
            {% for point in job.points %}
            <li>{{ point }}</li>
            {% endfor %}
          </ul>
        </div>
        {% endfor %}
      </div>
      
      <div class="r-item">
        <h3>Education</h3>
        <div class="r-role-row">
          <span>Bachelor of Science</span>
          <span>2002</span>
        </div>
        <div>Mahatma Gandhi Kashi Vidyapith</div>
      </div>

    </div>
  </div>
</div>
