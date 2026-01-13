---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Golang - Dealing with Errors in Golang
author: Satyajit Roy
date: 2022-03-04
image: "/assets/uploads/01-golang-errors.png"
cross_post_url: "https://towardsdev.com/dealing-with-errors-in-golang-78db1d9c52d4/"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---


![](https://cdn-images-1.medium.com/fit/c/800/446/0*j6ZVxSQzFrn6HGJh.jpg)✍︎

In `go` we usually have to check for `error` pretty often and we endup writing certain lines of code over and over again.

**For Example:** imagine you have multiple function which returns a `value` and `error` . Even built-in functions like `os.Getenv("envName")` also returns the `value` of the **environment variable** and **error.** So you would endup writing your code something like this
    
    
    package main
    
    
    import (
      fmt,
      os
    )
    
    
    func main() {
      value, err := os.Getenv("PATH")
      if err != nil {
          fmt.Errorf(err)
      }
    
    
    // do something with `value`
    }

Now imagine write that piece of code over and over whenever you have to check of an `error` . Don’t get me wrong I really like that `go` really gives us the ability to check for **errors** and it very cool. However, sometime repeating the below code is quite annoying.
    
    
    if err != nil {
          fmt.Errorf(err)
      }

To deal with this I have done something like this in my code
    
    
    package main
    
    
    import (
        "fmt"
    )
    
    
    func CheckErr(e error) bool {
        if e == nil {
         return false
        } else {
     return true
         }
    }
    
    
    func findlarge(a int, b int) error {
        if a > b {
         return nil
        } else {
         return fmt.Errorf("Error: a is %v is smaller than b", a)
        }
    }
    
    
    func main() {
        if err := findlarge(5, 6); CheckErr(err) {
            fmt.Print(err)
        } else {
         fmt.Println("no error")
        }
    }
    
    
    >> go run main.go
    no error

I declared a function `CheckErr` which takes `error` as input and return a `bool` depending on if the `error` is `nil` or not. Now whenever I need to check for `error` I just simply call function `CheckErr` with the `error` and based on return value `true` or `false` **print** or **return** it
    
    
    package main
    
    
    import (
        "fmt"
    )
    
    
    func CheckErr(e error) bool {
        if e == nil {
         return false
        } else {
     return true
         }
    }
    
    
    func findlarge(a int, b int) error {
        if a > b {
         return nil
        } else {
         return fmt.Errorf("Error: a is %v is smaller than b", a)
        }
    }
    
    
    func main() {
        if err := findlarge(8, 6); CheckErr(err) {
            fmt.Print(err)
        } else {
         fmt.Println("no error")
        }
    }
    
    
    >> go run main.go
    Error: a is 5 is smaller than b

and Voila!!! I don’t have to write the `error` block over and over.

![](https://cdn-images-1.medium.com/fit/c/798/442/0*0UXyJWTaFcNwaxog.png)✍︎

Another small thing I always do is that to make `error` as part of assignment itself, which save me the hassle of write the `error` check block.

So instead of doing something like this
    
    
    returnedValue, err := someFunction(someVar)
    if err != nil {
      return err
    }
    //do something with `returnedValue`

I prefer to doing something like this:
    
    
    if returnedValue, err := someFunction(someVar); err != nil {
      return err
    } else {
     // do something with `returnedValue`
    }

Hope this helps and reduces some key strokes in your large projects…

## Happy Coding!!
