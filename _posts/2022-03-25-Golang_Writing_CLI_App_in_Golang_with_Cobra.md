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
tags: [Golang, Basics, Concepts]
---

Golang has good amount libraries in-build and maintained by community. One of them is [Cobra](https://github.com/spf13/cobra), which is pretty good to write any _**cli apps**_. Today will try to see how we can use the library and what all functionality it provides.

![](https://github.com/kodelint/blog-assets/raw/main/images/01-golan-cli.jpeg)

> The **goal** is to understand how to write a **cli app** in Golang using [Cobra](https://github.com/spf13/cobra). So the app will only print strings for sub-commands executions.\*

### Requirements Hypothetical

Say we are trying to build a _**simple go cli app**_. Which will have **2 sub-commands** `check-url` and `check-status`. Both the commands will take a _**url/api**_ as argument

### Go Project Structure

We will call our app `url-monitor` and this is how the whole folder structure will look like

```golang
url-monitor
├── commands
│   ├── check-status.go
│   ├── check-url.go
│   ├── helpers.go
│   └── root.go
├── go.mod
└── main.go
```

### Let’s Code then

**`main.go`** ➡ We will to start with main.go which will be under the package called main and it should also have the `main{}` function to initiate the app and also `import` the additional packages and sub folders. Something like this

```golang
package main

import "url-monitor/commands"

func main() {
   commands.Execute()
}
```

> Note: Don’t worry about `commands.Execute()` which we haven’t defined yet. Basically it is calling the `Execute()` function from `package commands`.

**`root.go`** ➡ let’s check the `root.go` which will have the `init()` function which will be responsible to run some of the stuff we need to be executed first. To read more about go `init()` function check [my previous blog](https://blog.devgenius.io/what-is-init-in-golang-b806caa52822).

This is how my `root.go` looks

```golang
package commands

import (
   "fmt"
   "github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
   Use:   "url-monitor",
   Short: "url-monitor",
   Long: `url-monitor`,
}


/*
The init function is responsible to run things
which we will require before anything else
say
  - Fetch API Keys
  - Set Logging level
  - Setup any environment variable required for the app
 */

func init() {
   rootCmd.AddCommand(checkUrlCmd, checkStatusCmd)
}

func Execute() {
   if err := rootCmd.Execute(); err != nil {
      log.Fatal(err)
   }
}
```

#### Let me explain couple of things here

Now I have variable called `rootCmd` which has type of `&cobra.Command{}` type. The `&cobra.Command{}` type basically has fields like `Use`, `Short` and `Long` to be populated. Which are nothing but the name of the cli app and _**short**_ and _**long**_ description for the app which will be displayed when we run the app. Read more about [Command](https://pkg.go.dev/github.com/spf13/cobra#Command) Type.

```golang
var rootCmd = &cobra.Command{
   Use:   "url-monitor",
   Short: "url-monitor is used monitor api urls",
   Long: `url-monitor is used monitor api urls and some more detail stuff along with it`,
}
```

Next important thing is `init()` function which is calling another method of **cobra's** `AddCommand()`. Here I added both the _**sub-commands**_ I needed for my app `checkUrlsCmd` and `checkStatusCmd`. These are just variables so it doesn’t matter what you name them. To read more about go `init()` function check [my previous blog](https://blog.devgenius.io/what-is-init-in-golang-b806caa52822).

```golang
func init() {
   rootCmd.AddCommand(checkUrlsCmd, checkStatusCmd)
}
```

Finally I have the `Execute()` which if you remember was called in `main.go`, executing the [`command.Execute()`](https://pkg.go.dev/github.com/spf13/cobra#Command.Execute) method inside it and I am checking for `error` in return.

```golang
func Execute() {
   if err := rootCmd.Execute(); err != nil {
      log.Fatal(err)
   }
}
```

Now I have to work on the actual _**sub-commands**_ `checkUrlCmd` and `checkStatusCmd` which will be placed inside the commands folder.

**`check-url.go`** ➡ This command will be responsible to check the given _**urls/api endpoint**_ and return successful on receiving status as **200** for it. It will take _**urls/api**_ as argument to the _**sub-commands**_

```golang
package commands

import (
   log "github.com/sirupsen/logrus"
   "github.com/spf13/cobra"
)

var checkUrlCmd = &cobra.Command{
   Use:   "check-url",
   Short: "check-url",
   Long:  `check-url`,
   Run: func(cmd *cobra.Command, args []string) {
      if len(args) > 1{
         log.Fatal("subcommand check-url only take one argument as url")
      }
      if _, err := url.ParseRequestURI(args[0]); err != nil {
         log.Fatalf("wrong url type [%s]", err)
      }
      err := checkUrl(args)
      if err != nil {
         log.Fatal(err)
      }
   },
}

func checkUrl(args []string) error {
   fmt.Printf("HI!! From check-url sub-command with %s as argument", args[0])
   return nil
}
```

Here I have variable `checkUrlCmd` type of `&cobra.Command{}` using the field like `Use` , `Short` and `Long` . As you can see that we have one more field here called Run which take an anonymous function as value and run another function `checkUrl()`. Function `checkUrl()` is responsible to perform all the checks and return an error if there are any. Run function are executed in following order. Learn more [here](https://pkg.go.dev/github.com/spf13/cobra#Command)

```bash
PersistentPreRun()
PreRun()
Run()
PostRun()
PersistentPostRun()
```

All functions get the same args, the arguments after the

**`check-status.go`** ➡ This command will responsible to print the status payload of the _**url/apis**_ based on the _**url/apis**_ provided as argument.

```golang
package commands

import (
log "github.com/sirupsen/logrus"
"github.com/spf13/cobra"
)

var checkStatusCmd = &cobra.Command{
   Use:   "check-status",
   Short: "check-status",
   Long:  `check-status`,
   Run: func(cmd *cobra.Command, args []string) {
      if len(args) > 1{
         log.Fatal("subcommand check-url only take one argument as url")
      }
      if _, err := url.ParseRequestURI(args[0]); err != nil {
         log.Fatalf("wrong url type [%s]", err)
      }
      err := checkStatus(args)
      if err != nil {
         log.Fatal(err)
      }
   },
}

func checkStatus(args []string) error {
   fmt.Printf("HI!! From check-status sub-command with %s as argument", args[0])
   return nil
}
```

##### Now let’s fetch all dependent package by running `go mod init` and then `go mod tidy`

```bash
>> go mod init url-monitor
go: creating new go.mod: module url-monitor
go: to add module requirements and sums: go mod tidy

>> go mod tidy
go: finding module for package github.com/spf13/cobra
go: finding module for package github.com/sirupsen/logrus
go: found github.com/sirupsen/logrus in github.com/sirupsen/logrus v1.8.1
go: found github.com/spf13/cobra in github.com/spf13/cobra v1.4.0
go: downloading github.com/inconshreveable/mousetrap v1.0.0
go: downloading github.com/stretchr/testify v1.2.2
go: downloading github.com/pmezard/go-difflib v1.0.0
```

**Cool!!** We are ready to build the app by running `go build .` with the `url-monitor` folder. This should generate a binary file call `url-monitor`

```bash
url-monitor
├── commands
│   ├── check-status.go
│   ├── check-urls.go
│   ├── helpers.go
│   └── root.go
├── go.mod
├── go.sum
├── main.go
└── url-monitor                                   // the binary
```

#### Lets try to run `url-monitor` binary and see what happens

```bash
>> ./url-monitor
url-monitor

Usage:
  url-monitor [command]

Available Commands:
  check-status check-status
  check-urls   check-urls
  completion   Generate the autocompletion script for the specified shell
  help         Help about any command

Flags:
  -h, --help   help for url-monitor

Use "url-monitor [command] --help" for more information about a command.
```

##### Let run the first sub-command `check-url`

```bash
>> ./url-monitor check-urls https://example.com/apis/v1/get-status

HI!! From check-urls sub-command with https://example.com/apis/v1/get-status as argument
```

##### Let run the second sub-command `check-status`

```bash
>> ./url-monitor check-status https://example.com/apis/v1/get-status

HI!! From check-status sub-command with https://example.com/apis/v1/get-status as argument
```

##### Lets try a wrong URL

```bash
>> ./url-monitor check-status example.com/apis/v1/get-status

FATL 2022-03-25 12:43:07 wrong url type [parse "example.com/apis/v1/get-status": invalid URI for request]
```

Here are few projects where [Cobra](https://github.com/spf13/cobra) has been used _**Github CLI**_, _**Docker (distribution)**_, _**Etcd**_, _**GoReleaser**_, _**Helm**_, _**Kubernetes**_ etc. The whole list can be found [here](https://github.com/spf13/cobra/blob/master/projects_using_cobra.md)

There are alternatives available for [**Cobra**](https://github.com/spf13/cobra) as well i.e. [**mitchellh/cli**](https://github.com/mitchellh/cli), [**go-flags**](https://github.com/jessevdk/go-flags), [**urfave/cli**](https://github.com/urfave/cli) etc.

Hopefully this gives an idea about the [**Cobra**](https://github.com/spf13/cobra) package and how to use it.

## Happy Coding!!
