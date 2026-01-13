---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Golang - Writing CLI App in Golang with Cobra
author: Satyajit Roy
date: 2022-03-25
image: "/assets/uploads/01-cli-app.png"
cross_post_url: "https://towardsdev.com/writing-cli-app-in-golang-with-cobra-e83db42c80fa/"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts, CLI]
---

Go has a rich ecosystem of libraries maintained by the community. One of the standout libraries for building command-line applications is [Cobra](https://github.com/spf13/cobra). It powers some of the most popular CLI tools in the industry. Today, we'll explore how to use this library to build a functional CLI application.

![Go CLI](https://github.com/kodelint/blog-assets/raw/main/images/01-golan-cli.jpeg)

> **Goal:** Build a simple CLI app named `url-monitor` using Cobra that implements sub-commands and handles arguments.

### The Requirements

We want to build an app with two primary sub-commands:
1.  `check-url`: Validates if a URL is reachable.
2.  `check-status`: Retrieves the status payload from an API endpoint.

Both commands will take a URL/API endpoint as an mandatory argument.

### Project Structure

This is how our Go project, `url-monitor`, will be organized:

```text
url-monitor/
├── commands/
│   ├── check-status.go
│   ├── check-url.go
│   ├── helpers.go
│   └── root.go
├── go.mod
└── main.go
```

---

### Implementation

#### 1. `main.go`
This is the entry point of our application. It simply calls the `Execute` function from our `commands` package.

```go
package main

import "url-monitor/commands"

func main() {
   commands.Execute()
}
```

#### 2. `root.go`
The `root.go` file defines the base command and handles initialization. We use the `init()` function to set up our sub-commands.

```go
package commands

import (
   "log"
   "github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
   Use:   "url-monitor",
   Short: "A simple API monitoring CLI",
   Long:  `url-monitor is a lightweight tool built with Go and Cobra to monitor API health and status.`,
}

func init() {
   // Adding sub-commands to the root command
   rootCmd.AddCommand(checkUrlCmd, checkStatusCmd)
}

func Execute() {
   if err := rootCmd.Execute(); err != nil {
      log.Fatal(err)
   }
}
```

#### 3. `check-url.go`
This sub-command validates the URL format and checks for a 200 OK status.

```go
package commands

import (
   "fmt"
   "net/url"
   log "github.com/sirupsen/logrus"
   "github.com/spf13/cobra"
)

var checkUrlCmd = &cobra.Command{
   Use:   "check-url [url]",
   Short: "Verify a URL is valid and reachable",
   Args:  cobra.ExactArgs(1),
   Run: func(cmd *cobra.Command, args []string) {
      targetURL := args[0]
      if _, err := url.ParseRequestURI(targetURL); err != nil {
         log.Fatalf("Invalid URL provided: %s", err)
      }
      
      fmt.Printf("Checking URL: %s...\n", targetURL)
      // Implementation logic here...
   },
}
```

---


### Building and Running

First, initialize the modules and fetch dependencies:

```bash
>> go mod init url-monitor
>> go mod tidy
```

Build the binary:

```bash
>> go build -o url-monitor .
```

#### Testing the CLI

Running the base command:

```bash
>> ./url-monitor
A simple API monitoring CLI

Usage:
  url-monitor [command]

Available Commands:
  check-status Verify API payload status
  check-url    Verify a URL is valid and reachable
  completion   Generate the autocompletion script for the specified shell
  help         Help about any command

Flags:
  -h, --help   help for url-monitor
```

Executing a sub-command:

```bash
>> ./url-monitor check-url https://google.com
Checking URL: https://google.com...
```

Handling an error:

```bash
>> ./url-monitor check-url invalid-uri
FATAL Invalid URL provided: parse "invalid-uri": illegal character in scheme
```

### Why use Cobra?

Cobra is the industry standard for Go-based CLIs. It is used by massive projects like **Kubernetes**, **Hugo**, **GitHub CLI**, and **Docker**. It handles nested sub-commands, global/local flags, and help generation out of the box.

If you are looking for alternatives, check out [mitchellh/cli](https://github.com/mitchellh/cli) or [urfave/cli](https://github.com/urfave/cli).

## Happy Coding!!