## Takeaways


### Write Mode
- & *Opening* a file in write mode overwrites whatever was in the file originally: “w”
	- even if you don’t call `.write` to write anything new in the file.
- Once opened in write mode, calls to `.write` will append to the file sequentially
- Adding line breaks requires manually adding `\n`

### Append Mode
- If you want to add something to a pre-existing file, must open in append mode: “a”
- Still need to add `\n` manually for a new line (before and/or after your new item)

### Read Mode
- If you just want to read a file, open it in read mode: “r”

## Follow-up Post:
Hey all! Thanks for your patience earlier when the file reading/writing demo  
went a bit haywire. Here’s some info to hopefully clarify the confusion I introduced!Open a file in write mode:

```
file = open("myfile", "w")
```

This will **_overwrite_** whatever was in the file originally. You can have as many  
calls to `.write()` as you want before closing the file, and each will write to  
the file one after the other, but **_opening_** the file in write mode will overwrite whatever was there before.If you want there to be line breaks, you must add `\n` yourself. It is generally  
a good idea to put these at the **_end_** of each line, though that means there will  
be an empty line at the end of your file:

```
file = open("myfile", "w")

file.write("This is a line\n")
file.write("This is the second line\n")
file.write("This is the third line\n")

file.close()
```

If you want to add something to a pre-existing file, you must open it in append mode:

```
file = open("myfile.txt", "a")
```

BUT you still need to add `/n` yourself if you want what you are appending to be  
on a new line:

```
file = open("myfile.txt", "a")

file.append("\n This will be appended to a new line")
```

Shout out to Edmond for realizing what went wrong with append mode in my demo  
earlier:I had a file with 1 line written in it.I opened it in write mode with the intention of writing something new.Then I just closed the file without writing anything. However, since I had  
opened it in write mode, the file was overwritten with nothing:

```
file = open("myfile", "w")
file.close()
```

When I then opened the file in append mode and wrote a line, it DID append the  
new text. But it appended it to an empty file, so when I looked at the file  
again in VSCode, it seemed like it had overwritten it.To recreate this yourself, do the following:

```
file = open("myfile", "w")

file.write("This is a line")

file.close()

# look at the file in vscode

file = open("myfile", "w")

file.close()

# we did NOT look at the file in VScode in the demo here -- if we had,
# we would have seen that it was empty

file.open("myfile", "a")

file.append("This text is appended")

file.close()

# look at the file again -- now it should just be the text "This text is appended"
```

If you have any questions about file reading and writing, please bring them up  
in check-in tomorrow morning! Thanks again everyone.

## Files (Original Lecture Notes)

You can open an on-disk file with `open(filepath, mode)`
-   filepath: absolute or relative path to file
-   mode: string of how to open file (eg, `"r"` for reading or `"w"` for writing)

This returns an file-type instance.

### Reading

Line-by-line:

```
file = open("/my/file.txt")

for line in file:
    print("line =", line)

file.close()

```

All at once:

```
file = open("/my/file.txt")

text = file.read()

file.close()

```

### Writing

```
file = open("/my/file.txt", "w")

file.write("This is a new line.")
file.write("So is this.")

file.close()

```

Note

_with_ blocks

Python has an intermediate bit of syntax called a _with block_.

For example:

```
with open("/my/file.txt", "r") as file:
    for line in file:
        print("line=", line)

    # our file is still open here

# but it will be automagically closed here

```

Python will keep that file open as long as you’re inside the with block. At the point the your code is no longer indented inside that block, it will automatically close the file you’ve used.

These with-blocks are used for other kinds of resources besides files; to learn more about them, you can search for _python context managers_.