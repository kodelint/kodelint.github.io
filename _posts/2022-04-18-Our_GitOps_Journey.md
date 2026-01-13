---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Our journey to GitOps
author: Satyajit Roy
date: 2022-04-18
image: "/assets/uploads/01-script-kids.png"
cross_post_url: "https://awstip.com/our-journey-to-gitops-7ea7552e3ba9"
toc: true
categories: [Golang, GitOps]
tags: [GitOps, Productivity, Automation]
---

In this blog, I will share our journey from being legitimate **script kiddies** to a **GitOps-enabled Infrastructure**. Like every other DevOps Team, we had our fair share of chaos; we owned a combination of tools depending on who was working and what problem they were trying to solve.

We _thought_ we had a well-defined process for provisioning infrastructure:

> `Python/Ruby/Bash` for spinning up **Cloud Components**, `Chef` for configuration management, `Jenkins` to run Adhoc Jobs, and **GitHub** for storing changes (if we remembered to do so 🤪).

However, what we ended up with was a bunch of disparate scripts, no real version control concepts, Chef cookbooks with no idempotency and conflicting versions, and often no GitHub check-ins.

If I am being honest, we were in a very chaotic situation with no confidence in our infrastructure. Outages were happening left, right, and center, and often we didn’t know why.

> So we thought: _What should we do to **fix** this? How can we reach a state where we have **confidence in our infrastructure** and start **following standards**?_ 🤔

### The Plan

We decided on a roadmap to guide us toward a stable, automated future:

- Become **100% GitOps Compliant**.
- Become **Cloud Agnostic**.
- Maintain **Infrastructure** with a well-defined **state** and only one **source of truth**.
- Make **Application configuration** part of provisioning, with provisions to change or update them using the same process.
- Make **monitoring** part of provisioning.
- Implement Version Certifications.
- Eliminate most manual tasks and automate them.

### The Framework

We developed a framework with the following tools to achieve our goals:

![Framework Diagram](https://cdn-images-1.medium.com/fit/c/800/434/1*GpCTg4jmQlvchUntPPJ6Dg.png)

Let me explain the role of each tool:

- **Terraform**: We used Terraform for cloud provisioning with both **Amazon** and **Azure**. We adopted the **modules** mechanism where a **component** will call multiple **modules** based on the **version**.
- **HashiCorp Vault**: Used to store all the credentials required for provisioning, such as **Cloud credentials** and **Git credentials**.
- **Jenkins**: Used to run the **provisioning**, **modification**, **updates**, and **destruction** pipelines.
- **Golang**: Used to write a **custom tool** to knit all these technologies together.
- **GitHub**: Used as our absolute source of truth.

### The Architecture

Here is how the whole flow looks, from start to end:

![GitOps Flow Diagram](https://cdn-images-1.medium.com/fit/c/800/571/1*a9A5SX4nwVhInjzeoOvm8w.jpeg)

With this **automation**, we were able to accomplish the following:

1.  **GitHub** is our **one source of truth**.
2.  A well-defined **state** for our **infrastructure**.
3.  Proper **lifecycle management** of resources.
4.  **Security** is a **first-class citizen**.
5.  Little to no **manual work** related to provisioning or updates.
6.  Proper **version control** and standardization.

### Version Certification

We also spent a good amount of time on **Version Certification**, where we certify **terraform module versions** with each other and maintain a version-controlled **component package**. A component package is simply a combination of specific Terraform modules tested together.

{% capture profile_content %}
#### **The Power of Profiles**

To streamline our infrastructure delivery, we introduced the concept of **Infrastructure Profiles**. Instead of requiring developers to understand every nuance of VPC CIDRs or subnet IDs, we abstracted these into pre-defined archetypes.

*   **Standardized Blueprints**: We created **Profiles** based on specific use-cases (e.g., 'Internal Tooling', 'High-Traffic API', 'Database Cluster'). 
*   **Automated Injection**: Most Terraform variables are now populated automatically simply by selecting a profile type. This includes complex networking configurations like *VPC Type, Subnets, and Load Balancer (ELB/ALB) attributes*.
*   **Reduced Friction**: This abstraction allows our engineering teams to focus on their application logic rather than the plumbing of the cloud provider. 
*   **Consistency**: By using profiles, we ensure that every environment—from Dev to Prod—follows the same structural standards, eliminating the "it worked in Dev" surprises during production rollouts.
{% endcapture %}

<div style="display: flex; gap: 30px; align-items: flex-start; flex-wrap: wrap; margin-bottom: 2rem;">
  <div style="flex: 1; min-width: 300px;">
    <img src="https://cdn-images-1.medium.com/fit/c/800/1070/1*QNao_j5nWvK-qLR8mA7LPQ.jpeg" alt="Version Certification" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <p style="text-align: center; font-size: 0.8rem; color: #6b7280; margin-top: 0.5rem; font-style: italic;">Figure: Component Packaging Structure</p>
  </div>
  <div style="flex: 1.2; min-width: 300px;">
    {{ profile_content | markdownify }}
  </div>
</div>

### The Certification Workflow

This is how the whole **Certification** Process looks:

<div class="mermaid">
graph LR
    A[Develop Module] --> B{Unit Test}
    B -->|Fail| A
    B -->|Pass| C[Tag Release]
    C --> D[Update Component Package]
    D --> E{Integration Test}
    E -->|Fail| D
    E -->|Pass| F([Certified Version])
    
    style A fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#fff
    style B fill:#1e293b,stroke:#facc15,stroke-width:2px,color:#fff
    style C fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#fff
    style D fill:#1e293b,stroke:#c084fc,stroke-width:2px,color:#fff
    style E fill:#1e293b,stroke:#facc15,stroke-width:2px,color:#fff
    style F fill:#1e293b,stroke:#34d399,stroke-width:2px,color:#fff
</div>

### Conclusion

Overall, we were able to achieve the goals we set out for. Now, all our deployments are initiated by **one single git commit**. Further **modifications**, **updates**, and **destruction** also follow the same controlled flow. We are now far more confident in our infrastructure. Every change we introduce is thoroughly tested. No more dealing with _N_ number of manual configuration files or scripts.

This process also made our lives very easy for **cost optimization** and resource **lifecycle management**.

**Rollbacks** became straightforward as each resource has a **build tag** and **git commit** tag attached to it, allowing us to rollback whenever necessary.

![Success](https://cdn-images-1.medium.com/fit/c/400/400/0*S2hIQ7q-2NefCqLV.jpg)

Maybe what we did isn't extraordinary compared to what the industry giants or the community are already doing. However, when I look back at where we started, we have come a long way, and that gives us a great sense of accomplishment. 🤩

Hope this gives you the motivation to boost automation and reduce engineering toil. We can truly achieve great things with simplicity and the tools already available to us.

## Happy Deployments!!
