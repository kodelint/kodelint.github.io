---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Terraform - Solve Dynamic backend problem with Golang
author: Satyajit Roy
date: 2022-04-04
image: "/assets/uploads/01-terraform.png"
cross_post_url: "https://towardsdev.com/terraform-solve-dynamic-backend-problem-with-golang-85d381bc48b5/"
toc: true
categories: [Infrastructure]
tags: [DevOps, SRE, Terraform]
---


As I mentioned before in [my previous blog](https://awstip.com/terraform-some-gotcha-and-essentials-5e996c11d92f), `terraform` can store the `tfstate` file into a remote location. However the backend block needs to initialized with `terraform init` and it doesn’t support _**interpolation.**_ Meaning we have to populate below, before we run `terraform init` or use the `-backend-config` switch
    
    
    terraform {
       backend "s3" {
          bucket = "mybucket"
          key    = "path/to/my/key"
          region = "us-east-1"
       }
    }

So we have to change the `key` every time we are creating a new resource or combination of resources. For smaller deployment it is fine however for larger foot print it could be real a headache.

To solve this we have to dynamically generate the backend block before we do `terraform init` _(explained here_[my previous blog](https://awstip.com/terraform-some-gotcha-and-essentials-5e996c11d92f) _)_.

![](https://cdn-images-1.medium.com/fit/c/800/314/1*Fi_u9dDgaGzZwGn7QwhW8A.png)✍︎

## Goal

The goal is to have `tool` which can generate the backend block automatically and establish a _**1:1 Relationship**_ between `tfvars` and `tfstate` file. Here are some of rules for the `tool`

  1. `Tool` should be able to take environment variables for `S3` , `DynamoDB` and `Region`
  2. `Tool` should take `tfvars` file as argument
  3. `Tool` should be able to generate the backend configuration either using the environment variables or the absolute path of the `tfvars` file
  4. `Tool` should be able to run `terraform init` , `terraform plan` , `terraform apply` and `terraform destroy`
  5. `Tool` should be able to run `terraform init` , `terraform plan` , `terraform apply` if the given file name is `*.tfvars`
  6. `Tool` should be able to run `terraform plan -destroy` , `terraform destroy` if the given file name is `*.destroy`



## Explanation

Let me explain the logic. Let’s say our `tool` is called `autotf` and it has _**2**_ _**sub-commands**_`verify` and `deploy` . This is how we should be able to run it

### Flow Control and Decision Making

Depending on the file extension type the action will be performed.

![](https://cdn-images-1.medium.com/fit/c/800/600/1*3HKB5znMYp_thwDVAQ2kBQ.jpeg)✍︎

## Building Resources

### **`1. Verify Command`**

If we run the below command.
    
    
    export S3Bucket="some-s3-bucket"
    export Region="us-east-1"
    export DynamoDB="some-dynamodb-table"
    
    
    >> ./autotf verify stage/s3/autotf-testing01.tfvars

`autotf` should automatically generate the backend configuration and initialize `terraform` using it by running `terraform init` and then run `terraform plan` or `terraform plan -destroy` depending on the file name extension `*.tfvars` or `*.destroy` sequentially.

### Output

`[output.txt](https://gist.github.com/kodelint/f72e1402e23dd301626ade3a5461bbd3#file-output-txt)`
    
    
    INFO 2022-03-28 17:50:29 will run terraform init, plan on [autotf-testing01.tfvars]
    
    +------------------+----------------+-------------------------+-----------------------------------+
    | Resource Name    | Backend Bucket | TFVars Name             | Backend Key                       |
    +------------------+----------------+-------------------------+-----------------------------------+
    | autotf-testing01 | autotf-testing | autotf-testing01.tfvars | stage/s3/autotf-testing01.tfstate |
    +------------------+----------------+-------------------------+-----------------------------------+
    
    Initializing the backend...
    
    Successfully configured the backend "s3"! Terraform will automatically
    use this backend unless the backend configuration changes.
    
    Initializing provider plugins...
    - Finding latest version of hashicorp/aws...
    - Installing hashicorp/aws v4.8.0...
    - Installed hashicorp/aws v4.8.0 (signed by HashiCorp)
    
    Terraform has created a lock file .terraform.lock.hcl to record the provider
    selections it made above. Include this file in your version control repository
    so that Terraform can guarantee to make the same selections by default when
    you run "terraform init" in the future.
    
    Terraform has been successfully initialized!
    
    You may now begin working with Terraform. Try running "terraform plan" to see
    any changes that are required for your infrastructure. All Terraform commands
    should now work.
    
    If you ever set or change modules or backend configuration for Terraform,
    rerun this command to reinitialize your working directory. If you forget, other
    commands will detect it and remind you to do so if necessary.
    Acquiring state lock. This may take a few moments...
    
    Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
      + create
    
    Terraform will perform the following actions:
    
      # aws_s3_bucket.bucket will be created
      + resource "aws_s3_bucket" "bucket" {
          + acceleration_status                  = (known after apply)
          + acl                                  = (known after apply)
          + arn                                  = (known after apply)
          + bucket                               = "autotf-testing01"
          + bucket_domain_name                   = (known after apply)
          + bucket_regional_domain_name          = (known after apply)
          + cors_rule                            = (known after apply)
          + force_destroy                        = false
          + grant                                = (known after apply)
          + hosted_zone_id                       = (known after apply)
          + id                                   = (known after apply)
          + lifecycle_rule                       = (known after apply)
          + logging                              = (known after apply)
          + object_lock_enabled                  = (known after apply)
          + policy                               = (known after apply)
          + region                               = (known after apply)
          + replication_configuration            = (known after apply)
          + request_payer                        = (known after apply)
          + server_side_encryption_configuration = (known after apply)
          + tags                                 = {
              + "Environment" = "Dev"
              + "Name"        = "autotf-testing01"
            }
          + tags_all                             = {
              + "Environment" = "Dev"
              + "Name"        = "autotf-testing01"
            }
          + versioning                           = (known after apply)
          + website                              = (known after apply)
          + website_domain                       = (known after apply)
          + website_endpoint                     = (known after apply)
    
          + object_lock_configuration {
              + object_lock_enabled = (known after apply)
              + rule                = (known after apply)
            }
        }
    
    Plan: 1 to add, 0 to change, 0 to destroy.
    
    Changes to Outputs:
      + bucket_name = (known after apply)
    
    ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    
    Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly these actions if you run "terraform apply" now.
    Releasing state lock. This may take a few moments...

### `2. Deploy Command`

If we run the below command.
    
    
    export S3Bucket="some-s3-bucket"
    export Region="us-east-1"
    export DynamoDB="some-dynamodb-table"
    
    
    >> ./autotf deploy stage/s3/autotf-testing01.tfvars

### **Output**

`[output.txt](https://gist.github.com/kodelint/82f3f24462e72031ef869f730a1eb0bb#file-output-txt)`
    
    
    INFO 2022-03-28 18:07:27 will run terraform init, plan and apply on [autotf-testing01.tfvars]
    
    +------------------+----------------+-------------------------+-----------------------------------+
    | Resource Name    | Backend Bucket | TFVars Name             | Backend Key                       |
    +------------------+----------------+-------------------------+-----------------------------------+
    | autotf-testing01 | autotf-testing | autotf-testing01.tfvars | stage/s3/autotf-testing01.tfstate |
    +------------------+----------------+-------------------------+-----------------------------------+
    
    
    
    Initializing the backend...
    
    Initializing provider plugins...
    - Reusing previous version of hashicorp/aws from the dependency lock file
    - Using previously-installed hashicorp/aws v4.8.0
    
    Terraform has been successfully initialized!
    
    You may now begin working with Terraform. Try running "terraform plan" to see
    any changes that are required for your infrastructure. All Terraform commands
    should now work.
    
    If you ever set or change modules or backend configuration for Terraform,
    rerun this command to reinitialize your working directory. If you forget, other
    commands will detect it and remind you to do so if necessary.
    Acquiring state lock. This may take a few moments...
    
    Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
      + create
    
    Terraform will perform the following actions:
    
      # aws_s3_bucket.bucket will be created
      + resource "aws_s3_bucket" "bucket" {
          + acceleration_status                  = (known after apply)
          + acl                                  = (known after apply)
          + arn                                  = (known after apply)
          + bucket                               = "autotf-testing01"
          + bucket_domain_name                   = (known after apply)
          + bucket_regional_domain_name          = (known after apply)
          + cors_rule                            = (known after apply)
          + force_destroy                        = false
          + grant                                = (known after apply)
          + hosted_zone_id                       = (known after apply)
          + id                                   = (known after apply)
          + lifecycle_rule                       = (known after apply)
          + logging                              = (known after apply)
          + object_lock_enabled                  = (known after apply)
          + policy                               = (known after apply)
          + region                               = (known after apply)
          + replication_configuration            = (known after apply)
          + request_payer                        = (known after apply)
          + server_side_encryption_configuration = (known after apply)
          + tags                                 = {
              + "Environment" = "Dev"
              + "Name"        = "autotf-testing01"
            }
          + tags_all                             = {
              + "Environment" = "Dev"
              + "Name"        = "autotf-testing01"
            }
          + versioning                           = (known after apply)
          + website                              = (known after apply)
          + website_domain                       = (known after apply)
          + website_endpoint                     = (known after apply)
    
          + object_lock_configuration {
              + object_lock_enabled = (known after apply)
              + rule                = (known after apply)
            }
        }
    
    Plan: 1 to add, 0 to change, 0 to destroy.
    
    Changes to Outputs:
      + bucket_name = (known after apply)
    
    ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    
    Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly these actions if you run "terraform apply" now.
    Releasing state lock. This may take a few moments...
    Acquiring state lock. This may take a few moments...
    
    Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
      + create
    
    Terraform will perform the following actions:
    
      # aws_s3_bucket.bucket will be created
      + resource "aws_s3_bucket" "bucket" {
          + acceleration_status                  = (known after apply)
          + acl                                  = (known after apply)
          + arn                                  = (known after apply)
          + bucket                               = "autotf-testing01"
          + bucket_domain_name                   = (known after apply)
          + bucket_regional_domain_name          = (known after apply)
          + cors_rule                            = (known after apply)
          + force_destroy                        = false
          + grant                                = (known after apply)
          + hosted_zone_id                       = (known after apply)
          + id                                   = (known after apply)
          + lifecycle_rule                       = (known after apply)
          + logging                              = (known after apply)
          + object_lock_enabled                  = (known after apply)
          + policy                               = (known after apply)
          + region                               = (known after apply)
          + replication_configuration            = (known after apply)
          + request_payer                        = (known after apply)
          + server_side_encryption_configuration = (known after apply)
          + tags                                 = {
              + "Environment" = "Dev"
              + "Name"        = "autotf-testing01"
            }
          + tags_all                             = {
              + "Environment" = "Dev"
              + "Name"        = "autotf-testing01"
            }
          + versioning                           = (known after apply)
          + website                              = (known after apply)
          + website_domain                       = (known after apply)
          + website_endpoint                     = (known after apply)
    
          + object_lock_configuration {
              + object_lock_enabled = (known after apply)
              + rule                = (known after apply)
            }
        }
    
    Plan: 1 to add, 0 to change, 0 to destroy.
    
    Changes to Outputs:
      + bucket_name = (known after apply)
    aws_s3_bucket.bucket: Creating...
    aws_s3_bucket.bucket: Creation complete after 2s [id=autotf-testing01]
    Releasing state lock. This may take a few moments...
    
    Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
    
    Outputs:
    
    bucket_name = "autotf-testing01"

### Destroying Resources

Destroying resource will have the same control flow and will perform action based on the `tfvars` extension. If the file extension is `*.destroy` then **`verify`** will run `terraform init` , `terraform plan -destroy` and **`deploy`** will run `terraform init` and `terraform destroy`
    
    
    # Change the file name from *.tfvars to *.destroy
    
    
    **> > mv stage/s3/autotf-testing01.tfvars stage/s3/autotf-testing01.destroy**
    
    
    # Run the `autotf` deploy command again with filename
    
    
    **> > ./autotf deploy stage/s3/autotf-testing01.destroy**

### Output

`[output.tf](https://gist.github.com/kodelint/12fbb39c11ce956f03ebcd0f24d626ed#file-output-tf)`
    
    
    INFO 2022-03-28 18:13:07 will run terraform init, plan -destory on [autotf-testing01.destroy]
    
    Initializing the backend...
    
    Initializing provider plugins...
    - Reusing previous version of hashicorp/aws from the dependency lock file
    - Using previously-installed hashicorp/aws v4.8.0
    
    Terraform has been successfully initialized!
    
    You may now begin working with Terraform. Try running "terraform plan" to see
    any changes that are required for your infrastructure. All Terraform commands
    should now work.
    
    If you ever set or change modules or backend configuration for Terraform,
    rerun this command to reinitialize your working directory. If you forget, other
    commands will detect it and remind you to do so if necessary.
    Acquiring state lock. This may take a few moments...
    aws_s3_bucket.bucket: Refreshing state... [id=autotf-testing01]
    
    Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
      - destroy
    
    Terraform will perform the following actions:
    
      # aws_s3_bucket.bucket will be destroyed
      - resource "aws_s3_bucket" "bucket" {
          - acl                                  = "private" -> null
          - arn                                  = "arn:aws:s3:::autotf-testing01" -> null
          - bucket                               = "autotf-testing01" -> null
          - bucket_domain_name                   = "autotf-testing01.s3.amazonaws.com" -> null
          - bucket_regional_domain_name          = "autotf-testing01.s3.amazonaws.com" -> null
          - cors_rule                            = [] -> null
          - force_destroy                        = false -> null
          - grant                                = [] -> null
          - hosted_zone_id                       = "Z3AQBSTGFYJSTF" -> null
          - id                                   = "autotf-testing01" -> null
          - lifecycle_rule                       = [] -> null
          - logging                              = [] -> null
          - object_lock_enabled                  = false -> null
          - region                               = "us-east-1" -> null
          - replication_configuration            = [] -> null
          - request_payer                        = "BucketOwner" -> null
          - server_side_encryption_configuration = [] -> null
          - tags                                 = {
              - "Environment" = "Dev"
              - "Name"        = "autotf-testing01"
            } -> null
          - tags_all                             = {
              - "Environment" = "Dev"
              - "Name"        = "autotf-testing01"
            } -> null
          - versioning                           = [
              - {
                  - enabled    = false
                  - mfa_delete = false
                },
            ] -> null
          - website                              = [] -> null
        }
    
    Plan: 0 to add, 0 to change, 1 to destroy.
    
    Changes to Outputs:
      - bucket_name = "autotf-testing01" -> null
    
    ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    
    Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly these actions if you run "terraform apply" now.
    Releasing state lock. This may take a few moments...
    Acquiring state lock. This may take a few moments...
    aws_s3_bucket.bucket: Refreshing state... [id=autotf-testing01]
    
    Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
      - destroy
    
    Terraform will perform the following actions:
    
      # aws_s3_bucket.bucket will be destroyed
      - resource "aws_s3_bucket" "bucket" {
          - acl                                  = "private" -> null
          - arn                                  = "arn:aws:s3:::autotf-testing01" -> null
          - bucket                               = "autotf-testing01" -> null
          - bucket_domain_name                   = "autotf-testing01.s3.amazonaws.com" -> null
          - bucket_regional_domain_name          = "autotf-testing01.s3.amazonaws.com" -> null
          - cors_rule                            = [] -> null
          - force_destroy                        = false -> null
          - grant                                = [] -> null
          - hosted_zone_id                       = "Z3AQBSTGFYJSTF" -> null
          - id                                   = "autotf-testing01" -> null
          - lifecycle_rule                       = [] -> null
          - logging                              = [] -> null
          - object_lock_enabled                  = false -> null
          - region                               = "us-east-1" -> null
          - replication_configuration            = [] -> null
          - request_payer                        = "BucketOwner" -> null
          - server_side_encryption_configuration = [] -> null
          - tags                                 = {
              - "Environment" = "Dev"
              - "Name"        = "autotf-testing01"
            } -> null
          - tags_all                             = {
              - "Environment" = "Dev"
              - "Name"        = "autotf-testing01"
            } -> null
          - versioning                           = [
              - {
                  - enabled    = false
                  - mfa_delete = false
                },
            ] -> null
          - website                              = [] -> null
        }
    
    Plan: 0 to add, 0 to change, 1 to destroy.
    
    Changes to Outputs:
      - bucket_name = "autotf-testing01" -> null
    aws_s3_bucket.bucket: Destroying... [id=autotf-testing01]
    aws_s3_bucket.bucket: Destruction complete after 0s
    Releasing state lock. This may take a few moments...
    
    Destroy complete! Resources: 1 destroyed.

![](https://cdn-images-1.medium.com/fit/c/269/280/0*Cl3Gl69iTQO9iV61.png)✍︎

## autotf

As explained I have the `tool` ready which can be found [github/autotf](https://github.com/kodelint/autotf). However let me go through the control flow once so that we are clear how it is executing and what step comes after another.

> _Note: Tool_`autotf` I created just for demo purposes to show that how we can take care of one terraform’s biggest headache. I am actually using some similar but much more sophisticated at work. `autotf` _can perform all the tasks I mentioned, however it can me improved a lot…take it with a little grain of salt…._

![](https://cdn-images-1.medium.com/fit/c/800/600/1*3HKB5znMYp_thwDVAQ2kBQ.jpeg) ✍︎

Above flow control explains how the sequence of events will occur for `verify` and `deploy` sub-commands respectively. Because the backend configuration is getting generated dynamically with each `tfvars` file so we don’t have to persist it and it will always be the same as long as we used the same `tfvars` file.

Here is example for `verify` step for creating a **S3 Bucket.**

### Terraform Code
    
    
    terraform {
      backend "s3" {}
    }
    
    provider "aws" {
      region = var.region
    }
    
    resource "aws_s3_bucket" "bucket" {
      bucket = var.name
    
      tags = {
        Name        = var.name
        Environment = "Dev"
      }
    }
    
    variable "region" {
      type = string
    }
    variable "name" {
      type = string
    }
    
    output "bucket_name" {
      value = aws_s3_bucket.bucket.id
    }

### Command I Ran

**> >>** `./autotf verify stage/s3/autotf-testing01.tfvars`

### **Output**

`[output.txt](https://gist.github.com/kodelint/f72e1402e23dd301626ade3a5461bbd3#file-output-txt)`
    
    
    INFO 2022-03-28 17:50:29 will run terraform init, plan on [autotf-testing01.tfvars]
    
    +------------------+----------------+-------------------------+-----------------------------------+
    | Resource Name    | Backend Bucket | TFVars Name             | Backend Key                       |
    +------------------+----------------+-------------------------+-----------------------------------+
    | autotf-testing01 | autotf-testing | autotf-testing01.tfvars | stage/s3/autotf-testing01.tfstate |
    +------------------+----------------+-------------------------+-----------------------------------+
    
    Initializing the backend...
    
    Successfully configured the backend "s3"! Terraform will automatically
    use this backend unless the backend configuration changes.
    
    Initializing provider plugins...
    - Finding latest version of hashicorp/aws...
    - Installing hashicorp/aws v4.8.0...
    - Installed hashicorp/aws v4.8.0 (signed by HashiCorp)
    
    Terraform has created a lock file .terraform.lock.hcl to record the provider
    selections it made above. Include this file in your version control repository
    so that Terraform can guarantee to make the same selections by default when
    you run "terraform init" in the future.
    
    Terraform has been successfully initialized!
    
    You may now begin working with Terraform. Try running "terraform plan" to see
    any changes that are required for your infrastructure. All Terraform commands
    should now work.
    
    If you ever set or change modules or backend configuration for Terraform,
    rerun this command to reinitialize your working directory. If you forget, other
    commands will detect it and remind you to do so if necessary.
    Acquiring state lock. This may take a few moments...
    
    Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
      + create
    
    Terraform will perform the following actions:
    
      # aws_s3_bucket.bucket will be created
      + resource "aws_s3_bucket" "bucket" {
          + acceleration_status                  = (known after apply)
          + acl                                  = (known after apply)
          + arn                                  = (known after apply)
          + bucket                               = "autotf-testing01"
          + bucket_domain_name                   = (known after apply)
          + bucket_regional_domain_name          = (known after apply)
          + cors_rule                            = (known after apply)
          + force_destroy                        = false
          + grant                                = (known after apply)
          + hosted_zone_id                       = (known after apply)
          + id                                   = (known after apply)
          + lifecycle_rule                       = (known after apply)
          + logging                              = (known after apply)
          + object_lock_enabled                  = (known after apply)
          + policy                               = (known after apply)
          + region                               = (known after apply)
          + replication_configuration            = (known after apply)
          + request_payer                        = (known after apply)
          + server_side_encryption_configuration = (known after apply)
          + tags                                 = {
              + "Environment" = "Dev"
              + "Name"        = "autotf-testing01"
            }
          + tags_all                             = {
              + "Environment" = "Dev"
              + "Name"        = "autotf-testing01"
            }
          + versioning                           = (known after apply)
          + website                              = (known after apply)
          + website_domain                       = (known after apply)
          + website_endpoint                     = (known after apply)
    
          + object_lock_configuration {
              + object_lock_enabled = (known after apply)
              + rule                = (known after apply)
            }
        }
    
    Plan: 1 to add, 0 to change, 0 to destroy.
    
    Changes to Outputs:
      + bucket_name = (known after apply)
    
    ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    
    Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly these actions if you run "terraform apply" now.
    Releasing state lock. This may take a few moments...

As I mentioned before in [my previous blog](https://awstip.com/terraform-some-gotcha-and-essentials-5e996c11d92f) with the help of some external tool to achieve the dynamic backend configuration generation and we did it. We can even run this tool in `docker` container ([How ? Explained here](https://towardsdev.com/run-golang-app-inside-a-docker-container-8cb6e64ae722)) in our CI System.

### Some Rules I personally follow

  1.  _I always make sure that_**Resource Name** = **TFvars filename** = **TFstate filename** _are same. Helps me to establish the 1:1 Relationship properly_
  2.  _In case of multiple resources forming one entity, names are automatically derived from primary resource name._
  3. _Keep_`tfvars` as short as possible, means provide `defaults` _everywhere._
  4. _Try to use_`ternary operators` _as much as possible to help both computed and provided values_
  5.  _Make the modules as nimble as possible that they self sufficient in nature_
  6.  _Write_`validator` _as much as possible to support fail fast_
  7.  _Try not to use_`depends_on` _as much as possible_

![](https://cdn-images-1.medium.com/fit/c/600/300/0*UeE0sRZ1m9zUAlix.png) ✍︎

Using external tool gives us the ability to operate on `terraform` without editing or changing the backend configuration manually at each iterations. Backend configuration being generated or calculated based on some predefined logic is the way to go.

## Happy Coding and Terraforming!!
