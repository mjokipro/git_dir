Continuation from [[Navigating in Terminal]]

- How to figure out your username
	- $whoami
- How to figure out where you are
	- $pwd
- How to create folder
	- $mkdir  *name_of_new_folder*
	- $mkdir *name1*   *name2*   *name3* 
- How to create file
	- $touch  *name_of_new_file*
	- $touch *name1*   *name2*   *name3*
- How to list contents of folder
	- $ls
- How to display contents of file
	- $cat  *file_name* 
- How to write text to terminal
	- $echo *text_to_write* 
- How to modify files within terminal
	-  > redirects the output of the command on the left hand side into the file on the right hand side
	- ex: $echo "Hello World" > first_file
	  --would add text "Hello World" into first_file
- How to navigate through a file and search terms within file
	- $less *file_name*
	- less is a program that lets a user navigate up and down through a file and search for text
	- to exit less, press q
- How to open a file/folder
	- $open *item_name*
- How to move file/folder
	- $mv   *item_name*    *location*
- How to rename file/folder
	- $mv *previous_name* *new_name*
	- Easiest to do from within the folder where the 
- How to copy a file/folder
	- $cp     PATH_TO_ORIGINAL_FILE      PATH_TO_COPIED_FILE
	- example with relative path: cp   test.txt     test_copy.txt
	- To copy a folder/directory, must add recursive flag
	- $cp -r PATH_TO_ORIGINAL_FOLDER      PATH_TO_COPIED_FOLDER
- What is a flag?
	- An option passed to a command
	- To see more on flags that you can use with cp, use command $man cp
- How to remove file/folder?
	- $rm *file_name*
	- $rmdir *folder_name* 
	- Note that rmdir is for empty folders/directories
	- If a directory is not empty, would need to use flags to remove $rm -rf. Can learn more about flags for rm using $man rm