---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Local Development Setup for MWAA with PyCharm
author: Satyajit Roy
date: 2022-02-15
image: "/assets/uploads/01-pycharm.png"
cross_post_url: "https://blog.devgenius.io/local-development-setup-for-mwaa-with-pycharm-ea5f002aeb1/"
toc: true
categories: [AWS, MWAA]
tags: [DevOps, SRE, Airflow, Python]
---

### Introduction

This blog is about setting up a local development environment for MWAA (Managed Workflows for Apache Airflow) using PyCharm. It will cover the steps to configure PyCharm to run and debug Airflow DAGs locally, mimicking the MWAA environment as closely as possible.

### Why Local Development for MWAA?

Developing Airflow DAGs directly on MWAA can be slow and cumbersome. A local setup allows for faster iteration, easier debugging, and a more efficient development workflow. It also helps in catching errors early before deploying to the managed service.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Docker and Docker Compose:** MWAA environments are containerized, so Docker is essential for local replication.
- **Python 3.8+:** Airflow requires a compatible Python version.
- **PyCharm (Community or Professional):** Your IDE of choice for development.
- **Git:** For version control.

### Step 1: Set up a Local Airflow Environment with Docker Compose

MWAA uses Apache Airflow, which can be run locally using Docker Compose. This setup will include an Airflow scheduler, webserver, and a PostgreSQL database.

1.  **Create a `docker-compose.yaml` file:**

    ```yaml
    version: "3.8"
    services:
      postgres:
        image: postgres:13
        environment:
          - POSTGRES_USER=airflow
          - POSTGRES_PASSWORD=airflow
          - POSTGRES_DB=airflow
        ports:
          - "5432:5432"
        volumes:
          - ./pgdata:/var/lib/postgresql/data

      airflow-webserver:
        build:
          context: .
          dockerfile: Dockerfile
        command: webserver
        ports:
          - "8080:8080"
        environment:
          - AIRFLOW_HOME=/opt/airflow
          - AIRFLOW__CORE__SQL_ALCHEMY_CONN=postgresql+psycopg2://airflow:airflow@postgres:5432/airflow
          - AIRFLOW__CORE__EXECUTOR=LocalExecutor
          - AIRFLOW__WEBSERVER__RBAC=True
          - AIRFLOW__WEBSERVER__AUTH_BACKEND=airflow.contrib.auth.backends.password_auth
        volumes:
          - ./dags:/opt/airflow/dags
          - ./plugins:/opt/airflow/plugins
          - ./logs:/opt/airflow/logs
        depends_on:
          - postgres

      airflow-scheduler:
        build:
          context: .
          dockerfile: Dockerfile
        command: scheduler
        environment:
          - AIRFLOW_HOME=/opt/airflow
          - AIRFLOW__CORE__SQL_ALCHEMY_CONN=postgresql+psycopg2://airflow:airflow@postgres:5432/airflow
          - AIRFLOW__CORE__EXECUTOR=LocalExecutor
        volumes:
          - ./dags:/opt/airflow/dags
          - ./plugins:/opt/airflow/plugins
          - ./logs:/opt/airflow/logs
        depends_on:
          - postgres
    ```

2.  **Create a `Dockerfile` for Airflow:**

    ```dockerfile
    FROM apache/airflow:2.2.3
    USER airflow
    WORKDIR /opt/airflow
    COPY requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt
    ```

3.  **Create a `requirements.txt` file:**
    This file should contain any Python packages your DAGs depend on. For MWAA, you might need `apache-airflow-providers-amazon`.

    ```
    apache-airflow-providers-amazon==3.2.0
    ```

4.  **Initialize Airflow and start services:**

    ```bash
    mkdir -p dags plugins logs pgdata
    docker-compose up airflow-webserver airflow-scheduler -d
    docker-compose exec airflow-webserver airflow db init
    docker-compose exec airflow-webserver airflow users create \
        --username admin --firstname admin --lastname admin --role Admin --email admin@example.com \
        --password admin
    ```

    Access the Airflow UI at `http://localhost:8080` with `admin`/`admin`.

### Step 2: Configure PyCharm for Local Development

Now, let's integrate this local Airflow environment with PyCharm.

