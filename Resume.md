---
title: Resume
layout: page
---
# SATYAJIT ROY CHOUDHURY

**AI & Cloud Infrastructure Executive | GPU Platforms, Kubernetes at Scale, SRE**
San Mateo, CA 94404 | (561) 866-3499 | talk2sroy.ch@gmail.com | [LinkedIn](https://www.linkedin.com/in/satyajitroychoudhury/) | [Portfolio](https://sroy.tech/portfolio/) | [Personal Site](https://sroy.tech/)

---

## SUMMARY
I build the infrastructure that AI and search products run on. Over 20 years I have designed GPU clusters sitting behind roughly 30 billion requests a day, cleaned up Kubernetes estates spread across three clouds, and owned global SRE with full P&L for security-critical SaaS. Right now I am hands-on again: a multi-cluster GKE build, GitOps, model training pipelines, and agentic workflows inside a HIPAA environment. I have run a 55-person org and built a 20-person one from nothing, and I stay close enough to the architecture to make the hard calls myself.

---

## CORE STRENGTHS

### AI/ML Infrastructure
NVIDIA V100, A100, T4 · MIG and GPU-aware scheduling · RDMA, InfiniBand, RoCE · Kubeflow, Volcano, MLflow · QLoRA fine-tuning · LangGraph agentic workflows · Vertex AI · LiteLLM multi-model routing · TensorFlow detection models · inference optimization

### Cloud & Platform
GCP, AWS, Azure · GKE, EKS, AKS · ArgoCD, Flux CD · Pulumi, Terraform, Crossplane · Cilium/eBPF · Temporal · microservices and API platforms · CI/CD and release engineering

### Reliability & Operations
SLO/SLI design · incident command · OpenTelemetry, Prometheus, Grafana, Jaeger, ELK · chaos engineering · blameless postmortems · follow-the-sun on-call

### Security & Compliance
HIPAA, GDPR, FedRAMP High, SOC 2, PCI-DSS · OPA/Kyverno policy-as-code · zero trust and mutual TLS · runtime eBPF monitoring · PHI redaction · secrets management

### Data & Storage
Elasticsearch at 10B+ documents · high-ingestion pipelines · multi-tenant search architecture · object storage lifecycle and tiering · sub-5ms P95 latency

### Leadership
org design and headcount planning · manager of managers · P&L and budget ownership · build vs buy · FinOps · executive and board stakeholder management

---

## EXPERIENCE

### Head of Engineering and Infrastructure at Mandolin – San Francisco, CA (March 2026 — Present)
Founding infrastructure hire at a HIPAA-regulated healthcare company. I own the entire platform: PHI and EHR data systems, containerized services, OCR pipelines, model training, evals, and agentic workflows.
*   **Platform rebuild:** Running Coral, a rebuild of the whole platform off managed Cloud Run and hosted ArgoCD onto self-hosted multi-cluster GKE across four GCP projects, with a MongoDB Atlas to Cloud SQL PostgreSQL migration going in parallel. No downtime, roughly 280 tracked work items.
*   **ML platform:** Building the ML side on the same infrastructure: training pipelines, QLoRA fine-tuning of Qwen2.5-Coder on our own codebase, eval harnesses, and LangGraph workflows that take a ticket and open a pull request.
*   **LLM gateway:** Designed the company gateway, LiteLLM on GKE with Vertex AI behind it, using Presidio for PHI redaction and OpenTelemetry for tracing, so every model call gets routed, logged, and checked against our PHI rules in one place.
*   **Cost:** Took monthly infrastructure spend from $250K down to $57K while the footprint kept growing, using Kubecost and BigQuery for FinOps reporting.
*   **Reliability and security:** Took MTTR down 40% by automating incident triage. Tightened the platform with OPA/Kyverno policy gates, continuous scanning through Wiz and Snyk, Cilium/eBPF networking, and GCP IAP in front of internal cluster UIs.
*   **Team:** Built the engineering and infrastructure team from nothing to 20 engineers, and stood up an internal developer portal that cut onboarding and knowledge lookup time by more than half.

### Director of Engineering and SRE at Arkose Labs – San Mateo, CA (Aug 2024 — June 2025)
Fraud detection SaaS. Owned platform engineering and SRE across reliability, cost, and security posture. Role eliminated in a company restructuring.
*   **Platform re-architecture:** Rebuilt the platform on EKS microservices with an eBPF service mesh. It took **7x transaction growth** in 10 months and held **99.9% SLA** under constant attack traffic.
*   **ML detection:** Built TensorFlow-based detection for credential stuffing and bot activity that cut false positives **65%** while holding a **99.8% mitigation rate**, which showed up directly in renewals.
*   **Incident response:** Cut P1 resolution time **58%** by fixing observability and SOC signal quality. I ran high-severity incident command myself until the on-call team had the tools and process to take it over.
*   **Cost and edge:** Brought cloud spend down **22%** without capping capacity. Moved from Cloudflare to CloudFront with Lambda@Edge and took **35%** off edge latency.
*   **Team:** Grew the group from 4 to 16 engineers across two teams, managed 2 engineering managers, and owned the hiring plan.

### Sr. Director, Product Engineering & Head of SRE at F5 Inc – San Jose, CA (Oct 2022 — April 2024)
Full P&L for Platform Engineering and Global SRE across F5 Distributed Cloud: 21+ PoPs, multi-cloud, security-critical.
*   **Org:** Ran an organization of **55+ engineers** as a manager of managers, 3 Directors and 1 Senior Manager, and owned the hiring plan, headcount, and operating budget.
*   **Scale and cost:** The platform took **400% growth** in attack traffic and **200%+ customer growth** without infrastructure spend growing to match. Annual TCO came down **30%** and feature delivery went up **40%**, mostly from being strict about what we built versus what we bought.
*   **Reliability:** Cut MTTR **73%** and held **99.92%+** availability after rebuilding observability on ELK, Jaeger, and ML-based anomaly detection, with blameless retrospectives behind it.
*   **Compliance:** Worked with the CISO to get FedRAMP High, PCI-DSS, and SOC 2 done through policy-as-code, zero-trust architecture, mutual TLS, and runtime eBPF monitoring. That opened up regulated telecom and financial services customers.
*   **Multi-tenancy:** Led the architecture for secure multi-tenant and private-island deployments to meet data residency rules for global telecom and financial services clients.

### Architect / Technical Leader at Adobe Inc – San Jose, CA (Aug 2018 — Oct 2022)
Technical lead for the hyperscale infrastructure behind Adobe Core Search and the Sensei ML platform.
*   **Hyperscale infrastructure:** Built and ran hybrid GPU/CPU infrastructure across AWS, Azure, and on-prem serving roughly **30 billion API requests a day** at **99.98%+ availability**.
*   **GPU and HPC:** Designed the NVIDIA V100 and A100 HPC clusters: RDMA InfiniBand, MIG partitioning, and GPU-aware scheduling through Kubeflow and Volcano. Cluster utilization went up **38%**.
*   **Search architecture:** Moved managed AWS Elasticsearch to a self-managed hybrid setup, 18 clusters and **10B+ documents** at 6,000 writes/sec, holding sub-5ms P95 and taking **30%** off licensing.
*   **Kubernetes consolidation:** Pulled scattered Kubernetes environments into 15 multi-tenant Cilium/eBPF clusters and got rid of **90%** of the cluster sprawl. Adobe engineering picked up the reference architecture more widely afterward.
*   **Storage economics:** Cut cloud storage cost **65%** through lifecycle and tiering policies across search and ML pipelines, without giving up sub-5ms P95 latency.
*   **Team:** Led 12 senior platform engineers and set the architecture direction for search and ML infrastructure used across Adobe's product portfolio.

### Tech Leader at Macys.com – San Francisco, CA (Nov 2016 — Aug 2018)
*   **CI/CD platform:** Built the company-wide CI/CD platform on Jenkins, Spinnaker, and Kubernetes. Deployments went from 2-3 days to under an hour, and we got to **100+ tested deploys a week**.
*   **Safe releases:** Put blue-green and canary deployments in place so revenue-critical e-commerce workloads could ship during peak retail without downtime.
*   **Hybrid cloud:** Built hybrid cloud across GKE, AWS ECS/EKS, and on-prem VMware Tanzu with early Flux CD GitOps, which cut provisioning errors during peak traffic.
*   **Team:** Led 15 engineers across platform modernization and delivery tooling for Macy's and Bloomingdale's.

---

## EARLIER EXPERIENCE
*   **2009 – 2016:** Workday, Chegg, RocketFuel, Adobe, Saba Software, Campus Management Corp
*   **2004 – 2009 (India):** Autonomy Interwoven, SDG Corporation, HCL Technologies, vCustomer

---

## EDUCATION
*   **B.S., Computer Science** | Mahatma Gandhi Kashi Vidyapith | Varanasi, India | 2002
*   **Leading Effective Decision-Making (certification)** | Yale School of Management | Online | 2021
