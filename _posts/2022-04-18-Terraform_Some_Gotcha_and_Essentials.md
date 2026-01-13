---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Terraform - Some Gotcha and Essentials
author: Satyajit Roy
date: 2022-04-18
image: "/assets/uploads/02-terraform.png"
cross_post_url: "https://awstip.com/terraform-some-gotcha-and-essentials-5e996c11d92f/"
toc: true
categories: [Infrastructure]
tags: [DevOps, SRE, Terraform]
---


**Terraform** is an awesome tool and covers a lot of ground for us, however there are some _gotcha_ and _essentials_ which one needs to be aware of. I will try to consolidate them here.

### **Module Source can’t be interpolated**

The `source` parameter in module are responsible to provide the source location from where `terraform` will try to fetch the module. It supports multiple options ([documented here](https://www.terraform.io/language/modules/sources)) like `terraform registry` , `git` , `local` etc. It also provides the `?ref=x.x.x` suffix to append any **Git Revision.** Something like this
    
    
    module "emr" {
      source = "git::[https://internal-github.com/emr.git?ref=v5.5.](https://example.com/vpc.git?ref=v1.2.0)1"
    }
    
    
    module "emr" {   # Also supports the HASH (the whole hash)
      source = "git::[https://internal-github.com/emr.git?ref=](https://example.com/vpc.git?ref=v1.2.0)80e473"
    }

Though if want that the _version_ to be interpolatable then it is not possible. Reason behind currently modules need to be pre-fetched using `terraform get` prior to `terraform plan`, and currently that command does not take any arguments to set variables. `Terraform Plan` assumed the module to already be retrieved into the `.terraform` subdirectory
    
    
    module "emr" {
      source = "git::[https://internal-github.com/emr.git?ref=](https://example.com/vpc.git?ref=v1.2.0)${var.version}" ❌ wont work
    }

Workaround would be to have something which runs before `terraform init `and gets you all the modules in some path say `/apps/terraform/emr/modules/emr `and in modules `source` use local path `/apps/terraform/emr/modules/emr`

### Terraform Backend block can’t be interpolated

The `backend` block in `terraform` provide the remote location where you want to store your `tfstate` file. For the same reason that the remote location initialization happens with `init` . Here is [Github Issue](https://github.com/hashicorp/terraform/issues/15131) open almost **5 years** back. Below is not possible
    
    
    ❌ This will not work
    
    
    terraform {
      backend "s3" {
        bucket = var.terraform_backend_bucket
        key    = var.backend_path
        region = var.aws_region
      }
    }

We ca do something like below, however here also you need to know the endpoints before hand, so no interpolation supported
    
    
    terraform init \
        -backend-config="bucket=some-bucket-in-s3" \
        -backend-config="key=some/path/in/s3/terraform.tfstate" \
        -backend-config="region=us-east-1"

Workaround would be to have something which runs before `terraform init` and generate the `backend {}` and write it to file say `backend.tf` and then run `terraform init` .

_**Pro-Tip:**_ I am doing something very similar at work where I dynamically generate `backend.tf` for each `tfvars` with custom `tfstate` name. So, I have 1:1 relation between **`tfvars:tfstate`** . Makes life so easy!! only touch the `tfstate` whose `tfvars` _has been modified_

### Data Block doesn’t allow run-anyway

Hear me out, I am big fan of validating the inputs from `tfvars` . I put the input in `data {}` just to verify that resource I am using exist so that I don’t have to wait for the execution to fail at `apply` phase. It should fail in `plan` phase if the resource doesn’t exist.

However, say you want to make sure that the `S3 Bucket` name provided in `tfvars` is unique, so you run the input in [`aws_s3_bucket`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/s3_bucket) and validate, if the resource exist then you can exit the execution saying it exist, however if it doesn’t that `data {}` will fail and wont let the execution move forward and you wont be able to create the bucket even if it doesn’t exist. All because `data {}` doesn’t have the ability to ignore the error and allow `run-anyway`
    
    
    data "aws_s3_bucket" "selected" {
      bucket = var.bucket_name   ❌ Will fail if bucket doesn't exist
    }
    
    
    resource "aws_s3_bucket" "my-bucket" {
      bucket = data.aws_s3_bucket.selected.id ❌ Wont execute
    }

Workaround would be to have something which runs `aws-cli` or `aws-sdk` to validate the **bucket name** and if it doesn’t then runs the `terraform` code.

_**Pro-tip:**_ One can use `contain` _function to validate. Make the resource_ _**conditional**_ using `count` and `contain` . Something like _`count = contain(data.resource.names, var.resource_name)? 0 : 1`_

### Variable validation can’t use reference to another variable

When writing a `variable {}` we can use `validation {}` to validate the variable on certain standards, however the _validation_ can’t reference to another variable
    
    
    ❌ Wont Work
    
    
    variable "dedicated_master_enabled" {
      type           = bool
      default        = false
    }
    variable "warm_enabled" {
      type           = bool
      default        = false
      description = "Whether AWS UltraWarm is enabled."
      validation {
        condition           = var.warm_enabled == var.dedicated_master_enabled
        error_message = "If warm nodes are enabled, dedicated master must also be enabled."
      }
    }
    
    
    ❌ Error: The condition for variable "warm_enabled" must refer to var.warm_enabled

Workaround would be to use `local {}` for validation, until [this ](https://github.com/hashicorp/terraform/issues/25609)[enhancement](https://github.com/hashicorp/terraform/labels/enhancement) get implemented.

### Terraform Import is good but not sufficient

Resource which are not created using `terraform` can’t be managed using `terraform` . To deal with that `terraform` provide the `import` mechanism, which is good. However if you have more than one resource logically clubbed together than what ? You have to perform `import` on all of them **one after another** and the `tfstate` will be updated (basically appended) accordingly.

Now the trouble is that even if you have the all the resources imported, you can’t use your _modules + component_ as you might be using different folder structure, naming conventions, tags, terraform version, plugin version and tons of other things which will let `terraform` think that it needs to modify or recreate the resources with the imported `tfstate` file.

Better approach is to do it in multiple stage with some extra effort and it should be fine. Here are steps

  1. Import all the resources in `tfstate` file with `import` say `imported.tfstate`
  2. Take one of the `tfstate` file for same resources (logical grouping) deployed using your `terraform` **module.** Say `baseline.tfstate`
  3. Write a simple script which can read both `baseline.tfstate` and `imported.tfstate` , which is nothing but a `JSON` files
  4. Generate the third `tfstate` file say `computed.tfstate` where it takes the **keys** from `baseline.tfstate` and inserts the **values** from `imported.tfstate`
  5. Now you have a `tfstate` file which has the **imported** **values** in the format which you **module** can understand.
  6. Now simply move it remote location and get along with your day 🤓



Above is battle tested, I have perform this operation on pretty much on all my cloud resources which were created outside of `terraform` … works like charm!!

_**Pro-tip:**_`tfstate` file are nothing but `JSON` files so they can be ready modified just like any other `JSON` files. Even `tfvars` can a represented in `JSON` format like `*.tfvars.json` . So with the above steps you can also generate your `*.tfvars.json` _for your module because you already known the values_

  *  _A_`_override.tf` or `_override.tf.json` works like **override** for `terraform` and can be simply used to provide **overrides** on top of your `terraform` code. `Terraform` basically ignore it first, loads all the `*.tf` and `*.tf.json` file and then loads the `_override.tf` or `_override.tf.json` . You can read more about it _[here](https://www.terraform.io/language/files/override)_
  *  _`Terraform`_ also automatically loads a number of **variable definitions files**. Files named exactly `terraform.tfvars` or `terraform.tfvars.json`. Any files with names ending in `.auto.tfvars` or `.auto.tfvars.json` will not require you to use `-var-file=...` as well. They are automatically _**consumed**_
  * Any variable in `variable.tf` or `variable.tf.json` can be _**override**_ by passing the value via **environment variable prefixed** with `TF_VAR_` i.e _`TF_VAR_vpc_name`_



**Here is the precedence of variables definition:**

_`Environment variables`_ ➡️ __`terraform.tfvars` __ ➡️ _`terraform.tfvars.json`_ __ ➡️ _`*.auto.tfvars`_ **||** `*.auto.tfvars.json` __ ➡️ _`-var`_ and _`-var-file`_

![](https://cdn-images-1.medium.com/fit/c/800/647/1*GzhIFBc9WIrE_Hkxa1RaBw.png) ✍︎

Hope these provides little bit more understanding about things `terraform` requires and restricts. I will keep them coming ….. 🤓

## Happy Terraforming!!
