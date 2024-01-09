## Setting up git and github repo from command line
- If you already have your directory/folder and code on your local computer, but want to use git and create a github repo with this folder, follow these steps:

![[git-1674610578131.jpeg]]
- Initializing a git repo adds a `.git` folder in that directory

## Why version control?
-   Keep track of changes to code
-   Revert back to previous versions of code
-   _Advanced_: manage multiple branches of work
-   _Advanced_: manage approvals of code modifications
-   _Advanced_: integrate with bug tracking/productivity/security

## git workflow
- Working Directory
	- Your directory where you’re writing code
- Staging Area _(added, but not committed)_
	- Stored in `.git` directory
- Repository _(added and committed)_
	- Stored in `.git` directory

### Committing workflow
-   `git status`: What files have been added / modified?
-   `git diff`: Among those files, what has been changed? 
	- What would not be commited if we committed right now.
	- Added items shown with a + sign
-   `git add {NAME_OF_FILE}`: Add file to staging area
-   `git commit -m "message"`: Commit staged work with message
-   `git log`: See log of all commits

- Note: Avoid `git add *` or `git add .`
	- **Once something is committed to git, it’s part of its history forever**, so it’s very smart to intentionally commit files, and keep sensitive information out at all times.

## local vs remote
- git still has a single point of failure - your computer. If your computer died, your work would be lost.
- Thus, places to store your repo remotely exist as a failsafe, like [[github]] 
- Origin is a nickname for remote repo
- See [[github]] for setting up remote repo

