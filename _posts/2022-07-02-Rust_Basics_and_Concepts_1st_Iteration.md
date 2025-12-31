---
caffeine: 5
stress: 2
ozone: 1
layout: post
title:  Rust - Basics and Concepts, Step by Step — 1st Iteration
author: Satyajit Roy
date: 2022-05-05
categories: [Rust, Programming]
tags: [Rust, Programming, Basics, concepts]
image: '/assets/uploads/01-rust.png'
redirect_to: 'https://blog.devgenius.io/rust-basics-and-concepts-step-by-step-1st-iteration-f71dc14d5ae6'
toc: true
---


For sometime I have been thinking to start coding in Rust however due to never ending things, I couldn’t start. Usually I start learning a language by start writing some utility code in it and learn along the way. However this time, time seems to be not on my side.

![](/assets/uploads/01-rust.png)

So, I decided to start learning small concepts step by step, one or two things at a time and then take it from there. This blog is all about how I took this challenge and started making progress toward learning `Rust`

## Variables a immutable by default

Took me sometime to realize that Rust by default treats all assigned variables as **immutable**. Which means once binding is done, _(another Rust concept, solely means that value has been assigned to the variable)_, you can’t reassign that variable with different value
```rust
    fn main() {
        // Variables by default are immutable 
        // use `mut` key word to make mutable
        concept1()
    }

    fn concept1() {
        let x: i8 = 15;
        println!("Value of X = {}", x);
        x = 20;
        println!("After Reassignment, value of X = {}", x);
    }
```
This doesn’t work

```rust
    error[E0384]: cannot assign twice to immutable variable x
      --> src/main.rs:17:5
       |
    15 |     let x: i8 = 15;
       |         -
       |         |
       |         first assignment to x
       |         help: consider making this binding mutable: mut x
    16 |     println!("Value of X = {}", x);
    17 |     x = 20;
       |     **^^^^^^ cannot assign twice to immutable variable**

    For more information about this error, try rustc --explain E0384.
```

So, question comes in how do we then run counters ? Simple answer is make the variable **mutable**
```rust
    fn main() {
        concept1() // Variables by default are immutable, use `mut`
    }
    
    fn concept1() {
        let **mut** x: i8 = 15;
        println!("Value of X = {}", x);
        x = 20;
        println!("After Reassignment, value of X = {}", x);
    }
```

And it runs fine
```rust
    Value of X = 15
    After Reassignment, value of X = 20
```
Why Rust does that, even though **Shadowing** is possible. In fact **Shadowing** allows us to change type of the variable as well. Basically in nutshell by using let keyword we are creating an another variable with the same name.

## Shadowing a Variable
```rust
    fn main() {
        variables_are_immutable();
        variable_shadowing()
    }
    
    fn variables_are_immutable() { .... }
    
    fn variable_shadowing() {
        let x: i8 = 15;
        println!("Value of X = {}", x);
        **let** x = x + 20; **// This is possible because of `let` keyword**
        println!("After Reassignment, value of X = {}", x);
    }
```
And we get
```rust
    Value of X = 15
    After Reassignment, value of X = 35
```
Check out the below **illustration** for `shadowing` and code

