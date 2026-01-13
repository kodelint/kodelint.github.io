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


## [Terraform] Tips and Tricks — Part 1

![](https://cdn-images-1.medium.com/fit/c/800/283/1*OAuGm2Nc5p5pmbhOEYPQOw.png)✍︎

I have been using `terraform` for long now. I have used **Terraform version**`0.11.x --to-> 1.1.x`**** time to time based on what is available and what we could adopt.

Here are some **tips and tricks** I have been using while writing terraform code

  * **Variable Verification** with `terraform` version `0.13` onward, **Hashicorp** has introduced a way to validate the variables provided to terraform resources.



**For example:** If you are trying to provide **`vpc_id`** to `terraform resource` and you want to validate that the provided input starts with `vpc-*`
    
    
    variable "vpc_id" {
      default = ""
      type    = string
    **validation {
        condition     = can(regex("^vpc-", var.vpc_id))
        error_message = "The vpc_id value must start with \"vpc-\"."
      }**
    }

As we can see that we are validating the **input** for **`vpc_id`****to** starts with `vpc-*` with the help of **`validation{}`** block. A **`validation{}`** block provides the ability to validate an input based on some _conditions._
    
    
    variable "env" {
      default = ""
      type    = string
      validation {
        condition     = contains(["dev", "stage", "perf", "prod"], var.env)
        error_message = "Possible environments are \"Dev\", \"Stage\", \"Perf\" and \"Prod\"!."
      }
    }

Above example we can see how I was able to restrict the `env` variable values, which has been **declared** proactively.
    
    
    variable "security_groups" {
      type    = list(any)
      default = []
      validation {
        condition = var.security_groups == [] ? true : alltrue([
          for sg in var.security_groups : can(regex("^sg-", sg))
        ])
        error_message = "The security_groups value must be a list of strings starting with \"sg-\"."
      }
    }

In above example I was able to validate if **list of security groups** starts with `sg-*` in a **loop**. I am using a `for` loop to iterate through **List** and validate.

_**Note:**_ The `validation{}` block’s `condition` parameter supports all ternary and logical operators ( `||` , `&&` , `?:` ). One constraint is that `validation{}`_block can only validate the variable where it has been declared!!_

  * **Dynamic** block can be used to produces nested blocks, it acts much like a [`for`](https://www.terraform.io/language/expressions/for)[ expression](https://www.terraform.io/language/expressions/for). It iterates over a given complex value, and generates a nested block for each element of that complex value.



**For Examples:**
    
    
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

  * **Conditional Resource creation** can be archived with terraform `count` parameter.



**For example:**`enable_s3_endpoint` is **boolean** variable and if it is set to **True** then `count` will be set **`1`****** else `count` will set to **`0`****.** Based on the `count` the resource will execute (if set to **1**) or skip (if set to **0**).
    
    
    resource "aws_vpc_endpoint" "s3" {
      **count        = var.enable_s3_endpoint ? 1 : 0**
      vpc_id       = module.vpc.vpc_id
      service_name = "com.amazonaws.${var.aws_region}.s3"
      tags         = merge(local.tags, var.custom_tags)
    }

Not necessary that the deciding variable needs to be **boolean** in type. It could be very well a **string** type.

**For example:** below `enable_s3_endpoint` is a **string** type variable and if it is set to **`yes`****** then the resource will be created otherwise skipped!!
    
    
    resource "aws_vpc_endpoint" "s3" {
      **count        = var.enable_s3_endpoint == 'yes' ? 1 : 0**
      vpc_id       = module.vpc.vpc_id
      service_name = "com.amazonaws.${var.aws_region}.s3"
      tags         = merge(local.tags, var.custom_tags)
    }

**Conditional Module Creation** is only possible if you are using terraform version **`0.13.x`** or above. Where we can make a module execution based on some condition.

**For Example:** below the module will only `execute` if `var.applications` has **Spark** as application. If `var.applications` has **Spark** as application it set the `count` to **1** else **0**
    
    
    module "emr_spark_dns" {
      count     = contains(var.applications, "Spark") ? 1 : 0
      source    = "./route53"
      zone_name = data.aws_route53_zone.selected.name
      records   = local.spark_records
      create    = contains(var.applications, "Spark") ? true : false
    }

Above were some of the **tips and tricks** I use pretty much all the time. I will compile more of these **tricks** in **[Terraform] Tips and Tricks — Part 2.**

**……Stay Tuned…..**

## Happy Terraforming!!
