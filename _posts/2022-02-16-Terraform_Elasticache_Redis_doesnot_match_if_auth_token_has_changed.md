---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Terraform - Elasticache Redis doesn’t match if auth token has changed
author: Satyajit Roy
date: 2022-02-16
image: "/assets/uploads/01-terraform-redis.png"
cross_post_url: "https://awstip.com/terraform-why-you-keep-saying-that-you-will-recreate-my-elasticache-cluster-ae690937488b/"
toc: true
categories: [Infrastructure]
tags: [DevOps, SRE, Terraform]
---


Recently I [wrote](https://medium.com/@email2sroy/amazon-redis-cache-terraform-build-cluster-from-snapshots-not-supported-wait-what-770c3f94b57f) about how to use `elasticache_replication_group` terraform resource to create Elasticache Cluster in Amazon. Here is something I found out later

 _**Updating anything on an existing elasticache cluster keeps saying that it will re-create the**_`elasticache_replication_group` _**….but why ??**_

Even though I was changing something like autoscaling or number of nodes it still tried to re-create the cluster. After looking at the **provider code,** nothing looked alarming or indicative for the behavior. Then I looked at the provider version, we were using older version **3.0.0** and found the******[culprit](https://github.com/hashicorp/terraform-provider-aws/blob/v3.0.0/aws/resource_aws_elasticache_replication_group.go)** _(my bad, I should have looked at that first)_

![](https://cdn-images-1.medium.com/fit/c/800/97/1*1sMfAL2L3fQzLnrl5lpV_w.png) ✍︎

Basically I created **Auth** enabled Redis Cluster for default redis user. Later whenever I used the same `tfvars` to update anything terraform assumed that **Auth** is getting refreshed or updated as there is no verification of **Auth** being updated or not at terraform level or even the AWS Elasticache API level. Something like this in UI.

![](https://cdn-images-1.medium.com/fit/c/800/395/1*vN6CKa8LR4MFg85Soue0HQ.png)✍︎

 _**Bottom Line:**_ AWS Elasticache API or Terraform Provider [**3.0.0**] doesn’t care if **Auth Token** has change or not, it always treats it like new _**Auth Token**_

The **Fix** was easy, I simply made the **Auth** conditional

**From This:**
    
    
    auth_token = var.transit_encryption_enabled ? var.auth_token : null

**To This:**
    
    
    auth_token = var.transit_encryption_enabled && var.existing_cluster == false ? var.auth_token : null

Now if the variable `var.existing_cluster` is set `True` then `var.auth_token` never gets populated and terraform performs the way it should.

Other option would be to upgrade the **provider** to latest where `ForcesNew` has been removed:

![](https://cdn-images-1.medium.com/fit/c/800/92/1*8bIkBXHJInVtdAzRoR4Stw.png)✍︎

Which was not that straight forward for our **Infrastructure** and other **dependencies**

By making that simple change, we saved a lot of headache…feww!!

## Happy Terraforming!!