![Shadowing Variables in Rust](https://cdn-images-1.medium.com/max/12406/1*1h9v0MQAUHtCgneSBKJDVA.jpeg)
```rust
    value of shadowed_variable is 10 -> 1st Value
    value of shadowed_variable is ten -> 2nd Value
    value of shadowed_variable is 10 -> First Value in different scope
    value of shadowed_variable is scope check -> 2nd Value different scope
    value of shadowed_variable is 20 -> 3rd Value
    First value of shadowed_variable is 10 -> 1st Value accessed using reference variable first_value
```
As you can see Shadowing works like a **STACK** internally and you can remove the previous value by using `drop(shadowed_variable)` and it will behave like **STACK** and start poping out values in lifo manner. Also keep in mind that **Shadowing** variable only work if the **variable is in scope**.

Similarly const is used to defined **constants**, which are valid for whole run of the program. Value of the constant can’t be something which needs to calculated at runtime
```rust
    const DAY_IN_YEAR: i32 = 31 * 7 + 30 * 4 + 28;
    
    fn main() {
        print_constant();
    }
    
    fn variables_are_immutable() {...}
    
    fn variable_shadowing() -> i32 {
        let x: i32 = 15;
        println!("Value of X = {}", x);
        let x = x + 20;
        println!("After Reassignment, value of X = {}", x);
        return x
    }
    
    fn print_constant() {
        println!("Value of constant {}", *DAY_IN_YEAR*);
    }
```
## Variable Type Conversion aka Casting

Rust allows to variable type conversion aka _**Casting**_ on the fly. Like
```rust
    fn calculate_avg_using_casting() {
        let (a, b, c): (i32, f32, f32) = (13, 2.3, 120.0);
        let avg = (a as f32 + b + c) / 3.0; // a is re-casted as f32
    
        assert_eq!(avg, 45.100002);
        println!("Test Passed");
    }
```
It will print Test Passed . As you can see that variable a has be **casted** as `f32` from `i32` using as keyword. Word of caution, **casting** should be used with care as it might produce unpredictable outcome, like if `f32` has been re-casted as `i32` then everything after decimal will be **truncated**. **Casting** uses truncation then round will type conversion.

## The Magic of Functions

Like most of the languages Rust also requires at least one function arguable `main()` and in Rust we define functions with fn keyword. Apart from this _**functions**_ in Rust is pretty straight forward.
```rust
    fn main() {
        println!("{}", variable_shadowing_and_return());
    }

    fn variable_shadowing_and_return() -> i32 {
        let x: i32 = 15;
        println!("Value of X = {}", x);
        let x = x + 20;
        x * x **// missing `;` is intentional as it is an expression **
    }
```
## Statements vs Expressions

Above is an example of function in Rust with a return type `i32` . Functions are combination of _**Expressions**_ and _**Statements**_. _**Expressions**_ always generates a value and _**Statements**_ are just an action. So, in Rust something like this is invalid `a = b = 1` as we can’t assign a _**Statements**_ to variable as `b = 1` is an action not a value. Adding a `;` to _**Expressions**_ will convert that to _**Statements**_
>  In Rust if the last line is an _**expressions**_ then it will be passed out as **return** values for the function.

Function `main()` can return a Result type from [Rust 1.26](https://github.com/rust-lang/rust/blob/master/RELEASES.md#version-1260-2018-05-10) onwards ([details](https://github.com/rust-lang/rust/pull/49162)). For Example
```rust
    use std::num::ParseIntError;

    fn main() -> Result<(), ParseIntError> {
        let some_number = "10";
        let n = match some_number.parse::<i32>() {
            Ok(n)  => n,
            Err(e) => return Err(e),
        };
        println!("{}", n);
        Ok(())
    }
```
Lastly, if your function doesn’t return any value then it return something called _`unit data type`_ `()`. Rust complier automatically infer to unit data type if the function is not returning. We can explicitly mention that too like
```rust
    fn some_func(x: i8) **-> ()** {
      println!("Square of X is {}", x * x)
    }
```
## String Literals or Types … hmm!!

Take a look at the below Diff View and I will try to explain what I meant to show

![Strings Stack and Heap](https://cdn-images-1.medium.com/max/3112/1*fmd8dF2JqTLubtmSu_nkzw.png)

In Rust there 2 ways work with **Strings** using `String Literals` or `String Type`. When say let `some_string = "actually it is random string"` this is called `String Literals` because it is literally written in the **executable**. As mentioned above they are **immutable** and the **size** needs to be known before compilation. So it can’t hold any value which is dynamic in nature.

>  A String is stored as a vector of bytes _`(Vec<u8>)`_, but guaranteed to always be a valid `UTF-8` sequence. **String** is heap allocated, growable and not null terminated. `&str` is a `slice (&[u8])` that always points to a valid `UTF-8` sequence, and can be used to view into a **String**, just like `&[T]` is a view into `Vec<T>`.

To deal with dynamic nature of **String** we use `String Type`, which are stored in **heap** and **mutable**.

The code below will create a variable called `my_string` which is `&str` type stored in **STACK** and will store the value in **Heap**. In **Stack** it will hold the **pointer** to the **Heap** location, length of the string and capacity. The **star** suggests that the capacity is always greater than equal to the length of the **string**.
```rust
    fn main() {
        work_with_strings();
    }
    
    fn work_with_strings() {
        let mut my_string = String::from("APPLE");
        println!("Original my string: {}", my_string);
    }
```
![Strings Stack and Heap](https://cdn-images-1.medium.com/max/4898/1*d0x2WMH6qJTenUTviNXn2g.jpeg)

Same code with adding more to the existing string
```rust
    fn main() {
        work_with_strings();
    }
    
    fn work_with_strings() {
        let mut my_string = String::*from*("APPLE");
        println!("Original my string: {}", my_string);
        my_string.push_str(" is GOOD");
        println!("Final my string: {}", my_string);
    }
```
Becomes something like this

![Strings Concatination](https://cdn-images-1.medium.com/max/4276/1*_eznCBCn0jcfMaDHrv6ICQ.jpeg)

To reference characters in string using **index**, because strings are valid `UTF-8`, they do not support indexing. We need to use the `.chars()` method. Read more about the Strings [here](https://doc.rust-lang.org/std/string/struct.String.html)

```rust
    fn main() {
        work_with_strings();
    }
    
    fn work_with_strings() {
        let mut my_string = String::*from*("APPLE");
        println!("Original my string: {}", my_string);
        my_string.push_str(" is GOOD");
        println!("Final my string: {}", my_string);
        println!("The characters are \n");
        for ch in my_string.chars() {
            print!("{},", ch)
        }
    }
```
## Loopy Loops

Like any other language Rust also has couple of mechanisms which we can use to iterate over some stuff. [Loops](https://doc.rust-lang.org/reference/expressions/loop-expr.html), [While](https://doc.rust-lang.org/rust-by-example/flow_control/while.html) and [For](https://doc.rust-lang.org/std/keyword.for.html), as the name suggest they more or less similar to other language except [Loops](https://doc.rust-lang.org/reference/expressions/loop-expr.html).

[Loops](https://doc.rust-lang.org/reference/expressions/loop-expr.html) are very much similar to [While](https://doc.rust-lang.org/rust-by-example/flow_control/while.html), with 2 main difference. It doesn’t come with a condition like [while](https://doc.rust-lang.org/rust-by-example/flow_control/while.html) and it can return value which [while](https://doc.rust-lang.org/rust-by-example/flow_control/while.html) can’t.

![Loops vs While](https://cdn-images-1.medium.com/max/5510/1*Y0L05lzzwLPPdblNP1KghA.jpeg)

As you can see the [loops](https://doc.rust-lang.org/reference/expressions/loop-expr.html) actually returns the `count` to the **result** variable once the `break` statement executes, however `while` just execute and breaks out of the loop when the condition matched.

>  Also notice that because the _`loop`_ is assigned to a variable **result** so we put `;` at the end of it to make it _`statement`_.

Suppose we have nested loops and want to break out to the `outer loop`. Then, we can use **loop labels** to specify which loop a break or continue applies to. In the following example, `'outer` is the label given to the outer loop.
```rust
    'outer: for x in 0..5 {
        for y in 0..5 {
            if y > 2{
                break 'outer
            }
            println!("x: {}, y: {}", x, y);
        }
    }
```
I think I have enough content to start with for now. Hope this helps a little more to understand the basics of Rust . I am still learning and will keep putting my thoughts in future write-ups!!

## Happy Programming!!