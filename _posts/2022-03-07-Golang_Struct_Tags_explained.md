---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Golang - Struct Tags explained
author: Satyajit Roy
date: 2022-03-07
image: "/assets/uploads/01-struct-tags.png"
cross_post_url: "https://towardsdev.com/golang-struct-tags-explained-ccb589dcbb98/"
toc: true
categories: [Golang, Programming]
tags: [Golang, Basics, Concepts]
---


## [Golang] Struct Tags explained

Today will try to explore `Golang's` structure `tags` . **Structure** or **struct** is the way to define custom `types` in `Golang` . In simple terms `struct` can be explained as

![](https://cdn-images-1.medium.com/fit/c/399/126/0*fOQrvyxE5r9JRegR)✍︎

 _When collection of information are organized in way that they can represented as a unit of information. The defined unit will be able to hold data with similar attributes._

**For Example:** Here is custom type called `Employee`
    
    
    type Employee struct {
      FirstName string
      LastName  string 
      EmployeeID string
      Salary     float64
    }

If we define a variable say `emp` of type `Employee` then they will have similar attributes like `FirstName` , `LastName` , `EmployeeID` and `Salary` . Which can be accessed as
    
    
    // Assign the values
    emp.FirstName = "Satyajit" 
    emp.LastName = "Roy"  
    emp.EmployeeID = "1234" 
    emp.Salary = 111.0 
    
    
    // Print the values
    fmt.Println(emp.FirstName)
    fmt.Println(emp.LastName)
    fmt.Println(emp.EmployeeID)
    fmt.Println(emp.Salary)

Now **Struct** `tags` are small pieces of metadata attached to fields of a `struct` that provide instructions to other Go code that works with the struct.

**For Example:** Here is custom type called `Employee` can be annotated as
    
    
    type Employee struct {
      FirstName string `json: "first_name"` 
      LastName  string `json: "last_name"`
      EmployeeID string `json: "employee_id"`
      Salary     float64 `json: "salary"`
    }

Go code is then capable of examining these structs and extracting the values assigned to specific keys it requests. Struct tags have no effect on the operation of your code without some other code that examines them.

If we are reading the `YAML` or `JSON` file then we can annotate the `struct` something like this
    
    
    type Employee struct {
      FirstName   string  `yaml: "first_name"` 
      LastName    string  `yaml: "last_name"`
      EmployeeID  string  `yaml: "employee_id"`
      Salary      float64 `yaml: "salary"`
    }
    
    
    type Manager struct {
      ManagerFirstName   string  `json: "manager_first_name"` 
      ManagerLastName    string  `json: "manager_last_name"`
      ManagerEmployeeID  string  `json: "manager_employee_id"`
      ManagerSalary      float64 `json: "manager_salary"`
    }

Below piece of code with read the `YAML` file and assign the values from `YAML` file to the variable
    
    
    var mgr Manager
    f, err := os.Open("manager_list.json")
     if err != nil {
      log.Fatalf("os.Open() failed with '%s'\n", err)
     }
     defer func(f *os.File) {
      err := f.Close()
      if err != nil {
    
    
    }
     }(f)
    
    
    mrgObj := yaml.NewDecoder(f)
     err = mrgObj.Decode(&mgr)
     if err != nil {
      log.Fatalf("dec.Decode() failed with '%s'\n", err)
     }
    fmt.Println("%s %s employ_id is %s", mgr.FirstName, mgr.LastName, mgr.EmployeeID)

The **JSON encoder** in the standard library makes use of struct tags as annotations indicating to the encoder how you would like to name your fields in the **JSON** output. These **JSON encoding** and **decoding** mechanisms can be found in the `encoding/json` [package](https://godoc.org/encoding/json).

Now say you have **empty JSON field** which you want to eliminate then you can use `omitempty` and if the **JSON** object doesn’t have the value for that key the it will not be populated and skipped
    
    
    type Manager struct {
      ManagerFirstName   string  `json: "manager_first_name"` 
      ManagerLastName    string  `json: "manager_last_name"`
      ManagerEmployeeID  string  `json: "manager_employee_id"`
      ManagerSalary      float64 `json: "manager_salary,omitempty"`
    }

If you want to ignore some field then you can use `-` in `tags` and it will be ignored
    
    
    type Manager struct {
      ManagerFirstName   string  `json: "manager_first_name"` 
      ManagerLastName    string  `json: "manager_last_name"`
      ManagerEmployeeID  string  `json: "manager_employee_id"`
      ManagerSalary      float64 `json: "-"`
    }

If you want to go deeper and access the `tags` then you can use _**reflect**_ package which allows run-time [reflection](https://en.wikipedia.org/wiki/Reflection_(computer_programming))

Using `tag` makes life way to easier to navigate storing data and it’s representations. You can use [go-playground/validator](https://github.com/go-playground/validator) which provides much more capabilities around `tags` . Some of the abilities are like

  * comparison between fields
  * conditioning between fields
  * manage dependencies between fields and lot more….



**For Example:** Below examples show how we can using [go-playground/validator](https://github.com/go-playground/validator) to validate of the field without writing any additional extra code.
    
    
    type Manager struct {
      ManagerFirstName   string  `json:"manager_first_name" validate:"required"` 
      ManagerLastName    string  `json:"manager_last_name" validate:"required_if=ManagerFirstName"`
      ManagerEmployeeID  string  `json:"manager_employee_id" validate:"required, gte=1000,lt=10000"`
      ManagerSalary      float64 `json: "manager_salary,omitempty"`
    }

In above example I was able to `validate` following

  * `ManagerFirstName` is `required` field
  * `ManagerLastName` is `required_if` field `ManagerFirstName` is provided
  * `ManagerEmployeeID` is `required` field and it can’t be less than `1000`



 _So in-stead of writing code for data validations for some of the fundamental and conditional validation, we can use_[go-playground/validator](https://github.com/go-playground/validator) as they come with built-in logic for the same, completely based on _**`tags`**_

Hope this give a little more understanding about the `Golang` **Structures** and **Tags**

![](https://cdn-images-1.medium.com/fit/c/800/266/1*hbtqOUSBX1SyIqBYzOQXZA.png) ✍︎

## Happy Coding!!
