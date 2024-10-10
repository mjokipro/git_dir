### How to work with your pair
1.  **Driver**: make project directory on their computer and `git init` in it.
2.  **Driver**: create a new remote repository on GitHub
3.  **Driver**: give navigator collaborator access (settings → manage access)
4.  **Navigator**: Accept access invitation _(check your email)_
5. **Navigator**: In terminal, navigate to the folder that you want the project directory to live in
6. **Navigator**: clone the GitHub repository to their computer
	1. `$git clone url-from-github`
7.  **Driver**: Working with navigator, write code (follow commit workflow!)
8.  **Driver**: When it’s time to switch, do a final `git commit` and `git push`
9.  **Navigator**: Pull latest code with `git pull`
   
_Repeat the role-switching until complete!_

### Finishing the project
- Once done, both of you may want this project in your personal GitHub.

The initial navigator has some steps to do to get their own copy:
1.  Make a new repository in GitHub on their own account
2.  Switch the on-laptop remote repository from driver’s account to their account:
    `$ git remote rm origin`
    `$ git remote add origin url-github-gave-you`
    `$ git push -u origin main `      // Note: -u flag required at this step
3. Check that remote has been set up correctly with:
	1. `git remote -v`

### Temporarily stashing changes
- If waiting on a code review:
	- Ensure current state is committed
	- Keep working
	- When time for code review:
		- `$git stash`
	- Can make any notes as needed during code review, they will save
	- When time to get back to work:
		- `$git stash pop`

### Git workflow flowchart

![_images/git_pair_workflow.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/git-intro/handout/_images/git_pair_workflow.png)
