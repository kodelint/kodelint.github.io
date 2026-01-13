---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Golang - Garbage Collection in General
author: Satyajit Roy
date: 2022-08-16
image: "/assets/uploads/01-golang-GC-header.png"
cross_post_url: "https://medium.com/@email2sroy/golang-garbage-collection-in-general-c28ae82558c4/"
devto_url: "https://dev.to/deadlock/golang-garbage-collection-in-general-1m1f"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---

Go is a statically typed, **garbage collected** language, much like Java, Python, or C#. In this blog, we'll dive deeper into how Go manages memory and what happens during a garbage collection cycle.

### What is Garbage Collection and Why is it needed?

> In programming, **garbage** refers to allocated memory space that is no longer reachable or usable by the program.

When a program executes, it primarily uses two parts of memory: the **Stack** and the **Heap**.

```go
type RandomBox struct {
    ID   int
    Name string
}

func GenerateRandomBox() *RandomBox {
    // 'ref' is allocated on the stack
    // The struct itself escapes to the heap
    ref := &RandomBox{ID: 1, Name: "Rust"}
    return ref
}

func main() {
    box := GenerateRandomBox()
    fmt.Println(box.Name)
}
```

Go uses **[Escape Analysis](https://en.wikipedia.org/wiki/Escape_analysis)** to determine whether a variable can stay on the stack or must "escape" to the heap. When a reference to heap memory is lost, that memory becomes garbage and must be cleaned up.

![Memory Reference lost](https://github.com/kodelint/blog-assets/raw/main/images/02-garbage-collection.jpg)

### The Go Garbage Collector

Go uses a **concurrent mark and sweep garbage collector**. It is called *concurrent* because it can run in parallel with your main application code, minimizing pauses.

#### The GC Phases

When the compiler decides it's time to run a collection cycle, it follows these steps:

**1. Mark Setup (STW)**
The collector initiates a **Stop The World (STW)** event. This briefly pauses all goroutines to enable the **write barrier**, ensuring that no data is lost or corrupted while the collector is working.

![GC Mark Setup](https://github.com/kodelint/blog-assets/raw/main/images/01-golang-gc-mark-setup.png)

**2. Marking (Concurrent)**
In this phase:
*   The collector inspects stacks to find root pointers into the heap.
*   It traverses the heap to identify objects currently in use.
*   The collector uses **25% of available CPU power** (e.g., 1 out of 4 threads).

> **Mark Assist**: If an application goroutine is allocating memory faster than the collector can mark it, the collector may recruit that goroutine to help with the marking process.

![GC Marking](https://github.com/kodelint/blog-assets/raw/main/images/01-golang-gc-marking.png)

**3. Mark Termination (STW)**
Another brief STW event occurs to turn off the write barrier, perform final cleanup, and calculate the schedule for the next GC run. The goal is to keep these STW pauses under **100ms**.

---

### Sweeping and Triggers

**Sweeping** is the process of reclaiming memory from objects that were not marked as being in use. Interestingly, sweeping happens **outside** the main GC cycle—typically when a new memory allocation is requested—so it doesn't add to the GC latency.

![GC Sweeping Visualization](https://github.com/kodelint/blog-assets/raw/main/images/01-golang-gc-sweeping.gif)

#### What triggers a GC run?

1.  **Heap Growth**: By default, GC runs when the heap doubles in size from the previous run.
2.  **Time Interval**: If a collection hasn't run for more than **two minutes**, one is forced.
3.  **Manual Trigger**: You can call `runtime.GC()` manually (though rarely recommended).
4.  **Allocation Threshold**: Large allocations in `runtime.mallocgc` can also trigger a run.

### Tuning the Collector

Go's philosophy is to keep tuning simple. Developers have one primary knob: the **`GOGC`** environment variable (or `debug.SetGCPercent`). The default is **100**, meaning GC triggers when the heap grows by 100%.

![GC Tuning](https://github.com/kodelint/blog-assets/raw/main/images/01-golang-gc-next-run-calculate.png)

### The GC Pacer

The **GC Pacer** algorithm continuously monitors the application and may start a collection earlier than scheduled if it determines that doing so will provide a better performance benefit.

## Happy Learning!!