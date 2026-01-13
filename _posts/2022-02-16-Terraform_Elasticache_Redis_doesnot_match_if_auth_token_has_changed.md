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

Recently I [wrote](https://medium.com/@email2sroy/amazon-redis-cache-terraform-build-cluster-from-snapshots-not-supported-wait-what-770c3f94b57f) about how to use the `elasticache_replication_group` Terraform resource to create an ElastiCache Cluster in AWS. Here is something I discovered later.

> **Updating anything on an existing ElastiCache cluster keeps indicating that it will re-create the `elasticache_replication_group`... but why?**

Even though I was changing parameters like autoscaling or the number of nodes, Terraform still tried to re-create the entire cluster. After inspecting the **provider code**, nothing looked immediately indicative of this behavior. Then I looked at the provider version—we were using an older version (**3.0.0**) and found the [culprit](https://github.com/hashicorp/terraform-provider-aws/blob/v3.0.0/aws/resource_aws_elasticache_replication_group.go).

![Provider Code Snippet](https://cdn-images-1.medium.com/fit/c/800/97/1*1sMfAL2L3fQzLnrl5lpV_w.png)

Basically, I had created an **Auth-enabled** Redis Cluster for the default Redis user. Later, whenever I used the same `tfvars` to update any parameter, Terraform assumed the **Auth Token** was being refreshed or updated. This happens because there is no verification of whether the Auth Token has actually changed at the Terraform or AWS ElastiCache API level. It looks something like this in the UI:

![Terraform Plan Output](https://cdn-images-1.medium.com/fit/c/800/395/1*vN6CKa8LR4MFg85Soue0HQ.png)

**Bottom Line:** The AWS ElastiCache API and Terraform Provider (v3.0.0) don't detect if the Auth Token is the same; they always treat it as a new token, triggering a resource replacement.

### The Fix

The solution was simple: I made the `auth_token` assignment conditional.

**From this:**

```hcl
auth_token = var.transit_encryption_enabled ? var.auth_token : null
```

**To this:**

```hcl
auth_token = var.transit_encryption_enabled && var.existing_cluster == false ? var.auth_token : null
```

Now, if the variable `var.existing_cluster` is set to `true`, the `var.auth_token` never gets populated for existing clusters, and Terraform performs the update correctly without recreation.

Another option would be to upgrade the AWS provider to a version where `ForcesNew` has been removed from this field:

![New Provider Version](https://cdn-images-1.medium.com/fit/c/800/92/1*8bIkBXHJInVtdAzRoR4Stw.png)

However, that wasn't straightforward for our infrastructure due to other dependencies. By making this simple conditional change, we saved ourselves a lot of headache!

## Happy Terraforming!!