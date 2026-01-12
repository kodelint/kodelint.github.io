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

Like any other programming language terraform is also a declarative language to manage your infrastructure. This is how **Hashicorp** defines terraform language

![](https://github.com/kodelint/blog-assets/raw/main/images/01-terraform.jpeg)

> _The Terraform language is declarative, describing an intended goal rather than the steps to reach that goal. The ordering of blocks and the files they are organized into are generally not significant; Terraform only considers implicit and explicit relationships between resources when determining an order of operations._

In terraform all your code can be in just one file ending with `.tf` extension and it will perform as expected. However let take look at the _blocks_ , _expressions_ and _arguments_ in **terraform** which we usually refers as components and see it make sense to keep them in **just one file** or **segregate them in multiple files.**

- **Terraform Resources** are responsible to _**create/modify or destroy**_ your infrastructure component. They usually comes with the provider we choose (mentioned below)

```terraform
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

- `Variables` are used to provide input to the resource `parameters`.

```terraform
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

resource "aws_iam_role" "emr_service_role" {
    name = "${var.cluster_name}-${var.aws_region_shortname[var.aws_region]}-service-role"
    ...
    ...
}
```

- **`Providers`** name and version of the provider which provide the above **terraform** resource

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

- `Locals` local variables which needs to be evaluated before feeding them to resource parameters

```terraform
locals {
  iam_name = "${var.iam_prefix}-${var.aws_region_shortname[var.aws_region]}"
}

resource "aws_iam_role" "emr_service_role" {
    name = local.iam_name
    ...
    ...
}
```

- **Variable File** terraform automatically identifies a file with `.tfvars` as variable file and expects all the inputs for the variables to be present in the file.

```bash
iam_prefix = "example-iam"
```

- **Output Variables** are exported to be used as input for other parameters or as a result of `terraform` run

```terraform
output "iam_name" {
  description = "The Name of the IAM Role"
  value       = aws_iam_role.emr_service_role.name
}
```

So now we are aware of the type components terraform has and what they are used for. Now the question is **should we segregate them or just put all of them in one file**

As mentioned before putting all of them in one `.tf` file and inputs in one `.tfvars` should do the job. However, it will be very difficult to navigate the code, establish a relationship, hierarchy or make sense out of it. If you are using **multiple modules** _**(module = combination of multiple resources )**_ or even **multiple resources** then it will become way difficult to manage.

To overcome this community has come up with following file structure for any terraform code

>

- `main.tf` will be used to define all the provider resources
- `variables.tf` will be used to declare variables for the values required by provider resource parameters
- `locals.tf` will be used for all local variables and interpolation
- `providers.tf` will be used to define the providers and the respective versions
- `validators.tf` as I mentioned before that `tfvars` input should go to `data {}` and the exported attribute of the `data {}` should be fed to _**resource parameter**_. I prefer to keep them in `validators.tf`
- `outputs.tf` will be used to define all terraform output variables
- `examples.tfvars` will be used to provide all the input values for the variables

#### This is how usually a terraform repository looks like

```bash
.
├── README.md
├── locals.tf
├── providers.tf
├── main.tf
├── outputs.tf
├── validators.tf
└── variables.tf
```

With this type of file segregation we can easily identify and assume what to expect in them respectively. Nothing stops us to simplify them more or use more files which make sense like templates or configs etc. Something like below

```bash
├── README.md
├── chef-attributes.tf
├── main.tf
├── outputs.tf
├── providers.tf
├── templates
│   ├── elasticsearch7.json.tpl
│   └── elasticsearch8.json.tpl
├── tests
│   └── unittest
│       └── suites
│           ├── component-testcase01
│           │   └── unittest.auto.tfvars
│           ├── component-testcase02
│           │   └── unittest.tfvars
│           └── component-testcase03
├── validators.tf
└── variables.tf
```

Hope this make sense and helps you to organize your terraform code in more readable and manageable way

## Happy Terraforming!!
