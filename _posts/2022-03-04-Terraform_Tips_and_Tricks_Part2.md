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


## **[Terraform] Tips and Tricks — Part 2**

This is the continuation of my previous post [[Terraform] Tips and Tricks — Part 1](https://medium.com/@email2sroy/terraform-tips-and-tricks-part-1-6e0489c80c10). Here are some more **tips and tricks**

![](https://cdn-images-1.medium.com/fit/c/800/283/0*cDfxqylUSHWYJNGW.png) ✍︎

**AWS/Azure Region Short Names** are something we always used while creating our clusters/instance etc. Either they are part of the **name** or **tag**. So, I declared a variable with pre-defined short name as **map(any)**
    
    
    variable "aws_region_shortname" {
      default = {
        "us-west-1"      = "uw1",
        "us-west-2"      = "uw2",
        "us-east-1"      = "ue1",
        "us-east-2"      = "ue2",
        "ap-northeast-1" = "apne1",
        "ap-southeast-1" = "apse1",
      }
      type = map(any)
    }

and then access the **shortname** using **region** variable
    
    
    master_instance_group {
        instance_type  = var.master_instance_type
        instance_count = var.master_instance_count
        **name           = "${var.cluster_name}-${var.env}-${var.aws_region_shortname[var.aws_region]}-master"**
        ebs_config {
          size                 = var.master_instance_group_ebs_size
          type                 = var.master_instance_group_ebs_type
          volumes_per_instance = var.master_instance_group_ebs_volumes_per_instance
        }
      }

**Create Resource if not provided** is quite obvious, for example when you want to use an existing **security group** and **skip** the creation of **security group**. However if **security group** is not provided then you want to create a new one.
    
    
    ec2_attributes {
    **emr_managed_master_security_group = var.emr_managed_master_security_group == "" ? join("", aws_security_group.emr_managed_master_security_group.*.id) : var.emr_managed_master_security_group**    emr_managed_slave_security_group  = var.emr_managed_slave_security_group == "" ? join("", aws_security_group.emr_managed_slave_security_group.*.id) : var.emr_managed_slave_security_group
        service_access_security_group     = var.service_access_security_group == "" ? join("", aws_security_group.service_access_security_group.*.id) : var.service_access_security_group
    }

Above using **ternary operators** I am checking if **`var.emr_managed_master_security_group`****and** making a decision if need to create a new**security group.**

**Fail Fast** **is important** , as we know `terraform plan` only validates the `terraform` code not the facts about the **resource** or **resources.** Imagine waiting for a `emr` to come up for **15 mins** and it fails because the **custom** script which you install as part of **bootstrap** doesn’t exist.

To over come this I always perform **checks** and try to **fail in plan phase** itself. I always to **synthetic variable checks** for **typos** and then use the `data resource {}` to validate the values
    
    
    **## From tfvars**
    security_group_id = 'sg-abcdeftr1' 
    
    
    **## Validate Variable for Typo**
    variable "emr_managed_master_security_group" {
      default = ""
      type    = string
      validation {
        condition     = var.emr_managed_master_security_group == "" ? true : can(regex("^sg-", var.emr_managed_master_security_group))
        error_message = "The emr_managed_master_security_group value must start with \"sg-\"."
      }
    }
    
    
    **## Use Data block to validate the input** data "aws_security_group" "additional_slave_security_group" {
      id    = var.additional_slave_security_group
    }
    
    
    **## Then use data block output as input for resource parameter** resource "aws_emr_cluster" "cluster" {
      ...
      ...
      ...
    **additional_master_security_groups =   data.aws_security_group.additional_slave_security_group.id**
    }

This way I am able to validate if there are any **typos** and also if the provided **security group** exist in the `terraform plan` phase itself….neat right!!

**Using**`templatefile`**function** with **ternary** operator has been quite a savior for us. Look at the example below:
    
    
    resource "aws_emr_cluster" "cluster" {
      name                              = "${var.cluster_name}-${var.env}"
      ....
      ....
    
    
      **configurations_json = var.cluster_type == "HBase" ? templatefile("${path.module}/templates/emr_hbase_configuration.json.tmpl", { region_heap_size = var.region_server_heap_size }) : templatefile("${path.module}/templates/emr_spark_configuration.json.tmpl", { region_heap_size = var.region_server_heap_size })**
      ....
      ....
    
    
    }

We used the `templatefile` function to render a template based on the `var.cluster_type` variable.

Thats it for now, I will keep writing about these **Tips and Tricks** as I figure them…till than

## Happy Terraforming!!
