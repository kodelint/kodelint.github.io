---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Golang - Write a Simple API Prober in Golang to check Status
author: Satyajit Roy
date: 2022-03-14
image: "/assets/uploads/01-API.png"
cross_post_url: "https://medium.com/@email2sroy/golang-functions-101-2efeea94d57b/"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---


Functions are the building blocks of procedural programming. They help in creating modular code where a big job can be segmented into small pieces of code and might have been written by different people separated by both time and space. In fact, the function is one kind of first-class citizen type in Go. In other words, we can use functions as values. Although Go is a static language, Go functions are very flexible. The feeling of using Go functions is much like using many dynamic languages. A function is a mapping of zero or more input parameters to zero or more output parameters.

![](https://cdn-images-1.medium.com/fit/c/800/292/1*ieyQ26eChPmsjs9cTiuEfg.png)✍︎

**The advantages of using functions are:**

  * Reducing duplication of code
  * Decomposing complex problems into simpler pieces
  * Improving clarity of the code
  * Reuse of code
  * Information hiding



### Special Functions

**Golang** has 2 special functions _**`main()`**_ and _**`init()`**_ . They have some special responsibilities assigned to them

### The `main()` and init() function

The **main** package is a special package that is used with the programs that are executable and this package contains _**`main()`**_ functions. The **`main()`** the function is a special type of function and it is the entry point of the executable programs. It does not take any argument nor return anything. Go automatically call **`main()`** function, so there is no need to call **`main()`** function explicitly and every executable program must contain single main package and **`main()`** function. The _**`init()`**_ function is declared implicitly and we cannot reference it from anywhere in the code, but we are allowed to create multiple _**`init()`**_ functions in the same program. The `init()` function can be incredibly powerful and compared to some other languages, is a lot easier to use within your Go programs. These `init()` functions can be used within a `package` block and regardless of how many times that package is imported, the `init()` function will only be called once.

### Function with returns (none, single value or multiple values)

We declare a function using the `func` keyword. A function has a name, a list of comma-separated input parameters along with their **`types`** , the **`result type(s)`** , and a **`body`**.
    
    
    func function_name(Parameter-list)(Return_type){
        // function body.....
    }

Let say we have function **`repeatWord()`** which return nothing, so **`main()`****** just executes the****`repeatWord()`**** which take a `string` and `int` as arguments and prints. Nothing to return

![](https://cdn-images-1.medium.com/fit/c/800/484/1*SRWGAPL-74PqvsW0dXWLwQ.png)✍︎

Now we change the function to return more than one values and also return if there are any errors.

![](https://cdn-images-1.medium.com/fit/c/800/631/1*0yQHE-RhX8DmLs5EyL9-tQ.png)✍︎

You see if the condition below matches, function return **error** using [fmt.Errorf](https://pkg.go.dev/fmt#Errorf) else it send a `nil` in place of error.
    
    
    if len(s) <= 0 {
        return "", len(s), fmt.Errorf("Length of string can't less than euql zero")
      }

Overall `repeatWord()` returns multiple value, along side with error.

### Function as Parameter

A Go function can be passed to other functions as a _**parameter**_. Such a function is called a _higher-order_ function.

![](https://cdn-images-1.medium.com/fit/c/800/1069/1*iDMooKtQRwLgp8n8LJgteg.png)✍︎

Here we have simple action functions called `repeatWord` and `revertWord` . Also we have function called `applyFunction` which take a `function` and `string` as parameters.

## Function as custom type

Go allows to create reusable functions signatures with the `type` keyword. They have the same number of arguments with each argument is the same type. They have the same number of return values and each return value is of the same type

![](https://cdn-images-1.medium.com/fit/c/800/438/1*mCmrEsZWEZyFubw5KOtMwQ.png)✍︎

With the `type` keyword, we create a function type which accepts one string parameter and returns a string.

### Function as closure aka anonymous function

It is possible to create functions inside of functions. Go supports _[anonymous functions](https://en.wikipedia.org/wiki/Anonymous_function)_ , which can form _[closures](https://en.wikipedia.org/wiki/Closure_(computer_science))_. Anonymous functions are useful when you want to define a function inline without having to name it. **Closure** is a nested function that helps us access the outer function’s variables even after the outer function is closed

![](https://cdn-images-1.medium.com/fit/c/800/478/1*S7e3Txftfc5eO5dNYz1FAA.png)✍︎

### Function Higher Order

Higher order functions are functions that operate on other functions, either by taking them as arguments or by returning them.

![](https://cdn-images-1.medium.com/fit/c/800/468/1*KJOJod2Usdl7OP9Orr44bg.png)✍︎

Above you can see that `concatStringUsingFunctionOfHigerOrder()` returns another function, which again return another function. It is kind of spaghetti code in my opinion. However above is just an example, I would avoid writing code like this.

Hope this provide little bit more clarity on function and way they can be used in `Golang` program. Above examples can be found here: [go-functions-101](https://github.com/kodelint/go-functions-101)

## Happy Coding!!
