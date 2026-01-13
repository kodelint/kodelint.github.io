---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: SRE/DevOps Interview Questions — Tooling
author: Satyajit Roy
date: 2022-04-21
image: "/assets/uploads/02-interview.png"
cross_post_url: "https://medium.com/@email2sroy/sre-devops-interview-questions-tooling-part-1-8eb662906ca4/"
toc: true
categories: [DevOps, Interview, Linux Troubleshooting]
tags: [DevOps, SRE, Interview, Linux Troubleshooting]
---

## SRE/DevOps Interview Questions — Tooling — Part 1

In continuation of my previous blog [[SRE/DevOps Interview Questions — Linux Troubleshooting](https://awstip.com/sre-devops-interview-questions-linux-troubleshooting-1b8ffe82c16)], this blog I will try to focus on the **Tooling** (at least a few of them) and provide handy details about frequent questions and resources.

### Tools and Tooling

For any **DevOps** or **SRE Team**, Tools and Tooling are very important. Though it is not a deal-breaker if you haven’t worked with some specific tools, there are some universal ones which pretty much everybody expects you to be familiar with.

### Source Control (Git)

`Git` has dominated source control management in the industry and is used almost everywhere. Here are some of the questions I have been asked or I have asked:

- **Difference between `git fetch` and `git pull`?** ([Explanation](https://www.toolsqa.com/git/git-fetch-and-git-pull/))
- **Fork or Branch? Which? and Why?** ([Explanation](https://stackoverflow.com/questions/3611256/forking-vs-branching-in-github))
- **What is `git reflog` used for?** ([Explanation](https://www.atlassian.com/git/tutorials/rewriting-history/git-reflog))
- **Explain `git squash` and why would one use it?** ([Explanation](https://www.baeldung.com/ops/git-squash-commits))
- **How do you perform Garbage Collection in `git`?** ([Explanation](https://www.atlassian.com/git/tutorials/git-gc))
- **How to perform cherry-pick with `git`?** ([Explanation](https://www.atlassian.com/git/tutorials/cherry-pick))
- **How to use `git bisect`?** ([Explanation](https://www.educative.io/edpresso/what-is-git-bisect))
- **Find the list of files changed in a particular `git commit`?** ([Explanation](https://megamorf.gitlab.io/2021/03/19/list-changed-files-in-a-git-commit/))
- **What are `git submodules` and how to keep them in sync?** ([Explanation](https://www.atlassian.com/git/tutorials/git-submodule))
- **Explain `git lfs`?** ([Explanation](https://www.atlassian.com/git/tutorials/git-lfs))
- **What are Git Hooks? Pre-commit and Post-commit hooks?** ([Good Read](https://githooks.com/))

### Containers (Docker)

`Docker` has dominated the container world as we speak, though there are other alternatives like [Podman](https://podman.io/) and [Containerd](https://www.containiq.com/post/docker-alternatives#containerd). However, mostly people use `docker`, so I am going to share some commonly and frequently asked questions.

- **What is Docker BuildKit?** ([Explanation](https://www.cloudsavvyit.com/12441/what-is-dockers-buildkit-and-why-does-it-matter/))
- **What is Docker multi-stage build and why bother?** ([Explanation](https://fueled.com/the-cache/posts/backend/devops/docker-multi-stage-builds/))
- **Explain what is `/var/run/docker.sock`?** ([Explanation](https://www.educative.io/edpresso/var-run-dockersock))
- **How to run a container without using the `docker` command?** ([Explanation](https://docs.docker.com/engine/api/sdk/examples/#run-a-container))
- **How to change Docker API Version forcefully?** ([Explanation](https://docs.docker.com/engine/api/#versioned-api-and-sdk))
- **How to get low-level information of a Docker object?** ([Explanation](https://www.educative.io/edpresso/what-is-docker-inspect))
- **Have you used the `escape` directive in Dockerfile?** ([Explanation](https://docs.docker.com/engine/reference/builder/#escape))
- **Explain `CMD` vs `ENTRYPOINT`?** ([Explanation](https://docs.docker.com/engine/reference/builder/#understand-how-cmd-and-entrypoint-interact))
- **How will you run something only at the building stage?** ([Explanation](https://docs.docker.com/engine/reference/builder/#onbuild))
- **How to audit your docker image for vulnerabilities locally?** ([Explanation](https://docs.docker.com/engine/scan/))
- **How to make changes in `dockerd` daemon?** ([Explanation](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file))

**How do you Increase your Docker IP space?**

Add the following to `/etc/docker/daemon.json`:

```json
{
  "default-address-pools": [
    { "base": "172.20.0.0/16", "size": 24 },
    { "base": "172.21.0.0/16", "size": 24 }
  ]
}
```

**How to change default ulimits for docker daemon?**

Add the following in `/etc/docker/daemon.json`:

```json
{
  "default-ulimits": {
    "nofile": {
      "Hard": 1024000,
      "Name": "nofile",
      "Soft": 1024000
    }
  }
}
```

> **Note**: `Kubernetes` is a very vast topic and questions are also very frequent. I will have a separate blog for the same in future.

### Infrastructure as Code (Terraform)

By now you all already know that I love `terraform`. Here are some of the questions I have been asked in interviews or I have asked:

**Explain Terraform request flow in detail?** ([Explanation](https://github.com/hashicorp/terraform/blob/main/docs/architecture.md))

- **How does terraform communicate with Providers?** ([Explanation](https://www.terraform.io/plugin/how-terraform-works))
- **How to enable Providers or specific Provider logs?** ([Explanation](https://www.terraform.io/plugin/log/managing#enable-logging))
- **Advantages of using `-replace` instead of `taint`?** ([Explanation](https://www.terraform.io/cli/commands/taint))
- **How do you change provider in state file?** ([Explanation](https://www.terraform.io/cli/commands/state/replace-provider))
- **How to get provider schema without looking at the code?** ([Explanation](https://www.terraform.io/cli/commands/providers/schema))
- **Does terraform support parallelism?** ([Explanation](https://www.terraform.io/cli/commands/apply#parallelism-n))
- **Explain `.terraform.lock.hcl` and its use?** ([Explanation](https://www.terraform.io/language/files/dependency-lock))
- **Explain `.terraformrc` file and how does it help?** ([Explanation](https://www.terraform.io/cli/config/config-file))
- **How do you tell `terraform` to ignore certain changes?** ([Explanation](https://www.terraform.io/language/meta-arguments/lifecycle#ignore_changes))
- **What is the default way to provide overrides to `terraform`?** ([Explanation](https://www.terraform.io/language/files/override#override-files))
- **Can `source` parameter in module be templatized?** ([Explanation](https://www.terraform.io/language/modules/syntax#source))

> This value must be a literal string with no template sequences; arbitrary expressions are not allowed.

- **When should we use `count` vs `for_each`?** ([Explanation](https://www.terraform.io/language/meta-arguments/count#when-to-use-for_each-instead-of-count))
- **Can module with provider block use `count`?** ([Explanation](https://www.terraform.io/language/modules/develop/providers#legacy-shared-modules-with-provider-configurations))
- **What happens if you try to read resource with `data` block before it has been created?** ([Explanation](https://www.terraform.io/language/data-sources#data-resource-behavior))
- **Can you define a `variable` which could be `null` in value?** ([Explanation](https://www.terraform.io/language/values/variables#disallowing-null-input-values))

### Configuration Management (Chef)

**Chef** has been the de-facto for configuration management at-least for me in my career. So let me put some frequents for `chef` here.

- **Explain Chef Attribute's precedence hierarchy?** ([Explanation](https://docs.chef.io/attribute_precedence/))
- **Can certain attributes be denied for persistence?** ([Explanation](https://docs.chef.io/attribute_persistence/#blocklisting-ohai-automatic-attributes))
- **What are types of attributes?** ([Explanation](https://docs.chef.io/attribute_types/))
- **What is `ohai` and what information it collects, if any?** ([Explanation](https://docs.chef.io/plugin_community/#ohai))
- **What is `Policyfile` & how it is different from `Berksfile`?** ([Explanation](https://docs.chef.io/policyfile/))
- **Why one should be caution of `gem` in `metadata.rb`?** ([Explanation](https://docs.chef.io/config_rb_metadata/))

> Do not install native gems with the `gem` setting in metadata.rb. The `gem` setting is not a general purpose replacement for the [chef_gem resource](https://docs.chef.io/resources/chef_gem/), and does not internally re-use the `chef_gem` resource.

- **How to fetch specific version of cookbook as dependency from GitHub or Internal Source control?** ([Explanation](https://docs.chef.io/policyfile/#settings))

```ruby
cookbook 'chef-ingredient', git: 'https://github.com/chef-cookbooks/chef-ingredient.git', tag: 'v0.12.0'
```

- **How to install package based on platform?** ([Explanation](https://docs.chef.io/infra_language/checking_platforms/#examples-2))

```ruby
package_name = value_for_platform(
  ['centos', 'redhat', 'suse', 'fedora' ] => {
    'default' => 'httpd'
  },
  ['ubuntu', 'debian'] => {
    'default' => 'apache2'
  }
)
```

- **How to check what Cloud your node is running?** ([Explanation](https://docs.chef.io/infra_language/checking_clouds/))
- **How do you send an email or alert if converge fails?** ([Explanation](https://docs.chef.io/dsl_handler/#send-email))

> **Trick Question:** How do you provide Chef Credentials to Terraform `chef` provider? Export using following Env Variables `CHEF_CLIENT_NAME` and `CHEF_KEY_MATERIAL`.

Ok I think I will continue this on subsequent blog, as this one is getting little lengthy... Stay Tuned!!

## Happy Interviewing and Best of luck!!