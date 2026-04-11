---
layout: portfolio
title: Resume
description: Professional Resume of Satyajit Roy Choudhury.
---

<style>
  @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&display=swap');

  :root {
    --resume-font-size: 12pt;
    --resume-line-height: 1.45;
    --resume-text-color: #222;
    --resume-heading-color: #000;
    --resume-accent-color: #1a56a0;
    --resume-bg-alt: #e8e8e8;
    --resume-section-border: #000;
  }

  .resume-container {
    max-width: 900px;
    margin: 2rem auto;
    background: white;
    padding: 2.5rem 3rem;
    color: var(--resume-text-color);
    font-family: 'Lato', 'Calibri', 'Gill Sans', Arial, sans-serif;
    line-height: var(--resume-line-height);
    font-size: var(--resume-font-size);
  }

  @media print {
    body { margin: 0; padding: 0; }
    .resume-container { margin: 0; padding: 0; max-width: 100%; box-shadow: none; border: none; }
    .p-nav, .p-footer, .p-btn, .p-section:first-child { display: none !important; }
  }

  .resume-header {
    text-align: center;
    margin-bottom: 0.6rem;
  }

  .resume-header h1 {
    font-size: 26pt;
    font-weight: 900;
    margin: 0;
    color: var(--resume-heading-color);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    line-height: 1;
  }

  .resume-tagline {
    font-weight: 700;
    font-size: 10.5pt;
    margin: 0.25rem 0 0 0;
    line-height: 1.3;
    color: #111;
  }

  .resume-contact {
    font-size: 10.5pt;
    color: #555;
    margin-top: 0.15rem;
  }

  .resume-contact a {
    color: var(--resume-accent-color);
    text-decoration: none;
  }

  .resume-contact a:hover {
    text-decoration: underline;
  }

  .section-title {
    background: var(--resume-bg-alt);
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12pt;
    padding: 3pt 0;
    border-top: 1.5px solid var(--resume-section-border);
    border-bottom: 1.5px solid var(--resume-section-border);
    margin: 1.2rem 0 0.8rem 0;
    letter-spacing: 2pt;
    color: #111;
  }

  .achievement-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .achievement-list li {
    margin-bottom: 0.45rem;
    position: relative;
    padding-left: 1.2rem;
    line-height: 1.4;
  }

  .achievement-list li::before {
    content: "●";
    position: absolute;
    left: 0;
    color: var(--resume-accent-color);
    font-size: 0.7em;
    top: 0.15em;
  }

  .expertise-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem 1.5rem;
    margin-bottom: 0.5rem;
  }

  .expertise-grid-2col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem 1.5rem;
    margin-bottom: 0.8rem;
  }

  .expertise-column h3 {
    color: var(--resume-accent-color);
    font-size: 10.5pt;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    border-bottom: 1.5px solid var(--resume-accent-color);
    padding-bottom: 2pt;
    text-transform: uppercase;
    letter-spacing: 0;
    white-space: nowrap;
  }

  .expertise-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 11pt;
  }

  .expertise-list li {
    margin-bottom: 0.25rem;
    padding-left: 0.9rem;
    position: relative;
    line-height: 1.35;
  }

  .expertise-list li::before {
    content: "●";
    position: absolute;
    left: 0;
    font-size: 0.55em;
    top: 0.3em;
    color: #444;
  }

  .experience-item {
    margin-bottom: 1.4rem;
  }

  .experience-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.2rem;
    gap: 1rem;
  }

  .job-title {
    font-weight: 700;
    font-size: 11.5pt;
    color: #111;
  }

  .company-name {
    font-weight: 400;
    color: #333;
  }

  .job-date {
    color: #888;
    font-weight: 400;
    font-size: 11pt;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .job-summary {
    font-style: italic;
    margin-bottom: 0.5rem;
    color: #555;
    font-size: 11pt;
    line-height: 1.4;
  }

  .bullet-list {
    padding-left: 0;
    margin: 0;
    list-style: none;
  }

  .bullet-list li {
    margin-bottom: 0.35rem;
    padding-left: 1.2rem;
    position: relative;
    line-height: 1.4;
  }

  .bullet-list li::before {
    content: "●";
    position: absolute;
    left: 0;
    font-size: 0.6em;
    top: 0.25em;
    color: #333;
  }

  .education-item {
    margin-bottom: 0.6rem;
  }

  .education-degree {
    font-weight: 700;
    font-size: 10.5pt;
  }

  .education-school {
    font-size: 10pt;
    color: #444;
    margin-top: 0.1rem;
  }

  hr.resume-divider {
    border: none;
    border-top: 1px solid #ccc;
    margin: 0.5rem 0;
  }
</style>

<div class="p-container">
  <div class="p-section" style="text-align: center; border-bottom: none; padding: 1rem 0;">
    <a href="{{ "/Resume.pdf" | relative_url }}" class="p-btn p-btn-primary" download>
      <i class="fas fa-download" style="margin-right: 0.5rem;"></i> Download PDF Resume
    </a>
  </div>

  <div class="resume-container">
    <header class="resume-header">
      <h1>SATYAJIT ROY CHOUDHURY</h1>
      <div class="resume-tagline">
        Engineering Executive | 20+ years in US &amp; India | Leader in Cloud, AI/ML Infra, and SRE Engineering
      </div>
      <div class="resume-contact">
        San Mateo, 94404 &nbsp;|&nbsp; (561) 866-3499 &nbsp;|&nbsp; <a href="mailto:talk2sroy.ch@gmail.com">talk2sroy.ch@gmail.com</a> &nbsp;|&nbsp;
        <a href="https://linkedin.com/in/satyajitroychoudhury/">LinkedIn</a> &nbsp;|&nbsp;
        <a href="https://sroy.tech/portfolio">Portfolio</a> &nbsp;|&nbsp;
        <a href="https://sroy.tech">Personal Site</a>
      </div>
    </header>

    <div class="section-title">EXECUTIVE SUMMARY</div>
    <div style="text-align: justify; font-size: 12pt;">
      I build and scale engineering organizations that turn infrastructure investment into business outcomes. Over 20 years, I have run global platform and SRE teams through rapid growth, built reliability into products that couldn't afford to fail, and stayed close enough to the architecture to make the hard calls myself. I lead by developing the people around me, staying hands-on where it matters, and keeping complex systems honest with clear metrics and accountability.
    </div>

    <div class="section-title">KEY EXECUTIVE ACHIEVEMENTS</div>
    <ul class="achievement-list">
      <li><strong style="color: var(--resume-accent-color);">Hyperscale Platform Leadership:</strong> Architected and operated search and AI platforms handling 30B+ daily requests at 99.98%+ availability across hybrid multi-cloud infrastructure, while increasing GPU cluster utilization by 38–40% through workload-aware scheduling.</li>
      <li><strong style="color: var(--resume-accent-color);">Growth &amp; Reliability Enablement:</strong> Led platform and SRE strategy that absorbed 400% attack traffic growth and supported 200%+ SaaS customer expansion at F5 without proportional infrastructure cost increases while improving release velocity and incident response.</li>
      <li><strong style="color: var(--resume-accent-color);">Financial &amp; Cost Optimization:</strong> Delivered 22–65% cloud cost reductions across three organizations through hybrid architectures, FinOps governance, and storage tiering including a 30% annual TCO reduction at F5 while accelerating feature delivery by 40%.</li>
      <li><strong style="color: var(--resume-accent-color);">Organizational &amp; Talent Leadership:</strong> Built and led global engineering organizations up to 55+ engineers; maintained sub-10% attrition and advanced 30%+ of team members into senior or leadership roles through structured development and promotion planning.</li>
    </ul>

    <div class="section-title">AREAS OF EXPERTISE</div>
    <div class="expertise-grid">
      <div class="expertise-column">
        <h3>Leadership &amp; Strategy</h3>
        <ul class="expertise-list">
          <li>P&amp;L &amp; Budget Accountability</li>
          <li>Org Design &amp; Headcount Planning</li>
          <li>Manager-of-Managers</li>
          <li>Build vs Buy Strategy</li>
          <li>Technical Roadmapping &amp; OKRs</li>
          <li>FinOps / Cloud TCO Optimization</li>
          <li>Executive &amp; Board Stakeholder Mgmt</li>
        </ul>
      </div>
      <div class="expertise-column">
        <h3>Cloud &amp; Platform Engineering</h3>
        <ul class="expertise-list">
          <li>Multi-Cloud (AWS, Azure, GCP)</li>
          <li>Kubernetes (EKS, AKS, GKE)</li>
          <li>GitOps (ArgoCD, Flux CD)</li>
          <li>IaC (Terraform, Crossplane)</li>
          <li>eBPF / Service Mesh (Cilium)</li>
          <li>Microservices &amp; API Platforms</li>
          <li>CI/CD &amp; Release Engineering</li>
        </ul>
      </div>
      <div class="expertise-column">
        <h3>Reliability &amp; Operations</h3>
        <ul class="expertise-list">
          <li>SLO/SLI Design &amp; Incident Command</li>
          <li>MTTR Reduction (60–73%)</li>
          <li>Observability (OTel, Prometheus, ELK, Grafana, Jaeger)</li>
          <li>Chaos Engineering &amp; Global On-call</li>
          <li>WAAP / WAF &amp; Zero-Trust</li>
          <li>FedRAMP High &bull; SOC 2 &bull; PCI-DSS</li>
          <li>Mutual TLS &amp; Policy-as-Code</li>
          <li>Runtime eBPF Monitoring</li>
        </ul>
      </div>
    </div>
    <div class="expertise-grid-2col">
      <div class="expertise-column">
        <h3>AI/ML &amp; HPC Infrastructure</h3>
        <ul class="expertise-list">
          <li>NVIDIA GPU (V100, A100, T4)</li>
          <li>HPC Networking (RDMA, InfiniBand, RoCE)</li>
          <li>MLOps (Kubeflow, MLflow)</li>
          <li>Job Scheduling (Volcano)</li>
          <li>Inference Optimization MIG &amp; GPU-aware Scheduling</li>
        </ul>
      </div>
      <div class="expertise-column">
        <h3>Data &amp; Storage Engineering</h3>
        <ul class="expertise-list">
          <li>Elasticsearch</li>
          <li>Object Storage Lifecycle</li>
          <li>High Ingestion Pipelines</li>
          <li>Multi-tenant Search Architecture</li>
          <li>Data Sovereignty &amp; Compliance</li>
          <li>Sub-5ms P95 Latency Optimization</li>
        </ul>
      </div>
    </div>

    <div class="section-title">TECHNICAL EXPERIENCE</div>

    <div class="experience-item">
      <div class="experience-header">
        <div class="job-title">Director of Engineering and SRE <span class="company-name">at Arkose Labs – San Mateo, CA</span></div>
        <div class="job-date">Aug 2024 — June 2025</div>
      </div>
      <div class="job-summary">High-growth fraud detection SaaS. Owned platform engineering and SRE across reliability, cloud cost, and security posture while the platform absorbed sharp enterprise-driven traffic growth.</div>
      <ul class="bullet-list">
        <li>Re-architected the platform to EKS-based microservices with an eBPF service mesh, supporting <strong>7x transaction growth</strong> over 10 months while holding <strong>99.9% SLA</strong> under sustained attack traffic.</li>
        <li>Cut P1 incident resolution time by <strong>58%</strong> by rebuilding observability and SOC signal quality, then leading high-severity incident command directly until the on-call team had the tools and process to own it.</li>
        <li>Drove migration from Cloudflare to CloudFront with Lambda@Edge, cutting edge latency by <strong>35%</strong> for enterprise customers.</li>
        <li>Built and executed FinOps governance program, reducing cloud spend by <strong>22%</strong> without limiting infrastructure capacity lowering effective cost-per-million transactions quarter over quarter.</li>
        <li>Established SLO-based release gates with Product, giving engineering and product a shared framework for trading feature velocity against reliability risk measurably reducing customer-impacting incidents.</li>
        <li>Ran build-vs-buy evaluations and vendor POCs across cloud, edge, and observability platforms selecting best-fit solutions that cut evaluation cycles and avoided long-term lock-in.</li>
        <li>Scaled the engineering organization from <strong>4 to 16 engineers</strong> across two teams; managed 2 engineering managers and owned the hiring plan and team structure.</li>
      </ul>
    </div>

    <div class="experience-item">
      <div class="experience-header">
        <div class="job-title">Sr. Director of Product Engineering &amp; Head of SRE <span class="company-name">at F5 Inc – San Jose, CA</span></div>
        <div class="job-date">Oct 2022 — April 2024</div>
      </div>
      <div class="job-summary">Full P&amp;L accountability for Platform Engineering and Global SRE for F5's <strong>Distributed Cloud SaaS</strong>, a globally distributed, security-critical platform spanning 25+ PoPs across multiple cloud providers.</div>
      <ul class="bullet-list">
        <li>Oversaw architecture strategy for a <strong>25+ global PoP</strong> platform delivering multi-cloud networking, WAAP/WAF, and edge services enabling the platform to absorb <strong>400% growth in attack traffic</strong> while supporting 200%+ customer expansion.</li>
        <li>Reduced annual <strong>TCO by 30%</strong> and accelerated feature delivery by <strong>40%</strong> through a disciplined build-vs-buy governance process that balanced internal IP development with the right vendor solutions.</li>
        <li>Partnered with the CISO to achieve FedRAMP High, PCI-DSS, and SOC 2 compliance — implementing policy-as-code, zero-trust architecture, mutual TLS, and runtime eBPF monitoring — unlocking regulated telecom and financial services markets.</li>
        <li>Cut MTTR by <strong>73%</strong> and sustained <strong>99.92%+</strong> platform availability by re-architecting observability with ELK, Jaeger, and ML-based anomaly detection.</li>
        <li>Rebuilt the global SRE model into a follow-the-sun structure, reducing on-call burnout, cutting attrition by 10 percentage points, and improving incident response consistency across time zones.</li>
        <li>Translated Board and C-suite priorities into multi-quarter engineering roadmaps and OKRs, aligning Cloud, SRE, and product teams across the full F5 Distributed Cloud portfolio.</li>
        <li>Led an organization of <strong>55+ engineers</strong> as manager of managers: 3 Directors and 1 Senior Manager, owning hiring plans, headcount allocation, and operating budget.</li>
      </ul>
    </div>

    <div class="experience-item">
      <div class="experience-header">
        <div class="job-title">Architect/Technical Leader <span class="company-name">at Adobe Inc – San Jose, CA</span></div>
        <div class="job-date">Aug 2018 — Oct 2022</div>
      </div>
      <div class="job-summary">Technical leader for Adobe's Core Search and Sensei Machine Learning platform hyperscale infrastructure serving billions of daily requests across the full Search and Sensei product ecosystem.</div>
      <ul class="bullet-list">
        <li>Built and operated a hybrid <strong>GPU/CPU infrastructure</strong> across AWS, Azure, and on-prem that handled <strong>~30B daily API requests at 99.98%+ availability</strong>.</li>
        <li>Designed and optimized NVIDIA V100/A100 HPC clusters with RDMA InfiniBand, MIG, and GPU-aware scheduling (Kubeflow, Volcano), increasing cluster utilization by <strong>38%</strong> measurably reducing compute cost for equivalent workload volume.</li>
        <li>Migrated from managed AWS Elasticsearch to a self-managed hybrid architecture across 18 clusters handling 10B+ documents at 6,000 writes/sec, delivering <strong>30% licensing savings</strong> while improving operational control.</li>
        <li>Consolidated fragmented Kubernetes environments into 15 multi-tenant clusters using Cilium (eBPF), eliminating 90% of cluster sprawl the reference architecture was later adopted across Adobe's broader engineering organization.</li>
        <li>Cut cloud storage costs by <strong>65%</strong> through data lifecycle and tiering policies across search and ML pipelines while maintaining <strong>sub-5ms P95 latency</strong>.</li>
        <li>Led 12 senior platform and infrastructure engineers, setting the architectural direction for search and ML infrastructure used across Adobe's product portfolio.</li>
      </ul>
    </div>

    <div class="experience-item">
      <div class="experience-header">
        <div class="job-title">Tech Leader <span class="company-name">at Macys.com – San Francisco, CA</span></div>
        <div class="job-date">Nov 2016 — Aug 2018</div>
      </div>
      <div class="job-summary">Technical leader for enterprise-wide CI/CD and platform modernization supporting Macy's and Bloomingdale's e-commerce engineering organizations.</div>
      <ul class="bullet-list">
        <li>Designed and delivered a company-wide CI/CD platform using Jenkins pipelines, Spinnaker, and Kubernetes reducing deployment time from 2–3 days to <strong>under 1 hour</strong> and enabling 100+ tested deployments per week.</li>
        <li>Implemented blue-green and canary deployment strategies, enabling near-zero-downtime releases for revenue-critical e-commerce workloads during peak retail periods.</li>
        <li>Designed a hybrid cloud architecture across GCP (GKE), AWS (ECS/EKS), and on-prem VMware Tanzu, enabling consistent workload execution across environments.</li>
        <li>Introduced early GitOps workflows using Flux CD, improving deployment consistency and reducing infrastructure provisioning errors during peak retail traffic.</li>
        <li>Led a team of 15 engineers across platform modernization and delivery tooling for both the Macy's and Bloomingdale's engineering organizations.</li>
      </ul>
    </div>

    <div class="section-title">EARLIER EXPERIENCE</div>
    <ul class="bullet-list">
      <li><strong>Prior Engineering Roles (2009 – 2016):</strong> Workday, Chegg, RocketFuel, Adobe, Saba Software, CMC</li>
      <li><strong>International Engineering Roles (2004 – 2009):</strong> Autonomy, SDG Group, HCL Tech, vCustomer (India)</li>
    </ul>

    <div class="section-title">EDUCATION</div>
    <div class="education-item">
      <div class="experience-header">
        <div class="education-degree">Bachelor of Science <span style="font-weight: 400; color: #555;">| Mahatma Gandhi Kashi Vidyapith | Varanasi, UP, India</span></div>
        <div class="job-date">June 2002</div>
      </div>
    </div>
    <div class="education-item">
      <div class="experience-header">
        <div class="education-degree">Leading Effective Decision-Making <span style="font-weight: 400; color: #555;">(certification) | Yale School of Management | Online</span></div>
        <div class="job-date">October 2021</div>
      </div>
    </div>
  </div>
</div>
