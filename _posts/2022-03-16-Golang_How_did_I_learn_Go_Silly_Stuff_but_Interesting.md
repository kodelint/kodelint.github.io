---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Golang - How I learned Go! Silly but interesting stuff
author: Satyajit Roy
date: "2022-03-16"
image: "/assets/uploads/02-Strings.png"
cross_post_url: "https://blog.devgenius.io/how-did-i-learn-go-silly-stuff-but-interesting-f69b2876514f/"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---

I'm writing this blog in the hope that the silly mistakes I made—and learned from—while coding in Go can help others avoid them. I learned the hard way how to fix these issues, and the process encouraged me to dive deeper into the language.

My goal is to keep this short and to the point. Most of these are simple misunderstandings, but every lesson counts!

### 1. Array vs. Slice

In Go, **arrays** are values with a fixed length. They are not pointers or references. When you pass an array to a function or assign it to another variable, you are creating a full copy of the original array.

**Use Slices instead:** Slices are reference types. They can be passed to functions efficiently, and you can use the built-in `append` function to modify them.

**Array behavior (Copy by value):**

```go
func ChangeArray(arr [5]int) {
    arr[0] = 21
}

func main() {
    v := [5]int{1, 2, 3, 4, 5}
    ChangeArray(v) 
    fmt.Println(v) // Output: [1 2 3 4 5]
}
```

**Slice behavior (Reference type):**

```go
func ChangeSlice(arr []int) {
    arr[0] = 21
}

func main() {
    v := []int{1, 2, 3, 4, 5}
    ChangeSlice(v) 
    fmt.Println(v) // Output: [21 2 3 4 5]
}
```

### 2. Strings are Immutable

In Go, strings are immutable byte slices. You cannot change a string's data directly. To modify a string, you should convert it to a `[]byte` or `[]rune` slice. I recommend `[]rune` to properly support UTF-8 characters.

```go
str := "modifyString"
// str[6] = "s" // Error: Cannot assign to str[6]

runeStore := []rune(str)
runeStore[6] = 's'
fmt.Println(string(runeStore)) // Output: modifystring
```

### 3. Multiple Returns and Assignments

You must use multiple assignments when a function returns more than one value. Use the blank identifier (`_`) if you want to ignore specific return values.

```go
func returnValues() (int, int) {
    return 1, 2
}

// value := returnValues() // Error: assignment mismatch
_, value := returnValues()   // Correct way to ignore the first value
```

### 4. Operator Precedence

In Go, the multiplication, division, and remainder operators have the same precedence and are evaluated from left to right. Use parentheses `()` to force a specific order.

```go
func main() {
    n := 43210 
    fmt.Println(n/60*60, "hours and", n%60*60, "seconds")     // Incorrect
    fmt.Println(n/(60*60), "hours and", n%(60*60), "seconds") // Correct
}
```

### 5. Nil is Not Always Nil

An interface value is equal to `nil` only if both its **value** and its **dynamic type** are `nil`. This can be confusing when comparing an interface to a concrete pointer that is `nil`.

```go
func main() {
    var a *int = nil
    var b interface{} = nil
    var c interface{} = a
    
    fmt.Println(a == b) // false
    fmt.Println(a == c) // true
}
```

### 6. Empty JSON Output

If your `json.Marshal` call returns an empty object `{}`, it's likely because your struct fields are not **exported** (they must start with a capital letter).

```go
type Food struct {
    name string // Unexported, will be ignored by JSON
}

type FavFood struct {
    Name string // Exported, will work
}
```

### 7. Changing Values in a `range` Loop

A `range` loop creates a **copy** of the elements. Modifying the loop variable does not change the original slice. To modify the slice, use the index.

```go
sliceOfInts := []int{1, 2, 3, 4, 5}
for _, v := range sliceOfInts {
    v += 1 // Only modifies the local copy 'v'
}

for i := range sliceOfInts {
    sliceOfInts[i] += 2 // Modifies the original slice via index
}
```

### 8. Regular Expression Matching

The `regexp.MatchString` function performs **substring** matching by default. To match the entire string, you must use the start (`^`) and end (`$`) anchors.

```go
func main() {
    pattern := `[0-9]*`
    matched, _ := regexp.MatchString(pattern, "12three45")
    fmt.Println(matched) // true (matches the "12" or "45")

    strictPattern := `^[0-9]*$`
    matched, _ = regexp.MatchString(strictPattern, "12three45")
    fmt.Println(matched) // false
}
```

These are some of the silly but interesting things I learned. I'll keep them coming as I discover more!

![Go Gopher](https://cdn-images-1.medium.com/fit/c/400/387/0*Z_nTYT9PxCYmr6ze.jpg)

Hope you enjoyed these tips!

## Happy Coding!!