---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Golang - How did I learn Go!! Silly Stuff but Interesting
author: Satyajit Roy
date: "2022-03-16"
image: "/assets/uploads/02-Strings.png"
cross_post_url: "https://blog.devgenius.io/how-did-i-learn-go-silly-stuff-but-interesting-f69b2876514f/"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---


Writing this blog in hope that the silly stuff I did and learned from it. while coding in `Golang` can help others to avoid them. I learned the hard way to fix them and also it encouraged me to learn more about the _language._

![](https://cdn-images-1.medium.com/fit/c/400/519/0*tOqkcqTP1whELGRs.png) ✍︎

Intension is to keep it short, concise and to the point. Most of these are actually _silly_ 😉 but hey learning is learning….correct!!

  * **Array vs Slice** in `Golang` `arrays` are **values** and**fixed in length** , not _pointers_ , not _object references._ So when you pass an __`array` _to function_ or assign to another _`array`_ __ all you get is copy of the original __`array` _._ So use _**[Slice](https://go.dev/blog/slices-intro)**_ _****_ instead they are _reference types,_ can be passed to other functions and can use builtin function [append](https://pkg.go.dev/builtin#append) to change them


    
    
    func ChangeArray(arr [5]int) {
        arr[0] = 21
    }
    
    func main() {
        v:= [5]int{1, 2, 3, 4, 5}
        ChangeArray(v) 
        fmt.Println(v)
    }
    
    
    Output
    [1 2 3 4 5] 🤔
    
    
    func ChangeArray(arr []int) {
        arr[0] = 21
    }
    
    func main() {
        v:= []int{1, 2, 3, 4, 5}
        ChangeArray(v) 
        fmt.Println(v)
    }
    
    
    Output
    [21 2 3 4 5] 🤩

  * **String are Immutable** in `Golang` string are _immutable byte slices._ we can view a string as an (element-immutable) byte slice. So one can’t change _string_ data. To do so either operate on `byte` or `rune` level. Prefer **`Rune`** so `utf8`**** is also supported.


    
    
    str := "modifyString"
    str[6] = "s"              ❌ Will throw error, Cannot assign to s[0]
    fmt.Println(str)
    runeStore := []rune(str)
    runeStore[6] = "s"
    fmt.Println(string(runeStore)) ✅ Work fine!!

  * **Not using multiple assignments with the function returning more than one value.**


    
    
    func returnValues() (int, int) {
      a := 1
      b := 2
    return a, b
    }
    value := returnValues()      ❌ don’t do this, will throw error
    **_, value := returnValues()**   ✅ do this, if you don’t need both

  * **Go the multiplication, division, and remainder operators have the same precedence** and evaluated left to right**.** To force precedence using `()`


    
    
    package main
    
    
    import (
      "fmt"
    )
    
    
    func main() {
      n := 43210 
      fmt.Println(n/60*60, "hours and", n%60*60, "seconds")     ❌ Nope
      fmt.Println(n/(60*60), "hours and", n%(60*60), "seconds") ✅ Yes
    }
    
    
    43200 hours and 600 seconds
    12 hours and 10 seconds

  * **Nil is not always Nil** confusing, check the example out. An _interface_ value is equal to `nil` only if both its value and dynamic type are `nil` . For `interface` we need both `type` and `value` to be `nil` for actually reflecting it. When comparing we compare both **values** and the **types**


    
    
    package main
    
    
    import (
      "fmt"
    )
    
    
    func main(){
      var a *int = nil
      var b interface{} = nil     ❌ No Type `Nil` is hardcoded
      var c interface{} = a       ✅ Yes c is type interface & value nil
      if a != b {
        fmt.Println("from [a compared with b] not a nil")
      } else {
        fmt.Println("from [a compared with b] is nil")
      }
      if a != c {
        fmt.Println("from [a compared with c] not a nil")
      } else {
        fmt.Println("from [a compared with c] is nil")
      }
    }
    
    
    Output:
    from [a compared with b] not a nil
    from [a compared with c] is nil

  * **Why empty**`{}` with `json.Marshal`**** because only**exported** fields**** of a Go struct **will be considered.**_Pro-tip: use_`json:tag` for explicitly identifying them. Read more about [Go Struct Tags](https://towardsdev.com/golang-struct-tags-explained-ccb589dcbb98) _in my previous blog._


    
    
    package main
    
    
    import (
      "fmt"
      "encoding/json"
    )
    
    
    type Food struct {
        name string       ❌ Will not work
        item int          ❌ Will not work
    }
    
    
    type FevFood struct {
        Name string       ✅ Will work, because **N** in `_Caps_ ` **exported**
        Item int          ✅ Will work, because **I** in `_Caps_ ` **exported**
    }
    
    
    func main() {
      data1 := Food{"Apple Pie", 5}
      data2 := FevFood{"Apple Pie", 5}
      jd1, _ := json.Marshal(data1)
      jd2, _ := json.Marshal(data2)
      fmt.Println(string(jd1))
      fmt.Println(string(jd2))
    }
    
    
    Output
    {}
    {"Name":"Apple Pie","Item":5}

  * **Changing Values in**`range`**loop — Nop not possible** because range loop copies the values from the slice to a **local variable.** So actual value remains intact


    
    
    package main
    
    
    import (
      "fmt"
    )
    
    
    func main() {
      sliceOfInts := []int{1, 2, 3, 4, 5}
      for _, slice := range sliceOfInts {
          slice += 1                       ❌ Will not work
      }
      fmt.Println(sliceOfInts)
      sliceOfInts = []int{1, 2, 3, 4, 5}
      for i := range sliceOfInts {
          sliceOfInts[i] += 2              ✅ Will work, using Indices
      }
      fmt.Println(sliceOfInts)
    }
    
    
    Output:
    [1 2 3 4 5]
    [3 4 5 6 7]

  * **Regular expression**`[0-9]*` **matches a string with characters in it** because [`regexp`](https://golang.org/pkg/regexp/) package does **substring** matching. So we have to use `^` and `$` specifically


    
    
    package main
    
    
    import (
      "fmt"
      "regexp"
    )
    
    
    func main() {
      if matched, _ := regexp.MatchString(`[0-9]*`, "12three45"); matched {
        fmt.Printf("`[0-9]*` == '12three45' RegExp Matched [%v]\n", matched)                 ❌ **Will match because of substring matching**
      } else {
        fmt.Printf("`[0-9]*` != '12three45' RegExp didn't Match\n")
      }
      if matched, _ := regexp.MatchString(`^[0-9]*$`, "12three45"); matched {
        fmt.Printf("`^[0-9]*$` == '12three45' RegExp Matched [%v]\n", matched)                  ✅ **Will not match because of ^ and $**
      } else {
        fmt.Printf("`^[0-9]*$` != '12three45'  RegExp didn't Match\n")
      }
    }
    
    
    Output
    `[0-9]*` == '12three45' RegExp Matched [true]
    `^[0-9]*$` != '12three45'  RegExp didn't Match

These some of the _**silly but interesting**_ stuff I learned. I will keep it coming as I go along. Idea is to keep the blogs small and smart!!

![](https://cdn-images-1.medium.com/fit/c/400/387/0*Z_nTYT9PxCYmr6ze.jpg)✍︎

Hope you guys n’joyed it…..😁

## Happy Coding!!
