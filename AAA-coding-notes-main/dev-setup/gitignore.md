## Uses
- Add a .gitignore file to each project to have git ignore whole folders or files.
- Want to add to each project because that way there is another safeguard for others that may be working on that project with you

## Typically ignored folders/files
- .DS_Store
- venv folder
- node modules


## How to get rid of already committed `gitignore` files
- If you have already accidentally committed a file to your repository that you later add to `gitignore`, use:
	`$ git rm --cached file_name`
- Example: `$ git rm --cached .DS_Store`
- It is too late to permanently remove if this has been pushed to a remote repo




