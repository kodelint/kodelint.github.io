---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Golang - Garbage Collection in General
author: Satyajit Roy
date: 2022-08-16
image: "/assets/uploads/01-golang-GC-header.png"
cross_post_url: "https://medium.com/@email2sroy/golang-garbage-collection-in-general-c28ae82558c4/"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---

As we all know the `golang` is a **garbage collected** language like other languages like `java`, `python` , `C#` etc. **`Golang`** is a statically typed **_garbage collected language._**

### What is Garbage Collection and Why it is needed

So many articles has written about this subject. So I am going to keep that small and try to get some deeper insight about the concept.

> In SML programs (and in most other programming languages), it is possible to create **garbage** : allocated space that is no longer usable by the program.

When software is executed on your computer, there are two important memory location parts that it uses: **Stack** and **Heap**.

![](https://github.com/kodelint/blog-assets/raw/main/images/01-garbage-collection.jpg)

Above code has a `RandomBox` **type** and `GenerateRandomBox()` is a **function** which returns `RandomBox` **type**. The ref has been assigned in **stack** and struct data is in **heap.** Golang uses **[Escape Analysis](https://en.wikipedia.org/wiki/Escape_analysis)** to to determine that.

![](https://github.com/kodelint/blog-assets/raw/main/images/02-garbage-collection.jpg)

When the reference goes away, we end up with **Garbage**. This is how we get **Garbage**, which requires to be clean up time to time.

> When the program memory footprint reaches a certain threshold, the whole application will be suspended, the **Garbage Collector** scans all the objects assigned memory space and recycling are no longer used, after the end of this process, the user program can continue, the language also use this strategy implement garbage collection in the early days, but today’s implementation is much complicated

**Garbage collection** can be initiated manually or automatically depending on the programming language you are using. Every program `compiler` or `interpreter` uses a specific algorithm to perform **Garbage collection**. **Garbage collection** in a `compiled` language works the same way as in an `interpreted` language.

`Golang` use **[Tracing garbage](https://en.wikipedia.org/wiki/Tracing_garbage_collection)** collectors even though their code is usually compiled to machine code ahead-of-time. Go uses a **concurrent mark and sweep garbage collector** algorithm.

### What happens in Garbage Collection Process

`Go`’s **garbage collector** is called _**concurrent**_ because it can safely run in parallel with the main program. When compiler decides that this is the time to run **garbage collection** based on some _**condition**_ (discussed below), this is what it follows

#### Mark Setup

- which means compiler try to stops everything, literally called **stop the world** step. Nothing gets done in your application at this time.
- First it does is to enable **write barrier** which mean nothing get written in memory when this barrier is on _(Stop all go-routines)_. Compiler has to perform this to make sure that your application is not losing any data.

![](https://github.com/kodelint/blog-assets/raw/main/images/01-golang-gc-mark-setup.png)

- Once the **STW** is performed and the **write barrier** is on, collector moves on to next phase.

#### Marking

In this phase the following happens

- Inspect **`stacks`** to find the root pointer in **`heap`**
- Traverse the **`heap`** and see if they are still in use

**Collector** also uses **go-routine** like us and it takes **25%** of your available **go-routines** and assign them to itself. Means based on our previous example, 1 thread will be dedicated to **collector.**

> Now, if the collect finds out that it might go out of memory while performing this task, because some other `go-routine` is allocating more then it can mark. So it will choose that `go-routine` and ask it to help with marking. This process is called **Mark Assist**

![](https://github.com/kodelint/blog-assets/raw/main/images/01-golang-gc-marking.png)

#### Mark Termination

Here **collector** will again perform the **STW**, turn the **write barrier off**, perform some clean-up and calculate the next **Garbage collection** schedule

> _**Note:**_ The goal is to keep the **STW** down or within the **100ms** on every collection it needs to perform

One the **Mark Termination** process is complete _(STW and Write Barrier is Off)_, application start working again with all the **OS Threads** available.

This is what happens every time the collection happens, you may ask that yes, it did the marking by identifying the dangling values, however, it didn’t clean up them. That part is called **Sweeping**

> _**Myth Buster**_: **Sweeping** is not part of **Garbage Collection**, it happens **outside** of collection process.

### Sweeping

This is process where we claim the non-marked memory allocations. We need to get them back, thats the whole purpose of **Garbage Collection**.

- Claiming the unused locations happens when a new allocation happens. So, technically latency for **sweeping** is not added to **garbage collection.**

![](https://github.com/kodelint/blog-assets/raw/main/images/01-golang-gc-sweeping.gif)

### Garbage Collection Triggers

- The first metric the **garbage collector** will watch is the growth of the `heap`. By default, it will run when the _**heap doubles its size**_. **([code](https://github.com/golang/go/blob/master/src/runtime/mgc.go#L529))**
- The second metric the **garbage collector** is watching is the delay between two garbage collectors. If it has _**not been triggered for more than two minutes**_, one cycle will be forced. **([code](https://github.com/golang/go/blob/master/src/runtime/mgc.go#L560))**
- Application memory can also trigger **garbage collection** is the _**[`runtime.mallocgc`](https://github.com/golang/go/blob/master/src/runtime/malloc.go#L842)**_ function, which at runtime divides objects on the `heap` into micro objects, small objects, and large objects by size. The creation of each of these three objects can trigger a new garbage collection cycle.

- _**Manually**_ triggering it by calling **[`gc()`](https://github.com/golang/go/blob/master/src/runtime/mgc.go#L412)**.

### GC Collector knobs

Unlike `java` it was decided that a `golang` developer shouldn’t have to tune their **Garbage collector** whenever they move to different hardware. So they only provided one tuning config called _**[`SetGCPercentage`](https://pkg.go.dev/runtime/debug#SetGCPercent)**_ or _**[`GOGC`](https://pkg.go.dev/runtime#hdr-Environment_Variables)**_ environment variable. Default for **[`GOGC`](https://pkg.go.dev/runtime#hdr-Environment_Variables)** is _**100%**_

![](https://github.com/kodelint/blog-assets/raw/main/images/01-golang-gc-next-run-calculate.png)

### GC Pacer

There is **pacer algorithm** trying to figure out when to start new **collection**. As we know that the calculation happens when **Mark Termination** phase of **Garbage collection**. The **Pacer** algorithm tries to calculate this and if it find that it can get more advantage of starting the collection even before the condition applies, it will do that. So take away is that the collection can even start before then the calculated time if **pacer** think that it can get more benefit.

Hope this blog was able to provide little more in-depth inside about the **Garbage Collection** process and how it is implemented in `Golang`

## Happy Learning!!
