---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: SRE/DevOps Interview Questions — Linux Troubleshooting (Extended)
author: Satyajit Roy
date: 2022-05-05
categories: [DevOps, Interview, Linux Troubleshooting]
tags: [DevOps, SRE, Interview, Linux Troubleshooting]
image: '/assets/uploads/03-interview.png'
cross_post_url: 'https://awstip.com/sre-devops-interview-questions-linux-troubleshooting-extended-c12cb5ded3b0'
devto_url: https://dev.to/deadlock/sre-devops-interview-questions-linux-troubleshooting-extended-no4
toc: true
---

This is an extension of my previous post, [SRE/DevOps Interview Questions — Linux Troubleshooting](https://sroy.tech/devops/interview/linux%20troubleshooting/2022/04/07/SRE_DEVOPS_Interview_Questions_Linux_Troubleshooting.html). 

In technical interviews, questions often start vague and become more specific as the conversation progresses. This "drill-down" approach helps interviewers gauge your depth of knowledge. In this blog, we'll explore more complex troubleshooting scenarios and the Linux internals that power them.

---

### Scenario: The Mystery of the Exhausted System

**Interviewer:** "A service on a Linux system is reported as 'not running properly.' How do you start your investigation?"

**Candidate:** "After verifying DNS and basic connectivity, I'd attempt to `SSH` into the system to check its state."

**Interviewer:** "You try to SSH, but you get this error: `ssh: connect to host example.com port 22: Resource temporarily unavailable`. However, you have **IPMI/OOB** access and manage to log in. What's next?"

**Candidate:** "Once inside, I'll run standard tools like `top`, `ps`, or `lsof` to see what's consuming resources."

**Interviewer:** "Every command you type—`top`, `ls`, `ps`—returns the same error: `fork: retry: Resource temporarily unavailable`. How do you troubleshoot a machine when you cannot execute any external commands?"

---

#### The Solution: Shell Built-ins and `/proc`

At this point, you've realized the system has exhausted a critical resource (likely processes or file descriptors). Since every external command requires a `fork()` system call, and the system cannot fork, you must rely on **Shell Built-ins**.

**1. Identify Built-ins**
Type `help` in your shell (Bash/Zsh) to see a list of commands that are internal to the shell and do not require forking a new process.

**2. Leverage the `/proc` Filesystem**
Almost all performance data provided by `ps`, `top`, and `vmstat` is actually sourced from the `/proc` virtual filesystem. You can "read" this data using the built-in `read` and `for` loops.

**Example: Counting File Descriptors per Process**
If you suspect file descriptor exhaustion, you can iterate through `/proc` without calling `ls`:

```bash
# Using a shell loop to list open FDs for all PIDs
for fd in /proc/[0-9]*/fd/*; do 
    echo $fd 
done
```

**Example: Checking Command Lines**
To see what a specific PID is actually running without using `ps` or `cat`:

```bash
# Read the content of a file into a shell variable
read -r cmd < /proc/${PID}/cmdline
echo $cmd
```

---

### Interactive Troubleshooting: Data Interpretation

**Question:** Look at the `vmstat` output below. What is happening on this machine?

![vmstat analysis](https://github.com/kodelint/blog-assets/raw/main/images/02-interview-02.png)

**Key areas to focus on:**
*   **`r` (Run queue)**: Are processes waiting for CPU?
*   **`b` (Blocked)**: Are processes stuck waiting for I/O?
*   **`si` / `so` (Swap In/Out)**: Is the system thrashing due to memory pressure?
*   **`in` (Interrupts) vs `cs` (Context Switches)**: High numbers here often indicate a specific type of workload or a potential bottleneck in kernel scheduling.

**Question:** Compare these two `vmstat` outputs. What has changed?

![vmstat comparison 1](https://github.com/kodelint/blog-assets/raw/main/images/02-interview-03.png)
![vmstat comparison 2](https://github.com/kodelint/blog-assets/raw/main/images/02-interview-04.png)

---

### Networking & Security Deep Dives

**Question: TCP vs. IP Datagrams**
"Given a TCP connection between two machines, what happens if the packets move as raw IP Datagrams? What are the implications for latency and reliability?"
> [Explore the differences between TCP and UDP](https://www.guru99.com/tcp-vs-udp-understanding-the-difference.html)

**Question: The `curl` Request Flow**
"When you execute `curl example.com`, walk me through the entire lifecycle of that request."
> This is a multi-layered question covering:
> 1.  **System Calls**: The `fork()` and `exec()` process.
> 2.  **DNS**: Resolution of the hostname via `/etc/hosts` or `resolv.conf`.
> 3.  **Transport**: TCP 3-way handshake.
> 4.  **Security**: SSL/TLS negotiation (Asymmetric vs. Symmetric encryption).
> 5.  **Application**: HTTP request/response headers.

**Follow-up:** "The output of your `curl` shows '301 Moved Permanently'. Why did this happen, and how do you fix it?"
> Discuss response codes and the `-L` (follow redirects) flag.

---

### Essential Configuration Files

*   **`nsswitch.conf`**: Controls the order of lookups (e.g., should the system check `/etc/hosts` before DNS?). [Learn more](https://www.techtarget.com/searchitchannel/feature/Using-nsswitchconf-to-find-Linux-system-information).
*   **`nscd`**: The Name Service Cache Daemon. Why is it used, and what are its pitfalls? [Read here](https://www.thegeekdiary.com/linux-os-service-nscd/).
*   **`/etc/services`**: Maps friendly service names to port numbers and protocols (TCP/UDP). [Read the history](https://breanneboland.com/blog/2019/02/22/etc-services-is-made-of-ports-and-people/).

---

### Advanced Scenarios

**Simulating Packet Loss**
"How do you simulate 50% packet drop for testing purposes?"
> Answer: Use `tc` (Traffic Control) with `netem`. [Details here](https://www.pico.net/kb/how-can-i-simulate-delayed-and-dropped-packets-in-linux/).

**Short-Lived Processes**
"How do you troubleshoot CPU spikes caused by processes that only live for a few milliseconds?"
> Answer: Standard `top` won't catch them. Use `execsnoop` (perf-tools) to capture short-lived process execution. [Read more](https://www.brendangregg.com/blog/2014-07-28/execsnoop-for-linux.html).

---

## Conclusion

These questions are designed to move beyond "knowing the command" into "understanding the system." I'll continue to document these scenarios as they evolve.

## **Happy Troubleshooting and Best of luck!**