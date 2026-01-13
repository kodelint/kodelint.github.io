---
caffeine: 5
stress: 2
ozone: 1
layout: post
title:  Golang - Functions 101
author: Satyajit Roy
date: 2022-05-05
categories: [Golang, Programming]
tags: [Golang, Programming, Functions]
image: '/assets/uploads/01-golang-function.png'
cross_post_url: "https://towardsdev.com/golang-functions-101-2efeea94d57b"
devto_url: "https://dev.to/deadlock/golang-functions-101-22b5"
hashnode_url: "https://sroy.hashnode.dev/concept-functions-101"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---

**Functions** are the building blocks of `procedural programming`. They help in creating modular code where a big job can be segmented into small pieces of code and might have been written by different people separated by both time and space. In fact, function is one kind of **first-class citizen** types in `Go`. In other words, we can use _functions as values_. Although `Go` is a static language, `Go` functions are very flexible. The feeling of using Go functions is much like using many dynamic languages. _A function is a mapping of zero or more input parameters to zero or more output parameters._

---

![Go Functions](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lm8nrpmiw7wlmo6eqrwy.jpg)

**The advantages of using functions are:**

- Reducing duplication of code
- Decomposing complex problems into simpler pieces
- Improving clarity of the code
- Reuse of code
- Information hiding

---

## Special Functions

**Golang** has 2 special functions _`main()`_ and _`init()`_ . They have some special responsibilities assigned to them

### The `main()` and `init()` function

The **main** package is a special package which is used with the programs that are executable and this package contains `main()` function. The `main()` function is a special type of function and it is the entry point of the executable programs. It does not take any argument nor return anything. Go automatically call `main()` function, so there is no need to call `main()` function explicitly and every executable program must contain single main package and `main()` function. The `init()` function is declared implicitly and we cannot reference it from anywhere in the code, but we are allowed to create multiple `init()` functions in the same program. The init() function can be incredibly powerful and compared to some other languages, is a lot easier to use within your Go programs. These `init()` functions can be used within a package block and regardless of how many times that package is imported, the `init()` function will only be called once.

### Function with returns (none, single value or multiple values)

We declare a function using the func keyword. A function has a name, a list of comma-separated input parameters along with their `types`, the **result type(s)**, and a **body**.

```go
func function_name(Parameter-list)(Return_type){
    // function body.....
}
```

Let say we have function _`repeatWord()`_ which return nothing, so _`main()`_ just executes the _`repeatWord()`_ which take a string and int as arguments and prints. Nothing to return

```go
func main() {
    repeatWord("Hello", 5)
}

func repeatWord(word string, count int) {
    for i := 0; i < count; i++ {
        fmt.Print(word)
    }
}
```

Now we change the function to return more than one values and also return if there are any errors.

```go
func main() {
    val, length, err := repeatWord("Hello", 5)
    if err != nil {
        fmt.Println(err)
    }
    fmt.Printf("Value: %s, Length: %d", val, length)
}

func repeatWord(word string, count int) (string, int, error) {
    if len(word) <= 0 {
        return "", 0, fmt.Errorf("Length of string can't be less than equal zero")
    }

    var result string
    for i := 0; i < count; i++ {
        result += word
    }
    return result, len(result), nil
}
```

You see if the condition below matches, function return _`error`_ using [fmt.Errorf](https://pkg.go.dev/fmt#Errorf) else it send a `nil` in place of error.

```go
if len(s) <= 0 {
    return "", len(s), fmt.Errorf("Length of string can't less than euql zero")
}
```

Overall _`repeatWord()`_ returns multiple value, along side with error.

### Function as Parameter

A Go function can be passed to other functions as a _**parameter**_. Such a function is called a _higher-order_ function.

```go
func main() {
    applyFunction(repeatWord, "Hello")
    applyFunction(revertWord, "Hello")
}

func applyFunction(f func(string), val string) {
    f(val)
}

func repeatWord(word string) {
    fmt.Println(word + word)
}

func revertWord(word string) {
    // Logic to revert string...
    fmt.Println(word) // Placeholder
}
```

Here we have simple action functions called _`repeatWord()`_ and _`revertWord()`_. Also we have function called _`applyFunction()`_ which take a function and `string` as parameters.

---

## Function as custom type

Go allows to create reusable functions signatures with the `type` keyword. They have the same number of arguments with each argument is the same type. They have the same number of return values and each return value is of the same type

```go
type stringModifier func(string) string

func main() {
    var modifier stringModifier = func(s string) string {
        return strings.ToUpper(s)
    }
    fmt.Println(modifier("hello"))
}
```

With the `type` keyword, we create a function type which accepts one `string` parameter and returns a `string`.

### Function as closure aka anonymous function

It is possible to create functions inside of functions. Go supports **[anonymous functions](https://en.wikipedia.org/wiki/Anonymous_function)**, which can form **[closures](<https://en.wikipedia.org/wiki/Closure_(computer_science)>)**. **Anonymous** functions are useful when you want to define a function inline without having to name it. **Closure** is a nested function that helps us access the outer function’s variables even after the outer function is closed

```go
func main() {
    // Anonymous function
    func(word string) {
        fmt.Println(word)
    }("Hello")

    // Closure
    nextInt := seq()
    fmt.Println(nextInt())
    fmt.Println(nextInt())
}

func seq() func() int {
    i := 0
    return func() int {
        i++
        return i
    }
}
```

### Function Higher Order

Higher order functions are functions that operate on other functions, either by taking them as arguments or by returning them.

```go
func main() {
    fn := concatStringUsingFunctionOfHigherOrder()
    res := fn("Hello")
    fmt.Println(res("World"))
}

func concatStringUsingFunctionOfHigherOrder() func(string) func(string) string {
    return func(s1 string) func(string) string {
        return func(s2 string) string {
            return s1 + " " + s2
        }
    }
}
```

Above you can see that _`concatStringUsingFunctionOfHigerOrder()`_ returns another function, which again return another function. It is kind of [Spaghetti Code](https://en.wikipedia.org/wiki/Spaghetti_code) in my opinion. However above is just an example, I would avoid writing code like this.

Hope this provide little bit more clarity on `function` and way they can be used in `Golang` program. Above examples can be found here: **[go-functions-101](https://github.com/kodelint/go-functions-101)**

## Happy Coding!!
