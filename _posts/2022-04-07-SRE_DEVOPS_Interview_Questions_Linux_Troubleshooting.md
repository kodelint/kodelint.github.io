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

I have been on both side of the table as interviewer and as interviewee for **DevOps** and **SRE Roles**. This blog I am trying to share some of the questions I have been asked or I have asked.

_**Note: This is just to share knowledge, experience and some fun questions**_

## Linux Troubleshooting

Any **DevOps** and **SRE** interview commonly starts with some troubleshooting questions, where the interviewer tries to nudge your Linux Internal and some basic core concepts. Here are some of them on top of my mind

**1. What happens when a Linux System boots, till you get a login prompt**

> This type of question usually comes from the companies where bare metals are still in use and they don’t use any public cloud. So let see what happens
> [Detailed Answer can be found here](https://opensource.com/article/17/2/linux-boot-and-startup)

**2. What happens when you type ls on terminal**

> These type of questions are used to understand interviewee attention to details and depth of Linux Internals. Basically the interviewer wants to know if you under `forks()` and `exec()` system calls.
> the shell reads what you typed using the `getline()` function and function called `strtok()` which took the line to tokenize. Shell also check if the 1st token `ls` is a Shell alias or not. If it’s not a built-in function, shell will find the `PATH` variable in the directory. Since it holds the absolute paths for all the executable binary files. Once it finds the binary for `ls`, the program is loaded in memory and a system call `fork()` is made. This creates a child process as `ls` and the shell will be the parent process. The `fork()` returns `0` to the child process so it knows it has to act as a child and returns PID of the child to the parent process(i.e. the shell).
> Next, the ls process executes the system call `execve()` that will give it a brand new address space with the program that it has to run. Now, the ls can start running its program. The `ls` utility uses a function to read the directories and files from the disk by consulting the underlying filesystem’s inode entries.
> Once `ls` process is done executing, it will call the `_exit()` system call with an integer `0` that denotes a normal execution and the kernel will free up its resources.
> _Note: you can use `strace` `ls` to dig deeper into the system calls_

**3. Explain Linux Inodes**

> An Inode number points to an Inode. An Inode is a data structure that stores the information about the file or folder
> [Detailed Answer is available here](https://www.thegeekstuff.com/2012/01/linux-inodes)

**4. Crash vs Panic**

> Crash usually happens when a `trap` occurs when the application trying to access memory incorrectly. **Panic** usually when the application kill/shutdown itself abruptly. Main difference between **crash** and **panic** is that crash is hardware or OS initiated and panic usually imitated by application by calling `abort()` function. Some applications use a special function called a signal handler to generate information about the trap other can use `gdb` to collection information about the same.
> Most common bad programming signals are `SIGSEGV`, `SIGBUS` and `SIGILL` usually caused by **bad memory management**, **a bad pointer**, **uninitialized values** or **memory corruption**.

**5. Explain the `/proc` filesystem**

>

- `/proc` is very special in that it is also a virtual filesystem. It’s sometimes referred to as a process information pseudo-file system. It doesn’t contain ‘real’ files but runtime system information. Lot of system utilities are simply calls to files in this directory
- `/proc` file system has the pid for the process running. if you do `cd /procs/self` you will see al lot file and there size is `0` however you will see that they do contain information
- `/maps` provides information about the memory address space of the process
- `/cmdline` contains the arguments for the commandline
- `/environ` provides information about the process' current environment
- `/fd` contains symbolic link pointing to each file for which the process currently has file descriptor
- `/proc/locks` shows all the locks on currently exist in the system
- `/proc/sys/fs` contains some useful information like `file-nr` which tells you the number of open files and available on the system
- `/proc/sys/vm` holds files and information to tune virtual memory

**6. When I get a `filesystem is full` error, but `df` shows there is free space**

> Check check if you see zero `IFree` by using `df -i` . If that is not the case then see if deleted files are still in use using `lsof` and restart those processes

**7. What are the performance tools you would use on Linux Machine**

>

- `uptime`
- `dmesg` | `tail`
- `vmstat 1`
- `mpstat -P ALL 1`
- `pidstat 1`
- `iostat -xz 1`
- `free -m`
- `sar -n DEV 1`
- `sar -n TCP,ETCP 1`
- `top`

[Detailed Answer is available here](https://netflixtechblog.com/linux-performance-analysis-in-60-000-milliseconds-accc10403c55)

**8. Explain Linux FileSystem**

> Interviewer wants to know how much you understand about linux filesystems. A specific type of data storage format, such as `EXT3`, `EXT4`, `BTRFS`, `XFS`, and so on. Linux supports almost 100 types of filesystems.  
>  [Detailed Answer is available here](https://opensource.com/life/16/10/introduction-linux-filesystems)

**9. Explain Kernel Space and User Space**

> This can be a rabbit hole question, Interviewer can go as deep as possible to see what are your limits. This is also the most interesting topic about Linux that how the control flows from User Space to Kernel Space and why that is important. Why can’t we directly access the Kernel Space. What are use internal libraries like `libc` and why we need system call  
>  [Detailed Answer is available here](https://learnlinuxconcepts.blogspot.com/2014/02/kernel-space-and-user-space.html)

**10. How would you troubleshoot a High I/O Issue**

> [Detail Answer is available here](https://www.howtouselinux.com/post/troubleshoot-high-iowait-issue-on-linux-system)

**11. What are `processes` and `threads` ?**

> Process are basically the programs which are dispatched from the ready state and are scheduled in the CPU for execution. **PCB** ([Process Control Block](https://www.geeksforgeeks.org/process-table-and-process-control-block-pcb/)) holds the concept of process. A process can create other processes which are known as Child Processes. The process takes more time to terminate and it is isolated means it does not share the memory with any other process.  
>  [Detailed Answer is available here](https://learnlinuxconcepts.blogspot.com/2014/03/process-management.html)

**12. Explain Kernel Memory Management**

> This is not a trivial question. It is very deep and convoluted. So I would hope that interviewer will only be trying to see if you understand the basics around the _**Kernel Memory Management**_  
>  [Detailed Answer is available here](https://linux-kernel-labs.github.io/refs/heads/master/lectures/memory-management.html)

**13. Explain `processes` and `threads` ?**

> [Detailed Answer is available here](https://labuladong.gitbook.io/algo-en/v.-common-knowledge/linuxprocess)

**14. Explain different type of task status ?**

> [Detailed Answer is available here](https://linux-kernel-labs.github.io/refs/heads/master/lectures/processes.html#blocking-and-waking-up-tasks)

**15. Explain Linux Concurrency and Race Conditions ?**

> [Detailed Answer is available here](https://learnlinuxconcepts.blogspot.com/2014/07/concurrency-and-race-conditions.html)

**16. Explain `STACK` and `HEAP` in Operating System ?**

> [Detailed Answer is available here](https://learnlinuxconcepts.blogspot.com/2014/02/stack-and-heap.html)

**17. Explain Memory Leak ?**

> **Naive definition:** Failure to release _`unreachable`_ memory, which can no longer be allocated again by any process during execution of the allocating process. This can mostly be cured by using _GC (Garbage Collection)_ techniques or detected by automated tools.
> **Subtle definition:** Failure to release _`reachable`_ memory which is no longer needed for your program to function correctly. This is nearly impossible to detect with automated tools or by programmers who are not familiar with the code. While technically it is not a leak, it has the same implications as the naive one. This is not my own idea only. You can come across projects that are written in a garbage collected language but still mention fixing memory leaks in their changelogs.

**18. How does Linux handles Interrupts ?**

> [Detailed Answer is available here](https://linux-kernel-labs.github.io/refs/heads/master/lectures/interrupts.html)

**19. Explain Load Average ?**

> The best definition and internals about load average can be is _**[explained here](https://www.brendangregg.com/blog/2017-08-08/linux-load-averages.html)**_. I would encourage everybody to go though this website for more deeper understanding about internals

**20. What happens when you try to `curl` to website ?**

> This is very famous question and comes to life every now and then. However I would think that we all should be aware of the internal process flow when you do curl www.google.com . Once the best detailed explanation _**[I found is, here](https://github.com/alex/what-happens-when)**_. One can certainly argue that this way too much detail but hey no harm in knowing things completely, you may not say this whole thing when asked but one should certainly know about it

Other awesome resources available out there for interview preparations

1.  [Facebook Production Engineer Interview](https://azalio.wordpress.com/2016/05/29/facebook-production-engineer/)

2.  [Facebook Production Engineer Interview](https://github.com/krishnaramb/FB_Prep/wiki/linkedin)

3.  [Site Reliability Interview](https://yumminhuang.github.io/note/sreinterview/)

4.  [Engineering Manager Interview](https://docs.google.com/document/d/1ckl5roGhYkZAEBfaJHZT_-80upmhfzBZWAGmXvPJd3U/edit#)

5.  [Google SWE Interview](https://igotanoffer.com/blogs/tech/google-software-engineer-interview)

6.  [Amazon SWE Interview](https://igotanoffer.com/blogs/tech/amazon-software-development-engineer-interview)

7.  [Good Troubleshooting Tips and Tricks](https://www.bogotobogo.com/DevOps/DevOps-Sys-Admin-Interview-Questions-Trouble-Shooting-Slow-Application-Performance-BottleNecks-Leaks.php)

8.  [Good Refs What is boiling](https://docs.google.com/spreadsheets/d/1O_qwBKEESxXos-4auFjiU56RemuF2Fic--Mm7ABPvHA/edit#gid=0)

9.  [Linux Perf Analysis](https://www.brendangregg.com/Articles/Netflix_Linux_Perf_Analysis_60s.pdf)

10. [Scalability, Reliability and Performance for Large Systems](https://github.com/binhnguyennus/awesome-scalability)

I just made this effort to put all these together in one place. I will keep tracking these and put them together here in part…so stay tune!!

![](https://github.com/kodelint/blog-assets/raw/main/images/interview02.png)

## Happy Troubleshooting and Best of luck!!
