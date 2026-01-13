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

In continuation of my previous blog [[SRE/DevOps Interview Questions — Linux Troubleshooting](https://awstip.com/sre-devops-interview-questions-linux-troubleshooting-1b8ffe82c16)], this blog I will try to focus on the _**Tooling (at least few of them)**_ and provide handy details about frequent questions and resources.

![](https://cdn-images-1.medium.com/fit/c/450/225/0*eAlTcMXph7kp9t5v.jpg)✍︎

### Tools and Tooling

For any _**DevOps**_ or _**SRE Team**_ _**Tools**_ and _**Tooling**_ is very important. Though it is not a deal breaker if you haven’t worked with some tools. However, there are some universal tools which pretty much everybody expects you to be familiar with

### Source Control or Git

`Git` has dominated the source control management in the industry and being used almost everywhere. Here some of the question I have been asked or I have asked

  *  _Difference between_`git fetch` and `git pull` _?_([Explanation](https://www.toolsqa.com/git/git-fetch-and-git-pull/))
  * _**Fork**_ or **Branch** _? Which ? and Why ?_ ([Explanation](https://stackoverflow.com/questions/3611256/forking-vs-branching-in-github))
  * _What is_`git reflog` _used for ?_ ([Explanation](https://www.atlassian.com/git/tutorials/rewriting-history/git-reflog))
  * _Explain_`git squash` _and why would one use it ?_ ([Explanation](https://www.baeldung.com/ops/git-squash-commits))
  * _How do you perform_**Garbage Collection** in `git` _?_([Explanation](https://www.atlassian.com/git/tutorials/git-gc))
  * _How to perform_**cherry pick** with `git` _?_ ([Explanation](https://www.atlassian.com/git/tutorials/cherry-pick))
  * _How to use_**`git bisect`** _?_([Explanation](https://www.educative.io/edpresso/what-is-git-bisect))
  * _Find the list of files change in particular_**`git commit`** _?_([Explanation](https://megamorf.gitlab.io/2021/03/19/list-changed-files-in-a-git-commit/))
  * _What are_**`git submodules`** _and how to keep them in sync ?_([Explanation](https://www.atlassian.com/git/tutorials/git-submodule))
  * _Explain_**`git lfs`** _?_ ([Explanation](https://www.atlassian.com/git/tutorials/git-lfs))
  * _What are_**Git Hook** ? **Pre-commit** and **Post-commit** _hooks ?_([Good Read](https://githooks.com/))



### Containers specially Docker

`docker` has dominated the container world as we speak, though there are other alternative like [podman](https://podman.io/), [Containerd](https://www.containiq.com/post/docker-alternatives#containerd) etc. However mostly people use `docker` so I am going share some commonly and frequently asked questions

  *  _What is_**Docker BuildKit** __? ([Explanation](https://www.cloudsavvyit.com/12441/what-is-dockers-buildkit-and-why-does-it-matter/))
  * _What is_**Docker multi stage build** _and why bother ?_ ([Explanation](https://fueled.com/the-cache/posts/backend/devops/docker-multi-stage-builds/))
  * _Explain what is_**`/var/run/docker.sock`** _?_ ([Explanation](https://www.educative.io/edpresso/var-run-dockersock))
  * _How to run a container_**without** using **`docker`** _command ?_([Explanation](https://docs.docker.com/engine/api/sdk/examples/#run-a-container))
  * _How to change_**Docker API Version** _forcefully ?_ ([Explanation](https://docs.docker.com/engine/api/#versioned-api-and-sdk))
  * _How to get low level information of_**Docker object** _?_ ([Explanation](https://www.educative.io/edpresso/what-is-docker-inspect))
  * _Have you used_**`escape`** directive in **Dockerfile** _?_ ([Explanation](https://docs.docker.com/engine/reference/builder/#escape))
  * _Explain_**`CMD`** vs **`ENTRYPOINT`** _?_ ([Explanation](https://docs.docker.com/engine/reference/builder/#understand-how-cmd-and-entrypoint-interact))
  * _How will you run something only at building stage ?_([Explanation](https://docs.docker.com/engine/reference/builder/#onbuild))
  * _How to audit your_**docker image** _for vulnerabilities locally?_ ([Explanation](https://docs.docker.com/engine/scan/))
  * How to make change in `dockerd` daemon ? ([Explanation](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file))
  * How do you Increase your Docker IP space ?


    
    
    # Add below to /etc/docker/daemon.json
    
    
    {
        "default-address-pools":[
            {"base":"172.20.0.0/16","size":24},
            {"base":"172.21.0.0/16","size":24}
        ]
    }

13\. _How change_**default ulimits** _for docker daemon ?_
    
    
    # Add following in /etc/docker/daemon.json
    
    
    {
      "default-ulimits": {
        "nofile": {
          "Hard": 1024000,
          "Name": "nofile",
          "Soft": 1024000
        }
      },

> **Note** : `kubernete` is very vast topic and questions are also very frequent. I will have a separate blog for the same in future.

### Infrastructure as Code Tool specially Terraform

By now you all already know that I love `terraform` . Here are some of the question I have been asked in interviews or I have asked

 _→ Explain Terraform request flow in detail ?_([Explanation](https://github.com/hashicorp/terraform/blob/main/docs/architecture.md))

![](https://cdn-images-1.medium.com/fit/c/800/715/0*tqMrCs1NQ3hsYmrE.png)✍︎

  *  _How does terraform communicates with_**Providers** _?_([Explanation](https://www.terraform.io/plugin/how-terraform-works))
  * _How to enable_**Providers** or specific **Provider** _logs ?_ ([Explanation](https://www.terraform.io/plugin/log/managing#enable-logging))
  * _Advantages of using_**`-replace`** instead of **`taint`** _?_([Explanation](https://www.terraform.io/cli/commands/taint))
  * _How do you change provider in_**state file** _?_([Explanation](https://www.terraform.io/cli/commands/state/replace-provider))
  * _How to get provider schema without looking at the code ?_ ([Explanation](https://www.terraform.io/cli/commands/providers/schema))
  * _Does terraform support_**parallelism** _?_ ([Explanation](https://www.terraform.io/cli/commands/apply#parallelism-n))
  * _Explain_**`.terraform.lock.hcl`** _and it use ?_ ([Explanation](https://www.terraform.io/language/files/dependency-lock))
  * _Explain_**`.terraformrc`** _file and how does it help ?_ ([Explanation](https://www.terraform.io/cli/config/config-file))
  * _How do you tell_**`terraform`******_to ignore certain changes ?_([Explanation](https://www.terraform.io/language/meta-arguments/lifecycle#ignore_changes))
  * _What is default way to provide_**overrides** to `terraform` _?_ ([Explanation](https://www.terraform.io/language/files/override#override-files))
  * _Can_`source` _parameter in module be templatized ?_([Explanation](https://www.terraform.io/language/modules/syntax#source))



> This value must be a literal string with no template sequences; arbitrary expressions are not allowed.

  * _When should we use_**`count`** vs **`for_each`** _?_([Explanation](https://www.terraform.io/language/meta-arguments/count#when-to-use-for_each-instead-of-count))
  * _Can_**module** with provider block use **`count`** _?_ ([Explanation](https://www.terraform.io/language/modules/develop/providers#legacy-shared-modules-with-provider-configurations))
  * _What happens if you try to read_**resource** with `data` _block before it has been created ?_ ([Explanation](https://www.terraform.io/language/data-sources#data-resource-behavior))
  * _Can you define a_`variable` which could be **null** _in value ?_([Explanation](https://www.terraform.io/language/values/variables#disallowing-null-input-values))



### Configuration Management tools specially Chef

**Chef** has been the defacto for configuration management at-least for me in my carrier. So let me put some frequents for `chef` here

  *  _Explain_**`Chef Attribute's`** _precedence hierarchy ?_ ([Explanation](https://docs.chef.io/attribute_precedence/))
  * _Can certain_**attributes** _be denied for persistence ?_([Explanation](https://docs.chef.io/attribute_persistence/#blocklisting-ohai-automatic-attributes))
  * _What are types of_**attributes** _?_([Explanation](https://docs.chef.io/attribute_types/))
  * _What is_**`ohai`** _and what information it collects, if any ?_ ([Explanation](https://docs.chef.io/plugin_community/#ohai))
  * _What is_**`Policyfile`** & how it is different from **`Berksfile`** _?_ ([Explanation](https://docs.chef.io/policyfile/))
  * _Why one should be caution of_**`gem`** in `metadata.rb` _?_ ([Explanation](https://docs.chef.io/config_rb_metadata/))



> Do not install native gems with the `gem` setting in metadata.rb . The `gem` setting is not a general purpose replacement for the [chef_gem resource](https://docs.chef.io/resources/chef_gem/), and does not internally re-use the `chef_gem` resource.

  * _How to fetch specific version of_**cookbook** as **dependency** _from GitHub or Internal Source control?_([Explanation](https://docs.chef.io/policyfile/#settings))


    
    
    cookbook 'chef-ingredient', git: 'https://github.com/chef-cookbooks/chef-ingredient.git', tag: 'v0.12.0'

  * _How to install package based on platform ?_ ([Explanation](https://docs.chef.io/infra_language/checking_platforms/#examples-2))


    
    
    package_name = **value_for_platform**(
      ['centos', 'redhat', 'suse', 'fedora' ] => {
        'default' => 'httpd'
      },
      ['ubuntu', 'debian'] => {
        'default' => 'apache2'
      }
    )

  * _How to check what_**Cloud** _your node is running ?_ ([Explanation](https://docs.chef.io/infra_language/checking_clouds/))
  * _How do you send an_**email** or **alert** if **converge** _fails ?_ ([Explanation](https://docs.chef.io/dsl_handler/#send-email))



> **Trick Question:** how do you provide Chef Credentials to Terraform `chef` provider ? Export using following Env Variables `CHEF_CLIENT_NAME` and `CHEF_KEY_MATERIAL`

Ok I think I will continue this on subsequent blog, as this one is getting little lengthy…..Stay Tuned!!

## Happy Interviewing and Best of luck!!
