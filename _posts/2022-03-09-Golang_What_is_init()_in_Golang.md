---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Golang - What is init() in Golang
author: Satyajit Roy
date: 2022-03-09
image: "/assets/uploads/01-init.png"
cross_post_url: "https://blog.devgenius.io/what-is-init-in-golang-b806caa52822/"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---


As the name suggest `init()` is used to initialize your program with things you might need for the lifecycle of the that program. `init()` can be useful for various use-cases. Some of them could be

![](https://cdn-images-1.medium.com/fit/c/756/392/1*cCMMMAKWxbf3e2kDpvlJCQ.png)✍︎

### For Example:

  1. _Establishing a database connection_
  2.  _Exporting cloud credentials_
  3.  _Fetching some static configuration files for your program to use_
  4.  _Setting up some environment variables for your program_
  5.  _Define something global for your program to use_**within the** _**`package`**_
  6.  _Initializing logs and log levels for the_ _`package`_



There could be more use-cases for using `init()` for your program….above are just a few examples I could think of on top of my mind.

### Some Key attributes of `init()` function:

  1. The scope is limited to the **package block**
  2. Can only be called **once**
  3. If required define `init()` per **package basis**
  4. Go support multiple `init()` function within the same **package** , however, the order of execution is **calculated not defined**
  5. Go handles the execution of `init()` function implicitly for us
  6. `init()` the function doesn’t take arguments nor returns any value



 _By definition_`init()` can be used for defining or initializing anything **within the package.** Usually,**things** _that are or will be required once in the lifetime of your program_

You might have noticed that I have been stating “**within the package** ” in **bold font**. The reason behind, anything initialized, established is exported within the scope of the package they can’t be accessed outside of the package . To learn more about Go Package Initialization please refer to [Official Docs](https://go.dev/ref/spec#Package_initialization)

That means we can define `init()` function for each **package respectively** within our program, if we see the requirement and the `init()` the function will be called once, regardless of how many times the package has been imported. `init()` can be defined in any `Go` file in the package and `Go` will automatically run that.

### Multiple `init()` functions

It is possible to define multiple `init()` functions in a file or within the **package**. The order of execution will be decided as the order of declaration of `init()` functions.

As per the Go language specification for [Package Initialization](https://golang.org/ref/spec#Package_initialization), when multiple files are encountered in a package, they are processed alphabetically. So, if you have multiple `init()` a function defined in multiple files within the package then be **mindful about the filenames.**

**For Example:**
    
    
    package main
    
    
    import (
        "fmt"
    )
    
    
    var Var1 string
    var Var2 string
    
    
    func init(){
        fmt.Println("First Init Function Called")
        Var1 = initialize()
    }
    
    
    func init(){
        fmt.Println("Second Init Function Called")
        Var2 = Var1
    }
    
    
    func main(){
        fmt.Printf("Going by the order and printing value of Var2: [%s]\n", Var2)
    }
    
    
    func initialize() string {
        var e string
        e = "Executed by Init Function"
        return e
    }

**Result:**
    
    
    > go run initFunctions.go
    First Init Function Called
    Second Init Function Called
    Going by the order and printing value of Var2: [Executed by Init Function]

## Using `init()` for Side Effects

Sometimes we only need the package to be in a certain state, however, we might not use the rest of the package in our program anyway. This type of import is called _importing for a side effect._

_**tl;dr: May be you are just importing it for it’s**_`init()`_**function**_
    
    
    import _ "github.com/go-sql-driver/mysql"

Go is very strict and does not allow references to unused packages. However, your requirement to execute the `init()` needs that package to be imported for doing some **initialization.** That is where we use the [blank identifier](https://golang.org/ref/spec#Blank_identifier) (i.e. `_`) to solve this problem.

Package’s `init()` functions are a handy tool, sometimes necessary, but should not be overused. Sometimes re-initialization is required and `init()` can’t be re-invoked.

So one should always try to use explicit invocations of which can initialize things for you but just to know that there is `init()` which can be used for trivial things

## Happy Coding!!
