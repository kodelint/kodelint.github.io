---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Golang - More on Strings
author: Satyajit Roy
date: 2022-06-09
image: "/assets/uploads/03-strings.png"
cross_post_url: "https://blog.devgenius.io/golang-more-on-strings-17b943f9354f/"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---

In `Golang` or for that matter pretty much in all programming language `strings` are **Immutable** data type and also heavily used. This blog let’s see what all operations we can perform on `string` and how efficient they are.

![](https://cdn-images-1.medium.com/fit/c/730/487/0*3asBYZ_J4Ly3No40.png)✍︎

So, let talk about _**string concatenations,**_ there are few ways to to perform _**string concatenations**_

- Using [`Sprintf`](https://pkg.go.dev/fmt#Sprintf) from [`fmt`](https://pkg.go.dev/fmt) package
- Using [`Join`](https://pkg.go.dev/strings#Join) function from [`strings`](https://pkg.go.dev/strings) package
- Using the `+` sign to concat strings
- From `Golang 1.10` onwards using [`Builder`](https://pkg.go.dev/strings#Builder) from [`strings`](https://pkg.go.dev/strings) package

When you are doing some small concatenation I guess this wouldn’t matter which method you use. However as the use cases grows and becomes bigger than one needs to pay attention to these as well.

Let check this out with some `code` examples

1. **Using**`+`**Operator**

```golang
  package main

  import (
   "testing"
  )

  const (
     smallString = "StringsInGolang"
     longString  = "somegarbagestringwithallthecharacterslknvklancerlkwrvcekljrvklrn"
  )

  func **generateRandomLengthOfStrings**(s string) (data []string, size int) {
    // Running the loop for 100 time and each time
    // inserting the same in the List Of String []data
    for i := 0; i < 100; i++ {
      data = append(data, s)
      size += len(s)
    }
    return data, size
  }

  func **BenchmarkWithOperatorSmallStringUnknownSize**(b *testing.B) {
    data, _ := generateRandomLengthOfStrings(**smallString**)
    var s string
    for n := 0; n < b.N; n++ {
      for _, d := range data {
        s += d
      }
     _ = s
    }
  }

  func **BenchmarkWithOperatorLongerStringUnknownSize**(b *testing.B) {
    data, _ := generateRandomLengthOfStrings(**longString**)
    var s string
    for n := 0; n < b.N; n++ {
      for _, d := range data {
        s += d
      }
      _ = s
    }
  }
}
```

Here is what I can see when I run `go test -bench=. -benchmem`

```bash
go test -bench=. -benchmem
goos: darwin
goarch: amd64
pkg: github.com/kodelint/golang-string-concatenation-benchmark
cpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
BenchmarkWithOperatorSmallStringUnknownSize-12    	      58	  18744501 ns/op	 5300632 B/op	     100 allocs/op
BenchmarkWithOperatorLongerStringUnknownSize-12   	      63	  18892603 ns/op	22532608 B/op	     100 allocs/op
PASS
ok  	github.com/kodelint/golang-string-concatenation-benchmark	3.746s
```

It is clearly visible that **smallerString** benchmarking took `18744501 ns/op` and **longerString** took `18892603 ns/op`.

So, we ran the benchmark disabling **Golang Optimization** `-gcflags=-N`

```bash
go test -gcflags=-N -bench=. -benchmem
goos: darwin
goarch: amd64
pkg: github.com/kodelint/golang-string-concatenation-benchmark
cpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
BenchmarkWithOperatorSmallStringUnknownSize-12    	      56	  19277732 ns/op	 5300630 B/op	     100 allocs/op
BenchmarkWithOperatorLongerStringUnknownSize-12   	      58	  19672660 ns/op	22532608 B/op	     100 allocs/op
PASS
ok  	github.com/kodelint/golang-string-concatenation-benchmark	3.746s
```

The number change slightly based on runtime optimization performed by complier.

2. **Using** `fmt.Sprintf`

```go
package main

import (
    "fmt"
    "strings"
    "testing"
)

const (
    smallString = "StringsInGolang"
    longString  = "somegarbagestringwithallthecharacterslknvklancerlkwrvcekljrvklrn"
)

func generateRandomLengthOfStrings(s string) (stringCollection []string, stringSize int) {
    // Running the loop for 100 time and each time
    // inserting the same in the List Of String []data
    for i := 0; i < 100; i++ {
        stringCollection = append(stringCollection, s)
        stringSize += len(s)
    }
    return stringCollection, stringSize
}

func BenchmarkWithSprintfSmallStringUnknownSize(b *testing.B) {
    data, _ := generateRandomLengthOfStrings(smallString)
    var s string
    for n := 0; n < b.N; n++ {
        s = fmt.Sprintf(s, data)
        _ = s
    }
}

func BenchmarkWithSprintfLongerStringUnknownSize(b *testing.B) {
    stringCollection, _ := generateRandomLengthOfStrings(longString)
    var s string
    for n := 0; n < b.N; n++ {
        s = fmt.Sprintf(s, stringCollection)
        _ = s
    }
}

func BenchmarkWithSprintfSmallStringKnownSize(b *testing.B) {
    stringCollection, _ := generateRandomLengthOfStrings(smallString)
    var t []interface{}
    for _, d := range stringCollection {
        t = append(t, d)
    }
    format := strings.Repeat("%s ", len(t))
    format = strings.TrimSuffix(format, " ")
    var s string
    for n := 0; n < b.N; n++ {
        s = fmt.Sprintf(format, t...)
        _ = s
    }
}

func BenchmarkWithSprintfLongerStringKnownSize(b *testing.B) {
    stringCollection, _ := generateRandomLengthOfStrings(longString)
    var t []interface{}
    for _, d := range stringCollection {
        t = append(t, d)
    }
    format := strings.Repeat("%s ", len(t))
    format = strings.TrimSuffix(format, " ")
    var s string
    for n := 0; n < b.N; n++ {
        s = fmt.Sprintf(format, t...)
        _ = s
    }
}
```

This is what we can see with `-gcflags=-N`

```bash
go test -gcflags=-N -bench=. -benchmem
goos: darwin
goarch: amd64
pkg: github.com/kodelint/golang-string-concatenation-benchmark
cpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
BenchmarkWithSprintfSmallStringUnknownSize-12     	      15	  77656376 ns/op	16356770 B/op	  400105 allocs/op
BenchmarkWithSprintfLongerStringUnknownSize-12    	      14	  80673645 ns/op	69752674 B/op	  400106 allocs/op
PASS
ok  	github.com/kodelint/golang-string-concatenation-benchmark	4.027s
```

Clearly, `Sprintf` took much more time, What if we know the **length of the string**

```bash
go test -gcflags=-N -bench=. -benchmem
goos: darwin
goarch: amd64
pkg: github.com/kodelint/golang-string-concatenation-benchmark
cpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
BenchmarkWithSprintfSmallStringUnknownSize-12     	      16	  76722288 ns/op	16356770 B/op	  400105 allocs/op
BenchmarkWithSprintfLongerStringUnknownSize-12    	      12	  82252703 ns/op	69752674 B/op	  400106 allocs/op
BenchmarkWithSprintfSmallStringKnownSize-12       	      30	  37474776 ns/op	 7702744 B/op	  100206 allocs/op
BenchmarkWithSprintfLongerStringKnownSize-12      	      28	  39284224 ns/op	24934730 B/op	  100206 allocs/op
PASS
ok  	github.com/kodelint/golang-string-concatenation-benchmark	6.276s
```

Result changed drastically, when the **length of string** is **known.** What If we**enable optimization ?**

```bash
go test -bench=. -benchmem
goos: darwin
goarch: amd64
pkg: github.com/kodelint/golang-string-concatenation-benchmark
cpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
BenchmarkWithOperatorSmallStringUnknownSize-12    	      58	  18573199 ns/op	 5300632 B/op	     100 allocs/op
BenchmarkWithOperatorLongerStringUnknownSize-12   	      63	  18774773 ns/op	22532608 B/op	     100 allocs/op
BenchmarkWithSprintfSmallStringUnknownSize-12     	      15	  77732236 ns/op	16356770 B/op	  400105 allocs/op
BenchmarkWithSprintfLongerStringUnknownSize-12    	      12	  81347662 ns/op	69752674 B/op	  400106 allocs/op
BenchmarkWithSprintfSmallStringKnownSize-12       	      32	  35974766 ns/op	 7702744 B/op	  100206 allocs/op
BenchmarkWithSprintfLongerStringKnownSize-12      	      28	  38222606 ns/op	24934730 B/op	  100206 allocs/op
PASS
ok  	github.com/kodelint/golang-string-concatenation-benchmark	9.972s
```

So now the numbers improved individually.

> For now, for `string` concatenation **`+`\*\***operator** seems to be **winning** the race if the **length** is **unknown,** however if the**length is known** then **`Sprintf`**\*\*** performs way better.

3. **Using** [`Join`](https://pkg.go.dev/strings#Join)

Now let’s use [`Join`](https://pkg.go.dev/strings#Join) and see what is the differences. Code changes below

```go
package main

import (
    "fmt"
    "strings"
    "testing"
)

const (
    smallString = "StringsInGolang"
    longString  = "somegarbagestringwithallthecharacterslknvklancerlkwrvcekljrvklrn"
)

func generateRandomLengthOfStrings(s string) (stringCollection []string, stringSize int) {
    // Running the loop for 100 time and each time
    // inserting the same in the List Of String []data
    for i := 0; i < 100; i++ {
        stringCollection = append(stringCollection, s)
        stringSize += len(s)
    }
    return stringCollection, stringSize
}

func BenchmarkWithJoinSmallerStringKnownSize(b *testing.B) {
    stringCollection, _ := generateRandomLengthOfStrings(smallString)
    var s string
    for n := 0; n < b.N; n++ {
        s = strings.Join(stringCollection, " ")
        _ = s
    }
}

func BenchmarkWithJoinLongerStringKnownSize(b *testing.B) {
    stringCollection, _ := generateRandomLengthOfStrings(longString)
    var s string
    for n := 0; n < b.N; n++ {
        s = strings.Join(stringCollection, " ")
        _ = s
    }
}
```

Results are here with `string` **length is known**

```bash
go test -bench=. -benchmem
goos: darwin
goarch: amd64
pkg: github.com/kodelint/golang-string-concatenation-benchmark
cpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
BenchmarkWithOperatorSmallStringUnknownSize-12    	      58	  18573199 ns/op	 5300632 B/op	     100 allocs/op
BenchmarkWithOperatorLongerStringUnknownSize-12   	      63	  18774773 ns/op	22532608 B/op	     100 allocs/op
BenchmarkWithSprintfSmallStringUnknownSize-12     	      15	  77732236 ns/op	16356770 B/op	  400105 allocs/op
BenchmarkWithSprintfLongerStringUnknownSize-12    	      12	  81347662 ns/op	69752674 B/op	  400106 allocs/op
BenchmarkWithSprintfSmallStringKnownSize-12       	      32	  35974766 ns/op	 7702744 B/op	  100206 allocs/op
BenchmarkWithSprintfLongerStringKnownSize-12      	      28	  38222606 ns/op	24934730 B/op	  100206 allocs/op
BenchmarkWithJoinSmallerStringKnownSize-12        	     375	   3177663 ns/op	    6400 B/op	       2 allocs/op
BenchmarkWithJoinLongerStringKnownSize-12         	     372	   3185361 ns/op	   24576 B/op	       2 allocs/op
PASS
ok  	github.com/kodelint/golang-string-concatenation-benchmark	12.787s
```

As you can see the [`Join`](https://pkg.go.dev/strings#Join) work very well in comparison to any other method when the length of string is known.

4. **Using** [`Builder`](https://pkg.go.dev/strings#Builder) from [`strings`](https://pkg.go.dev/strings) **package**

From Golang 1.10 onwards **[`strings`](https://pkg.go.dev/strings)** package has a **[`Builder`](https://pkg.go.dev/strings#Builder)** type which can used to build strings. Here is the code changes

```go
package main

import (
    "strings"
    "testing"
)

const (
    smallString = "StringsInGolang"
    longString  = "somegarbagestringwithallthecharacterslknvklancerlkwrvcekljrvklrn"
)

func generateRandomLengthOfStrings(s string) (stringCollection []string, stringSize int) {
    // Running the loop for 100 time and each time
    // inserting the same in the List Of String []data
    for i := 0; i < 100; i++ {
        stringCollection = append(stringCollection, s)
        stringSize += len(s)
    }
    return stringCollection, stringSize
}

func BenchmarkWithStringBuilderSmallerStringUnknownSize(b *testing.B) {
    stringCollection, _ := generateRandomLengthOfStrings(smallString)
    var s string
    for n := 0; n < b.N; n++ {
        var builder strings.Builder
        for _, s := range stringCollection {
            builder.WriteString(s)
        }
        s = builder.String()
        _ = s
    }
}

func BenchmarkWithStringBuilderLongerStringUnknownSize(b *testing.B) {
    stringCollection, _ := generateRandomLengthOfStrings(longString)
    var s string
    for n := 0; n < b.N; n++ {
        var builder strings.Builder
        for _, s := range stringCollection {
            builder.WriteString(s)
        }
        s = builder.String()
        _ = s
    }
}

func BenchmarkWithStringBuilderSmallerStringKnownSize(b *testing.B) {
    stringCollection, size := generateRandomLengthOfStrings(smallString)
    var s string
    for n := 0; n < b.N; n++ {
        var builder strings.Builder
        builder.Grow(size)
        for _, s := range stringCollection {
            builder.WriteString(s)
        }
        s = builder.String()
        _ = s
    }
}

func BenchmarkWithStringBuilderLongerStringKnownSize(b *testing.B) {
    stringCollection, size := generateRandomLengthOfStrings(longString)
    var s string
    for n := 0; n < b.N; n++ {
        var builder strings.Builder
        builder.Grow(size)
        for _, s := range stringCollection {
            builder.WriteString(s)
        }
        s = builder.String()
        _ = s
    }
}
```

Here are the results

```bash
go test -bench=. -benchmem
goos: darwin
goarch: amd64
pkg: github.com/kodelint/golang-string-concatenation-benchmark
cpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
BenchmarkWithOperatorSmallStringUnknownSize-12        	      58	  18573199 ns/op	 5300632 B/op	     100 allocs/op
BenchmarkWithOperatorLongerStringUnknownSize-12       	      63	  18774773 ns/op	22532608 B/op	     100 allocs/op
BenchmarkWithSprintfSmallStringUnknownSize-12         	      15	  77732236 ns/op	16356770 B/op	  400105 allocs/op
BenchmarkWithSprintfLongerStringUnknownSize-12        	      12	  81347662 ns/op	69752674 B/op	  400106 allocs/op
BenchmarkWithSprintfSmallStringKnownSize-12           	      32	  35974766 ns/op	 7702744 B/op	  100206 allocs/op
BenchmarkWithSprintfLongerStringKnownSize-12          	      28	  38222606 ns/op	24934730 B/op	  100206 allocs/op
BenchmarkWithJoinSmallerStringKnownSize-12            	     375	   3177663 ns/op	    6400 B/op	       2 allocs/op
BenchmarkWithJoinLongerStringKnownSize-12             	     372	   3185361 ns/op	   24576 B/op	       2 allocs/op
BenchmarkWithStringBuilderSmallerStringUnknownSize-12 	     213	   5578767 ns/op	   23288 B/op	      12 allocs/op
BenchmarkWithStringBuilderLongerStringUnknownSize-12  	     214	   5572972 ns/op	   75512 B/op	      12 allocs/op
BenchmarkWithStringBuilderSmallerStringKnownSize-12   	     372	   3177304 ns/op	    6400 B/op	       2 allocs/op
BenchmarkWithStringBuilderLongerStringKnownSize-12    	     372	   3179267 ns/op	   24576 B/op	       2 allocs/op
PASS
ok  	github.com/kodelint/golang-string-concatenation-benchmark	17.567s
```

Once again it performed pretty good when the length is known and also the performance was significantly better the `+` operator when the length is unknown

So, overall looking at the benchmark result looks like [`Join`](https://pkg.go.dev/strings#Join) ,[`Builder`](https://pkg.go.dev/strings#Builder) , `Sprintf` does pretty good job when the length of the string is known or unknown. The `+` operator for that matter shows poor performance in both cases.

Hope this provides little more insight about _**strings**_ and how it’s get treated by the language

## Happy Coding!!

