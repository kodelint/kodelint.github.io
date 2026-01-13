---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Golang - What is init in Golang
author: Satyajit Roy
date: 2022-03-09
image: "/assets/uploads/01-init.png"
cross_post_url: "https://blog.devgenius.io/what-is-init-in-golang-b806caa52822/"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---

As the name suggests, `init()` is used to initialize your program with requirements for its lifecycle. It is a powerful tool for several common use cases.

### Common Use Cases:

1.  **Database Connections**: Establishing an initial connection pool.
2.  **Cloud Credentials**: Exporting or validating cloud-specific environment variables.
3.  **Static Configurations**: Fetching or parsing configuration files.
4.  **Logging**: Setting up global loggers and log levels for a package.
5.  **Global State**: Defining global variables within a package.

### Key Attributes of the `init()` function:

- **Scoped to Package**: Its scope is limited to the package block where it is defined.
- **Called Once**: It is executed exactly once per package.
- **Implicit Execution**: Go handles the execution of `init()` automatically; you don't call it manually.
- **No Arguments/Returns**: It takes no parameters and returns no values.
- **Order of Execution**: Go supports multiple `init()` functions within the same package, but their execution order is calculated alphabetically by filename and then by order of declaration.

> Anything initialized within an `init()` function is exported within the scope of that package. For a deep dive, refer to the [Official Go Package Initialization Docs](https://go.dev/ref/spec#Package_initialization).

### Multiple `init()` functions

It is possible to define multiple `init()` functions in a single file or across multiple files within the same package.

**Example:**

```go
package main

import (
    "fmt"
)

var Var1 string
var Var2 string

func init() {
    fmt.Println("First Init Function Called")
    Var1 = initialize()
}

func init() {
    fmt.Println("Second Init Function Called")
    Var2 = Var1
}

func main() {
    fmt.Printf("Going by the order and printing value of Var2: [%s]\n", Var2)
}

func initialize() string {
    return "Executed by Init Function"
}
```

**Result:**

```text
> go run initFunctions.go
First Init Function Called
Second Init Function Called
Going by the order and printing value of Var2: [Executed by Init Function]
```

## Using `init()` for Side Effects

Sometimes we need a package to be in a certain state even if we don't use its exported functions. This is known as importing for **side effects**.

```go
import _ "github.com/go-sql-driver/mysql"
```

Go normally forbids unused imports. However, by using the [blank identifier](https://golang.org/ref/spec#Blank_identifier) (`_`), we can force the package's `init()` function to execute (e.g., to register a database driver) without referencing the package elsewhere in our code.

While `init()` functions are handy, they should not be overused as they can make the control flow harder to follow.

## Happy Coding!!
