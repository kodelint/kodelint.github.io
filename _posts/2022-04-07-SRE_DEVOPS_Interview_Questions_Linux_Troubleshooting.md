---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: SRE/DevOps Interview Questions — Linux Troubleshooting
author: Satyajit Roy
date: "2022-04-07"
image: "/assets/uploads/01-interview.png"
cross_post_url: "https://awstip.com/sre-devops-interview-questions-linux-troubleshooting-1b8ffe82c16/"
toc: true
categories: [DevOps, Interview, Linux Troubleshooting]
tags: [DevOps, SRE, Interview, Linux Troubleshooting]
---

I have been on both sides of the table—as an interviewer and an interviewee—for **DevOps** and **SRE roles**. In this post, I am consolidating a comprehensive list of questions I've encountered, ranging from core kernel internals to high-level system architecture.

> **Note:** This is a living document intended to share knowledge, experience, and some of the more "fun" rabbit holes you might encounter during a technical deep dive.

---

## 🛠 Part 1: Linux Internals & Troubleshooting

Most SRE interviews begin with the fundamentals. These questions nudge your understanding of how Linux actually manages hardware and processes.

### 1. The Linux Boot Sequence
**Question:** What happens when a Linux system boots, from the moment you hit the power button until you see a login prompt?
> This probes knowledge of the hardware/software handoff. It covers BIOS/UEFI, the MBR/GPT, the Bootloader (GRUB), Kernel loading, and the Init system (systemd/SysVinit).
> [Detailed Answer can be found here](https://opensource.com/article/17/2/linux-boot-and-startup)

### 2. Deep Dive: Executing `ls`
**Question:** What happens internally when you type `ls` in a terminal and hit Enter?
> This is a classic question to see if you understand the `fork()` and `exec()` system calls.
> 
> 1. **Read & Tokenize:** The shell reads the input using `getline()` and tokenizes it via `strtok()`.
> 2. **Alias Check:** It checks if `ls` is a shell alias or built-in.
> 3. **Path Resolution:** If not built-in, the shell searches the `PATH` environment variable for the binary.
> 4. **Forking:** Once found, the shell calls `fork()` to create a child process. The `fork()` call returns `0` to the child and the child's PID to the parent (the shell).
> 5. **Execution:** The child executes `execve()`, which provides a new address space and loads the `ls` program.
> 6. **Inodes:** The `ls` utility reads directory contents by consulting the filesystem’s **inode** entries.
> 7. **Exit:** Upon completion, the process calls `_exit(0)`, and the kernel frees its resources.
> 
> *Pro Tip: Run `strace ls` to watch these system calls in action.*

### 3. Linux Inodes
**Question:** Explain what an Inode is and what information it contains.
> An Inode (index node) is a data structure that stores metadata about a file (size, owner, permissions, disk block pointers) but **not** the filename or the actual data.
> [Detailed Answer is available here](https://www.thegeekstuff.com/2012/01/linux-inodes)

### 4. Crash vs. Panic
**Question:** What is the difference between an application **Crash** and a **Kernel Panic**?
> - **Crash:** Usually hardware or OS-initiated. It occurs when a process triggers a `trap` (e.g., trying to access memory incorrectly). Common signals include `SIGSEGV` (segmentation fault), `SIGBUS` (bus error), and `SIGILL` (illegal instruction).
> - **Panic:** Usually application-initiated (or kernel-initiated) by calling an `abort()` or `panic()` function. It happens when the system encounters an unrecoverable error and decides to shut down abruptly to prevent data corruption.

### 5. The `/proc` Virtual Filesystem
**Question:** Explain the purpose of the `/proc` directory.
> `/proc` is a virtual (pseudo) filesystem that acts as a window into the kernel's data structures.
> 
> *   **`/proc/[pid]`**: Contains directories for every running process.
> *   **`/proc/self`**: Links to the process currently accessing the directory.
> *   **`/proc/maps`**: Shows the memory address space of a process.
> *   **`/proc/cmdline`**: Displays the arguments passed to the command line.
> *   **`/proc/environ`**: Shows the environment variables for a process.
> *   **`/proc/fd`**: Contains symbolic links to every open file descriptor.
> *   **`/proc/locks`**: Lists all current system-wide file locks.
> *   **`/proc/sys/fs/file-nr`**: Displays the number of open files and system limits.
> *   **`/proc/sys/vm`**: Contains files to tune the virtual memory subsystem.

---

## 📈 Part 2: Performance & Troubleshooting

### 6. The "Invisible" Full Disk
**Question:** You get a "filesystem is full" error, but `df` shows free space. How do you troubleshoot?
> There are two primary culprits:
> 1. **Inode Exhaustion:** Run `df -i`. If you have millions of tiny files, you may run out of inodes even if disk space is available.
> 2. **Unlinked Open Files:** A large file was deleted, but a process still holds its file descriptor open. The space isn't reclaimed until the process closes the file or restarts. Use `lsof +L1` to find these.

### 7. Performance Toolkit
**Question:** What are the first tools you use to analyze a slow Linux machine?
> Use the "First 60 Seconds" approach:
> *   `uptime` (Check load averages)
> *   `dmesg | tail` (Look for kernel errors/OOM kills)
> *   `vmstat 1` (Check memory and process states)
> *   `mpstat -P ALL 1` (Check CPU balance)
> *   `pidstat 1` (Identity resource-hungry processes)
> *   `iostat -xz 1` (Check disk I/O latency)
> *   `free -m` (Check memory availability)
> *   `sar -n DEV 1` (Check network throughput)
> *   `top` (General process overview)
> [Read more at Netflix Tech Blog](https://netflixtechblog.com/linux-performance-analysis-in-60-000-milliseconds-accc10403c55)

### 8. Linux Filesystems
**Question:** Explain the difference between common Linux filesystems.
> Linux supports nearly 100 filesystem types. Common ones include **EXT4** (standard), **XFS** (high performance for large files), **BTRFS** (copy-on-write, snapshots), and **ZFS**.
> [Detailed Guide to Filesystems](https://opensource.com/life/16/10/introduction-linux-filesystems)

### 9. Kernel Space vs. User Space
**Question:** What is the difference between Kernel Space and User Space?
> User Space is where applications run, while Kernel Space is restricted to the core OS. Applications use libraries like `libc` to make **System Calls** to the Kernel to perform protected operations (like writing to disk).
> [Detailed Answer](https://learnlinuxconcepts.blogspot.com/2014/02/kernel-space-and-user-space.html)

### 10. Troubleshooting High I/O
**Question:** How would you troubleshoot a system with high I/O wait?
> [Troubleshooting I/O Wait Guide](https://www.howtouselinux.com/post/troubleshoot-high-iowait-issue-on-linux-system)

---

## 🧠 Part 3: Memory, Processes & Concurrency

### 11. Processes vs. Threads
**Question:** What are the fundamental differences between a process and a thread?
> A process is an isolated program with its own memory space and a **PCB** (Process Control Block). Threads are "lightweight processes" that share the memory space of their parent process, making them faster to create but riskier due to shared state.
> [Process Management Deep Dive](https://learnlinuxconcepts.blogspot.com/2014/03/process-management.html)

### 12. Memory Management & Status
**Question:** Explain Kernel Memory Management and Task Status.
> Linux manages memory using complex paging and swapping algorithms. Processes can exist in various states: **Running**, **Interruptible Sleep**, **Uninterruptible Sleep** (waiting for I/O), **Stopped**, or **Zombie**.
> *   [Memory Management Lecture](https://linux-kernel-labs.github.io/refs/heads/master/lectures/memory-management.html)
> *   [Task Status & Blocking](https://linux-kernel-labs.github.io/refs/heads/master/lectures/processes.html#blocking-and-waking-up-tasks)

### 13. Concurrency & Race Conditions
**Question:** What is a Race Condition in a Linux context?
> A race condition occurs when multiple processes or threads access shared data simultaneously, and the final result depends on the timing of their execution.
> [Concurrency and Race Conditions](https://learnlinuxconcepts.blogspot.com/2014/07/concurrency-and-race-conditions.html)

### 14. Stack vs. Heap
**Question:** Explain Stack and Heap memory.
> - **Stack:** Fast, static memory allocation managed by the CPU. Stores local variables and function calls.
> - **Heap:** Dynamic memory allocation used for larger data structures. Requires manual management or Garbage Collection.
> [Stack vs Heap Comparison](https://learnlinuxconcepts.blogspot.com/2014/02/stack-and-heap.html)

### 15. Memory Leaks
**Question:** Define a Memory Leak.
> - **Naive Definition:** Failure to release *unreachable* memory. Detected by tools like Valgrind or managed by Garbage Collection.
> - **Subtle Definition:** Failure to release *reachable* memory that is no longer needed. This is much harder to detect and can still occur in garbage-collected languages.

### 16. Interrupts
**Question:** How does Linux handle hardware and software interrupts?
> [Interrupts Deep Dive](https://linux-kernel-labs.github.io/refs/heads/master/lectures/interrupts.html)

### 17. Load Average
**Question:** What do the numbers in `uptime` actually mean?
> Load average is the average number of processes in the **Running** or **Uninterruptible** state.
> [Read the definitive Load Average guide by Brendan Gregg](https://www.brendangregg.com/blog/2017-08-08/linux-load-averages.html).

### 18. What happens when you `curl`?
**Question:** Explain the flow of data when you execute `curl www.google.com`.
> This covers DNS resolution, TCP handshakes, TLS negotiation, and HTTP request/response cycles.
> [What Happens When... (Detailed Flow)](https://github.com/alex/what-happens-when)

---

## 🔗 High-Value Resources

Here are the best resources I recommend for any technical interview preparation:

1.  **[Facebook Production Engineer prep](https://azalio.wordpress.com/2016/05/29/facebook-production-engineer/)**
2.  **[LinkedIn Prep Wiki](https://github.com/krishnaramb/FB_Prep/wiki/linkedin)**
3.  **[SRE Interview Handbook](https://yumminhuang.github.io/note/sreinterview/)**
4.  **[Engineering Manager Prep](https://docs.google.com/document/d/1ckl5roGhYkZAEBfaJHZT_-80upmhfzBZWAGmXvPJd3U/edit#)**
5.  **[Google SWE Interview Tips](https://igotanoffer.com/blogs/tech/google-software-engineer-interview)**
6.  **[Amazon SWE Preparation](https://igotanoffer.com/blogs/tech/amazon-software-development-engineer-interview)**
7.  **[Troubleshooting BottleNecks & Leaks](https://www.bogotobogo.com/DevOps/DevOps-Sys-Admin-Interview-Questions-Trouble-Shooting-Slow-Application-Performance-BottleNecks-Leaks.php)**
8.  **[Linux Performance Analysis (Brendan Gregg)](https://www.brendangregg.com/Articles/Netflix_Linux_Perf_Analysis_60s.pdf)**
9.  **[Awesome Scalability Guide](https://github.com/binhnguyennus/awesome-scalability)**

I'll keep tracking these and updating this guide. Stay tuned!

## Happy Troubleshooting and Best of luck!
