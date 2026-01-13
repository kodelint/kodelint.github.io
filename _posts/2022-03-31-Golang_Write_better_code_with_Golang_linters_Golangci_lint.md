---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Golang - Write better code with Golang linters — Golangci-lint
author: Satyajit Roy
date: 2022-03-31
image: "/assets/uploads/01-go-lint.png"
cross_post_url: "https://towardsdev.com/golang-write-better-code-with-golang-linters-golangci-lint-92a0461ef723/"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---


## [Golang] Write better code with Golang linters — Golangci-lint

This blog I will focus on some of the awesome linters available to us. Linters help us to identify some obvious and static code analysis and make improvements in our code. No matter how good you are, there will always be a fair chance that you miss something. Linting is one way to avoid such errors right during development.

![](https://cdn-images-1.medium.com/fit/c/800/167/1*H1gu1ZCqUvJMu59Gj80MeQ.png)✍︎

Actually `Golang` already provides some basic tools like [`gofmt`](https://pkg.go.dev/cmd/gofmt) that deals with formatting the Go code and [`govet`](https://pkg.go.dev/cmd/vet) that examines the source code and reports suspicious constructs.

There are [good number of linters](https://github.com/golangci/awesome-go-linters) available which have been built and maintain by the community. Let’s discuss about some some useful linters -

  * [fieldaligment](https://pkg.go.dev/golang.org/x/tools/go/analysis/passes/fieldalignment) — To check the Package fieldalignment defines an Analyzer that detects structs that would use less memory if their fields were sorted in-terms of memory allocation
  * [unused](https://github.com/dominikh/go-tools/tree/master/cmd/unused) — Checks Go code for unused constants, variables, functions and types.
  * [gofumpt](https://github.com/mvdan/gofumpt) — Enforce a stricter format than [`gofmt`](https://pkg.go.dev/cmd/gofmt), while being backwards compatible. That is, `gofumpt` is happy with a subset of the formats that `gofmt` is happy with.
  * [goconst](https://github.com/jgautheron/goconst) — Find repeated strings that could be replaced by a constant.
  * [gocyclo](https://github.com/alecthomas/gocyclo) — Computes and checks the cyclomatic complexity of functions.
  * [goreporter](https://github.com/qax-os/goreporter) — A Golang tool that does static analysis, unit testing, code review and generate code quality report. This is a tool that concurrently runs a whole bunch of those linters and normalizes their output to a report
  * [errcheck](https://github.com/kisielk/errcheck) — Detect unchecked errors in Go programs.



The problem with having so many standalone linting tools is that you have to download and manage them yourself. Running them in sequence is also very slow.

### 🤓 Entering ….. [Golangci-lint](https://golangci-lint.run/) 🤓

Due to the above reasons, _**[golangci-lint](https://golangci-lint.run/)**_ , a Go linters aggregator that runs linters in parallel, reuses the Go build cache, and caches analysis results for much improved performance on subsequent runs, is the preferred way to setup linting in Go projects.

_**[golangci-lint](https://golangci-lint.run/)**_ is a ⚡ **[Very fast](https://golangci-lint.run/usage/performance)** ⚙️ Yaml-based **[configuration](https://golangci-lint.run/usage/configuration)** , with tons of 🖥 **[integrations](https://golangci-lint.run/usage/integrations)** , 📈 Minimum number of **[false positives](https://golangci-lint.run/usage/false-positives)****** and provides**** 🔥nice output with colors. It has 🥇 **[A lot of linters](https://golangci-lint.run/usage/linters)** included, no need to install them separately 😀

![](https://cdn-images-1.medium.com/fit/c/800/263/1*VUrCHdig5tGmBlZwWPUFgw.png)✍︎

### Install
    
    
    # binary will be $(go env GOPATH)/bin/golangci-lint
    **> >** curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.45.2
    
    
    # or install it into ./bin/
    **> >** curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s v1.45.2
    
    
    # In alpine linux (as it does not come with curl by default)
    **> >** wget -O- -nv https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s v1.45.2
    
    
    **>>** golangci-lint --version

### Run

I purpose fully introduce a _**import**_ __ which I am not using and hoping _**[golangci-lint](https://golangci-lint.run/)**_ _will catch it_
    
    
    package main
    
    
    import "fmt"
    **import "os"**
    import "unsafe"
    
    
    type TerraformResource struct {
      Cloud                string                       // 16 Bytes
      Name                 string                       // 16 Bytes
      HaveDSL              bool                         //  1 Byte
      PluginVersion        string                       // 16 Bytes
      IsVersionControlled  bool                         //  1 Byte
      TerraformVersion     string                       // 16 Bytes
      ModuleVersionMajor   int32                        //  4 Bytes
    }
    
    
    func main() {
        var d TerraformResource
        d.Cloud = "aws"
        d.Name = "ec2"
        d.HaveDSL = true
        d.PluginVersion = "3.64"
        d.TerraformVersion = "1.1"
        d.ModuleVersionMajor = 1
        d.IsVersionControlled = true
        fmt.Println("==============================================================")
        fmt.Printf("Total Memory Usage StructType:d %T => [%d]\n", d, unsafe.Sizeof(d))
        fmt.Println("==============================================================")
        fmt.Printf("Cloud Field StructType:d.Cloud %T => [%d]\n", d.Cloud, unsafe.Sizeof(d.Cloud))
        fmt.Printf("Name Field StructType:d.Name %T => [%d]\n", d.Name, unsafe.Sizeof(d.Name))
        fmt.Printf("HaveDSL Field StructType:d.HaveDSL %T => [%d]\n", d.HaveDSL, unsafe.Sizeof(d.HaveDSL))
        fmt.Printf("PluginVersion Field StructType:d.PluginVersion %T => [%d]\n", d.PluginVersion, unsafe.Sizeof(d.PluginVersion))
        fmt.Printf("ModuleVersionMajor Field StructType:d.IsVersionControlled %T => [%d]\n", d.IsVersionControlled, unsafe.Sizeof(d.IsVersionControlled))
        fmt.Printf("TerraformVersion Field StructType:d.TerraformVersion %T => [%d]\n", d.TerraformVersion, unsafe.Sizeof(d.TerraformVersion))
        fmt.Printf("ModuleVersionMajor Field StructType:d.ModuleVersionMajor %T => [%d]\n", d.ModuleVersionMajor, unsafe.Sizeof(d.ModuleVersionMajor))
    }

### Let’s Run the Linter
    
    
    **> > golangci-lint run ./demo.go**
    demo.go:4:8: "os" imported but not used (typecheck)
    import "os"
           ^

It automatically detected the bug (which `go` would have anyways complained about it at build stage), however you can see it performed a check which an another linter called _**[goimport](https://pkg.go.dev/golang.org/x/tools/cmd/goimports)**_ _****_ would do. However we are using the aggregator _**[golangci-lint](https://golangci-lint.run/)**_ _****_ which combined most of the linter out there _**.**_ There are huge number of **linters** available more than 100, here is the [comprehensive list](https://golangci-lint.run/usage/linters/)

 _**Note: Only number of linters are activated by default, whole bunch of them are deactivated by default. Though they can be enabled on-demand.**_

If you want to see what is available you can execute following:
    
    
    **> > golangci-lint help linters**

To enable/disable linters
    
    
    **> > golangci-lint run --disable-all -E errcheck**

**Integrations instructions** are available [here](https://golangci-lint.run/usage/integrations/)

**Configuration examples** are available [here](https://golangci-lint.run/usage/configuration/)

Though most of the linters are available except [fieldaligment](https://pkg.go.dev/golang.org/x/tools/go/analysis/passes/fieldalignment) and there is good reason for it.

![](https://cdn-images-1.medium.com/fit/c/800/411/1*X-yiNqIvHgKgMikcgs5saA.png)✍︎

As mentioned above [fieldaligment](https://pkg.go.dev/golang.org/x/tools/go/analysis/passes/fieldalignment) is used to identify if you `struct` is aligned properly in-terms of memory. I wrote a [blog about it](https://towardsdev.com/golang-writing-memory-efficient-and-cpu-optimized-go-structs-62fcef4dbfd0). Let see how [fieldaligment](https://pkg.go.dev/golang.org/x/tools/go/analysis/passes/fieldalignment) helps in identifying miss memory alignments in `Golang`
    
    
    **type TerraformResource struct {
      Cloud                string                       // 16 Bytes
      Name                 string                       // 16 Bytes
      HaveDSL              bool                         //  1 Byte
      PluginVersion        string                       // 16 Bytes
      IsVersionControlled  bool                         //  1 Byte
      TerraformVersion     string                       // 16 Bytes
      ModuleVersionMajor   int32                        //  4 Bytes
    }**
    
    
    **> > fieldalignment demo.go
    **demo:6:24: struct of size 88 could be 72

Please read the [blog about](https://towardsdev.com/golang-writing-memory-efficient-and-cpu-optimized-go-structs-62fcef4dbfd0) memory alignment and cpu efficiency in `Golang` I wrote for better prospective.

Hope this blog was helpful to provide some information related available linters and why should we use them

## Happy Coding!!
