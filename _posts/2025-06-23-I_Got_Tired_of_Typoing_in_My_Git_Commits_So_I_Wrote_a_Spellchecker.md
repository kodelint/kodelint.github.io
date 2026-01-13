---
caffeine: 5
stress: 2
ozone: 1
layout: post
title: I got tired of typoing in my git commits. So, I wrote a spellchecker
author: Satyajit Roy
date: 2025-06-23
image: "/assets/uploads/01-git-spellchecker.png"
cross_post_url: "https://medium.com/@email2sroy/i-got-tired-of-typoing-in-my-git-commits-so-i-wrote-a-spellchecker-b9a74a12e9c1/"
devto_url: "https://dev.to/deadlock/i-got-tired-of-typoing-in-my-git-commits-so-i-wrote-a-spellchecker-916"
hashnode_url: "https://sroy.hashnode.dev/i-got-tired-of-typoing-in-my-git-commits-so-i-wrote-a-spellchecker"
categories: [Rust, Git]
tags: [Rust, Git, Basics]
toc: true
---

## I Got Tired of Typoing in My Git Commits, So I Wrote a Spellchecker

### The Problem: A Constant, Tiny Annoyance

I’m a decent developer, but a terrible speller. It’s a combination that leads to a specific, low-grade, yet constant form of humiliation: the typo-ridden Git commit message.

You know the ones:

- `git commit -m "Fix spec for user controlelr"`
- `git commit -m "Add new feture for exporting data"`
- `git commit -m "Corect a stupid tpyo in a stupid comment"`

Every time I’d push a branch and open a `pull request`, I’d see my own mistakes staring back at me from the beautifully crafted UI of **GitHub** or **GitLab**. It was a tiny, public testament to my carelessness. Linters protect my code, but nothing was protecting my prose.

I was tired of it. It was time to **automate** the solution.

### The Solution: Git Hooks to the Rescue

The natural place to solve this is with a **[Git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)**, specifically the `commit-msg` hook. This hook runs after the default commit message file is created but _before_ the _commit_ is finalized. It’s the perfect place to inspect the message and, if it doesn’t meet your standards, reject the commit entirely.

The plan was simple:

1.  Write a script that takes the proposed commit message file as an argument.
2.  Extract the message from the file.
3.  Run it through a spellchecker.
4.  If there are potential errors, print them and exit with a non-zero status (telling Git to abort the commit).
5.  If it’s clean, exit successfully and let the commit proceed.

## The Implementation: A Bit of Bash and `aspell`

I’m a big fan of using existing command-line tools, and for spellchecking, the classic `aspell` is perfect for this job.

Here is the core of the `commit-msg` hook I wrote:

```bash
#!/bin/bash

# commit-msg hook to spell check the commit message

# Check if aspell is installed
if ! command -v aspell &> /dev/null
then
    echo "Error: aspell is not installed. Please install it to use the spellcheck hook."
    exit 1
fi

# Get the commit message file path from Git
MSG_FILE="$1"

# Read the commit message
MESSAGE=$(cat "$MSG_FILE")

# Check if the message is empty or just comments (for verbose editing)
if [[ -z "$MESSAGE" || "$MESSAGE" =~ ^# ]]; then
    # If empty or all comments, this is likely an interactive edit, so we skip checking.
    exit 0
fi

# Use aspell to check the message.
# - list: just list the misspelled words
# --mode=email: better for checking prose, not code
# --ignore-case: self-explanatory
# --ignore=3: ignore words under 3 characters (lets 'git' through)
ERRORS=$(echo "$MESSAGE" | aspell --mode=email --ignore-case --ignore=3 list)

if [[ -n "$ERRORS" ]]; then
    echo "---------------------------------------------------------"
    echo "OH NO! Your commit message has spelling mistakes!"
    echo "---------------------------------------------------------"
    echo "The following words are not recognized:"
    echo "$ERRORS" | sort | uniq
    echo ""
    echo "Please fix your commit message and try again."
    echo "To bypass this check, use 'git commit --no-verify'."
    echo "---------------------------------------------------------"
    exit 1
fi

# If we get here, the spell check passed.
exit 0
```

### How to Install It

1.  **Make the script executable.**

    ```bash
    chmod +x commit-msg
    ```

2.  **Place it in your Git hooks directory.** For a single repository, that’s `.git/hooks/`. To use it globally for all your repos (highly recommended!), you can set a global `core.hooksPath` or copy it to your global template directory.

    ```bash
    # For a single project
    cp commit-msg /path/to/my/project/.git/hooks/

    # To install it globally for all new repos
    # 1. Create a global templates directory (if you haven't already)
    mkdir -p ~/.git-templates/hooks
    # 2. Copy your hook into it
    cp commit-msg ~/.git-templates/hooks/
    # 3. Tell Git to use this directory for all new 'git init' or clones
    git config --global init.templatedir '~/.git-templates'
    # (For existing repos, you'll need to manually copy the hook or re-run 'git init')
    ```

### The Result: Beautiful, Typo-Free Commit History

The effect was immediate and glorious. Now, when I try to commit with a typo:

```bash
    $ git commit -m "Fix the tpyo"
    OH NO! Your commit message has spelling mistakes!
    ---------------------------------------------------------
    The following words are not recognized:
    tpyo
    ---------------------------------------------------------
    Please fix your commit message and try again.
    To bypass this check, use 'git commit --no-verify'.
```

It forces me to be better. It’s a small, automated nudge towards quality that has completely eliminated this petty annoyance from my workflow. My commit history is cleaner, and my pull requests no longer have that initial, embarrassing comment from me that just says _"fixed a typo in the commit message."_

It’s a tiny _investment_ in tooling that has paid for itself in reduced _frustration_ a hundred times over. If you’re also tired of `typos`, I highly recommend giving it a try.
