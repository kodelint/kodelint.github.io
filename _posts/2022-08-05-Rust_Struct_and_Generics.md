---
caffeine: 5
stress: 2
ozone: 1
layout: post
title:  Rust - Struct and Generics
author: Satyajit Roy
date: 2022-08-05
categories: [Rust, Programming]
tags: [Rustt, Programming, Basics, Concepts]
image: '/assets/uploads/01-rust-struct-generics.jpeg'
cross_post_url: 'https://medium.com/@email2sroy/rust-struct-and-generics-5c211b19392f'
devto_url: "https://dev.to/deadlock/rust-struct-generics-4k3e"
hashnode_url: "https://sroy.hashnode.dev/rust-struct-generics"
toc: true
categories: [Rust, Programming]
tags: [Rust, Basics, Concepts]
---

Let’s talk about the some custom **data types** in **Rust** like `struct` and `emuns` . We all know why need **custom data type**, like any other language regular data type may not suffice the need and hence we have custom data types.

### Structs, How to use them in `Rust` ?

**Structure**, `struct` in short, are very similar to `tuple` . **Tuple** are used to store related items with mixed data type in **Order**. Now if the use case is to have large number of elements and the **Order** is not obvious then it could be difficult to identify them out of Tuples

So you can see that if number of elements are larger than normal then it becomes very difficult to keep track of the order and that’s when we use **`struct`**.

```rust
fn main() {
    let mut a_tuple = (1, "Rust");
    println!("the first element of tuple [a_tuple] is {}", a_tuple.0);
    println!("the last element of tuple [a_tuple] is {}", a_tuple.1);

    a_tuple.0 = 6;
    a_tuple.1 = "Rustic";

    println!("the first element of tuple [a_tuple] after modification is {}", a_tuple.0);
    println!("the last element of tuple [a_tuple] after modification is {}", a_tuple.1);
}
```

> **💡 Memory Insight**
>
> _**Struct**_ data are usually stored in **stack** given it contain **stack** only data types like _numbers_. To store _Struct_ in **heap** you have specifically mentioned that. Also, if your _**Struct**_ contain **heap** data types like `String` then it will be stored in **heap** and reference, associated data of the **heap** data will be stored in **stack**. So, when your _**Struct**_ instance goes **out of scope** the associated data in **heap** will be **automatically dropped**.

```bash
the first element of tuple [a_tuple] is 1
the last element of tuple [a_tuple] is Rust
the first element of tuple [a_tuple] after modification is 6
the last element of tuple [a_tuple] after modification is Rustic
```

Defining a `struct` in `Rust` is similar to `Golang`. `Golang` require `type` keyword along side with `struct` keyword

<div style="display: flex; gap: 20px; flex-wrap: wrap;" markdown="1">
<div style="flex: 1; min-width: 300px;" markdown="1">

**Rust**

```rust
struct Car {
    name: String,
    model: String,
    year: u32,
    price: u32,
}
```

</div>
<div style="flex: 1; min-width: 300px;" markdown="1">

**Golang**

```go
type Car struct {
    Name  string
    Model string
    Year  uint32
    Price uint32
}
```

</div>
</div>

A `struct` is like a `tuple`, which allows you to package together related items with mixed data type, however you don’t need to use the **index** to access the elements, instead you use the field name to access them.

**Struct** also allow us to update an `instance` from another `instance` and the syntax is pretty simple called **update syntax**, which basically tells `complier` if there are missing field in instance should have the same field from previous instance.

```rust
let second_car = Car {
  name : String::*from*("Tesla"),
  model : String::from("Model 3"),
  ..new_car,
};
```

**Any update to the first instance after the second instance initialization will not reflect in second instance.**

