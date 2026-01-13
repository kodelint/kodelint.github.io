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

Linters are essential tools that help identify obvious errors and perform static code analysis to improve overall code quality. No matter how experienced you are, there's always a chance to miss something. Linting helps catch these issues early during the development phase.

![Golang Linters](https://cdn-images-1.medium.com/fit/c/800/167/1*H1gu1ZCqUvJMu59Gj80MeQ.png)

Go provides several built-in tools like [`gofmt`](https://pkg.go.dev/cmd/gofmt) for formatting and [`govet`](https://pkg.go.dev/cmd/vet) for reporting suspicious constructs. Additionally, the community maintains a vast number of specialized linters:

- **[fieldalignment](https://pkg.go.dev/golang.org/x/tools/go/analysis/passes/fieldalignment)**: Detects structs that could use less memory if fields were sorted differently.
- **[unused](https://github.com/dominikh/go-tools/tree/master/cmd/unused)**: Checks for unused constants, variables, functions, and types.
- **[gofumpt](https://github.com/mvdan/gofumpt)**: Enforces a stricter format than `gofmt`.
- **[goconst](https://github.com/jgautheron/goconst)**: Finds repeated strings that could be replaced by constants.
- **[gocyclo](https://github.com/alecthomas/gocyclo)**: Computes the cyclomatic complexity of functions.
- **[errcheck](https://github.com/kisielk/errcheck)**: Detects unchecked errors in Go programs.

Managing and running these tools individually can be slow and cumbersome.

### 🤓 Entering [Golangci-lint](https://golangci-lint.run/)

`golangci-lint` is a Go linters aggregator. It runs linters in parallel, reuses the Go build cache, and caches analysis results for much faster performance on subsequent runs. 

It is fast, utilizes YAML-based configuration, has minimal false positives, and provides beautiful, colorized output. Most importantly, it includes many linters out of the box, so you don't need to install them separately.

### Installation

```bash
# Install to $(go env GOPATH)/bin/golangci-lint
curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.45.2

# Verify installation
golangci-lint --version
```

### Running the Linter

Let's introduce a redundant import to see if `golangci-lint` catches it:

```go
package main

import "fmt"
import "os" // Unused import
import "unsafe"

type TerraformResource struct {
    Cloud               string
    Name                string
    HaveDSL             bool
    PluginVersion       string
    IsVersionControlled bool
    TerraformVersion    string
    ModuleVersionMajor  int32
}

func main() {
    var d TerraformResource
    d.Cloud = "aws"
    fmt.Printf("Total Memory Usage StructType:d %T => [%d]\n", d, unsafe.Sizeof(d))
}
```

Now, run the linter:

```bash
>> golangci-lint run ./demo.go

demo.go:4:8: "os" imported but not used (typecheck)
import "os"
       ^
```

It automatically detected the unused import. `golangci-lint` supports over 100 linters. You can see the full list using:

```bash
>> golangci-lint help linters
```

### Memory Alignment with `fieldalignment`

One particularly useful tool is `fieldalignment`. It identifies if your structs are optimized for memory usage. I wrote a detailed blog about [memory alignment here](https://towardsdev.com/golang-writing-memory-efficient-and-cpu-optimized-go-structs-62fcef4dbfd0).

![Field Alignment Example](https://cdn-images-1.medium.com/fit/c/800/411/1*X-yiNqIvHgKgMikcgs5saA.png)

```bash
>> fieldalignment demo.go
demo:6:24: struct of size 88 could be 72
```

Using these tools regularly ensures your code is not only correct but also efficient and maintainable.

## Happy Coding!!