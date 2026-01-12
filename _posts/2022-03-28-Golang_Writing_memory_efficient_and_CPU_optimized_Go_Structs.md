---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Golang - Writing memory efficient and CPU optimized Go Structs
author: Satyajit Roy
date: 2022-03-28
image: "/assets/uploads/01-struct.png"
cross_post_url: "https://towardsdev.com/golang-writing-memory-efficient-and-cpu-optimized-go-structs-62fcef4dbfd0/"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---

A struct is a typed collection of fields, useful for grouping data into records. This allows all the data relating to one entity to be neatly encapsulated in one lightweight type definition, behavior can then be implemented by defining functions on the struct type.

This blog I will try to explain how we can efficiently write struct in terms of **Memory** **Usages** and **CPU Cycles.**

![](https://github.com/kodelint/blog-assets/raw/main/images/01-golang-struct.png)

Let’s consider this struct below, definition of terraform resource type for some weird use-case I have:

```golang
type TerraformResource struct {
  Cloud                string                       // 16 bytes
  Name                 string                       // 16 bytes
  HaveDSL              bool                         //  1 byte
  PluginVersion        string                       // 16 bytes
  IsVersionControlled  bool                         //  1 byte
  TerraformVersion     string                       // 16 bytes
  ModuleVersionMajor   int32                        //  4 bytes
}
```

Let see how much memory allocation is required for the `TerraformResource` struct using [code](https://gist.github.com/kodelint/a7d1f0f498d536dd6c515f6cded41889) below:

```golang
package main

import "fmt"
import "unsafe"

type TerraformResource struct {
  Cloud                string                       // 16 bytes
  Name                 string                       // 16 bytes
  HaveDSL              bool                         //  1 byte
  PluginVersion        string                       // 16 bytes
  IsVersionControlled  bool                         //  1 byte
  TerraformVersion     string                       // 16 bytes
  ModuleVersionMajor   int32                        //  4 bytes
}

func main() {
    var d TerraformResource
    d.Cloud = "aws"
    d.Name = "ec2"
    d.HaveDSL = true
    d.PluginVersion = "3.64"
    d.TerraformVersion = "1.1"
    d.ModuleVersionMajor = 1
    d.IsVersionControlled = true
    fmt.Println("==============================================================")
    fmt.Printf("Total Memory Usage StructType:d %T => [%d]\n", d, unsafe.Sizeof(d))
    fmt.Println("==============================================================")
    fmt.Printf("Cloud Field StructType:d.Cloud %T => [%d]\n", d.Cloud, unsafe.Sizeof(d.Cloud))
    fmt.Printf("Name Field StructType:d.Name %T => [%d]\n", d.Name, unsafe.Sizeof(d.Name))
    fmt.Printf("HaveDSL Field StructType:d.HaveDSL %T => [%d]\n", d.HaveDSL, unsafe.Sizeof(d.HaveDSL))
    fmt.Printf("PluginVersion Field StructType:d.PluginVersion %T => [%d]\n", d.PluginVersion, unsafe.Sizeof(d.PluginVersion))
    fmt.Printf("ModuleVersionMajor Field StructType:d.IsVersionControlled %T => [%d]\n", d.IsVersionControlled, unsafe.Sizeof(d.IsVersionControlled))
    fmt.Printf("TerraformVersion Field StructType:d.TerraformVersion %T => [%d]\n", d.TerraformVersion, unsafe.Sizeof(d.TerraformVersion))
    fmt.Printf("ModuleVersionMajor Field StructType:d.ModuleVersionMajor %T => [%d]\n", d.ModuleVersionMajor, unsafe.Sizeof(d.ModuleVersionMajor))
}
```

### Output

```bash
==============================================================
Total Memory Usage StructType:d main.TerraformResource => [88]
==============================================================
Cloud Field StructType:d.Cloud string => [16]
Name Field StructType:d.Name string => [16]
HaveDSL Field StructType:d.HaveDSL bool => [1]
PluginVersion Field StructType:d.PluginVersion string => [16]
ModuleVersionMajor Field StructType:d.IsVersionControlled bool => [1]
TerraformVersion Field StructType:d.TerraformVersion string => [16]
ModuleVersionMajor Field StructType:d.ModuleVersionMajor int32 => [4]
```

So total memory allocation required for the TerraformResource struct is **88 bytes**. This is how the _**memory allocation**_ will look like for TerraformResource type

![](https://github.com/kodelint/blog-assets/raw/main/images/01-golang-struct-memory-map.jpeg)

But how come _**88 bytes**_, `16 +16 + 1 + 16 + 1+ 16 + 4` = `70 bytes`, _**where is this additional `18 bytes`**_ coming from ?

When it comes to _**memory allocation**_ for structs, they are always allocated contiguous, byte-aligned blocks of memory, and fields are allocated and stored in the order that they are defined. The concept of **byte-alignment** in this context means that the contiguous blocks of memory are aligned at offsets equal to the platforms word size.

![](https://github.com/kodelint/blog-assets/raw/main/images/02-golang-struct-memory-map.jpeg)

We can clearly see that `TerraformResource.HaveDSL` , `TerraformResource.isVersionControlled` and `TerraformResource.ModuleVersionMajor` are only occupying `1 Byte`, `1 Byte` and `4 Bytes` respectively. Rest of the space is fill with _**empty pad bytes**_.

So going back to same math

> _**Allocation bytes**_ = `16 bytes` + `16 bytes` + `1 byte` + `16 bytes` + `1 byte` + `16 byte` + `4 bytes`  
>  _**Empty Pad bytes**_ = `7 bytes` + `7 bytes` + `4 bytes` = `18 bytes`  
>  _**Total bytes**_ = _**Allocation bytes**_ + _**Empty Pad bytes**_ = `70 bytes` + `18 bytes` = `88 bytes`

So, How do we **fix** this ? With proper _**data structure alignment**_ what if we redefine our struct like this

```golang
type TerraformResource struct {
  Cloud                string                       // 16 bytes
  Name                 string                       // 16 bytes
  PluginVersion        string                       // 16 bytes
  TerraformVersion     string                       // 16 bytes
  ModuleVersionMajor   int32                        //  4 bytes
  HaveDSL              bool                         //  1 byte
  IsVersionControlled  bool                         //  1 byte
}
```

Run the same [Code](https://gist.github.com/kodelint/a6f6b13d315b27ad649ca8fe4b41e67c#file-golang-struct-memory-allocation-optimized-go) with optimized struct

```golang
package main

import "fmt"
import "unsafe"

type TerraformResource struct {
  Cloud                string                       // 16 bytes
  Name                 string                       // 16 bytes
  PluginVersion        string                       // 16 bytes
  TerraformVersion     string                       // 16 bytes
  ModuleVersionMajor   int32                        //  4 bytes
  HaveDSL              bool                         //  1 byte
  IsVersionControlled  bool                         //  1 byte
}

func main() {
    var d TerraformResource
    d.Cloud = "aws"
    d.Name = "ec2"
    d.HaveDSL = true
    d.PluginVersion = "3.64"
    d.TerraformVersion = "1.1"
    d.ModuleVersionMajor = 1
    d.IsVersionControlled = true
    fmt.Println("==============================================================")
    fmt.Printf("Total Memory Usage StructType:d %T => [%d]\n", d, unsafe.Sizeof(d))
    fmt.Println("==============================================================")
    fmt.Printf("Cloud Field StructType:d.Cloud %T => [%d]\n", d.Cloud, unsafe.Sizeof(d.Cloud))
    fmt.Printf("Name Field StructType:d.Name %T => [%d]\n", d.Name, unsafe.Sizeof(d.Name))
    fmt.Printf("HaveDSL Field StructType:d.HaveDSL %T => [%d]\n", d.HaveDSL, unsafe.Sizeof(d.HaveDSL))
    fmt.Printf("PluginVersion Field StructType:d.PluginVersion %T => [%d]\n", d.PluginVersion, unsafe.Sizeof(d.PluginVersion))
    fmt.Printf("ModuleVersionMajor Field StructType:d.IsVersionControlled %T => [%d]\n", d.IsVersionControlled, unsafe.Sizeof(d.IsVersionControlled))
    fmt.Printf("TerraformVersion Field StructType:d.TerraformVersion %T => [%d]\n", d.TerraformVersion, unsafe.Sizeof(d.TerraformVersion))
    fmt.Printf("ModuleVersionMajor Field StructType:d.ModuleVersionMajor %T => [%d]\n", d.ModuleVersionMajor, unsafe.Sizeof(d.ModuleVersionMajor))
}
```

### **Output**

```bash
go run golang-struct-memory-allocation-optimized.go

==============================================================
Total Memory Usage StructType:d main.TerraformResource => [72]
==============================================================
Cloud Field StructType:d.Cloud string => [16]
Name Field StructType:d.Name string => [16]
HaveDSL Field StructType:d.HaveDSL bool => [1]
PluginVersion Field StructType:d.PluginVersion string => [16]
ModuleVersionMajor Field StructType:d.IsVersionControlled bool => [1]
TerraformVersion Field StructType:d.TerraformVersion string => [16]
ModuleVersionMajor Field StructType:d.ModuleVersionMajor int32 => [4]
```

Now total _**memory allocation**_ for the `TerraformResource` type is `72 bytes`. Let’s see how the memory alignments looks likes

![](https://github.com/kodelint/blog-assets/raw/main/images/03-golang-struct-memory-map.jpeg)

Just by doing proper _**data structure alignment**_ for the struct elements we were able to reduce the memory footprint from `88 bytes` to `72 bytes`**....Sweet!!**

**Let’s check the math**

> _**Allocation bytes**_ = `16 bytes` + `16 bytes` + `16 bytes` + `16 bytes` + `4 bytes` + `1 byte` + `1 bytes` = `70 bytes`  
> _**Empty Pad bytes**_ = `2 bytes`  
> _**Total bytes**_ = _**Allocation bytes**_ + _**Empty Pad bytes**_ = `70 bytes` + `2 bytes` = `72 bytes`

Proper _**data structure alignment**_ not only helps us use _**memory efficiently**_ but also with **CPU Read Cycles….How ?**

CPU Reads memory in _**words**_ which is _**`4 bytes`**_ on a _**`32-bit`**_, _**`8 bytes`**_ on a _**`64-bit`**_ systems. Now our first declaration of struct type TerraformResource will take `11 Words` for CPU to read everything

![](https://github.com/kodelint/blog-assets/raw/main/images/01-golang-struct-word-length.jpeg)

However the **optimized** struct will only take `9 Words` as shown below

![](https://github.com/kodelint/blog-assets/raw/main/images/02-golang-struct-word-length.jpeg)

By defining out struct properly data structured aligned we were able to use _**memory allocation efficiently**_ and made the struct _**fast and efficient in terms of CPU Reads**_ as well.

This is just a small example, _**think about a large struct with 20 or 30 fields with different types**_. Thoughtful alignment of data structure really pays off … 🤩

Hope this blog was able to shed some light on struct internals, their memory allocations and required CPU reads cycles. Hope this helps!!

## Happy Coding!!
