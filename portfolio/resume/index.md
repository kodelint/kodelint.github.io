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
        AI &amp; Cloud Infrastructure Executive | GPU Platforms, Kubernetes at Scale, SRE
      </div>
      <div class="resume-contact">
        San Mateo, CA 94404 &nbsp;|&nbsp; (561) 866-3499 &nbsp;|&nbsp; <a href="mailto:emailme@sroy.tech">emailme@sroy.tech</a> &nbsp;|&nbsp;
        <a href="https://linkedin.com/in/satyajitroychoudhury/">LinkedIn</a> &nbsp;|&nbsp;
        <a href="https://sroy.tech/portfolio">Portfolio</a> &nbsp;|&nbsp;
        <a href="https://sroy.tech">Personal Site</a>
      </div>
    </header>

    <div class="section-title">SUMMARY</div>
    <div style="text-align: justify; font-size: 12pt;">
      I build the infrastructure that AI and search products run on. Over 20 years I have designed GPU clusters sitting behind roughly 30 billion requests a day, cleaned up Kubernetes estates spread across three clouds, and owned global SRE with full P&amp;L for security-critical SaaS. Right now I am hands-on again: a multi-cluster GKE build, GitOps, model training pipelines, and agentic workflows inside a HIPAA environment. I have run a 55-person org and built a 20-person one from nothing, and I stay close enough to the architecture to make the hard calls myself.
    </div>

    <div class="section-title">CORE STRENGTHS</div>
    <div class="expertise-grid">
      <div class="expertise-column">
        <h3>AI/ML Infrastructure</h3>
        <ul class="expertise-list">
          <li>NVIDIA V100, A100, T4</li>
          <li>MIG &amp; GPU-aware Scheduling</li>
          <li>RDMA, InfiniBand, RoCE</li>
          <li>Kubeflow, Volcano, MLflow</li>
          <li>QLoRA Fine-tuning</li>
          <li>LangGraph Agentic Workflows</li>
          <li>Vertex AI</li>
          <li>LiteLLM Multi-model Routing</li>
          <li>TensorFlow Detection Models</li>
          <li>Inference Optimization</li>
        </ul>
      </div>
      <div class="expertise-column">
        <h3>Cloud &amp; Platform</h3>
        <ul class="expertise-list">
          <li>GCP, AWS, Azure</li>
          <li>GKE, EKS, AKS</li>
          <li>ArgoCD, Flux CD</li>
          <li>Pulumi, Terraform, Crossplane</li>
          <li>Cilium / eBPF</li>
          <li>Temporal</li>
          <li>Microservices &amp; API Platforms</li>
          <li>CI/CD &amp; Release Engineering</li>
        </ul>
      </div>
      <div class="expertise-column">
        <h3>Reliability &amp; Operations</h3>
        <ul class="expertise-list">
          <li>SLO/SLI Design</li>
          <li>Incident Command</li>
          <li>OpenTelemetry, Prometheus, Grafana, Jaeger, ELK</li>
          <li>Chaos Engineering</li>
          <li>Blameless Postmortems</li>
          <li>Follow-the-sun On-call</li>
        </ul>
      </div>
    </div>
    <div class="expertise-grid">
      <div class="expertise-column">
        <h3>Security &amp; Compliance</h3>
        <ul class="expertise-list">
          <li>HIPAA, GDPR, FedRAMP High, SOC 2, PCI-DSS</li>
          <li>OPA/Kyverno Policy-as-Code</li>
          <li>Zero Trust &amp; Mutual TLS</li>
          <li>Runtime eBPF Monitoring</li>
          <li>PHI Redaction</li>
          <li>Secrets Management</li>
        </ul>
      </div>
      <div class="expertise-column">
        <h3>Data &amp; Storage</h3>
        <ul class="expertise-list">
          <li>Elasticsearch at 10B+ Documents</li>
          <li>High-ingestion Pipelines</li>
          <li>Multi-tenant Search Architecture</li>
          <li>Object Storage Lifecycle &amp; Tiering</li>
          <li>Sub-5ms P95 Latency</li>
        </ul>
      </div>
      <div class="expertise-column">
        <h3>Leadership</h3>
        <ul class="expertise-list">
          <li>Org Design &amp; Headcount Planning</li>
          <li>Manager of Managers</li>
          <li>P&amp;L &amp; Budget Ownership</li>
          <li>Build vs Buy</li>
          <li>FinOps</li>
          <li>Executive &amp; Board Stakeholder Mgmt</li>
        </ul>
      </div>
    </div>

    <div class="section-title">EXPERIENCE</div>

    <div class="experience-item">
      <div class="experience-header">
        <div class="job-title">Head of Engineering and Infrastructure <span class="company-name">at Mandolin – San Francisco, CA</span></div>
        <div class="job-date">March 2026 — Present</div>
      </div>
      <div class="job-summary">Founding infrastructure hire at a HIPAA-regulated healthcare company. I own the entire platform: PHI and EHR data systems, containerized services, OCR pipelines, model training, evals, and agentic workflows.</div>
      <ul class="bullet-list">
        <li><strong style="color: var(--resume-accent-color);">Platform rebuild:</strong> Running Coral, a rebuild of the whole platform off managed Cloud Run and hosted ArgoCD onto self-hosted multi-cluster GKE across four GCP projects, with a MongoDB Atlas to Cloud SQL PostgreSQL migration going in parallel. No downtime, roughly 280 tracked work items.</li>
        <li><strong style="color: var(--resume-accent-color);">ML platform:</strong> Building the ML side on the same infrastructure: training pipelines, QLoRA fine-tuning of Qwen2.5-Coder on our own codebase, eval harnesses, and LangGraph workflows that take a ticket and open a pull request.</li>
        <li><strong style="color: var(--resume-accent-color);">LLM gateway:</strong> Designed the company gateway, LiteLLM on GKE with Vertex AI behind it, using Presidio for PHI redaction and OpenTelemetry for tracing, so every model call gets routed, logged, and checked against our PHI rules in one place.</li>
        <li><strong style="color: var(--resume-accent-color);">Cost:</strong> Took monthly infrastructure spend from $250K down to $57K while the footprint kept growing, using Kubecost and BigQuery for FinOps reporting.</li>
        <li><strong style="color: var(--resume-accent-color);">Reliability and security:</strong> Took MTTR down 40% by automating incident triage. Tightened the platform with OPA/Kyverno policy gates, continuous scanning through Wiz and Snyk, Cilium/eBPF networking, and GCP IAP in front of internal cluster UIs.</li>
        <li><strong style="color: var(--resume-accent-color);">Team:</strong> Built the engineering and infrastructure team from nothing to 20 engineers, and stood up an internal developer portal that cut onboarding and knowledge lookup time by more than half.</li>
      </ul>
    </div>

    <div class="experience-item">
      <div class="experience-header">
        <div class="job-title">Director of Engineering and SRE <span class="company-name">at Arkose Labs – San Mateo, CA</span></div>
        <div class="job-date">Aug 2024 — June 2025</div>
      </div>
      <div class="job-summary">Fraud detection SaaS. Owned platform engineering and SRE across reliability, cost, and security posture. Role eliminated in a company restructuring.</div>
      <ul class="bullet-list">
        <li><strong>Platform re-architecture:</strong> Rebuilt the platform on EKS microservices with an eBPF service mesh. It took <strong>7x transaction growth</strong> in 10 months and held <strong>99.9% SLA</strong> under constant attack traffic.</li>
        <li><strong>ML detection:</strong> Built TensorFlow-based detection for credential stuffing and bot activity that cut false positives <strong>65%</strong> while holding a <strong>99.8% mitigation rate</strong>, which showed up directly in renewals.</li>
        <li><strong>Incident response:</strong> Cut P1 resolution time <strong>58%</strong> by fixing observability and SOC signal quality. I ran high-severity incident command myself until the on-call team had the tools and process to take it over.</li>
        <li><strong>Cost and edge:</strong> Brought cloud spend down <strong>22%</strong> without capping capacity. Moved from Cloudflare to CloudFront with Lambda@Edge and took <strong>35%</strong> off edge latency.</li>
        <li><strong>Team:</strong> Grew the group from 4 to 16 engineers across two teams, managed 2 engineering managers, and owned the hiring plan.</li>
      </ul>
    </div>

    <div class="experience-item">
      <div class="experience-header">
        <div class="job-title">Sr. Director, Product Engineering &amp; Head of SRE <span class="company-name">at F5 Inc – San Jose, CA</span></div>
        <div class="job-date">Oct 2022 — April 2024</div>
      </div>
      <div class="job-summary">Full P&amp;L for Platform Engineering and Global SRE across F5 Distributed Cloud: 21+ PoPs, multi-cloud, security-critical.</div>
      <ul class="bullet-list">
        <li><strong>Org:</strong> Ran an organization of <strong>55+ engineers</strong> as a manager of managers, 3 Directors and 1 Senior Manager, and owned the hiring plan, headcount, and operating budget.</li>
        <li><strong>Scale and cost:</strong> The platform took <strong>400% growth</strong> in attack traffic and <strong>200%+ customer growth</strong> without infrastructure spend growing to match. Annual TCO came down <strong>30%</strong> and feature delivery went up <strong>40%</strong>, mostly from being strict about what we built versus what we bought.</li>
        <li><strong>Reliability:</strong> Cut MTTR <strong>73%</strong> and held <strong>99.92%+</strong> availability after rebuilding observability on ELK, Jaeger, and ML-based anomaly detection, with blameless retrospectives behind it.</li>
        <li><strong>Compliance:</strong> Worked with the CISO to get FedRAMP High, PCI-DSS, and SOC 2 done through policy-as-code, zero-trust architecture, mutual TLS, and runtime eBPF monitoring. That opened up regulated telecom and financial services customers.</li>
        <li><strong>Multi-tenancy:</strong> Led the architecture for secure multi-tenant and private-island deployments to meet data residency rules for global telecom and financial services clients.</li>
      </ul>
    </div>

    <div class="experience-item">
      <div class="experience-header">
        <div class="job-title">Architect / Technical Leader <span class="company-name">at Adobe Inc – San Jose, CA</span></div>
        <div class="job-date">Aug 2018 — Oct 2022</div>
      </div>
      <div class="job-summary">Technical lead for the hyperscale infrastructure behind Adobe Core Search and the Sensei ML platform.</div>
      <ul class="bullet-list">
        <li><strong>Hyperscale infrastructure:</strong> Built and ran hybrid GPU/CPU infrastructure across AWS, Azure, and on-prem serving roughly <strong>30 billion API requests a day</strong> at <strong>99.98%+ availability</strong>.</li>
        <li><strong>GPU and HPC:</strong> Designed the NVIDIA V100 and A100 HPC clusters: RDMA InfiniBand, MIG partitioning, and GPU-aware scheduling through Kubeflow and Volcano. Cluster utilization went up <strong>38%</strong>.</li>
        <li><strong>Search architecture:</strong> Moved managed AWS Elasticsearch to a self-managed hybrid setup, 18 clusters and <strong>10B+ documents</strong> at 6,000 writes/sec, holding sub-5ms P95 and taking <strong>30%</strong> off licensing.</li>
        <li><strong>Kubernetes consolidation:</strong> Pulled scattered Kubernetes environments into 15 multi-tenant Cilium/eBPF clusters and got rid of <strong>90%</strong> of the cluster sprawl. Adobe engineering picked up the reference architecture more widely afterward.</li>
        <li><strong>Storage economics:</strong> Cut cloud storage cost <strong>65%</strong> through lifecycle and tiering policies across search and ML pipelines, without giving up sub-5ms P95 latency.</li>
        <li><strong>Team:</strong> Led 12 senior platform engineers and set the architecture direction for search and ML infrastructure used across Adobe's product portfolio.</li>
      </ul>
    </div>

    <div class="experience-item">
      <div class="experience-header">
        <div class="job-title">Tech Leader <span class="company-name">at Macys.com – San Francisco, CA</span></div>
        <div class="job-date">Nov 2016 — Aug 2018</div>
      </div>
      <ul class="bullet-list">
        <li><strong>CI/CD platform:</strong> Built the company-wide CI/CD platform on Jenkins, Spinnaker, and Kubernetes. Deployments went from 2-3 days to under an hour, and we got to <strong>100+ tested deploys a week</strong>.</li>
        <li><strong>Safe releases:</strong> Put blue-green and canary deployments in place so revenue-critical e-commerce workloads could ship during peak retail without downtime.</li>
        <li><strong>Hybrid cloud:</strong> Built hybrid cloud across GKE, AWS ECS/EKS, and on-prem VMware Tanzu with early Flux CD GitOps, which cut provisioning errors during peak traffic.</li>
        <li><strong>Team:</strong> Led 15 engineers across platform modernization and delivery tooling for Macy's and Bloomingdale's.</li>
      </ul>
    </div>

    <div class="section-title">EARLIER EXPERIENCE</div>
    <ul class="bullet-list">
      <li><strong>2009 – 2016:</strong> Workday, Chegg, RocketFuel, Adobe, Saba Software, Campus Management Corp</li>
      <li><strong>2004 – 2009 (India):</strong> Autonomy Interwoven, SDG Corporation, HCL Technologies, vCustomer</li>
    </ul>

    <div class="section-title">EDUCATION</div>
    <div class="education-item">
      <div class="experience-header">
        <div class="education-degree">B.S., Computer Science <span style="font-weight: 400; color: #555;">| Mahatma Gandhi Kashi Vidyapith | Varanasi, India</span></div>
        <div class="job-date">2002</div>
      </div>
    </div>
    <div class="education-item">
      <div class="experience-header">
        <div class="education-degree">Leading Effective Decision-Making <span style="font-weight: 400; color: #555;">(certification) | Yale School of Management | Online</span></div>
        <div class="job-date">2021</div>
      </div>
    </div>
  </div>
</div>
