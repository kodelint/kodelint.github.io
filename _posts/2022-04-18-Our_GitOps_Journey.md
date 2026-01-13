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


In this blog, I will try to share our journey from being legitimate **script kiddies** to **GitOps** enabled Infrastructure. So like every other DevOps Team we had our fair share of circus, we owned a combination of things depending on who and what problem he/she was trying to solve.

Though we thought that we had a well-defined process for provisioning infrastructure

> `Python/Ruby/Bash` for spinning _**Cloud Components, Chef**_ for configuration management, _**Jenkins**_ to run Adhoc Jobs, **GitHub** for storing changes (If we remember to do so _🤪_)

However what we ended up having is a bunch of scripts, no version control concepts whatsoever, chef cookbooks with no idempotency and conflicting cookbook version, no Github checkin etc.

If I am being honest then we were in a very chaotic situation, with no confidence in our infrastructure, Outages were happening left, right and center and we didn’t know why?

> So we thought what should we do to **fix** this and come to state where we can gain more **confidence on our infrastructure** and start**following standards** ….🤔

### This is what we decided and started our path towards it

  * Become _**100% GitOps Compliant**_
  * Become _**Cloud Agnostic**_
  *  _**Infrastructure**_ with a well-defined **state** and only one source of **truth**
  * Make _**Application configuration**_ part of **provisioning** and also have provisions to change or update them with the same process
  * Make _**monitoring**_ part of provisioning
  * Version Certifications
  * Eliminate most of the manual stuff and automate them



We _**developed a framework**_ with the following tools to achieve the goals

![](https://cdn-images-1.medium.com/fit/c/800/434/1*GpCTg4jmQlvchUntPPJ6Dg.png)✍︎

Let me explain the roles of each tool, though it is pretty evident what they are used for

**`Terraform`****** we used `terraform` for cloud provisioning with both **Amazon** and **Azure.** We adopted the **modules** mechanism for `terraform` where a **component** will call multiple **modules** based on the **version**

![](https://cdn-images-1.medium.com/fit/c/800/533/1*uGEVKIVc4_7HYACPX2AkKQ.jpeg) ✍︎

**`Hashicorp Vault`****** is used to store all the**credentials** required for provisioning like _**Cloud credentials, Git credentials**_

**`Jenkins`** is used to run the _**provisioning/modification/updates/destruction**_

**`Golang`****** is used to write a **custom tool** to knit all these together

**`Github`****** is used for our source of truth

Here is how the whole flow looks like, from **start** to **end**

![](https://cdn-images-1.medium.com/fit/c/800/571/1*a9A5SX4nwVhInjzeoOvm8w.jpeg) ✍︎

With this **automation** , we were able to accomplish the following

  1. **Github** is our **one source of true**
  2. A well-defined **state** for our **infrastructure**
  3. Proper **lifecycle management** of the resources
  4. **Security** is the **first-class citizen**
  5. Less to no **manual work** related to provision or updates
  6. Proper **version control** and following standardized



### **Version Certification**

We also spent a good amount of time on **Version Certification,** where we certify _**`terraform modules versions`**_ with each other and maintain a version-controlled **component package**. A **component package** is a combination of `terraform modules`

![](https://cdn-images-1.medium.com/fit/c/800/1070/1*QNao_j5nWvK-qLR8mA7LPQ.jpeg)✍︎

We also started making **Profiles** based on use-cases so that most of them `terraform variable` can be populated automatically by just selecting the **profile type.** For example, _VPC Type, Subnets, Type of ELBs or ALBs needs to be used,_ etc etc

This is how the whole _**Certification**_ Process looks like

![](https://cdn-images-1.medium.com/fit/c/800/349/1*eoAA0rgVQEDd1nYc2zqdOg.png)✍︎

Overall we were able to achieve the goal we decided to on. Now all our deployments are initiated by **One single git commit.** Further **modifications** , **updates,** and **destruction** also follow the same control flow. We are way too confident on our infrastructure. Every change we introduce to our infrastructure is thoroughly tested. No more dealing with _**N**_ number of configuration files or scripts.

This process also made our life very easy for _**cost optimization**_ and resource _**lifecycle management**_.

**Rollbacks** became very easy as each resource has _**`build tag`**_ and _**`git commit`**_ tag attach to them so we could rollback whenever we see the need for it.

![](https://cdn-images-1.medium.com/fit/c/400/400/0*S2hIQ7q-2NefCqLV.jpg)✍︎

Maybe what we did is not something extraordinary in comparison to the industry or the community is already doing. However, when I look back from where we started, we really came along a long way, and gave us a great sense of accomplishment 🤩

Hope this gives you the motivation to accomplish and boost automation and reduce engineering costs. We can really achieve things with simplicity and already available tools

## Happy Deployments!!
