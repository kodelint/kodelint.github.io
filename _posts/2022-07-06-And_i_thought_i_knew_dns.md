---
caffeine: 5
stress: 2
ozone: 1
layout: post
title:  And I thought I knew about DNS
author: Satyajit Roy
date: 2022-05-06
categories: [DevOps, DNS]
tags: [DevOps, Basics, Concepts]
image: '/assets/uploads/01-dns.png'
redirect_to: 'https://medium.com/@email2sroy/Concepts-and-i-thought-i-knew-dns-c19b9e0cde39'
toc: true
---



Yeah, I know. We all know, use **DNS** and know how they work. There are numerous of articles and blog explaining how **DNS** works. However as I dig more about it I found more information which were, frankly speaking, new to me. So I thought I would write about it.
>  **I know that there are so many excellent blogs and articles about DNS. However, I encourage you to give this a try, hopefully you might find something new in it.**

![DNS](https://cdn-images-1.medium.com/max/2000/0*1Flo-h00vPt3tyXL.png)
---
### History

Why **DNS** was created ? Believe it or not before **DNS** the mapping were use to copy over network from computer to computer for the name based communication. So, each site maintained a **HOSTS.TXT** file that provided a mapping between host names and network addresses in a set of simple text records that could be easily read by a person or program. It wasn’t long before people realized that keeping multiple copies of the hosts file was inefficient and error-prone. So it was decided on [RFC 623](http://www.rfc-editor.org/rfc/rfc623.txt) and [RFC 625](http://www.rfc-editor.org/rfc/rfc625.txt), [Stanford Research Institute](http://www.sri.com/) Network Information Center (NIC) would serve as the official source of the master hosts file.

[Paul Mockapetris](https://internethalloffame.org/inductees/paul-mockapetris) and his team had the mission to create a friendlier for use network, where people wouldn’t need to remember the IP address of every computer. He suggested that host names should include:

 1. **Name** — for example, **IBM**

 2. **Categories/Purpose** — for example, .com — for **com**mercial purposes

After a year, the categories (or generic Top-Level Domains — gTLDs) were created. They included familiar extensions such as `.com`, `.edu`, `.net`, `.org`, `.int`, `.gov` and `.mil`. Before the end of 1985, there were six new names with `.com`. The first one ever registered, [Symbolics.com](https://symbolics.com/), still exists today.

>  **Trivia Detail**: What is **DNS Interceptors** ? **DNS Interceptors** is used for optimizations, censorship, captive portal etc. Basically **DNS** is you gateway to internet and by controlling that we can control queries and requests
>  **Trivia Detail**: About **Privacy**. there is a **([RFC 7816](https://datatracker.ietf.org/doc/html/rfc7816))** called **QNAME minimisation** _(Query Name Minimisation)_ to Improve Privacy, because DNS Resolver sends the whole query to the authoritative name server, the same outcome can be achieved with minimum information

### OK, So how does DNS Work ?

So, **DNS** in nutshell is **Global** **Distributed Identifier DB**. It was created to replace the _static file_ like _`/etc/hosts`_ file. So understand the distributed model of DNS DB, let’s try to trace it backwards

Let say, we want to resolve [www.google.com](https://www.google.com/) and as we already know

![google.com](https://cdn-images-1.medium.com/max/7112/1*nfFpHZiyM6v2jo7FsXIVNA.jpeg)

So, lets see the how the hierarchy works when we try to visit [https://google.com](https://google.com)

* Browser will try to see if the answer is in it’s cache, it will replay

* If not, then either the browser or operation system behave like a **Stub Resolver** (`gethostaddr()`, `gethostbyname()`, `gethostent()` are all **Stub Resolver**)and asks the question
>  The **DNS Stub Resolver** is a component of the DNS that is accessed by application programs when using the DNS for e.g. resolving domain names to IP addresses. The stub resolver simply serves as an intermediary between the application requiring DNS resolution, and a recursive DNS resolver.

* **Stub Resolver** will ask the question to **Recursive Resolver** _(in most cases)_ and the **Recursive Resolver** will do that bulk of work to find you the answer

![Dns Software](https://cdn-images-1.medium.com/max/3168/1*6zBNmpQ_lRwxZmFsYEwDbQ.png)
>  Sometime between **DNS Stub Resolver** and **Recursive Resolver** one might have DNS Forwarders, Proxy Server which basically forward the query to **Recursive Resolver**. This is mostly done keep security and hide the internal details. There are multiple types of **Resolvers** like **Stub, Recursive** _(mentioned above)_ then you have Forwarders, Validating, Pay Wall etc

* Most **ISPs** run their own **Recursive Resolvers**. Pretty much all **Recursive Resolvers** keep their cache from their previous queries.

* If the answer for the query is not found in cache then **Recursive Resolvers** try to identify the **Authoritative Name Server** for the record.

* **Recursive Resolvers** might have to talk to N number of **Authoritative Name Server** to find the answer or sometime talk to other **Recursive Resolvers** to maintain the hierarchy of cache.

>  **Caching**, as mentioned all **Recursive Resolvers** maintain their own. The lifetime of that cache is handled by something called **TTL (Time to live)**. The **TTL** is responsible to maintain the hierarchy of cache too. Say, the **Recursive Resolvers** answered the **Stub Resolver** and said **TTL** is **300 Seconds**. Though the answer was received on `250th` Second for **Stub Resolver** and as per **Recursive Resolvers** it can cache the answer for `300` Seconds. Which mean it will end up keeping the cache for **550 Seconds Stale**. So, to honor the **TTL**, any **Recursive Resolvers** answering should also remove the time spent in **TTL**. So that the entity lower in the hierarchy get to **cache** the answer for valid **TTL**.
>  **Trivia Detail**: **`TTL`** are only suggestions for cache lifetime, you may or may not use it. Also there is something call **Max TTL** set by cacheing resolvers so if you set any value higher then that, will be ignored

* **Recursive Resolvers** usually keeps [Root Hint File](https://www.iana.org/domains/root/files) _(yes, they don’t user **resolv.conf**)_ and it can function if one of the IP from [Root Hint File](https://www.iana.org/domains/root/files) work it can pull the latest. All it queries is that what is data around (root domain). This query is call **[Priming Query](https://datatracker.ietf.org/doc/html/rfc8109)**. In nutshell it means initialing the **DNS** or **Recursive Resolver**
>  [ICANN](https://icannwiki.org/ICANN), [Verisign](https://icannwiki.org/Verisign) and the [Root Server Operators](https://icannwiki.org/index.php?title=Root_Server_Operators&action=edit&redlink=1) play significant roles in the management and process of the root zone

* Query to **Root Domain** returns the Name Servers, (Which is **13** in count)

![dig root](https://cdn-images-1.medium.com/max/2756/1*S2FrWX88FCQ3bwbUHcUBzw.png)

* You can see the **Root Domain `.`** has **13** Name Servers and what you see underneath the **ADDITIONAL SECTION** are [GLUE Records](https://kb.wisc.edu/ddi/page.php?id=8959)

>  **[GLUE Records](https://kb.wisc.edu/ddi/page.php?id=8959)** are created to eliminate **[circular reference](https://community.akamai.com/customers/s/article/DNS-Circular-Detection-And-Looping?language=en_US)**, in simple terms **[circular reference](https://community.akamai.com/customers/s/article/DNS-Circular-Detection-And-Looping?language=en_US)** occurs when the **Authoritative Name Server** exists inside the **Domain** itself. You can’t reach to the **Name Server** because the **Domain** is still unknown. Glue records can only be created at the domain registrar as the registrar controls the DNS settings for a given domain’s delegation. Every Name Server on the internet has its own glue record created by the domain’s owner. 
>_Glue Records are nothing but (direct and hardcoded) A Records for the Name Servers_

* Now **Recursive Resolvers** which is responsible for most of the work, finds the **Authoritative Name Server**, gets the answer for the query and the remaining **TTL**, hands it over to **Stub Resolver** and that’s how we resolve a **Domain Name** to an **IP Address**

So I have to summarize this whole fiasco then it would something like, ***fun intended pseudo code***

```  
  var cache = map[string]string

    func stubResolver(domain string) string {
      var (
        ipAddress string
        cacheHit bool
      )
      ipAddress, cacheHit = cache[domain]
      if !cache {
        ipAddress = recursiveResolver(domain)
      }
      return ipAddress
    }

    func recursiveResolver(domain string) string {
      ...
      // Will recursively keep trying to identify the 
      **// Authoritative Name Server**, by getting the **Name Servers
      // of each elements. It may very well go to
      // the root zone which is .
      
      return ipAddress
    }
```

However there are lot more to it and to understand it properly we need to understand _**What is DNS Query ?**_

### So, What is DNS Query and What does it contains ?

A **DNS Query** is a **tuple**, called **[Query Tuple](https://tools.ietf.org/id/draft-bellis-dnsext-multi-qtypes-04.html#introduction)**, consisting of **Query Name, TTL, Class, Query type** and **RDATA**

![Query Tuple](https://cdn-images-1.medium.com/max/6098/1*85l7-SR2kfKG3KwMGvS38w.jpeg)

So requester is asking for **QTUPLE** which includes everything, all the information mentioned above. It can’t just ask for something in isolation, it’s either all or nothing. That’s what is going on the raw level on the DNS Query. The wire format ([RFC1035](https://datatracker.ietf.org/doc/html/rfc1035)) for this is combination of half ascii, half binary and pretty old compression scheme call [Label Compression](https://datatracker.ietf.org/doc/html/rfc8618#page-42).

![Raw DNS Wire Format](https://cdn-images-1.medium.com/max/2680/1*u5iFqYpWSM8a8cC-kUU3Lg.png)
>  **Trivia Detail**: **DNS** usually prefers **UDP**, however it actually works on both **UDP** and **TCP**. First it send the request on **UDP**, if it gets a response then good or If a **DNS Response** is larger than _512 bytes_, or if a DNS server is managing tasks like zone transfers (transferring DNS records from primary to secondary DNS server), it will try **TCP**. 
>  **Trivia Detail**: What is **in-balliwick** and **out-of-balliwick** servers? **In-balliwick** servers are within the zone itself and work with the help of glue records. **Out-of-balliwick** servers are external servers which is not part of that **TLD**.

### How does DNS Packet looks like ?

Below is the picture of **bits** used to create a **DNS Packet**. **Before** and **After** basically shows how additional **bits** has been added later in time of DNS Evolution.

![DNS Packet](https://cdn-images-1.medium.com/max/2708/1*ZHvVzs5UQ62a4J53j7dHZQ.png)

Mostly it was due to handle the in **RCODE** section. There was only **4 bits** assigned for **RCODE**.

![RCODE](https://cdn-images-1.medium.com/max/3264/1*5cxEmO5XTD0BuK-eycY28A.png)

Later it was realized that we would need little more space in the packet and that when **[EDNS0’s “OPT” Record](https://tools.ietf.org/id/draft-ietf-dnsext-rfc2671bis-edns0-09.html)** was introduced ([RFC-8691](https://datatracker.ietf.org/doc/html/rfc6891)). So the **extended pseudo resource** record call **OPT** added to **additional section**. Of-course the client needs to indicate that it supports it. Most software in these days supports this.

* It reuses the resource record byte format, however changes many fields

* Total **RCODE** size becomes **4 + 8 = 12 bits**

* Support additional [protocol flags](https://datatracker.ietf.org/doc/html/rfc6891#section-6.1.4)

* Adds support for additional DNS extensions

* Used for Extended errors ([RFC 8914](https://datatracker.ietf.org/doc/rfc8914/))

* Used for Client Subnet DNS Queries ([RFC 7871](https://datatracker.ietf.org/doc/html/rfc7871))

![OPT Resource Record](https://cdn-images-1.medium.com/max/3392/1*QX8WZnjOs_jTE5AcZWOwQA.png)
>  **Trivia Detail**: What is **truncation** in **DNS** ? When Clients receives bigger payload size than it can handle via **OPT/UDP**. **Truncation bit** is set on the DNS Packet. Some other method like removing unimportant items from packet to make it fit, or completely drop everything and ask the Client to connect using **TCP.**
>  **Trivia Detail**: **Response Rate limiting (RRL)** is actually used as **DDoS Defense** mechanism based on the frequency of the query.

### Reverse DNS Queries

Basically find the name using IP Address, usually it is **PTR** record.

    [www.google.com](http://www.google.com).  100 IN A 142.250.72.196

So, the IP Address of [www.google.com](http://www.google.com) is `142.250.72.196` . We just reverse it like this 196.72.250.142 and add `in-ipaddr.arpa` and resolve it using PTR record
>  **Trivia Detail**: What is **apex** zone, **Terminal** and **lame delegations**? **Apex** is basically the **root** for your domain and **Terminal** is the last node of your zone. **Lame delegation** mean parent still holding to NS Record which Child doesn’t uses anymore. **(DNS Terminology)**

### What is **Happy Eyeballs ?**

Morden Clients usually send 2 queries in **parallel** one for **A Record** and one for **AAAA Record** and its called **Happy Eyeballs**(**[RFC 8305](https://datatracker.ietf.org/doc/html/rfc8305))**. Browsers or Application should use whichever comes first. So there are 2 type non-existence in DNS, domain doesn’t exist and you get **`NXDOMAIN` Response** or type doesn’t exist then you get **`NOERROR` Response**. Find more detail [here](https://bluecatnetworks.com/blog/the-top-four-dns-response-codes-and-what-they-mean/)
>  **Trivia Detail**: `.com` is actually dependent on `.net` because all the `.com` NameServers are using `.net` NameSever
>  **Trivia Detail**: **CNAME** and **DNAME**, what are difference ? **CNAMEs** is aliases for the other elements in the tree (same or different zone doesn’t matter) and it points to all other records `A`, `MX`, `TXT` etc. However, **DNAMEs** are the aliases for zone themselves.
>  **Trivia Detail**: Can you have something like “`foo*.some-domain.com`” ? **No** More detail about Wildcard is ([RFC 4592](https://datatracker.ietf.org/doc/html/rfc4592))

Hope this blog was able to provide some more interesting fact and details about **DNS**.

### Happy Learning!!
