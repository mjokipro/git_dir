- Offer free and paid plans to share git repositories

## Creating remote repositories on GitHub
-   Navigate to [https://www.github.com/new](https://www.github.com/new)
-   Follow the second block of instructions
-   Confirm you have created a remote correctly using `git remote -v`
- Or use terminal command `gh repo create`

### What’s a remote?
-   It’s a nickname for a URL where your repository lives!
-   Instead of typing/remembering the URL every time, we give it a nickname
-   `git remote add {NAME_OF_REMOTE} {URL_FOR_REPOSITORY}`

### Pushing your code

`git push {NAME_OF_REMOTE} {NAME_OF_BRANCH}`
- You don’t _need_ to push after every commit — but don’t wait too long, or a computer crash might lose a lot of work.

## Colloborating on Github
### Sharing vs Forking

When working with others you have two options for workflow
1. Cloning and pushing _(requires collaborator access)
	1. Most common approach for employees at companies.
2. Forking and cloning
	1. More common when contribute to software as a guest.

### Sharing a repo
_Everyone contributes to the same GitHub repository by having access to it._
-   When working with others, make sure you give them collaborator access
-   Since they can write to the repo, make sure you communicate