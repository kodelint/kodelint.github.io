---
caffeine: 15
stress: 4
ozone: 2
layout: post
title: Golang - How I learned Go!!
author: Satyajit Roy
date: 2022-03-05
image: "/assets/uploads/01-learn-golang.png"
cross_post_url: "https://towardsdev.com/how-i-learned-go-7750f1d2b7d1/"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---


![](https://cdn-images-1.medium.com/fit/c/800/516/0*Azt1gLXgredC5rEQ.png)✍︎

As **Operations Engineer** I was always a `scripting` guy, however as I transitioned and adopting **DevOps Culture**. I started spending more time learning _programming languages._

My _obsession_ with `Go` started with my `terraform` journey. I was fascinated with the fact that `Go` produces a single binary for the platform and can run without any external dependency, unlike `python` . This was more than enough to get me started on this…..

_**The best way to learn a programming language is to write code in it**_

I had this requirement where I wanted to sync external _**GitHub repositories**_ to our internal _**GitHub repositories. So,**_ I though let me write the code in****`Go`**.**

### Requirements:

  1. **Read the YAML:** The program should read a `YAML` file, which is organized something like below:


    
    
    RepositoryList:
      - internal_org: "internal-modules"
        internal_repo_name: "internal-aws-autoscaling-module"
        internal_repo_description: "This module helps to create autoscaling groups and corresponding launch configurations for AWS"
        github_repo_name: "terraform-aws-modules/terraform-aws-autoscaling"
        repo_tags:
          - "v3.6.0"
          - "v4.4.0"
          - "v4.5.0"

So the `YAML` file is organized to provide a **List** of **Repositories** I used [`“gopkg.in/yaml.v2”`](https://gopkg.in/yaml.v2) module, which provides the ability to **encode** and**decode YAML** values.

I would also need a _data structure_ to hold the values for me. So I used `struct` to define a `type` and variable to store the data in it. Something like below
    
    
    type GithubRepo struct {
     InternalOrg string `yaml:"internal_org"`
     InternalRepoName string `yaml:"internal_repo_name"`
     InternalRepoDescription string `yaml:"internal_repo_description"`
     GitHubRepoName string `yaml:"github_repo_name""`
     RepoTags []string `yaml:"repo_tags"`
    }
    
    
    type RepositoryList struct {
     ListOfRepositories []GithubRepo `yaml:"RepositoryList"`
    }

Let me talk a little bit about the `yaml:”internal_org”` these are called **`Tags`** . **`Tags`** are a way to attach additional information to a struct field. **`Tags`** use the `key:"value"` format. It’s not a strict rule, but a convention, which provides built-in parsing.

Different packages use **`tags`** for different reasons. We can use them used them in encoding libs, like `json`, `xml`, `bson`, `yaml` etc

Now all I need is to read the `YAML` file and store the data in `RepositoryList` type variable
    
    
    var yamlFile RepositoryList
    
    
    f, err := os.Open("Repositories.yml")
     if err != nil {
      log.Fatalf("os.Open() failed with '%s'\n", err)
     }
     defer func(f *os.File) {
      err := f.Close()
      if err != nil {
    
    
    }
     }(f)
    
    
    newDecoder := yaml.NewDecoder(f)
    err = newDecoder.Decode(&yamlFile)
    if err != nil {
      log.Fatalf("newDecoder.Decode() failed with '%s'\n", err)
    }

_**Quick Tip**_ : never forget to **close** the file after reading it. However you might need it again. To avoid opening and closing multiple time you can use the `defer` _key word and an anonymous function to check for closing errors_

**2.** **Fetch Credentials from**`Vault`**** : All credentials are in `vault` the program needs to fetch them from `vault` based on couple of environment variables like

  * `VAULT_ADDRESS` , `VAULT_APP_ROLE_ID` , `VAULT_APP_ROLE_SECRET_ID` , `VAULT_SECRET_PATH`



I used [`“hashicorp/vault/api”`](https://github.com/hashicorp/vault/api) module for the same.

**3.** **Connect to Internal and External GitHub APIs:** In order to fetch the external repository and push it internal one I needed to make connection to both external and internal. I used `“`[go-github/v38/github](https://github.com/google/go-github/v38/github)`”` module accomplish that.

**4\. Do something with the Data:** Now I have the data stored in `yamlFile` variable, I have the `GitToken` from `Vault` . It’s time to access the data individually and do something with it**.** The data can be accessed something like this: Because it is **List** so I iterate over it and hold the chunk of data in temporary loop variable `v`
    
    
    for _, v := range yamlFile.RepositoryList {
      // Now I can access the content individually
      // and do something about it
      fmt.Println(v.InternalOrg)
    }

All the data read from `YAML` file can now access under `v.<<FieldName>>`. Something like this

`v.InternalOrg` , `v.InternalRepoName` , `v.GitHubRepoName` , `v.RepoTags` etc

![](https://cdn-images-1.medium.com/fit/c/800/436/1*Q4EanVcO8Lqx0SITZBKlPw.png)✍︎

### Learnings

So with this exercise was I was able to quite few things, here are some of them:

  * **Go Structs**
  * **Go Structs Tags**
  * **Go DataTypes**
  * **How to use external modules**
  * **Reading Files**
  * **Encoding and Decoding**`YAML`**Data**
  * **Access data with FieldName**



Learning a new programming language is always fun and when you choose something to build along side then it becomes more involved and interesting!

## Happy Coding!!
