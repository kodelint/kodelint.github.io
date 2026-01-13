---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Terraform Tips and Tricks — Part 2
author: Satyajit Roy
date: 2022-03-04
image: "/assets/uploads/02-terraform-tips.png"
cross_post_url: "https://awstip.com/terraform-tips-and-tricks-part-2-3c463c3d5ea2/"
toc: true
categories: [Infrastructure]
tags: [DevOps, SRE, Terraform]
---

This is the continuation of my previous post [Terraform Tips and Tricks — Part 1](https://sroy.tech/infrastructure/2022/03/02/Terraform_Tips_and_Tricks_Part1.html). Here are some more advanced patterns and logic I use to keep Terraform projects efficient.

### 1. Dynamic Region Short Names

We often use region short names (like `uw2` for `us-west-2`) in our resource names or tags. Instead of hardcoding them, I declare a map variable:

```hcl
variable "aws_region_shortname" {
  default = {
    "us-west-1"      = "uw1",
    "us-west-2"      = "uw2",
    "us-east-1"      = "ue1",
    "us-east-2"      = "ue2",
    "ap-northeast-1" = "apne1",
    "ap-southeast-1" = "apse1",
  }
  type = map(string)
}
```

You can then access the short name dynamically based on the current region:

```hcl
master_instance_group {
    instance_type  = var.master_instance_type
    instance_count = var.master_instance_count
    name           = "${var.cluster_name}-${var.env}-${var.aws_region_shortname[var.aws_region]}-master"

    ebs_config {
      size                 = var.master_instance_group_ebs_size
      type                 = var.master_instance_group_ebs_type
      volumes_per_instance = var.master_instance_group_ebs_volumes_per_instance
    }
}
```

### 2. Conditional Resource Adoption

A common use case is using an existing resource (like a security group) if provided, or creating a new one if not. I use ternary operators to handle this logic:

```hcl
ec2_attributes {
    emr_managed_master_security_group = var.emr_managed_master_security_group == "" ? join("", aws_security_group.emr_managed_master_security_group.*.id) : var.emr_managed_master_security_group
    emr_managed_slave_security_group  = var.emr_managed_slave_security_group == "" ? join("", aws_security_group.emr_managed_slave_security_group.*.id) : var.emr_managed_slave_security_group
    service_access_security_group     = var.service_access_security_group == "" ? join("", aws_security_group.service_access_security_group.*.id) : var.service_access_security_group
}
```

### 3. Fail Fast: Validation with Data Blocks

Terraform `plan` only validates HCL syntax, not the existence of external resources. Imagine waiting 15 minutes for an EMR cluster to boot, only for it to fail because a bootstrap script path was mistyped.

To overcome this, I use `data` blocks to validate inputs during the `plan` phase:

```hcl
# 1. Validate Variable for Typos using regex
variable "security_group_id" {
  type    = string
  validation {
    condition     = can(regex("^sg-", var.security_group_id))
    error_message = "The security_group_id must start with \"sg-\"."
  }
}

# 2. Use a Data block to validate existence
data "aws_security_group" "selected" {
  id = var.security_group_id
}

# 3. Use the data block's ID in the resource
resource "aws_emr_cluster" "cluster" {
  # ...
  additional_master_security_groups = [data.aws_security_group.selected.id]
}
```

If the Security Group doesn't exist, Terraform will fail immediately during `terraform plan`.

### 4. Dynamic Template Selection

Using the `templatefile` function with a ternary operator allows you to switch configurations based on high-level logic:

```hcl
resource "aws_emr_cluster" "cluster" {
  name = "${var.cluster_name}-${var.env}"

  configurations_json = var.cluster_type == "HBase" ?
    templatefile("${path.module}/templates/emr_hbase_configuration.json.tmpl", { heap_size = var.heap_size }) :
    templatefile("${path.module}/templates/emr_spark_configuration.json.tmpl", { heap_size = var.heap_size })
}
```

This keeps the resource definition clean while handling complex environment-specific configurations.

That's it for Part 2! I'll keep sharing these tips as I refine our internal infrastructure patterns.

## Happy Terraforming!!
