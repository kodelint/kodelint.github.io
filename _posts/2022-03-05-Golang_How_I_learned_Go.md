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

As an **Operations Engineer**, I was always a "scripting guy." However, as I transitioned into adopting a **DevOps Culture**, I started spending more time learning _programming languages._

My obsession with **Go** started with my Terraform journey. I was fascinated by the fact that Go produces a single binary for the platform and can run without any external dependencies, unlike Python. This was more than enough to get me started...

> **The best way to learn a programming language is to write code in it.**

I had a requirement where I wanted to sync external **GitHub repositories** to our internal **GitHub repositories**. So, I thought, let me write the code in **Go**.

### The Requirements

#### 1. Read the YAML

The program should read a `YAML` file, which is organized like this:

```yaml
RepositoryList:
  - internal_org: "internal-modules"
    internal_repo_name: "internal-aws-autoscaling-module"
    internal_repo_description: "This module helps to create autoscaling groups and corresponding launch configurations for AWS"
    github_repo_name: "terraform-aws-modules/terraform-aws-autoscaling"
    repo_tags:
      - "v3.6.0"
      - "v4.4.0"
      - "v4.5.0"
```

To parse this, I used the [`gopkg.in/yaml.v2`](https://github.com/go-yaml/yaml) module, which provides the ability to **encode** and **decode** YAML values.

I also needed a data structure to hold these values. I used a `struct` to define a type and a variable to store the data:

```go
type GithubRepo struct {
    InternalOrg             string   `yaml:"internal_org"`
    InternalRepoName        string   `yaml:"internal_repo_name"`
    InternalRepoDescription string   `yaml:"internal_repo_description"`
    GitHubRepoName          string   `yaml:"github_repo_name"`
    RepoTags                []string `yaml:"repo_tags"`
}

type RepositoryList struct {
    ListOfRepositories []GithubRepo `yaml:"RepositoryList"`
}
```

#### Understanding Tags

The annotations like `yaml:"internal_org"` are called **Tags**. Tags are a way to attach additional information to a struct field. They use the `key:"value"` format. It’s a convention that provides built-in parsing capabilities. Different packages use tags for various reasons, such as encoding/decoding libraries for JSON, XML, BSON, and YAML.

Now, all I need is to read the `YAML` file and store the data in a `RepositoryList` variable:

```go
var yamlFile RepositoryList

f, err := os.Open("Repositories.yml")
if err != nil {
    log.Fatalf("os.Open() failed with '%s'\n", err)
}
deferr func(f *os.File) {
    err := f.Close()
    if err != nil {
        log.Printf("failed to close file: %s", err)
    }
}(f)

newDecoder := yaml.NewDecoder(f)
err = newDecoder.Decode(&yamlFile)
if err != nil {
    log.Fatalf("newDecoder.Decode() failed with '%s'\n", err)
}
```

> **Quick Tip**: Never forget to **close** the file after reading it. To avoid opening and closing multiple times, use the `defer` keyword with an anonymous function to check for closing errors.

#### 2. Fetch Credentials from Vault

Since all credentials were in **Vault**, the program needed to fetch them based on environment variables like `VAULT_ADDRESS`, `VAULT_APP_ROLE_ID`, `VAULT_APP_ROLE_SECRET_ID`, and `VAULT_SECRET_PATH`. I used the [`hashicorp/vault/api`](https://github.com/hashicorp/vault) module for this.

#### 3. Connect to GitHub APIs

To fetch the external repository and push it to the internal one, I needed to connect to both external and internal GitHub APIs. I used the [`google/go-github`](https://github.com/google/go-github) module to accomplish that.

#### 4. Process the Data

Now that I have the data stored in the `yamlFile` variable and the `GitToken` from Vault, it’s time to iterate over the list and process the repositories:

```go
for _, v := range yamlFile.ListOfRepositories {
    // Now I can access the content individually
    // and do something about it
    fmt.Println(v.InternalOrg)
}
```

All the data read from the YAML file can now be accessed via `v.<FieldName>`, such as `v.InternalOrg`, `v.InternalRepoName`, `v.GitHubRepoName`, etc.

![Go Programming](https://cdn-images-1.medium.com/fit/c/800/436/1*Q4EanVcO8Lqx0SITZBKlPw.png)

### Learnings

Through this exercise, I was able to learn several Go concepts:

- **Go Structs**: Organizing data into records.
- **Struct Tags**: Mapping external data formats to Go types.
- **Go DataTypes**: Working with slices and strings.
- **External Modules**: Managing dependencies.
- **File I/O**: Reading and parsing local files.
- **Encoding/Decoding**: Working with YAML data.

Learning a new programming language is always fun, and it becomes much more engaging when you have a practical project to build along the way!

## Happy Coding!!