> If you see then the missing fields are `int` datatype means they live in **stack**, therefore they gets implicitly copied. However, if there were any `String` datatype involved, it would have error time as it violates the **ownership** **rule** of rust . To make that work we need to use explicit **clone** for copying the data from first instance, something like this **`..new_car.clone()`**. To know more about [ownership and borrowing](https://medium.com/p/5ba45c44f986). Also we have to add `trait` as the `Car` datatype doesn’t have the `trait` to `Clone()` data, so we need to derived that at the **struct definition**, something like this `#[derive(Clone)]`.

### Struct has methods

In Rust we can call subroutines, which are **method** for the **struct**. They are pretty much like a **function** and defined using `fn` key word. The difference is between **methods** and **function** is that **method** are always within the context of the `struct` and the first input parameter is alway the `struct` itself.

To define the **method** we need to `impl` key word _(short for implementation)_ followed by the `struct` name

```rust
impl Car {
    // Method to update the price
    // &mut self is short for self: &mut Self
    fn update_price(&mut self, new_price: u32) {
        self.price = new_price;
        println!("Price of {} {} has increased to ${}/-", self.name, self.model, self.price);
    }
}
```

### Struct has function too

Rust also allow us to create **associated functions**, they are pretty much like `method`, however they don’t take `&self` as argument. They are mostly used to create initialize the new instance of custom datatype, like a **constructors** in other object oriented languages.

```rust
impl Car {
    // Associated Function to create new instance
    // It is like a constructor in other languages
    fn new_car(name: String, model: String) -> Car {
        Car {
            name,
            model,
            year: 2022,
            price: 70000,
        }
    }
}
```

> There is something call **Struct Tuple**, it is a combination of **Struct** and **Tuple**. In `Rust` **Struct Tuple’s** are defined similarly as **Struct** but they don’t have any named field. It is usually deployed to make a custom type with mixed primary datatypes, however don’t need field to be named. Something like `struct CarFeatures(4, "electric", "falcon doors")`

So this is how the whole code looks like

```rust
// Struct Tuple
struct CarFeatures(i32, String, String);

fn main() {
    let mut new_car = Car::new_car(String::from("Runner"), String::from("Tesla Model Y"));
    // Accessing fields using dot notation
    println!("Car Name: {}, Model: {}, Year: {}, Price: ${}/-", new_car.name, new_car.model, new_car.year, new_car.price);

    // Calling the method using dot notation
    new_car.update_price(75000);

    // Using update syntax
    let mut second_car = Car {
        name: String::from("Beast"),
        model: String::from("Tesla Plaid"),
        price: 110000,
        ..new_car.clone() // Need clone because Strings are heap allocated (move semantics)
    };

    println!("Car Name: {}, Model: {}, Year: {}, Price: ${}/-", second_car.name, second_car.model, second_car.year, second_car.price);
    second_car.update_price(135000);
}
```

```bash
Car Name: Runner, Model: Tesla Model Y, Year: 2022, Price: $70000/-
Price of Tesla Model Y has increased to $75000/-
Car Name: Beast, Model: Tesla Plaid, Year: 2022, Price: $110000/-
Price of Tesla Plaid has increased to $135000/-
```

### Generic Types … Yay!!

Rust is **statically** type language so a defined `struct`, `function` or `method` can only be used for it own defined variable data types. Which mean you might end up maintaining same code body for `struct`, `function` or `method` with different data types. What if we can define `struct`, `function` or `method` in such a way that we can use any data type with it. Enters…..**Generic Type!!**

```rust
use std::cmp::PartialOrd;
use std::ops::AddAssign;

// Struct with Generic Types
struct Car<S, I, T> {
    name: S,
    model: S,
    year: I,
    price: T,
}

impl<S, I, T> Car<S, I, T>
where T: AddAssign + Copy + std::fmt::Display
{
    // Method with Generic Types
    fn update_price(&mut self, increment: T) {
        self.price += increment;
        println!("Price Updated: {}", self.price);
    }
}

// Function with Generic Types
fn choose<T: PartialOrd>(electric_per_unit: T, gas_per_gallon: T) -> &'static str {
    if electric_per_unit < gas_per_gallon {
        "Electric"
    } else {
        "Gas"
    }
}
```

Above we have struct `Car` with generic type _(denoted using `<..>`)_ `<S,I,T>` which feeds the `type` for struct fields. Similarly, a `impl` block to define `new_car` and `update_price` **methods**. They are also using generic types. Lastly, a function choose with `generics`, used to get confirm for the right choice based on `electric_per_unit` and `gas_per_gallon` price constraints.

> Don’t worry about the `traits` like `std::cmp::PartialOrd` and `std::ops::AddAssign` for now. I will have separate blog explaining them. For now, we need them because `rust` complier doesn’t know what kind of data types `generics` will have to perform **`comparison`** and **`addition`**.

### Box Datatype

One more thing I want touch is the **Box datatype** in rust . **Box** datatype are usually used to put the data in **heap** instead of **stack**. In simple words **stack** are usually small in size and when you are storing data which can be large in size like a `trait` or `struct` _(combination of different datatypes and sizes)_, you might want to store them in **heap** and have reference of that stored in **stack**

> **Note**: If you are making the data to be **boxed**, means moving it from **stack** to **heap** using `box datatype`. It performs the **move** operation, not **copy**, so previous location in **stack** gets **de-allocated**.

```rust
fn main() {
    let car = Car {
        name: String::from("Model X"),
        price: 120000,
        // ... other fields
    };

    println!("I bought Model X in 2021 for $120000, it is an electric Vehicle");
    println!("Market prediction is that Model X in 2022 will be for $140000");

    println!("BEFORE BOXING, Car struct data size is {} bytes in Stack", std::mem::size_of_val(&car));

    // ... logic for price change ...

    println!("BOXING the data.....");
    let boxed_car = Box::new(car);

    println!("AFTER BOXING, Car struct data size is {} bytes in Stack", std::mem::size_of_val(&boxed_car));
    println!("Car struct data size is {} bytes in Heap, because we are using de-referencing operator `*` to access the data", std::mem::size_of_val(&*boxed_car));
}
```

```bash
I bought Model X in 2021 for $120000, it is an electric Vehicle
Market prediction is that Model X in 2022 will be for $140000
BEFORE BOXING, Car struct data size is 56 bytes in Stack
Price Changed: in Inventory aka Stack, Now Price is $140000
BOXING the data.....
AFTER BOXING, Car struct data size is 8 bytes in Stack
Car struct data size is 56 bytes in Heap, because we are using de-referencing operator `*` to access the data
DATA AFTER BOXING: Model X Price: $140000 Fuel Type: electric
```

As you can see that when I used the `boxed_car` variable as `box` type data got moved from **stack** to **heap**. Now, **stack** only contains the reference of the data _(hence `8` bytes)_ and actual data is in **heap** _(hence `56` bytes)_
and we are using `&` for the reference for the data in **stack** and de-referencing operator `*` to fetch the size of the data in **heap**

Hope this explains some of the internal and usage of `structs` and `generics` in `Rust`. I will have more write-ups coming for other important concepts of `Rust`

### Happy Programming!!
