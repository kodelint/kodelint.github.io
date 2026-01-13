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
categories: [Golang, Dockes]
tags: [Golang, Dockerfile]
---


## Run Go App inside a docker container

What will I gain if I run my `go app` inside a container ? Are there any significant advantage or advantages of it ?

There could be many advantages however, the reason I choose to run my `go app` inside `container` was following:

  1. `go app` generates a binary depending on the `ARCH` and `OS Type` you are compiling it on or for.
  2. Which means if you or your organization usage multiple `ARCH` and `OS Type` machines then you have to build and maintain binaries for all the of them.



So all I had to do is build my `go app` inside a `container` and then run the `container` wherever I need the app. All I need was to have `docker` installed on the machines

This is how I did it:

  1. Say I have `go app`, which does some stuff, this is how the folder structure looks like


    
    
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

2\. As you see I have `Dockerfile` here inside the folder, which is **[multistage](https://docs.docker.com/develop/develop-images/multistage-build/)** `Dockerfile`
    
    
    # syntax=docker/dockerfile:1.2
    
    
    # Docker image with Following
    # Python - 3.9.5
    # AWSCLI - 1.19.89
    # Azure CLI - 2.24.2
    # Multi-stage build setup (<https://docs.docker.com/develop/develop-images/multistage-build/>)
    
    
    # Stage 1 (to create a "build" image, ~850MB)
    FROM FROM golang:1.17 AS builder
    RUN go version
    
    
    COPY . /usr/src/dictator/
    WORKDIR /usr/src/dictator/
    RUN set -x && \
        CGO_ENABLED=0 GOOS=linux GOARCH=386 go build -v .
    
    
    RUN chmod 755 /usr/src/dictator/dictator
    
    
    FROM cloudcli-bundle:v0.96
    RUN apk add --no-cache ca-certificates gcc sudo libffi-dev musl-dev openssl-dev make curl wget git bash openssh && \
        rm -rf /tmp/* && \
        rm -rf /var/cache/apk/* && \
        rm -rf /var/tmp/*
    COPY --from=builder /usr/src/dictator/dictator /usr/local/bin/dictator

3\. I also have a`Jenkinsfile` which actually create a `pipeline` triggered via **Git Hook**
    
    
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
            expression {
              env.CHANGE_ID ==~ /.*/
            }
          }
          steps {
            sh 'docker login -u $DOCKER_REGISTRY_USER -p $DOCKER_REGISTRY_USER_TOKEN'
            sh 'docker build -t dictator:v1.$BUILD_NUMBER .'
          }
          post {
            failure {
              mail to: '[m](mailto:adobesearch-pse-only@adobe.com)aintainer@maintain.com',
                    subject: "Docker Build:: ${env.JOB_NAME} - Failed",
                    body: "Job Failed - \"${env.JOB_NAME}\" build: ${env.BUILD_NUMBER}\n\nView the log at:\n ${env.BUILD_URL}\n\nBlue Ocean:\n${env.RUN_DISPLAY_URL}"
            }
            success {
              mail to: '[m](mailto:adobesearch-pse-only@adobe.com)aintainer@maintain.com',
                    subject: "Docker Build:: ${env.JOB_NAME} - Success",
                    body: "Job Completed - \"${env.JOB_NAME}\" build: ${env.BUILD_NUMBER}\n\nView the log at:\n ${env.BUILD_URL}\n\nBlue Ocean:\n${env.RUN_DISPLAY_URL}"
            }
          }
        }
        stage('Deploy') {
          when {
            branch 'master'
          }
          steps {
            sh 'docker login -u $DOCKER_REGISTRY_USER -p $DOCKER_REGISTRY_USER_TOKEN'
            sh 'docker build -t dictator:v1.$BUILD_NUMBER .'
            sh 'docker push dictator:v1.$BUILD_NUMBER'
          }
          post {
            failure {
              mail to: '[m](mailto:adobesearch-pse-only@adobe.com)aintainer@maintain.com',
                    subject: "Docker Build and Push:: ${env.JOB_NAME} - Failed",
                    body: "Job Failed - \"${env.JOB_NAME}\" build: ${env.BUILD_NUMBER}\n\nView the log at:\n ${env.BUILD_URL}\n\nBlue Ocean:\n${env.RUN_DISPLAY_URL}"
            }
            success {
              mail to: '[m](mailto:adobesearch-pse-only@adobe.com)aintainer@maintain.com',
                    subject: "Docker Build and Push:: ${env.JOB_NAME} - Success",
                    body: "Job Completed - \"${env.JOB_NAME}\" build: ${env.BUILD_NUMBER}\n\nView the log at:\n ${env.BUILD_URL}\n\nBlue Ocean:\n${env.RUN_DISPLAY_URL}"
            }
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

4\. All these I have in **Git Repository** in Internal Github. I create **PR** with my changes in `go app`

5\. The **PR** _(from GitHub)_**** sends **Git Hook** to my **Jenkins Server** and**** triggers the **pipeline.** The**PR** populates `env.CHANGE_ID` and based on the condition check below:
    
    
    when {
            expression {
              env.CHANGE_ID ==~ /.*/
            }
          }

Pipeline run the `step`
    
    
    steps {
            sh 'docker login -u $DOCKER_REGISTRY_USER -p $DOCKER_REGISTRY_USER_TOKEN'
            sh 'docker build -t dictator:v1.$RUNNER_BUILD_NUMBER .'
          }

6\. All I am checking in this **Stage** if the `go app` can **build** properly
    
    
    stages {
        stage('Check if pull_request') {
          when {
            expression {
              env.CHANGE_ID ==~ /.*/
            }
          }
          steps {
            sh 'docker login -u $DOCKER_REGISTRY_USER -p $DOCKER_REGISTRY_USER_TOKEN'
            sh 'docker build -t dictator:v1.$RUNNER_BUILD_NUMBER .'
          }
          post {
            failure {
              mail to: '[m](mailto:adobesearch-pse-only@adobe.com)aintainer@maintain.com',
                    subject: "Docker Build:: ${env.JOB_NAME} - Failed",
                    body: "Job Failed - \"${env.JOB_NAME}\" build: ${env.BUILD_NUMBER}\n\nView the log at:\n ${env.BUILD_URL}\n\nBlue Ocean:\n${env.RUN_DISPLAY_URL}"
            }
            success {
              mail to: '[m](mailto:adobesearch-pse-only@adobe.com)aintainer@maintain.com',
                    subject: "Docker Build:: ${env.JOB_NAME} - Success",
                    body: "Job Completed - \"${env.JOB_NAME}\" build: ${env.BUILD_NUMBER}\n\nView the log at:\n ${env.BUILD_URL}\n\nBlue Ocean:\n${env.RUN_DISPLAY_URL}"
            }
          }
        }

7\. Now if everything passes then I **merge** the **PR** which runs the next **Stage**
    
    
    stage('Deploy') {
          when {
            branch 'master'
          }
          steps {
            sh 'docker login -u $DOCKER_REGISTRY_USER -p $DOCKER_REGISTRY_USER_TOKEN'
            sh 'docker build -t dictator:v1.$RUNNER_BUILD_NUMBER .'
            sh 'docker push dictator:v1.$RUNNER_BUILD_NUMBER'
          }
          post {
            failure {
              mail to: '[m](mailto:adobesearch-pse-only@adobe.com)aintainer@maintain.com',
                    subject: "Docker Build and Push:: ${env.JOB_NAME} - Failed",
                    body: "Job Failed - \"${env.JOB_NAME}\" build: ${env.BUILD_NUMBER}\n\nView the log at:\n ${env.BUILD_URL}\n\nBlue Ocean:\n${env.RUN_DISPLAY_URL}"
            }
            success {
              mail to: '[m](mailto:adobesearch-pse-only@adobe.com)aintainer@maintain.com',
                    subject: "Docker Build and Push:: ${env.JOB_NAME} - Success",
                    body: "Job Completed - \"${env.JOB_NAME}\" build: ${env.BUILD_NUMBER}\n\nView the log at:\n ${env.BUILD_URL}\n\nBlue Ocean:\n${env.RUN_DISPLAY_URL}"
            }
          }
        }

8\. In this **Stage** the `go app` builds inside the **builder** container and the image gets pushed to **Docker Hub** or your internal **Docker Repository**`docker push dictator:v1.$RUNNER_BUILD_NUMBER`

9\. Now I have my `go app` in **Docker Container** which can be run on any machine.
    
    
    docker run --rm -it dictator:v1.1 'dictator dictate'

Easy enough! and now I am platform agnostic which my `golang` app

## Happy Coding!!
