---
caffeine: 5
stress: 2
ozone: 1
layout: post
title:  Rust - Basics and Concepts, Step by Step — 2nd Iteration
author: Satyajit Roy
date: 2022-05-05
categories: [Rust, Programming]
tags: [Rustt, Programming, Basics, Concepts]
image: '/assets/uploads/01-rust-ownership.png'
redirect_to: 'https://blog.devgenius.io/rust-basics-and-Concepts-step-by-step-2nd-iteration-5ba45c44f986'
toc: true
categories: [Rust, Programming]
tags: [Rustt, Basics, Concepts]
---

This blog I will try to concentrate on some of the basic but very important Concepts of Rust . This would be my 2nd blog about Rust , you can find the 1st one [here](https://blog.devgenius.io/rust-basics-and-Concepts-step-by-step-2nd-iteration-5ba45c44f986). I will try to discuss about Ownership, Ownership transfers, Borrowing, Heap, Stack in this blog

![](https://github.com/kodelint/blog-images/raw/main/rust/01-rust-ownership.png)

### So, What is Ownership in Rust

Rust don’t have a **garbage collector**, you need to explicitly allocate and free memory space. This can quickly become tedious and challenging when it involves large codebases.

Traditionally, there are two fundamental ways to manage memories. The first one is garbage collectors; it is mainly used in high-level languages that abstract the concept of memory management from the programmer.

The second is **manual** memory management, where the programmer explicitly defines memory usage. Although it provides control, it leaves much room to shoot yourself in the foot.

Rust takes on an alternative approach called **ownership** and **borrowing**. Ownership is a new **construct** that defines a value has its owner.

Let’s look at this code below and the output of it

![](https://github.com/kodelint/blog-images/raw/main/rust/01-rust-function.png)

```
change the value of i=11
print the value of i=10, after let_change_the_value_by_one call
```

When we passed the `i` to the function `let_change_the_value_by_one` , increase the value by **1**, print it and when the control goes back to `main()` function and print it, we get the same value as before.

![](https://github.com/kodelint/blog-images/raw/main/rust/01-rust-heap-stack.png)

Unlike `strings`, `integers` are stored in **stack** not in **heap** and while passing **i** to the function `let_change_the_value_by_one` compiler make a copy of the value and passes it to the function and actual value remains unchanged. In Terms of **Ownership** variable **i** is the owner of the value in **stack** till it’s scope remains active.

Now, how about we change the variable from `i8` to string what happens than

![](https://github.com/kodelint/blog-images/raw/main/rust/01-rust-function-heap.png)

```
18 |     let value_for_i = String::from("Rust");
   |----------- move occurs because `value_for_i` has type `String`, which does not implement the `Copy` trait**
19 |     lets_change_the_value_of_string(value_for_i);
   |----------- value moved here**
20 |     println!("print the value of value_for_i={}, after lets_change_the_value_of_string call", value_for_i)
   |                                                                                               ^^^^^^^^^^^ value borrowed here after move
```

Now when **heap** is involved, the concept of **ownership** will be more transparent. When the variable `value_for_i` passes to function `lets_change_the_value_of_string` the compiler create a copy of the reference of the variable in **stack** and moves the **ownership** to it. Nothing happens to the value in **heap**. Once the control comes back to `main()` **the reference of variable** `value_for_i` no longer exist and that’s the reason complier is trying to tell us that **move** has occurred

```
|----------- move occurs because `value_for_i` has type `String`, which does not implement the `Copy` trait**
|     lets_change_the_value_of_string(value_for_i);
|----------- value moved here**
```

Here is illustration of the same

![](https://github.com/kodelint/blog-images/raw/main/rust/02-rust-heap-stack.png)

> In nutshell, any variable in `Rust` within the scope is the owner of the value, it can’t be changed outside of it ownership. The `ownership` needs to be managed manually by the programmer themselves.

To make this code work we can pass this `value_for_i.clone()` to the function and that will create a clone of reference and value

![](https://github.com/kodelint/blog-images/raw/main/rust/03-rust-heap-stack.png)

However what if we don’t want to transfer the ownership instead we want to modify the same value. How would be achieve that, by using the concept of **Borrowing**

### What is **Borrowing** in Rust

In Rust we can **borrow** the reference of the variable from **stack** and then perform actions on the value in **seap** using the **borrowed** reference. This way we don’t have to deal with ownership transfers at all. To **borrow** the reference of `value_for_i` we use the **borrow** operator `&` , something like this `&value_for_i` and pass it to the function.

![](https://github.com/kodelint/blog-images/raw/main/rust/01-rust-function-borrowing.png)

```

print the value of value_for_i=Rust, before lets_change_the_value_of_string call
The value of variable value_for_i=Rust is awesome
print the value of value_for_i=Rust is awesome, after lets_change_the_value_of_string call
```

##### Above example we are doing multiple things

1.  Change the local variable `value_for_i` to mutable

2.  Changed the parameter of function as `&mut value_for_i` , So the reference can be passed and also making it mutable

3.  Extended the string value using `push_str()` with `value_for_i` .

4.  Now when the control goes back to `main()` and the `println!` executed we get the modified string.

This explain how we can use borrowing to deal with value where we don’t want to transfer ownership. Though **borrowing** comes with some restriction.

![](https://github.com/kodelint/blog-images/raw/main/rust/01-ownership-and-borrow-limitations.png)

![](https://github.com/kodelint/blog-images/raw/main/rust/01-ownership-and-borrow-limitations-pic.png)

We can only create mutable references for a variable only once within its scope. Immutable references has no limitation. Also the compiler will complain if it find a _`dangling references`_, which mean the compiler will make sure _**that data doesn’t go out of scope before it reference does**_.

Hope this was helpful in understanding some of the very useful key Concepts of `Rust` . Will keep writing about Rust as I learn more.

## Happy Coding!!
