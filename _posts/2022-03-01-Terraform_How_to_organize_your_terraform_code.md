---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Terraform — How to organize your terraform code
author: Satyajit Roy
date: 2022-03-01
image: "/assets/uploads/03-terraform.png"
cross_post_url: "https://towardsdev.com/terraform-how-to-organize-your-terraform-code-8de70ac2734c/"
toc: true
categories: [Infrastructure]
tags: [DevOps, SRE, Terraform]
---

Like any other programming language, Terraform is a declarative language used to manage your infrastructure. Here is how HashiCorp defines the Terraform language:

![Terraform](https://github.com/kodelint/blog-assets/raw/main/images/01-terraform.jpeg)

> The Terraform language is declarative, describing an intended goal rather than the steps to reach that goal. The ordering of blocks and the files they are organized into are generally not significant; Terraform only considers implicit and explicit relationships between resources when determining an order of operations.

In Terraform, all your code can technically reside in a single file with a `.tf` extension. However, as your infrastructure grows, it makes more sense to segregate components into multiple files for better navigation and maintainability. Let's look at the core building blocks:

### 1. Terraform Resources
Resources are responsible for creating, modifying, or destroying infrastructure components. They are defined by the provider you choose.

```hcl
resource "aws_iam_role" "emr_service_role" {
  count              = var.instance_profile == "" ? 1 : 0
  name               = "${var.cluster_name}-${var.aws_region_shortname[var.aws_region]}-service-role"
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

### 2. Variables
Variables allow you to provide dynamic input to your resource parameters.

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
  type = map(any)
}
```

### 3. Providers
Providers define which APIs Terraform will interact with (e.g., AWS, Azure, GCP) and their required versions.

```hcl
terraform {
  required_providers {
    aws = {
      source  = "tfproviders/aws"
      version = "4.66.0"
    }
  }
}

provider "aws" {
  # Configuration options
}
```

### 4. Locals
Locals are Evaluable variables used for internal logic and interpolation before being fed into resource parameters.

```hcl
locals {
  iam_name = "${var.iam_prefix}-${var.aws_region_shortname[var.aws_region]}"
}
```

### 5. Outputs
Outputs export values from your Terraform run, which can be used as inputs for other modules or simply displayed to the user.

```hcl
output "iam_name" {
  description = "The Name of the IAM Role"
  value       = aws_iam_role.emr_service_role.name
}
```

---

## Recommended Project Structure

While putting everything in one file works, it becomes difficult to manage as soon as you introduce multiple modules or complex resources. The community has converged on a standard file segregation pattern:

*   `main.tf`: Defines the core provider resources.
*   `variables.tf`: Declares the input variables.
*   `locals.tf`: Handles Evaluated logic and local constants.
*   `providers.tf`: Configures the required providers and versions.
*   `outputs.tf`: Defines what data to export.
*   `terraform.tfvars`: Provides the actual input values for your variables.
*   `validators.tf`: (Personal Preference) I use this for `data` blocks that validate inputs against live infrastructure.

### Example Repository Layout

A typical well-organized Terraform project looks like this:

```text
.
├── README.md
├── locals.tf
├── providers.tf
├── main.tf
├── outputs.tf
├── validators.tf
└── variables.tf
```

For more complex environments involving tests and templates:

```text
.
├── README.md
├── main.tf
├── outputs.tf
├── providers.tf
├── templates/
│   ├── elasticsearch7.json.tpl
│   └── elasticsearch8.json.tpl
├── tests/
│   └── unittest/
│       └── suites/
│           ├── testcase01/
│           │   └── unittest.auto.tfvars
│           └── testcase02/
├── validators.tf
└── variables.tf
```

Following this structure makes your code predictable, searchable, and much easier for team collaboration.

## Happy Terraforming!!