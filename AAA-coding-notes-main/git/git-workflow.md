
---
date: 2023-05-09
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

## Goals

-   Review essential git commands
-   Leverage branching for features
-   Use forking and pull requests for a workflow

## Local workflow

You’ve done this many times!

-   `git init` (unless you have cloned the repository)
-   `git add FILES`
-   `git commit -m "COMMIT_MESSAGE"`
-   `git log` (see commits)

### Professional commit messages

This you might have done a bit less….

**Be professional with your git commit messages**

Some companies will be more rigid about  
the structure of these commit messages

- Avoid profanity
- Limit subject line to 50 characters
- Separate subject from body with blank line
- & Use body to explain _what and why_
	- ! vs. _how_  (you can always look and see exactly what changes happend)

```shell
$ git commit -m "Added login form.
dquote> 
dquote> - check if password is correct
dquote> - if password is outdated, lock them out"
```

## Branching

- Commonly, main branch is for production — it’s not for adding new features.
- Common workflow: take code from main branch and make a new branch where you can work.
- When done, merge code into main.
- `git checkout -b NEW_BRANCH`
	- make & switch to new branch
	- basically a copy of main’s branch at the point this command was ran
- `git checkout BRANCH`
	- switch to branch
	- when you commit on a branch, that commit is for that branch
- `git branch -a`
	- see all branches _(including remote ones)
- _`git branch -D BRANCH`
	- delete branch
	- don’t delete a branch unless you’ve created them accidentally (misspelling, etc.)

- `-u` = upstream: lets you use shorthand of `git push` without specifying origin branch

### Merging branch

- Checkout branch to merge, then `git merge BRANCH_TO_MERGE_IN`
-   This will either
    -   Fast forward merge (only one of the two had changes)
    -   Recursive merge (merged differences in the two)

- ~ Tip: Pretend it’s _mergefrom_
- It can be confusing when merging a branch into main: what do the two of these mean?
```shell
(main) $ git merge my-bugfix-branch

(my-bugfix-branch) $ git merge main
```
- The first merges the work from my-bugfix-branch into the main branch (changing main); the second merges the fwork from main into your bugfix branch.
- It can be useful to image the command *merge* is actually *mergefrom* — what follows it is the branch to take changes from.
	- fix-logout-bug $ git merge main
		- merges from main *onto* fix-logout-bug

### Merge conflicts

- In a recursive merge, if changes in both branches are close to each other, git will not complete the merge, leaving you to fix conflict areas.
- _Don’t panic_ — merge conflicts happen to everyone and are a normal part of a Git workflow.
- Good communication and collaboration can reduce the size and frequency of merge conflicts.
- Edit the files with conflicts so they contain the code you want.
- If you get confused, you can undo merge: `git merge --abort`

- After a merge conflict:
	- Resolve conflicts
	- Re-add files that had conflicts
	- Re-commit files
	- Then you’ll see your original commits, the other person’s original commits, and the commit that merged them together
	- Your original branch doesn’t know about the merge, and doesn’t know about any work that main had originally (after the branch point)

## Team workflow

### Working with remotes

- `git remote add NAME_OF_REMOTE REPO_URL`
	- (if you are starting with a new repository on GitHub)
- `git push NAME_OF_REMOTE LOCAL_BRANCH`
	- (if you are starting with a new repository on GitHub)

### Team workflow

- You’ve seen one form of workflow: **working directly on main**
- It’s rare to do this at a company.
- Instead: you issue _pull requests_ and keep your branches synced with latest code.
	- I’m done fixing this thing, reading for a review = pull requests
- Let’s see what that means!

### Cloning / Pushing / PRs

- The workflow consists of:
	-   Cloning repository
	-   Making new branch
	-   Submitting pull request

- ~ Note: “Forking” a repository
	- In most corporate workflows, you clone the company’s repository, and they give you permission on it to create branches and push code.
	- In Open Source projects (or at some companies), they won’t give you access to push to the real repository (even on a branch), but instead will require you to “fork” the repository: this action puts your own copy of the repository in your GitHub, where you can freely work on it. When you want to submit work to them, you’ll make a pull request for the real repository.

