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


Let’s talk about _**`methods`**_ in **Golang** , why we should use them and what is their significance of them in **Golang.**

![](https://cdn-images-1.medium.com/fit/c/800/518/0*DWuaFZuGhnXDKCds.png) ✍︎

[Go is not a pure object-oriented programming language](https://golang.org/doc/faq#Is_Go_an_object-oriented_language) and it does not support classes. Hence methods on types are a way to achieve behavior similar to classes. Methods allow a logical grouping of behavior related to a type similar to classes.

A _method_ declaration is similar to a _**function declaration**_ , but it has an extra parameter declaration part. The extra parameter part can contain one and only one parameter of the receiver type of the _method_. The only one parameter is called a receiver parameter of the _method_ declaration. The receiver parameter must be enclosed in a `()` and declared between the `func` keyword and the _method_ name.

**For Example:**

Below I have **custom** **type** defined as _employee._ I also have _method_ called `accountDetails()` with receiver type `a` as account
    
    
    package main
    
    
    import "fmt"
    
    
    type account struct {
        accountName   string
        accountType   string
        accountValue  int
    }
    
    
    func (a account) accountDetails() {
        fmt.Printf("Account Name: %s\n", a.accountName)
        fmt.Printf("Account Type: %s\n", a.accountType)}
    
    
    func (a account) getAccountValue() int {
        return a.accountValue
    }
    
    func main() {
        acc := account{accountName: "Chase Account", accountType: "saving", accountValue: 21000}
        acc.accountDetails()
        fmt.Printf("Account Value Updated after calling by reference: %d\n", acc.getAccountValue())
    }

The method `accountDetails()` get attached to the receiver type `account` and provides the way to access to the fields `accountName` and `accountType` . Similarly `getAccountValue()` method returns the `accountValue` for the receiver `account` type.

Now say you are trying to modify the field value of the receiver inside a _method_. Say you want to change the `accountValue` for the bank account with an additional _method_ called `updateAccountValue()`
    
    
    package main
    
    
    import "fmt"
    
    
    type account struct {
        accountName   string
        accountType   string
        accountValue  int
    }
    
    
    func (a account) accountDetails() {
        fmt.Printf("Account Name: %s\n", a.accountName)
        fmt.Printf("Account Type: %s\n", a.accountType)
        fmt.Printf("Account Value: %d\n", a.accountValue)
    }
    
    
    func (a account) getAccountValue() int {
        return a.accountValue
    }
    
    
    func (a account) updateAccountValue(updatedAccountValue int) int {
        a.accountValue = updatedAccountValue
        return a.accountValue
    }
    
    
    func main() {
        acc := account{accountName: "Chase Account", accountType: "saving", accountValue: 21000}
        acc.accountDetails()
        acc.updateAccountValue(22000)
        if acc.getAccountValue() == 21000 {
            fmt.Printf("Did Account value updated after calling acc.updateAccountValue method: [%d] - No\n", acc.getAccountValue())
        } else if acc.getAccountValue() == 22000 {
            fmt.Printf("Did Account value updated after calling acc.updateAccountValue method: [%d] - Yes\n", acc.getAccountValue())
        }
    }

**Output:**
    
    
    Account Name: Chase Account
    Account Type: saving
    Account Value: 21000
    Did Account value updated after calling acc.updateAccountValue method: [21000] - No

What happened here, when the method `updateAccountValue()` is called a copy of the receiver is made and that copy of the receiver is available inside the method. Since it is a copy, any changes made to the value receiver is not visible to the caller. To make this work we need to use a _**Pointer Receiver**_ __ for the _method._ Any change made to the pointer receiver will be visible to the caller.
    
    
    package main
    
    
    import "fmt"
    
    
    type account struct {
        accountName   string
        accountType   string
        accountValue  int
    }
    
    
    func (a account) accountDetails() {
        fmt.Printf("Account Name: %s\n", a.accountName)
        fmt.Printf("Account Type: %s\n", a.accountType)
        fmt.Printf("Account Value: %d\n", a.accountValue)
    }
    
    
    func (a account) getAccountValue() int {
        return a.accountValue
    }
    
    
    **func (a *account) updateAccountValue(updatedAccountValue int) int {
        a.accountValue = updatedAccountValue
        return a.accountValue
    }**
    
    
    func main() {
        acc := account{accountName: "Chase Account", accountType: "saving", accountValue: 21000}
        acc.accountDetails()
        acc.updateAccountValue(22000)
        if acc.getAccountValue() == 21000 {
            fmt.Printf("Did Account value updated after calling acc.updateAccountValue method: [%d] - No\n", acc.getAccountValue())
        } else if acc.getAccountValue() == 22000 {
            fmt.Printf("Did Account value updated after calling acc.updateAccountValue method: [%d] - Yes\n", acc.getAccountValue())
        }
    }

**Output:**
    
    
    Account Name: Chase Account
    Account Type: saving
    Account Value: 21000
    Did Account value updated after calling acc.updateAccountValue method: [22000] - Yes

So is necessary to have _**pointer receivers**_ defined for the methods to modify the original caller fields**…NO, not necessarily.** We can very well call the actual****`acc`**** instance in method and modify the field. For that we have to use the `&` aka _(address of)_ like this `&acc`
    
    
    (&acc).updateAccountValue(22000)

**Method** and **Receiver** both need to be defined in the same package, otherwise, it will not work. Methods can be shared aka **exported** between packages by **Capitalizing** them, which means
    
    
     _**💡 Will only be available within the package**_
     
    func (a *account) **updateAccountValue**(updatedAccountValue int) int {
        a.accountValue = updatedAccountValue
        return a.accountValue
    }
    
    
    _**💡 Will be available outside of the package**_
    
    
    func (a *account) **UpdateAccountValue**(updatedAccountValue int) int {
        a.accountValue = updatedAccountValue
        return a.accountValue
    }

`updateAccountValue` can only be access within the package it is defined which is **`main`** in our example, however `UpdateAccountValue`**** can be accessed outside of the package as `Go` will export them to the module.

Same goes with **`structs`** and **`struct fields`**

**For example:** `account` struct is not **exported** , however `AccountValue` field of not exported `account` struct is **exported,** means `account` struct will not be accessible outside of the package but `AccountValue` field will be exported and will available outside the package.

**`AccountValue`****** struct is**Capitalized** , so it will exported and will be available outside of the package
    
    
    type account struct {
        accountName   string
        accountType   string
        AccountValue  int
    }
    
    
    type Money struct {
        available   int
        interest    int
        percentage  int
    }

So far what we have learned:

  * _Methods_ are the way in `Golang` to behave like OOPs
  *  _Methods_ needs to be attached to type
  *  _Methods_ _****_ can access the fields of receiver by pointer and by value both
  *  _Methods_ needs to be defined in the same package as receiver
  *  _Methods_ can be exported to be used outside of the package by **Capitalizing** it



There are some more stuff like _method chaining_ etc which I will try to cover later…hope this helps!!

## Happy Coding!!
