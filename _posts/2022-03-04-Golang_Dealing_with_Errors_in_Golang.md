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

In Go, error handling is explicit, and we often find ourselves writing the same few lines of code repeatedly.

**For Example:** Imagine you have several functions that return a value and an error. Even built-in functions like `os.Getenv` return values that you might need to validate. You frequently end up with code like this:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    value := os.Getenv("PATH")
    if value == "" {
        fmt.Println("PATH is not set")
    }
    // do something with `value`
}
```

Repeating the `if err != nil` block can become tedious in large projects. To deal with this more elegantly, I've used patterns like the one below.

### Custom Error Check Function

I declared a helper function `CheckErr` that takes an error as input and returns a boolean depending on whether the error is `nil`.

```go
package main

import (
    "fmt"
)

func CheckErr(e error) bool {
    return e != nil
}

func findlarge(a int, b int) error {
    if a > b {
        return nil
    }
    return fmt.Errorf("Error: a (%v) is smaller than b (%v)", a, b)
}

func main() {
    // Scenario 1: No error
    if err := findlarge(10, 6); CheckErr(err) {
        fmt.Println(err)
    } else {
        fmt.Println("Success: no error")
    }

    // Scenario 2: Error occurs
    if err := findlarge(5, 6); CheckErr(err) {
        fmt.Println(err)
    } else {
        fmt.Println("Success: no error")
    }
}
```

**Running the code:**

```text
>> go run main.go
Success: no error
Error: a (5) is smaller than b (6)
```

Voila! This pattern reduces the visual noise of repeated error checks.

### Inline Assignment

Another technique I use is to make the error check part of the assignment itself. Instead of this:

```go
returnedValue, err := someFunction(someVar)
if err != nil {
    return err
}
// do something with `returnedValue`
```

I prefer this more compact form:

```go
if returnedValue, err := someFunction(someVar); err != nil {
    return err
} else {
    // do something with `returnedValue`
}
```

These small changes can save many keystrokes and keep your large Go projects looking much cleaner.

## Happy Coding!!