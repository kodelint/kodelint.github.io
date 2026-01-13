---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Golang - Let’s talk about methods in Golang
author: Satyajit Roy
date: 2022-03-16
image: "/assets/uploads/01-methods.png"
cross_post_url: "https://blog.devgenius.io/lets-talk-about-methods-in-golang-a22dbaf028f1/"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---

Let’s talk about **methods** in Go, why we should use them, and their significance in the language.

![Go Methods](https://cdn-images-1.medium.com/fit/c/800/518/0*DWuaFZuGhnXDKCds.png)

Go is not a "pure" object-oriented programming language and does not support classes. Instead, methods on types are the way to achieve behavior similar to classes. Methods allow a logical grouping of behavior related to a specific type.

A **method** declaration is similar to a function declaration but includes an extra "receiver" parameter. This receiver parameter must be enclosed in parentheses and declared between the `func` keyword and the method name.

### Value Receivers

In the example below, I have a custom type `account` and a method `accountDetails()` with a receiver `a` of type `account`.

```go
package main

import "fmt"

type account struct {
    accountName  string
    accountType  string
    accountValue int
}

func (a account) accountDetails() {
    fmt.Printf("Account Name: %s\n", a.accountName)
    fmt.Printf("Account Type: %s\n", a.accountType)
}

func (a account) getAccountValue() int {
    return a.accountValue
}

func main() {
    acc := account{accountName: "Chase Account", accountType: "saving", accountValue: 21000}
    acc.accountDetails()
    fmt.Printf("Account Value: %d\n", acc.getAccountValue())
}
```

The method `accountDetails()` is attached to the `account` type, providing access to its fields. 

### Modifying State: Pointer Receivers

What if you want to modify a field within a method? Let's try adding an `updateAccountValue()` method.

```go
func (a account) updateAccountValue(updatedAccountValue int) {
    a.accountValue = updatedAccountValue
}

func main() {
    acc := account{accountName: "Chase Account", accountType: "saving", accountValue: 21000}
    acc.updateAccountValue(22000)
    fmt.Printf("Value after update call: %d\n", acc.getAccountValue())
}
```

**Output:**
```text
Value after update call: 21000
```

The value didn't change! This is because when a method with a **value receiver** is called, Go creates a **copy** of the receiver. Any changes made inside the method only affect the copy. To modify the actual instance, we must use a **Pointer Receiver**.

```go
func (a *account) updateAccountValue(updatedAccountValue int) {
    a.accountValue = updatedAccountValue
}

func main() {
    acc := account{accountName: "Chase Account", accountType: "saving", accountValue: 21000}
    acc.updateAccountValue(22000)
    fmt.Printf("Value after pointer update: %d\n", acc.getAccountValue())
}
```

**Output:**
```text
Value after pointer update: 22000
```

> **Note:** You don't necessarily have to use a pointer to call a pointer receiver method. Go allows `acc.updateAccountValue(22000)` as a shorthand for `(&acc).updateAccountValue(22000)`.

### Encapsulation and Exporting

In Go, methods and types are exported based on capitalization:

*   **Internal (Package-private)**: `func (a *account) updateAccountValue(...)` starts with a lowercase letter and is only accessible within the package.
*   **External (Public)**: `func (a *account) UpdateAccountValue(...)` starts with an uppercase letter and is accessible from other packages.

This same logic applies to structs and their fields. A struct can be unexported while its fields are exported, or vice versa.

```go
type account struct { // Unexported struct
    accountName  string
    accountType  string
    AccountValue int    // Exported field
}
```

### Summary

*   **Methods** allow Go to exhibit OOP-like behavior by attaching logic to types.
*   **Receivers** define which type the method belongs to.
*   **Pointer Receivers** allow you to modify the caller's data; **Value Receivers** work on a copy.
*   **Visibility** is managed through capitalization (Exported vs. Unexported).

## Happy Coding!!