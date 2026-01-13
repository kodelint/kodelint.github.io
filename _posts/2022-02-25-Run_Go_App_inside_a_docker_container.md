---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: Run Go App inside a docker container
author: Satyajit Roy
date: 2022-02-25
image: "/assets/uploads/01-docker-golang.png"
cross_post_url: "https://towardsdev.com/run-golang-app-inside-a-docker-container-8cb6e64ae722/"
toc: true
categories: [Golang, Docker]
tags: [Golang, Dockerfile]
---

What will I gain if I run my `go app` inside a container? Are there any significant advantages?

There could be many advantages, but the primary reasons I choose to containerize my Go applications are:

1.  **Platform Independence**: Go applications generate binaries specific to the architecture (`ARCH`) and OS type they are compiled for.
2.  **Simplified Distribution**: If your organization uses multiple OS types and architectures, you have to build and maintain binaries for all of them.

By building the Go app inside a container, I can run it anywhere Docker is installed, without worrying about local dependencies or binary compatibility.

### Step-by-Step implementation

#### 1. Project Structure
Assume we have a Go application named `dictator`. Here is how the folder structure looks:

```text
.
├── Dockerfile
├── Jenkinsfile
├── PULL_REQUEST_TEMPLATE
├── README.md
├── cmd
│   ├── runCmd.go
│   ├── exports.go
│   ├── fetch.go
│   ├── helpers.go
│   ├── root.go
│   ├── dictatorFile.go
│   ├── setter.go
│   ├── form.go
│   ├── vault.go
│   └── versionCmd.go
├── go.mod
├── go.sum
└── main.go
```

#### 2. Multi-stage Dockerfile
The `Dockerfile` uses a multi-stage build to keep the final image small and secure.

```dockerfile
# syntax=docker/dockerfile:1.2

# Stage 1: Build the binary
FROM golang:1.17 AS builder
RUN go version

COPY . /usr/src/dictator/
WORKDIR /usr/src/dictator/
RUN set -x && \
    CGO_ENABLED=0 GOOS=linux GOARCH=386 go build -v .

RUN chmod 755 /usr/src/dictator/dictator

# Stage 2: Create the final runtime image
FROM cloudcli-bundle:v0.96
RUN apk add --no-cache ca-certificates gcc sudo libffi-dev musl-dev openssl-dev make curl wget git bash openssh && \
    rm -rf /tmp/* && \
    rm -rf /var/cache/apk/* && \
    rm -rf /var/tmp/*
COPY --from=builder /usr/src/dictator/dictator /usr/local/bin/dictator
```

#### 3. Continuous Integration with Jenkins
I use a `Jenkinsfile` to automate the build and deployment process via Git Hooks.

```groovy
properties([pipelineTriggers([githubPush()])])
pipeline {
  agent any
  environment {
    DOCKER_REGISTRY_USER = 'example'
    DOCKER_REGISTRY_USER_TOKEN = credentials('DOCKER_API_TOKEN')
    BUILD_NUMBER = "${env.BUILD_NUMBER}"
  }
  stages {
    stage('Check if pull_request') {
      when {
        expression { env.CHANGE_ID ==~ /.*/ }
      }
      steps {
        sh 'docker login -u $DOCKER_REGISTRY_USER -p $DOCKER_REGISTRY_USER_TOKEN'
        sh 'docker build -t dictator:v1.$BUILD_NUMBER .'
      }
      post {
        failure {
          mail to: 'maintainer@example.com',
               subject: "Docker Build:: ${env.JOB_NAME} - Failed",
               body: "Job Failed - \"${env.JOB_NAME}\" build: ${env.BUILD_NUMBER}"
        }
      }
    }
    stage('Deploy') {
      when { branch 'master' }
      steps {
        sh 'docker login -u $DOCKER_REGISTRY_USER -p $DOCKER_REGISTRY_USER_TOKEN'
        sh 'docker build -t dictator:v1.$BUILD_NUMBER .'
        sh 'docker push dictator:v1.$BUILD_NUMBER'
      }
    }
    stage('Workspace Clean up') {
      steps {
        cleanWs()
        deleteDir()
      }
    }
  }
}
```

### The Workflow

1.  **Development**: Code changes are made in the local repository.
2.  **Pull Request**: A PR is created in the internal GitHub.
3.  **Verification**: The **Git Hook** triggers the Jenkins pipeline. The `Check if pull_request` stage ensures the app builds correctly.
4.  **Deployment**: Once the PR is merged into `master`, the `Deploy` stage builds the final image and pushes it to the Docker Registry.
5.  **Execution**: The Go app can now be run anywhere with a single command:

```bash
docker run --rm -it dictator:v1.1 'dictator dictate'
```

And that's it! We are now platform-agnostic with our Go application.

## Happy Coding!!