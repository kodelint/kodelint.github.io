---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Terraform - Build Amazon Redis Cache from Snapshots are not supported. Wait What!!
author: Satyajit Roy
date: 2022-02-16
image: "/assets/uploads/01-terraform-redis.png"
cross_post_url: "https://awstip.com/amazon-redis-cache-terraform-build-cluster-from-snapshots-not-supported-wait-what-770c3f94b57f/"
toc: true
categories: [Infrastructure]
tags: [DevOps, SRE, Terraform]
---

### Introduction

Let me start saying that terraform is an amazing tool for infrastructure automation and gives you the ability to be Truly Cloud Agnostic and manage a state for your infrastructure I have been working with terraform for quite sometime and have used pretty most of the plugins and providers.

### The Problem: Restoring ElastiCache from Snapshots

Probably a year back I was working on module for **Amazon ElastiCache** and stumbled upon a issue: If you want to create a elasticache cluster from backups to the mentioned slots using `terraform` then `terraform` gives up!!

As the plugin doesn't support that.

### Limitations of the Terraform AWS Provider

Though it is pretty much possible from Amazon UI, means APIs are there however the terraform resource `elasticache_replication_group` doesn't support that.

The variable `snapshot_arns` can be used to provide the location of the backups, which is usually S3, however there is not way to assign Slots for the them I decided to check the `elasticache_replication_group` code and see if it is possible to introduce the same.

I looked at the code As you can see that snapshot_arns are there but no way to provide Slots information. There is [Github Issue](https://github.com/hashicorp/terraform-provider-aws/issues/5510) for this as well

### The Solution: Custom Fork and Enhancement

As a result I forked the repo as [tfproviders/aws-terraform-provider](https://github.com/tfproviders/aws-terraform-provider) and introduced following changes: Add `node_group_configuration {}` block `node_group_configuration` takes slots as `list(string)` So now my terraform code for `aws_elasticache_replication_group` looks like this

```terraform
resource "aws_elasticache_replication_group" "restore" {
  replication_group_id = "tf-redis-cluster"
  replication_group_description = "test description"
  node_type = "cache.t2.small"
  port = 6379
  parameter_group_name = "default.redis3.2.cluster.on"
  automatic_failover_enabled = true
  snapshot_arns = [ "arn:aws:s3:::s3-bucket/snapshot-0001.rdb", "arn:aws:s3:::s3-bucket/snapshot-0002.rdb"]
  node_group_configuration {
    slots = [ "0-5461", "5462-10922" ]
  }
  cluster_mode {
    replicas_per_node_group = 1
    num_node_groups = 2
  }
}
```

### Result

Each element of Slots maps to `snaphot_arns` and Voila!!

I was able to create **Amazon ElastiCache** using terraform resource elasticache_replication_group from backups with slots information.

### Usage

To use my forked version of **Terraform AWS Provider** add following to your terraform code and here is the published provider [tfproviders/aws](https://github.com/tfproviders/aws).

```terraform
terraform {
  required_providers {
    aws = {
      source = "tfproviders/aws"
      version = "4.66.0"
    }
  }
}
provider "aws" {
  # Configuration options
}
```

### Conclusion

Happy Terraforming!!