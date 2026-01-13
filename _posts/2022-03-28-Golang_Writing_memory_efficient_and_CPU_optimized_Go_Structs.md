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

A struct is a typed collection of fields, useful for grouping data into records. This allows all the data relating to one entity to be neatly encapsulated in one lightweight type definition. Behavior can then be implemented by defining functions on the struct type.

In this blog, I will explain how to write structs efficiently to optimize both **Memory Usage** and **CPU Cycles.**

![Go Structs](https://github.com/kodelint/blog-assets/raw/main/images/01-golang-struct.png)

### The Problem: Memory Padding

Consider the following struct definition for a Terraform resource:

```go
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

Let's see how much memory is actually allocated for this struct using the following code:

```go
package main

import (
    "fmt"
    "unsafe"
)

type TerraformResource struct {
    Cloud               string
    Name                string
    HaveDSL             bool
    PluginVersion       string
    IsVersionControlled bool
    TerraformVersion    string
    ModuleVersionMajor  int32
}

func main() {
    var d TerraformResource
    fmt.Println("==============================================================")
    fmt.Printf("Total Memory Usage StructType:d %T => [%d] bytes\n", d, unsafe.Sizeof(d))
    fmt.Println("==============================================================")
    fmt.Printf("Cloud: %d | Name: %d | HaveDSL: %d\n", unsafe.Sizeof(d.Cloud), unsafe.Sizeof(d.Name), unsafe.Sizeof(d.HaveDSL))
    fmt.Printf("PluginVersion: %d | IsVersionControlled: %d\n", unsafe.Sizeof(d.PluginVersion), unsafe.Sizeof(d.IsVersionControlled))
    fmt.Printf("TerraformVersion: %d | ModuleVersionMajor: %d\n", unsafe.Sizeof(d.TerraformVersion), unsafe.Sizeof(d.ModuleVersionMajor))
}
```

### Output

```text
==============================================================
Total Memory Usage StructType:d main.TerraformResource => [88] bytes
==============================================================
Cloud: 16 | Name: 16 | HaveDSL: 1
PluginVersion: 16 | IsVersionControlled: 1
TerraformVersion: 16 | ModuleVersionMajor: 4
```

The total memory allocation is **88 bytes**. But wait—if we add up the field sizes: `16 + 16 + 1 + 16 + 1 + 16 + 4 = 70 bytes`. Where are the extra **18 bytes** coming from?

#### Byte Alignment
Go allocates memory in contiguous, byte-aligned blocks. Fields are stored in the order they are defined. To ensure fields start at an offset equal to the platform's word size (8 bytes on 64-bit systems), the compiler adds **padding bytes**.

![Memory Map Unoptimized](https://github.com/kodelint/blog-assets/raw/main/images/02-golang-struct-memory-map.jpeg)

In our example:
- `HaveDSL` (1 byte) is followed by 7 bytes of padding.
- `IsVersionControlled` (1 byte) is followed by 7 bytes of padding.
- `ModuleVersionMajor` (4 bytes) is followed by 4 bytes of padding.
- **Total Padding** = `7 + 7 + 4 = 18 bytes`.

---


### The Solution: Data Structure Alignment

We can fix this by ordering fields from largest to smallest. This minimizes the gaps required for alignment.

```go
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

### Output with Optimized Struct

```text
==============================================================
Total Memory Usage StructType:d main.TerraformResource => [72] bytes
==============================================================
```

Now the struct only takes **72 bytes**. We saved 16 bytes just by changing the order!

**The Math:**
- `Allocation bytes`: 70 bytes
- `Empty Pad bytes`: 2 bytes (to align the entire struct to 8-byte boundary)
- **Total**: 72 bytes

---


### CPU Efficiency: Read Cycles

CPU reads memory in **words** (8 bytes on a 64-bit system). 

1.  **Unoptimized Struct**: Takes **11 Word Reads** for the CPU to process the entire struct.
2.  **Optimized Struct**: Takes only **9 Word Reads**.

![Word Alignment](https://github.com/kodelint/blog-assets/raw/main/images/02-golang-struct-word-length.jpeg)

By aligning our data structures, we not only save memory but also make our code faster by reducing the number of CPU cycles required to read the data.

### Conclusion

In large applications with thousands of struct instances, these small changes can lead to significant reductions in memory footprint and improved cache locality. Thoughtful field alignment is a simple yet powerful optimization technique.

## Happy Coding!!