---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Golang Ways to optimizing your Go Code — Profiling
author: Satyajit Roy
date: 2022-04-12
image: "/assets/uploads/01-optimize.png"
cross_post_url: "https://towardsdev.com/golang-ways-to-optimizing-your-go-code-profiling-f79ff242a97b/"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---


## [Golang] Ways to optimizing your Go Code — Profiling

As developer you need to make sure the code you are writing is efficient and optimized. However _over optimization_ and trying to achieve _hyper efficiency_ sometime leads to unnecessary wastage of time because of no ROI. We need to find the right balance between not caring and going overboard with it.

![](https://cdn-images-1.medium.com/fit/c/560/240/1*wmjUZxavf1NkqlHwFjOePQ.gif)✍︎

Instead of looking for small performance gains that harm readability so much that they aren’t even worth it, we should look for the large (97%) gains that can be found by improving the critical code. _**So the question is how do we find what we can optimize in our code. Are there any tools available to see under hood ?**_

### There are multiple way to identify the opportunity area’s

  1. **[runtime/pprof](https://pkg.go.dev/runtime/pprof)** is a tool for visualization and analysis of profiling data. It’s useful for identifying where your application is spending its time (CPU and memory).
  2. **[net/http/pprof](https://pkg.go.dev/net/http/pprof)****** serves via its _HTTP server runtime profiling_ data in the format expected by the **[runtime/pprof](https://pkg.go.dev/runtime/pprof)** visualization tool.
  3. **[pkg/profile](https://github.com/pkg/profile)****** provides a simple way to manage **[runtime/pprof](https://pkg.go.dev/runtime/pprof)** profiling of your Go application
  4. **[runtime/trace](https://pkg.go.dev/runtime/trace)****** contains facilities for programs to generate traces for the Go execution tracer
  5. **[runtime/debug](https://pkg.go.dev/runtime/debug@go1.18)****** contains facilities for programs to debug themselves while they are running



Let consider the _example code_ below which I want to optimized or at least find the opportunity areas, don’t judge me on the code though …🤣
    
    
    package main
    
    
    import (
        "log"
        "os"
        "runtime"
        **"runtime/pprof"**
    )
    
    
    func main() {
    **cpu, err := os.Create("cpu.prof")
        if err != nil {
            log.Fatal(err)
        }
        pprof.StartCPUProfile(cpu)
        defer pprof.StopCPUProfile()**
    
    
        x := make([]string, 0)
        for i := 0; i < 1000000; i++ {
            x = append(x, "Some Garbage string")
        }
    
    
    **runtime.GC()
        mem, err := os.Create("memory.prof")
        if err != nil {
            log.Fatal(err)
        }
        defer mem.Close()
        if err := pprof.WriteHeapProfile(mem); err != nil {
            log.Fatal(err)
        }**
    }

Above code I am using **[runtime/pprof](https://pkg.go.dev/runtime/pprof)****** to generate _**CPU Profile**_ and _**Heap Profile**_ for the highly complicated 🤣 program.

To see the **CPU Profile**
    
    
    **> > go tool pprof cpu.prof**
    
    
    Type: cpu
    Time: Apr 11, 2022 at 7:23pm (PDT)
    Duration: 201.71ms, Total samples = 90ms (44.62%)
    Entering interactive mode (type "help" for commands, "o" for options)
    (pprof) top10
    Showing nodes accounting for 90ms, 100% of 90ms total
    Showing top 10 nodes out of 30
          flat  flat%   sum%        cum   cum%
          30ms 33.33% 33.33%       30ms 33.33%  runtime.usleep
          20ms 22.22% 55.56%       20ms 22.22%  runtime.pthread_cond_signal
          10ms 11.11% 66.67%       10ms 11.11%  runtime.gcWriteBarrier
          10ms 11.11% 77.78%       10ms 11.11%  runtime.kevent
          10ms 11.11% 88.89%       10ms 11.11%  runtime.memmove
          10ms 11.11%   100%       10ms 11.11%  runtime.scanblock
             0     0%   100%       20ms 22.22%  main.main
             0     0%   100%       10ms 11.11%  runtime.gcBgMarkWorker
             0     0%   100%       40ms 44.44%  runtime.gcBgMarkWorker.func2
             0     0%   100%       40ms 44.44%  runtime.gcDrain
    (pprof) quit

To see the **Memory Allocation**
    
    
    **> > go tool pprof memory.prof**
    
    
    Type: inuse_space
    Time: Apr 11, 2022 at 7:23pm (PDT)
    Entering interactive mode (type "help" for commands, "o" for options)
    (pprof) top
    Showing nodes accounting for 4771.85kB, 100% of 4771.85kB total
    Showing top 10 nodes out of 18
          flat  flat%   sum%        cum   cum%
     3075.38kB 64.45% 64.45%  3075.38kB 64.45%  runtime.allocm
     1184.27kB 24.82% 89.27%  1184.27kB 24.82%  runtime/pprof.StartCPUProfile
      512.20kB 10.73%   100%   512.20kB 10.73%  runtime.malg
             0     0%   100%  1184.27kB 24.82%  main.main
             0     0%   100%  1184.27kB 24.82%  runtime.main
             0     0%   100%  2050.25kB 42.97%  runtime.mcall
             0     0%   100%  1025.12kB 21.48%  runtime.mstart
             0     0%   100%  1025.12kB 21.48%  runtime.mstart0
             0     0%   100%  1025.12kB 21.48%  runtime.mstart1
             0     0%   100%  3075.38kB 64.45%  runtime.newm

 _**Notes**_ : some of the useful command for `pprof` are `top` , `top10` , `list` and `list main\.` (`list` with `regex` _)_

Now let’s use **[net/http/pprof](https://pkg.go.dev/net/http/pprof)****** package to see what happens. As mentioned earlier **[net/http/pprof](https://pkg.go.dev/net/http/pprof)****** gives you this ability to view the profile stats generated by **[runtime/pprof](https://pkg.go.dev/runtime/pprof)** in a browser

**Same code with minor alteration**
    
    
    package main
    
    
    import (
      "net/http"
      **_ "net/http/pprof"**
      "log"
      "time"
    )
    
    
    func main() {
    **go func() {
            log.Println(http.ListenAndServe("localhost:6060", nil))
        }()**
        x := make([]string, 0)
        for i := 0; i < 1000000; i++ {
            x = append(x, "Some Garbage string")
        }
        _**time.Sleep(1*time.Minute)       // Run it for little longer**_
    }

Run the program and open browser <http://localhost:6060/debug/pprof/>
    
    
    >> go run prof.go

You should see something like this

![](https://cdn-images-1.medium.com/fit/c/800/341/1*EKXZJC9oIMgsUD9NzwYSqQ.png)✍︎

Each **Profile Type** can be visited to explore more **goroutines, heap, threadcreate** etc

![](https://cdn-images-1.medium.com/fit/c/800/456/1*n7RO3o-F3uNTKUZBfDM7JA.png)✍︎![](https://cdn-images-1.medium.com/fit/c/800/405/1*Cju_EtlGWuoNCyxradZRFg.png)✍︎![](https://cdn-images-1.medium.com/fit/c/800/189/1*OKGWvUNH4XothZ4v11Cnew.png)✍︎

 _**To spice this up you can add**_[`github.com/felixge/fgprof`](http://github.com/felixge/fgprof) _this package and see the diff._**Code Changes**
    
    
    package main
    
    
    import (
      "net/http"
      _ "net/http/pprof"
      **"github.com/felixge/fgprof"**
      "log"
      "time"
    )
    
    
    func main() {
        **http.DefaultServeMux.Handle("/debug/fgprof", fgprof.Handler())**
        go func() {
            log.Println(http.ListenAndServe("localhost:6060", nil))
        }()
    
    
    
        x := make([]string, 0)
        for i := 0; i < 1000000; i++ {
            x = append(x, "Some Garbage string")
        }
        time.Sleep(1*time.Minute)
    }

Now run the program and also from another tab run following
    
    
    go tool pprof --http=:6061 "<http://localhost:6060/debug/fgprof?seconds=3>"

Now everything is more navigable, colorful and we get the **Flame Graph..yay!!**

![](https://cdn-images-1.medium.com/fit/c/800/145/1*wTT2gR60Oh-Uyg2C_Xh5AQ.png) ✍︎![](https://cdn-images-1.medium.com/fit/c/800/1493/1*rLQOSbgw5nNjZ79K-Uw8oQ.png)✍︎![](https://cdn-images-1.medium.com/fit/c/800/2703/1*ZiMbFGIRzfq521RAlQujKQ.png)✍︎

Neat!! isn’t it.. 😃

Custom **[pkg/profile](https://github.com/pkg/profile)** is a decent wrapper on top of **[runtime/pprof](https://pkg.go.dev/runtime/pprof)****** and gives you following methods to enable profiling
    
    
    import "github.com/pkg/profile"
    
    func main() {
      defer profile.Start().Stop()
    
    }

**[pkg/profile](https://github.com/pkg/profile)****** package profiles **cpu usage by default** by using
    
    
    defer profile.Start().Stop() 
    
    
    // either of these
    
    
    defer profile.Start(profile.CPUProfile).Stop()

For **Memory profiling** you can run this
    
    
    defer profile.Start(profile.MemProfile).Stop()

A `NoShutdownHook` should be considered with any non-trivial program. Without this flag, the program will use SIGINT to ensure profiles are written cleanly.

To set the path of the profile (default is temp directory):
    
    
    defer profile.Start(profile.ProfilePath("./memprofile")
                ).Stop()

We can combine profile args such as:
    
    
    defer profile.Start(
      profile.MemProfile, 
      profile.ProfilePath("./memprofile")
      ).Stop()

**[runtime/trace](https://pkg.go.dev/runtime/trace)****** and****[runtime/debug](https://pkg.go.dev/runtime/debug@go1.18.1)**** are part of runtime package and provides insight about trace and debug, which can be easily seen using **[net/http/pprof](https://pkg.go.dev/net/http/pprof)****** on the page.

Above were all package which can be used to profile your program from within. There are also tools which can used to profile your program from outside like **[google/pprof](https://github.com/google/pprof)** can be used to profile you program and it provides visualization and analysis of profiling data.

pprof reads a collection of profiling samples in _**profile.proto**_ format and generates reports to visualize and help analyze the data. It can generate both text and graphical reports (through the use of the dot visualization package).

![](https://cdn-images-1.medium.com/fit/c/400/400/0*AMSDffFIaGwjpmj6.jpg)✍︎

Now the bigger question is **Can we profile our code in production ?**

> I would say **no** , in my opinion **profiling** and **benchmarking** should be part of **earlier stages** when the code is still in baking stage and not merged into production. Technically it defeats the purpose, I would rather perform all checks like profiling, benchmarking, leak checks etc etc and then move the code to release branch.

Now having said that running **[google/pprof](https://github.com/google/pprof)****** or****[runtime/pprof](https://pkg.go.dev/runtime/pprof)**** on production is safe and there are some use case where you might have to profile your code in production like

  * Debug performance problems only visible in production.
  * Understand where the contention cumulates and optimize
  * Enrich distributed traces by correlating them with profiling samples to understand the root cause of latency.



Profiling adds **5%** more overhead to your overall usages in **CPU** and **Heap Allocation.** One can certainly plan for it before hand. Sometime it may provide some crucial information which might not be available with generated or simulated environments. _**Though one should be careful of exposing**_`/debug` to all, it can cause other problems like bad actor joins the crew. The whole idea of `/debug` _**is to debug your application which means you can see under hood, application internals and that is not for public eyes …period.**_

Pporf urls should be secured via RBAC or Reverse proxy etc so that only group of authorized and authenticate people can see them.

Hope this gives you some insight about the `Golang` profiling and tools can be used. As mentioned earlier we just need to find the right balance between completely not doing it and going overboard with it

## Happy Coding!!
