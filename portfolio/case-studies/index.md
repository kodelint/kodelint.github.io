---
layout: portfolio
title: Case Studies
description: Deep dives into SRE transformation, hyperscale ML infra, and cost optimization.
---

<div class="p-container">

  <div class="p-section" style="border-bottom: none;">

    <h1>Engineering Case Studies</h1>

    <p class="p-subhead">Strategic technical initiatives delivered at enterprise scale.</p>

  </div>



  <div class="cs-stack" style="padding-bottom: 5rem;">

    {% for case in site.data.portfolio.case_studies %}

    <div id="{{ case.id }}" class="cs-card">

      

      <!-- Header: Title & Context -->

      <div class="cs-card-header" style="border-bottom: 1px solid var(--color-border); padding-bottom: 1.5rem; margin-bottom: 2rem;">

        <div style="flex: 1;">

          <span class="cs-badge" style="margin-bottom: 0.5rem;">Case Study</span>

          <h2 class="cs-card-title">{{ case.title }}</h2>

          <p class="cs-context" style="margin-top: 0.5rem;">{{ case.context }}</p>

        </div>

      </div>



      <!-- Body: 2-Column Executive Layout -->

      <div class="p-grid-2" style="gap: 4rem; margin-bottom: 2rem;">

        

        <!-- Left Column: Challenge & Solution -->

        <div>

          <div class="cs-block">

            <span class="cs-label">The Challenge</span>

            <p>{{ case.problem }}</p>

            <p style="font-size: 0.9rem; color: var(--color-text-light); margin-top: 0.5rem;"><strong>Constraints:</strong> {{ case.constraints }}</p>

          </div>



          <div class="cs-block">

            <span class="cs-label" style="color: var(--color-accent);">Strategic Solution</span>

            <ul class="cs-list">

              {% for step in case.solution %}

              <li style="font-weight: 500;">{{ step }}</li>

              {% endfor %}

            </ul>

          </div>

        </div>



        <!-- Right Column: Impact & Stats -->

        <div>

          <div class="cs-block">

            <span class="cs-label">Measurable Outcomes</span>

            <div class="cs-impact-grid" style="grid-template-columns: 1fr; gap: 1rem;">

              {% for result in case.impact %}

              <div class="cs-impact-card" style="padding: 1rem; min-height: auto; text-align: left; justify-content: flex-start;">

                <span>{{ result }}</span>

              </div>

              {% endfor %}

            </div>

          </div>



          <div class="cs-block">

            <span class="cs-label">Role & Scope</span>

            <p style="font-size: 0.95rem;">{{ case.role }}</p>

          </div>

        </div>



      </div>



      <!-- Footer: Lessons & Tags -->

      <div class="cs-card-footer" style="background: var(--color-bg-alt); margin: 0 -2rem -2rem -2rem; padding: 2rem; border-top: 1px solid var(--color-border); align-items: flex-start; flex-direction: column;">

        <span class="cs-label" style="margin-bottom: 1rem;">Key Lessons Learned</span>

        <ul class="cs-list" style="margin-bottom: 1.5rem; color: var(--color-text);">

          {% for lesson in case.lessons %}

          <li>{{ lesson }}</li>

          {% endfor %}

        </ul>

        <div class="p-tags">

          {% for tag in case.tags %}

          <span class="p-tag">{{ tag }}</span>

          {% endfor %}

        </div>

      </div>



    </div>

    {% endfor %}

  </div>

</div>
