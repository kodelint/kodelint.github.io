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



        



        <!-- Top Row: Match Home Page exactly -->



        <div class="cs-card-header">



          <h2 class="cs-card-title">{{ case.title }}</h2>



          <span class="cs-card-org">{{ case.role }}</span>



        </div>



  



        <!-- Middle Row: 8/4 split layout matching Home Page -->



        <div class="cs-card-body">



          <!-- Left: Deep Dive -->



          <div class="cs-card-summary">



            <p class="cs-context" style="margin-bottom: 1.5rem; font-weight: 600; font-family: var(--font-sans); color: var(--color-text-light);">{{ case.context }}</p>



            



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



  



          <!-- Right: Outcomes & Lessons -->



          <div class="cs-card-outcomes">



            <span class="cs-label">Impact & Metrics</span>



            <ul>



              <li><strong style="color: var(--color-accent); font-size: 1.1rem;">{{ case.outcome }}</strong></li>



              {% for point in case.impact %}



              <li>{{ point }}</li>



              {% endfor %}



            </ul>



  



            <div class="cs-block" style="margin-top: 2.5rem;">



              <span class="cs-label">Key Lessons</span>



              <ul class="cs-list" style="font-size: 0.95rem; color: var(--color-text);">



                {% for lesson in case.lessons %}



                <li>{{ lesson }}</li>



                {% endfor %}



              </ul>



            </div>



          </div>



        </div>



  



        <!-- Bottom Row: Tags -->



        <div class="cs-card-footer">



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
