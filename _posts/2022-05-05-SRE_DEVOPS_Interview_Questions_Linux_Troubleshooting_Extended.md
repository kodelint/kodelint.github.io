---
caffeine: 5
stress: 2
ozone: 1
layout: post
title:  SRE/DevOps Interview Questions — Linux Troubleshooting — Extended
title: SRE DEVOPS Interview Questions Linux Extended
author: Satyajit Roy
date: 2022-05-05
categories: [DevOps, Interview, Linux Troubleshooting]
tags: [DevOps, SRE, Interview, Linux Troubleshooting]
image: '/assets/uploads/03-interview.png'
cross_post_url: 'https://awstip.com/sre-devops-interview-questions-linux-troubleshooting-extended-c12cb5ded3b0'
devto_url: https://dev.to/deadlock/sre-devops-interview-questions-linux-troubleshooting-extended-no4
toc: true
---

This is an extension of my previous blog about **[SRE/DevOps Interview Questions — Linux Troubleshooting](https://awstip.com/sre-devops-interview-questions-linux-troubleshooting-1b8ffe82c16)**. Sometimes the initial question is vague and then follow-up kind of clears the path, that is what I am going to focus on in this blog. I will try to get more questions and possible explanations here.

**Question**: There is a service running on a system and you have been told that the service is not running properly. How would you troubleshoot?

**Answer**: After verifying the DNS and other things, I would try to `SSH` to the system and try to see what is going on

**Follow Question**: You get an error message like the below:

```bash
ssh: connect to host example.com port 22: Resource temporarily unavailable
```

however you did find out that you have **IPMI** access to the machine, so you can use that to login and you get something like this:

```bash
root@example.com#
```

**Follow up Answer**: So now I will try to run some basic commands to see what is going on like `top` , `ps` etc

**Follow Question**: You still get a similar error for any command you run:

```
fork: retry: Resource temporarily unavailable
```

> **Note**: Now you might already know what is the issue, at least have some idea about it. It is related to **Resource being exhausted** may be files, processes etc etc and you figured that you can’t run any command (specifically any external command, which needs forking).

**Actual Question**: How would you troubleshoot a linux box, given none of the external commands executes?

**Facts**: What should we do ? Use commands which are **internal** or **built-in** to the shell .

So how to find what commands are built-in and can be useful to you for troubleshooting ? Also if external commands are not available then how to gather information about the system (`top`, `ps`, `lsof`…even `cat` is not available )…..🤔

→ `/proc` filesystem and couple of **built-in** like read and for

> Type help in the shell and it will give you all the commands which are **in-build** to the shell
> Read about /proc filesystem in my previous blog [SRE/DevOps Interview Questions — Linux Troubleshooting](https://awstip.com/sre-devops-interview-questions-linux-troubleshooting-1b8ffe82c16) and also [here](https://www.kernel.org/doc/html/latest/filesystems/proc.html)

Apparently, all the information coming from commands like `ps`, `lsof`, `vmstat` etc etc can be found in `/proc` file system if you look at the right file.

For example `cmdline` file tells you about the last command ran on the system, `fd` directory contains all the file descriptors and all the folder with numbers are the PIDs running on the system.

So assuming system has too many files open and all resources are exhausted, how to see if which pid is using how many file without using external commands

```bash
for fd in /proc/[0-9]*/fd/*; do echo $fd ; done
/proc/1/fd/0
/proc/1/fd/1
/proc/1/fd/2
/proc/1/fd/255
/proc/1/fd/3
```

This way you can see the file descriptors any pid is using. If you want to see what is last command ran on the system without cat or see the content of the file with `cat`

```bash
read $(</proc/${PID}/cmdline)
```

So using `read`, for and other internal commands you can use to find out what is going on in the system.

**Trick Question**: How do you delete a file named `-f` or `--file` ?

**Answer**: Well explained [here](https://www.cyberciti.biz/faq/unix-linux-remove-strange-names-files/). Though the interviewer expects you to walk him/her through the **command execution process** on the linux system

**Question**: Explain the output below and what command produces this?

![](https://github.com/kodelint/blog-assets/raw/main/images/02-interview-02.png)

**Question**: Name the fields and what they represents ?

**Question**: Looking at the below output, please explain what is going on in the machine ? Please be as detail and descriptive as possible

![](https://github.com/kodelint/blog-assets/raw/main/images/02-interview-03.png)

![](https://github.com/kodelint/blog-assets/raw/main/images/02-interview-04.png)

**Question**: Compare above 2 `vmstat` outputs ? and explain the similarities and differences ?

**Question**: What do you understand from below `vmstat` output and what is the relationship between `in` and `cs` column ?

![](https://github.com/kodelint/blog-assets/raw/main/images/02-interview-05.png)

**Trick Question**: Looking at `vmstat` can you tell how many CPU and Cores the system has ?

**Question**: How to find the config and other related files if only the process is known ?

**Answer**: Check `lsof`

**Question**: Given there is a **TCP Connection** between 2 machine? How does packets move if they are **IP Datagram** packets? If Yes, what would be an advantage? Faster? What about latency?

**Explanation**: Good content to read about [TCP and UDP](https://www.guru99.com/tcp-vs-udp-understanding-the-difference.html)

**Question**: When you do `curl example.com` what happens?

**Explanation**: I don’t have to say what happens when you do `curl example.com`, What I am going to suggest is that this is basically a combination of multiple questions

>

1.  How does curl executes on the system? Basically, go over the whole process of command execution from **user** space to **kernel** space.
2.  Explain the `fork()` and `exec()` calls.
3.  Explain the well known system calls which might be involved
4.  **DNS Resolution** from `example.com` to an `IP Address`
5.  Explain the Request transmission from your terminal to the destination machine and then respond back to your terminal
6.  If possible go into detail about the packet transmission **Network layer 2–3** concepts

**Follow Up Question**: The output of `curl example.com` is this? Please explain?

```bash
>> curl example.com
<HTML>
<HEAD>
<TITLE>Document Has Moved</TITLE>
</HEAD>

<BODY BGCOLOR="white" FGCOLOR="black">
<H1>Document Has Moved</H1>
<HR>

<FONT FACE="Helvetica,Arial"><B>
Description: The document you requested has moved to a new location.  The new location is "https://www.example.com".
</B></FONT>
<HR>
</BODY>
```

**Explanation**: Talk about the **Response code** you have received (not visible in output) and why. What can you do to get `200` response code ?

Explain how **HTTPS** works and go into detail in a **3-Way handshake**. Explain the **Asymmetric** and **Symmetric encryption** in terms of **SSL**. Here is a nice [writeup](https://www.digicert.com/faq/ssl-cryptography.htm) about it

**Follow Up Question:** How do you tell your system to not used `/etc/hosts` Does file override for **DNS Resolution**?

**Answer**: `nsswitch.conf` read about it [here](https://www.techtarget.com/searchitchannel/feature/Using-nsswitchconf-to-find-Linux-system-information)

**Question**: What is `nscd` service and why it is used ?

**Answer**: Read about `nscd` [here](https://www.thegeekdiary.com/linux-os-service-nscd/#:~:text=This%20is%20the%20Name%20Service,such%20as%20NIS%20or%20LDAP.)

**Follow Up Question**: How does the Linux system know that your application or any application will use which protocol (`TCP` or `UDP`) to communicate?

**Answer**: `/etc/services` nice write-up [here](https://breanneboland.com/blog/2019/02/22/etc-services-is-made-of-ports-and-people/) on the same.

**Question**: How to simulate `50%` packet drop for Testing purposes?

**Explanation**: [Here](https://www.pico.net/kb/how-can-i-simulate-delayed-and-dropped-packets-in-linux/)

**Question**: Talk about `gRPC` and why would one use it ? Pros and cons ?

**Explanation**: [Good Read](https://blog.dreamfactory.com/grpc-vs-rest-how-does-grpc-compare-with-traditional-rest-apis/#:~:text=%E2%80%9CgRPC%20is%20roughly%207%20times,HTTP%2F2%20by%20gRPC.%E2%80%9D)

**Question:** What are the ways to count total **TCP Connections** on the system ?

**Explanations**: couple of commands can be used like `netstat` , `ss` and not to forget the `/proc` filesystem ( specifically `/proc/net/sockstat` file). Good examples [here](https://sleeplessbeastie.eu/2019/08/07/how-to-count-tcp-connections/#:~:text=Use%20netstat%20%2C%20ss%20or%20files,filesystem%20to%20count%20TCP%20connections.)

**Question:** How to troubleshoot **Short Lived Process** or **Processes** causing CPU Spikes ?

**Explanation:** Good Readings [here](https://www.brendangregg.com/blog/2014-07-28/execsnoop-for-linux.html) and [here](https://tanelpoder.com/posts/high-system-load-low-cpu-utilization-on-linux/)

Hope this helps in your journey and provides more food for the thoughts

## **Happy Troubleshooting and Best of luck!!**