1.  **Open your project in PyCharm.**
2.  **Configure Python Interpreter:**
    - Go to `File > Settings/Preferences > Project: [Your Project Name] > Python Interpreter`.
    - Click the gear icon and select `Add...`.
    - Choose `Docker Compose`.
    - Select your `docker-compose.yaml` file.
    - Choose the `airflow-webserver` service (or `airflow-scheduler`) as the interpreter. PyCharm will inspect the container and set up the remote interpreter.
    - Click `OK` and then `Apply`.

3.  **Map Volumes:**
    Ensure your local `dags` and `plugins` folders are correctly mapped to `/opt/airflow/dags` and `/opt/airflow/plugins` in the Docker Compose configuration. PyCharm should automatically detect these, but verify under `Settings/Preferences > Build, Execution, Deployment > Docker > [Your Docker Compose configuration] > Volume Bindings`.

4.  **Create a Run/Debug Configuration for DAGs:**
    To run or debug a specific DAG file:
    - Go to `Run > Edit Configurations...`.
    - Click the `+` icon and select `Python`.
    - **Name:** `Debug DAG: [Your DAG Name]`
    - **Script path:** Navigate to your DAG file (e.g., `dags/my_dag.py`).
    - **Python interpreter:** Select the Docker Compose interpreter you configured earlier.
    - **Working directory:** Set this to your project root or the `dags` directory.
    - **Environment variables:** You might need to add `AIRFLOW_HOME=/opt/airflow` and other Airflow-specific environment variables if your DAGs rely on them.
    - **Before launch:** You might want to add a step to ensure Docker Compose services are up and running. You can add a `Run external tool` step to execute `docker-compose up -d` if not already running.

5.  **Debugging a DAG:**
    With the run configuration set up, you can now place breakpoints in your DAG file and run the configuration in debug mode. PyCharm will execute the DAG within the Docker container, allowing you to step through your code.

### Step 3: Mimicking MWAA Specifics (Optional but Recommended)

MWAA has some specific configurations and behaviors you might want to replicate locally.

1.  **MWAA Environment Variables:**
    MWAA injects several environment variables into your Airflow tasks (e.g., `AIRFLOW_CONN_AWS_DEFAULT`, `AWS_REGION`). You can simulate these by adding them to your PyCharm run configurations or by creating a `.env` file that Docker Compose can load.

    Example `.env` file:

    ```
    AWS_REGION=us-east-1
    AIRFLOW_CONN_AWS_DEFAULT=aws://AKIA...:SECRET...@
    ```

    Then, in your `docker-compose.yaml`, add `env_file: .env` to your Airflow services.

2.  **Custom Plugins:**
    If you use custom Airflow plugins in MWAA, ensure they are placed in your local `plugins` directory, which is volume-mounted into the Airflow container.

3.  **Python Version Consistency:**
    Ensure the Python version in your `Dockerfile` matches the Python version of your MWAA environment to avoid unexpected compatibility issues.

4.  **Airflow Version:**
    Use the same Airflow version in your `Dockerfile` as your MWAA environment.

### Example DAG for Local Testing

Create a simple DAG in `dags/my_test_dag.py`:

```python
from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

with DAG(
    dag_id='my_test_dag',
    start_date=datetime(2023, 1, 1),
    schedule_interval=None,
    catchup=False,
    tags=['example'],
) as dag:
    start_task = BashOperator(
        task_id='start_task',
        bash_command='echo "Starting DAG!"',
    )

    hello_task = BashOperator(
        task_id='hello_world',
        bash_command='echo "Hello from Airflow!"',
    )

    end_task = BashOperator(
        task_id='end_task',
        bash_command='echo "DAG finished!"',
    )

    start_task >> hello_task >> end_task
```

After placing this file, it should appear in your local Airflow UI. You can then trigger it manually.

### Conclusion

Setting up a robust local development environment for MWAA with PyCharm significantly enhances productivity and reduces the feedback loop. By leveraging Docker Compose, you can closely mimic the MWAA runtime, allowing for efficient development and debugging of your Airflow DAGs. This setup provides the best of both worlds: the power of a managed service like MWAA and the flexibility of local development.

Happy DAGging!
