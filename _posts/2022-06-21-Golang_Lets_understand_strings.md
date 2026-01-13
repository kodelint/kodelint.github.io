---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Golang - Let’s understand strings
author: Satyajit Roy
date: 2022-06-21
image: "/assets/uploads/01-Strings.png"
cross_post_url: "https://towardsdev.com/golang-lets-understand-strings-18f65bbbd66c/"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---

Strings are the most common element we deal with in any language for any given day. That’s the reason we have a dedicated `type` for it in any language. This blog is an attempt to understand `strings` a little better.

### For Example

I have string which I want to print, So the code would be something like this

```go
package main

import (
    "fmt"
)

func main() {
    s := "this is a string"
    fmt.Println(s)
}
```

```text
Output:
this is a string
```

Pretty simple…correct! We have `string` which we assigned to variable `s` and the `type` of variable got automatically assumed as `string` type because of `:=` .

What if we want to `loop` through the `string` is it possible ? Let see

```go
package main

import (
    "fmt"
)

func main() {
    s := "this is a string"
    fmt.Printf("The Type of the variable is [%T]\n", s)
    fmt.Printf("The length of the string is [%d]\n", len(s))

    for i := 0; i < len(s); i++ {
        fmt.Printf("On Index %d, Value Type is %T, Value is %v\n", i, s[i], s[i])
    }
}
```

```text
Output:
The Type of the variable is [string]
The length of the string is [16]
On Index 0, Value Type is uint8, Value is 116
On Index 1, Value Type is uint8, Value is 104
On Index 2, Value Type is uint8, Value is 105
On Index 3, Value Type is uint8, Value is 115
On Index 4, Value Type is uint8, Value is 32
On Index 5, Value Type is uint8, Value is 105
On Index 6, Value Type is uint8, Value is 115
On Index 7, Value Type is uint8, Value is 32
On Index 8, Value Type is uint8, Value is 97
On Index 9, Value Type is uint8, Value is 32
On Index 10, Value Type is uint8, Value is 115
On Index 11, Value Type is uint8, Value is 116
On Index 12, Value Type is uint8, Value is 114
On Index 13, Value Type is uint8, Value is 105
On Index 14, Value Type is uint8, Value is 110
On Index 15, Value Type is uint8, Value is 103
```

With `range`

```go
package main

import (
    "fmt"
)

func main() {
    s := "this is a string"
    fmt.Printf("The Type of the variable is [%T]\n", s)
    fmt.Printf("The length of the string is [%d]\n", len(s))

    for index, word := range s {
        fmt.Printf("On Index %d, Value Type is %T, Value is %v\n", index, word, word)
    }
}
```

```text
Output:
The Type of the variable is [string] < - String Type
The length of the string is [16]    < - Length of the string
On Index 0, Value Type is int32, Value is 116
On Index 1, Value Type is int32, Value is 104
On Index 2, Value Type is int32, Value is 105
On Index 3, Value Type is int32, Value is 115
On Index 4, Value Type is int32, Value is 32
On Index 5, Value Type is int32, Value is 105
On Index 6, Value Type is int32, Value is 115
On Index 7, Value Type is int32, Value is 32
On Index 8, Value Type is int32, Value is 97
On Index 9, Value Type is int32, Value is 32
On Index 10, Value Type is int32, Value is 115
On Index 11, Value Type is int32, Value is 116
On Index 12, Value Type is int32, Value is 114
On Index 13, Value Type is int32, Value is 105
On Index 14, Value Type is int32, Value is 110
On Index 15, Value Type is int32, Value is 103
```

**What is going on here, couple of question comes to mind**

1.  _How come we are able to iterate_`s` which is a `type` of `string` _?_
2.  _How come the iterator running for_`0-15` exactly the length of the `string` _?_
3.  _Why is Values are in numerics ?_
4.  _Why_`for` and `range` shows different `type` _for Value field_

To understand this let’s look at strings and how it is stored in memory.

**String** are basically a collection of `bytes` or in `Golang` terms `Slice of Bytes` . That sheds a light why were we able to iterate through the `string` and also calculated the **length** of it using **`len()`**

```text
Output:
The Type of the variable is [string]
The length of the string is [16]
On Index 0, Value Type is uint8, Value is 116
```

**Strings are immutable** in nature so whenever we are doing anything with `string` _Go complier_ creates a new `Slice of Bytes` in memory and `Bytes` are _mutable_.

So why `unit8` , as mentioned in [Godoc](https://go.dev/ref/spec#Numeric_types) **`bytes`** are alias for **`uint8`** . Thats why iterating through the variable `s` which is `string` in `type` and stored as a `slice of bytes` , where each character is represented in `byte` _(actually 2 bytes to be precise)_ and the `type` is `uint8`

In case of `range` we are getting `int32` because `range` loop handles strings specially and decodes each `rune` along with its offset in the **string**. `Range` on strings iterates over Unicode code points. The first value is the starting byte index of the `rune` and the second the `rune` itself. A `rune` is **an alias to the int32 data type**. It represents a Unicode code point.

```text
Output:
The Type of the variable is [string]
The length of the string is [16]
On Index 0, Value Type is int32, Value is 116
```

This actually explains the question we have initially and clarifies the behavior of `string` , `for` and `range` .

As mentioned above **Strings are immutable** so if we need to perform some operation on **String** then it is better to convert the `string` in `rune` and then operate on it. Why `rune` why not `byte` to support `UTF-8` character.

### For Example:

```go
package main

import (
    "fmt"
)

func main() {
    s := "this is a string"
    converedString := []rune(s)
    fmt.Printf("The Type of the variable is [%T]\n", s)
    fmt.Printf("The length of the string is [%d]\n", len(s))

    for index, word := range converedString {
        fmt.Printf("On Index %d, Value Type is %T, Value is %v\n", index, word, string(word))
    }
}
```

There is external package called [strings](https://pkg.go.dev/strings) which provides quite a few method to work with **strings.** Some of them are like `string.Compare`, `strings.ContainAny`, `strings.Split` , `strings.Join` , `strings.Field` , `strings.Trim` and many more.

Hopefully I was able to shed some lights in `string` and there nature in `Golang`

## Happy Coding!!
