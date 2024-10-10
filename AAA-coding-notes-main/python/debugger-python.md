## Python Debugger

- Python includes a built-in debugger, **pdb**

To add a breakpoint to your code:
```python
def my_function():
    ...
    breakpoint()
    ...
```

- This is like debugger in JavaScript.
- When you hit that, Python will stop so you can debug this.
- !! DO NOT CHANGE YOUR CODE WHILE THE DEBUGGER IS RUNNING

**Don’t forget the parentheses!**

### Debugger Basics
| Key | Command                            |
| --- | ---------------------------------- |
| ?   | Get help                           |
| l   | List code where I am               |
| p   | Print this expression              |
| pp  | Pretty print this expression       |
| n   | Go to next line (step over)        |
| s   | Step into function call            |
| c   | Continue to next breakpoint or end |
| w   | Print “frame” (where am I?)        |
| q   | quit                               |