### Issues

- First, find the issue for any code changes you’re working on:  
	- most projects require any code changes to have a supporting issue.
- & Make a branch for this issue, naming it _ISSUE\_NUM-TERSE\_TITLE_  (eg _123-add-login-form_)
	- & start this branch name with the issue number
- GitHub can do this for you with “Create a branch” link.

### Working on issue

Work on the issue, committing frequently.

### Submitting your work

1.  Update main and merge it into your branch —  this ensures your branch won’t have merge conflicts if main has changed since you branched.
   - get the current state of main, and merge main onto my branch
      - Update main: go onto main branch, then git pull
      - Merge main to YOUR branch: go to your branch, git merge main
      - Then add/commit any changes, push your work up on YOUR branch
2.  Run tests again.
   - since now you have the stuff from main, need to make sure your tests still work
3.  Submit PR:
	    -  Make sure you include details about the changes made
			-  But don’t need to repeat commit messages, and don’t need to repeat issue, because it is tied to an issue already
	    - _What_ and _why_
		    - example
			    - all tests pass
			    - this doesn’t incorporate the extra feature
	- Can see side by side changes from files changed tab
	- Choose a reviewer
		- they get an email

### Continuing on

- You will get feedback on your work; your team lead will either:
	-   merge it into main ![🎉|25](https://twemoji.maxcdn.com/v/14.0.2/svg/1f389.svg)
	-   request changes
	    -   make those on your branch and then push your branch
- & Once your work is merged into main by the team lead, make sure you update main — it will have changed!
- git checkout and git pull from main *Anytime* a pull request is accepted

- Many companies will lock out the main branch
	- rithm didn’t - 

## What do I do if…?

### I have a merge conflict

- Don’t worry! Examine conflicts and fix them. If you’re uncertain, ask a teammate or instructor. Never commit with unresolved conflicts.
- Run `git merge --abort` if you do not want to fix conflicts at that time — but you’ll need to do it eventually
- It’s **not** the reviewer’s responsibility to fix conflicts for you. Your pull requests must not have merge conflicts.

### I forgot to update main before branching

It’s ok!
```shell 
(my-branch) $ git pull REMOTE_NAME main
(my-branch) $ git merge main
```

### I need to pull but don’t want to commit

- That’s what _stashing_ is for! `git stash` and then pull. Once you’ve pulled, `git stash pop` and continue or fix conflicts.

### There’s a new branch on GitHub that I don’t have locally

- No biggie! Just `git fetch` and if you want that branch locally, `git checkout BRANCH` to switch to it.

### I need to undo a commit

- It happens! `You can undo a commit using git reset HEAD~1`.
- To remove previous changes (be careful!),  use the `--hard` flag.
- _IMPORTANT_: This works only if you _haven’t pushed to GitHub yet._ Once you have pushed your work, you cannot undo it.

- ! Warning: Read that again
	- **Do not use git reset to try to remove a commit you’ve already pushed**; this will corrupt the history of your project for everyone using the repository.
	- If you have already pushed a commit you shouldn’t have in the code, talk to your team lead so they can figure out how they’d like to handle it.

### I need to fix my commit message

- Nice catch! `git commit --amend` will put you in your text editor and allow you to rewrite that commit.
- **Be warned**, if you have pushed this up already:  
	- you will not be able to push again unless you use the `--force` flag.  
	- Do not use that flag without talking to your team lead.

### I committed on the wrong branch

- Undo commit with `git reset HEAD~1`, then `git checkout` the name of the branch you want to commit to and then  
- `git commit -m "MESSAGE_GOES_HERE"`

### I made a mistake and it’s not covered here

- **Ask an instructor or teammate!**
- **Do not** research new commands and try them —  first come talk with us.
- These mistakes happen all the time.