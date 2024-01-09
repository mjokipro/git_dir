
## Installing Libraries

- Python includes dozens of useful libraries
- There are over 270,000 additional available ones :)

### Using Pip

- To install a new package:
```terminal
$ pip3 install forex_python
# ... pip output here...

$ ipython
In [1]: from forex_python.converter import convert
In [2]: convert("USD", "GBP", 10)
7.6543
```

## Virtual Environments

- Normally, pip makes the installed library available everywhere

- This is convenient, but a little messy:
	-   you might not need it for every project
	-   you might want to more explicitly keep track of which libraries a project needs
	-   you might want a new version of a library for one project, but not another

- Python can help us by using a “virtual environment”
- **venv**: a copy of the entire version of python and all libraries at that point
	- **venv** is a purely python concept: whether or not you are in a venv has nothing to do with a database

### Creating a Virtual Environment

```terminal
$ cd my-project-directory
$ python3 -m venv venv

```

(“using venv module, make a folder, venv, with all the needed stuff”)

That makes the virtual environment folder — but you’re not _using it_ yet!

### Using Your Virtual Environment

```terminal
$ source venv/bin/activate
(venv) $   # <-- notice shell prompt!

```

-   You only need to *create* the virtual environment once
-   You need to *use source every time* you open a new terminal window

- What does it mean to be “using” a virtual environment?
	-   It makes certain python is the version of Python used to create the venv
	-   You have access to the standard library of Python
	-   You **don’t** have access to globally installed pip stuff
	-   You get to explicitly install what you want — and it will be only for here!

### Installing into Virtual Environment

-   Make sure you’re using your venv — do you see it in your prompt?
-   Use pip install, as usual
    -   But now it’s downloaded & installed into that venv folder
    -   It won’t be available/confuse global Python or other venvs — tidy!

### Tracking Required Libraries

- To see a list of installed libraries in a venv:
```terminal
$ pip3 freeze
# ... list of installed things...
```

- It’s helpful to save this info in a file (typically named “requirements.txt”):
```terminal
$ pip3 freeze > requirements.txt
```

### Using Virtual Environments

-   Virtual environments are large & full of stuff you didn’t write yourself
-   <u>You don’t want this to get into git / Github</u>
-   So, add `venv/` to your project’s .gitignore
    -   Use git status to make sure it’s being ignored

### Recreating a Virtual Environment

- When using a new Python project:
```terminal
$ git clone http://path-to-project
$ cd that-project
$ python3 -m venv venv
```

- Then, as usual when working with a venv:
```terminal
$ source venv/bin/activate
(venv) $ pip3 install -r requirements.txt
# ... pip output here ...
```

### Leaving Virtual Environments

- Use the deactivate shell command to leave the virtual environment:
```terminal
$ source venv/bin/activate
(venv) $ deactivate
$ # ... back to regular terminal ...
```
