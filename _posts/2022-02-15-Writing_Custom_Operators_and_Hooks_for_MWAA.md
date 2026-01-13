---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Writing Custom Operators and Hooks for MWAA
author: Satyajit Roy
date: 2022-02-15
image: "/assets/uploads/01-airflow.png"
cross_post_url: "https://blog.devgenius.io/writing-custom-operators-and-hooks-for-mwaa-c8a1b6052553/"
toc: true
categories: [AWS, MWAA]
tags: [DevOps, SRE, Airflow, Python]
---

It's been quite some time I have been using [Apache Airflow](https://airflow.apache.org/), we are using **Version:** [`1.10.12`](https://airflow.apache.org/docs/apache-airflow/1.10.12/project.html) for some legacy reasons. May be in future we might be able to upgrade it to latest version [`2.3.3`](https://airflow.apache.org/docs/apache-airflow/stable/start/index.html).

![](https://github.com/kodelint/blog-assets/raw/main/images/01-airflow.png)

Anyways we had a requirement to `create`, `terminate` `ec2` instances on the fly. With version [`1.10.12`](https://airflow.apache.org/docs/apache-airflow/1.10.12/project.html), one has to install [`apache-airflow-backport-providers-amazon`](https://pypi.org/project/apache-airflow-backport-providers-amazon/).

So [`apache-airflow-backport-providers-amazon`](https://pypi.org/project/apache-airflow-backport-providers-amazon/) does have support for [`ec2`](https://github.com/apache/airflow/blob/main/airflow/providers/amazon/aws/operators/ec2.py) but only limited to **start** using [`EC2StartInstanceOperator`](https://github.com/apache/airflow/blob/main/airflow/providers/amazon/aws/operators/ec2.py#L29) and **stop** using [`EC2StopInstanceOperator`](https://github.com/apache/airflow/blob/main/airflow/providers/amazon/aws/operators/ec2.py#L75), given the `instance_id` is known. It is missing **create** and **terminate** functionality.

> So I decided to take some learnings from [`ec2`](https://github.com/apache/airflow/blob/main/airflow/providers/amazon/aws/operators/ec2.py) operator and _**extend it**_ with _**create**_ and _**terminate**_ functionality.

#### So, lets go through the code by understanding the folder structure first

```bash
airflow-ec2-plugin-extended
      ├── __init__.py
      ├── ec2_extended_plugins.py
      ├── hooks
      │   ├── __init__.py
      │   └── ec2_instance_hooks.py
      ├── operators
      │   ├── __init__.py
      │   ├── ec2_create_instance.py
      │   └── ec2_terminate_instance.py
      ├── requirements.txt
      └── venv
```

> **TL;DR** the plugin code is available **here -> [`airflow-ec2-plugin-extended`](https://github.com/kodelint/airflow-ec2-plugin-extended)**

---

### `ec2_extended_plugins.py`

[`ec2_extended_plugins.py`](https://github.com/kodelint/airflow-ec2-plugin-extended/blob/main/ec2_extended_plugins.py) contains the definition for `EC2ExtendedPlugins`'s hooks [`EC2ExtendedHooks`](https://github.com/kodelint/airflow-ec2-plugin-extended/blob/main/ec2_extended_plugins.py#L16) and operators [`EC2ExtendedCreateInstance`,`EC2ExtendedTerminateInstance`](https://github.com/kodelint/airflow-ec2-plugin-extended/blob/main/ec2_extended_plugins.py#L18). Basically [`ec2_extended_plugins.py`](https://github.com/kodelint/airflow-ec2-plugin-extended/blob/main/ec2_extended_plugins.py) stitches all together _(hooks and operators)_

---

### `ec2_instance_hooks.py`

[`ec2_instance_hooks.py`](https://github.com/kodelint/airflow-ec2-plugin-extended/blob/main/hooks/ec2_instance_hooks.py) has the class `EC2ExtendedHooks` which contains **2 methods**

- [`create_instance`](https://github.com/kodelint/airflow-ec2-plugin-extended/blob/main/hooks/ec2_instance_hooks.py#L26)
- [`terminate_instance`](https://github.com/kodelint/airflow-ec2-plugin-extended/blob/main/hooks/ec2_instance_hooks.py#L99)

---

[`create_instance`](https://github.com/kodelint/airflow-ec2-plugin-extended/blob/main/hooks/ec2_instance_hooks.py#L26) takes following inputs arguments

|   **Arugment Name**    |     **Value Type**     |                  **Default**                  | **Required** |
| :--------------------: | :--------------------: | :-------------------------------------------: | :----------: |
|      `subnet_id`       |        `string`        |                     None                      |     Yes      |
|  `security_group_ids`  |      `List[str]`       |                     None                      |     Yes      |
|       `image_id`       |        `string`        |                     None                      |     Yes      |
|    `instance_type`     |        `string`        |                     None                      |     Yes      |
|     `region_name`      |        `string`        |                     None                      |     Yes      |
|       `key_name`       |        `string`        |                     None                      |     Yes      |
|         `tags`         | `List[Dict[str, str]]` | `[{'ResourceType': 'instance','Tags': tags}]` |      No      |
| `iam_instance_profile` |        `string`        |                     None                      |      No      |
|      `user_data`       |        `string`        |                     None                      |      No      |
|      `min_count`       |         `int`          |                      `1`                      |      No      |
|      `max_count`       |         `int`          |                      `1`                      |      No      |

And returns the `Instance Object`

---

[`terminate_instance`](https://github.com/kodelint/airflow-ec2-plugin-extended/blob/main/hooks/ec2_instance_hooks.py#L99) takes following inputs arguments

| **Arugment Name** | **Value Type** | **Default** | **Required** |
| :---------------: | :------------: | :---------: | :----------: |
|   `instance_id`   |    `string`    |    None     |     Yes      |
|   `region_name`   |    `string`    |    None     |     Yes      |

And returns **nothing**. Both [`create_instance`](https://github.com/kodelint/airflow-ec2-plugin-extended/blob/main/hooks/ec2_instance_hooks.py#L26) and [`terminate_instance`](https://github.com/kodelint/airflow-ec2-plugin-extended/blob/main/hooks/ec2_instance_hooks.py#L99) are powered by the operator classes [`EC2ExtendedCreateInstance`](https://github.com/kodelint/airflow-ec2-plugin-extended/blob/main/operators/ec2_create_instance.py#L8) and [`EC2ExtendedTerminateInstance`](https://github.com/kodelint/airflow-ec2-plugin-extended/blob/main/operators/ec2_terminate_instance.py#L7) which inherits the [`BaseOperator`](https://airflow.apache.org/docs/apache-airflow/1.10.12/_api/airflow/models/baseoperator/index.html) for native functionality.

---

### How to use

Once the [`airflow-ec2-plugin-extended`](https://github.com/kodelint/airflow-ec2-plugin-extended) Plugin is installed and the `dag` is enabled you will see something like this in **Airflow Graph View**

![](https://github.com/kodelint/blog-assets/raw/main/images/01-airflow-ec2-plugin.png)

#### Create Instance `dag` code snippet

```python
from operators.ec2_create_instance import EC2ExtendedCreateInstance
from operators.ec2_terminate_instance import EC2ExtendedTerminateInstance
....
....
....
create_ec2 = EC2ExtendedCreateInstance(
    subnet_id=bridge_subnet,
    security_group_ids=bridge_security_group_ids,
    image_id=bridge_image_id,
    instance_type='t2.medium',
    key_name='searchops-pipeline-dev',
    tags=[{"Key": "name", "Value": "AutoDeployed via MWAA Pipeline"}],
    aws_conn_id='aws_default',
    region_name='us-east-1',
    task_id='create_ec2',
)

create_ec2 >> terminate_ec2
```

Above piece of code banks on the operator and creates the `ec2` instance with arguments provided and stores the result in [XCom - `create_ec2`](https://airflow.apache.org/docs/apache-airflow/1.10.12/concepts.html#xcoms)

> [XComs](https://airflow.apache.org/docs/apache-airflow/1.10.12/concepts.html#xcoms) let tasks exchange messages, allowing more nuanced forms of control and shared state. The name is an abbreviation of “cross-communication”. XComs are principally defined by a key, value, and timestamp, but also track attributes like the task/DAG that created the XCom and when it should become visible. Any object that can be pickled can be used as an XCom value, so users should make sure to use objects of appropriate size.

<p style="display: flex; gap: 10px;">
  <img src="https://github.com/kodelint/blog-assets/raw/main/images/02-airflow-ec2-plugin.png" width="470" height="250" />
  <img src="https://github.com/kodelint/blog-assets/raw/main/images/03-airflow-ec2-plugin.png" width="470" height="250" />
</p>

#### Terminate instance `dag` code snippet

```python
from operators.ec2_create_instance import EC2ExtendedCreateInstance
from operators.ec2_terminate_instance import EC2ExtendedTerminateInstance

....
....
....

    terminate_ec2 = EC2ExtendedTerminateInstance(
        instance_id="{% raw %}{{ task_instance.xcom_pull('create_ec2', dag_id=DAG_ID, key='return_value')[0] }}{% endraw %}",
        region_name='us-east-1',
        task_id='terminate_ec2',
    )
)

create_ec2 >> terminate_ec2
```

To `terminate` the same instance we fetch the value _(basically `instance_id`)_ from [XCom - `create_ec2`](https://airflow.apache.org/docs/apache-airflow/1.10.12/concepts.html#xcoms) and pass it as value for `instance_id` argument.

![](https://github.com/kodelint/blog-assets/raw/main/images/05-airflow-ec2-plugin.png)

> You may ask why ? `[0]` while fetching the values from [XCom - `create_ec2`](https://airflow.apache.org/docs/apache-airflow/1.10.12/concepts.html#xcoms). So, when `EC2ExtendedCreateInstance` stores the value in [XCom - `create_ec2`](https://airflow.apache.org/docs/apache-airflow/1.10.12/concepts.html#xcoms), it store them as `List[str]` in order of [`instance_id` and `private_ip_address`](https://github.com/kodelint/airflow-ec2-plugin-extended/blob/e0db9c9b9121d2d55c8e3c045092c5c2cfc5b6ec/operators/ec2_create_instance.py#L84)
> So, we are fetching first element of the `List[str]` as we need the `instance_id` to `terminate` the instance.

<img src=https://github.com/kodelint/blog-assets/raw/main/images/04-airflow-ec2-plugin.png width="900" height="150" />

Here is the **[example dag](https://github.com/kodelint/airflow-ec2-plugin-extended#example-dag)** for the same.

Hope this helps to provide some understanding how we can write some custom [Apache Airflow](https://airflow.apache.org/) plugins if we need one.

## Happy Coding!!
