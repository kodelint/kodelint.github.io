---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Terraform Tips and Tricks — Part 1
author: Satyajit Roy
date: 2022-03-02
image: "/assets/uploads/02-terraform-tips.png"
cross_post_url: "https://awstip.com/terraform-tips-and-tricks-part-1-6e0489c80c10/"
toc: true
categories: [Infrastructure]
tags: [DevOps, SRE, Terraform]
---

I have been using Terraform for a long time now, working with versions ranging from `0.11.x` all the way to `1.1.x`. Over the years, I've adopted several patterns that make the code more robust and manageable.

Here are some **tips and tricks** I frequently use while writing Terraform code.

### 1. Variable Verification

Starting with Terraform version `0.13`, HashiCorp introduced a way to validate variables before they are used in resources. This is a great way to catch configuration errors early in the `plan` phase.

**Example: Validating VPC IDs**
If you want to ensure a provided `vpc_id` starts with the standard `vpc-` prefix:

```hcl
variable "vpc_id" {
  default = ""
  type    = string

  validation {
    condition     = can(regex("^vpc-", var.vpc_id))
    error_message = "The vpc_id value must start with \"vpc-\"."
  }
}
```

**Example: Restricting Environments**
You can restrict an `env` variable to a pre-defined set of allowed values:

```hcl
variable "env" {
  default = ""
  type    = string

  validation {
    condition     = contains(["dev", "stage", "perf", "prod"], var.env)
    error_message = "Possible environments are \"dev\", \"stage\", \"perf\", and \"prod\"."
  }
}
```

**Example: Validating Lists**
You can even iterate through a list to validate each element:

```hcl
variable "security_groups" {
  type    = list(string)
  default = []

  validation {
    condition = var.security_groups == [] ? true : alltrue([
      for sg in var.security_groups : can(regex("^sg-", sg))
    ])
    error_message = "The security_groups value must be a list of strings starting with \"sg-\"."
  }
}
```

> **Note:** The `validation` block supports ternary and logical operators (`||`, `&&`, `?:`). A constraint is that the block can only validate the variable in which it is declared.

### 2. Dynamic Blocks

The `dynamic` block is used to produce nested blocks within a resource. It acts much like a `for` expression, iterating over a complex value and generating a nested block for each element.

**Example: Generating Inline Policies**

```hcl
resource "aws_iam_role" "emr_service_role" {
  count              = var.instance_profile == "" ? 1 : 0
  name               = var.cluster_name
  assume_role_policy = join("", data.aws_iam_policy_document.emr_service_assume_role.*.json)

  dynamic "inline_policy" {
    for_each = local.emr_service_role_policy
    content {
      name   = inline_policy.value.name
      policy = inline_policy.value.policy
    }
  }
}
```

### 3. Conditional Resource Creation

You can control whether a resource is created using the `count` parameter.

**Example: Using Boolean Flags**
If `enable_s3_endpoint` is true, the resource is created; otherwise, it is skipped.

```hcl
resource "aws_vpc_endpoint" "s3" {
  count        = var.enable_s3_endpoint ? 1 : 0
  vpc_id       = module.vpc.vpc_id
  service_name = "com.amazonaws.${var.aws_region}.s3"
  tags         = merge(local.tags, var.custom_tags)
}
```

**Example: Using String Values**

```hcl
resource "aws_vpc_endpoint" "s3" {
  count        = var.enable_s3_endpoint == "yes" ? 1 : 0
  vpc_id       = module.vpc.vpc_id
  service_name = "com.amazonaws.${var.aws_region}.s3"
}
```

### 4. Conditional Module Execution

Starting with version `0.13.x`, you can apply the same `count` logic to entire modules.

**Example: Optional DNS Module**

```hcl
module "emr_spark_dns" {
  count     = contains(var.applications, "Spark") ? 1 : 0
  source    = "./route53"
  zone_name = data.aws_route53_zone.selected.name
  records   = local.spark_records
  create    = true
}
```

These are some of the fundamental techniques I use to keep my infrastructure code clean and fail-safe. I will compile more advanced techniques in **[Terraform Tips and Tricks — Part 2](https://awstip.com/terraform-tips-and-tricks-part-2-3c463c3d5ea2)**

**Stay Tuned!**

## Happy Terraforming!!
