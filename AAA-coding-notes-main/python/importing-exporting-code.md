
## Importing

- Python includes a “standard library” of dozens of useful modules.
- These are not in the namespace of your script automatically.
	- In JS, with script files, everything goes into the same namespace - this doesn’t work for python because there isn’t a ‘index.html’ pulling everything together.
- You have to _import_ them manually - opting in for that functionality
	- Python is modular like this because it was built for bigger things

choice(seq) is a useful function: given a sequence, it returns a random item
```python
from random import choice

print("Let's play", choice(games))
```

“From random, pull in choice function as choice”
```python
from random import choice, randint     # can pull in several things from a place

```
“From random, pull in choice as ‘pick_a_thing’ ”
```python
from random import choice as pick_a_thing    # or can change the local name of it

pick_a_thing(games)

```
Sometimes, it may be helpful to pull in the _library itself_:
```python
import random. # now, we have the obj `random`, with all the funcs/classes within available to us

random.choice(games)  # Note that now need to use . to pull out those fx/classes, and don't have a 
#                       list to reference everything that is being imported
```

### Exporting/Importing Your Code

score.py
```python
def get_high_score():
    ...

def save_high_score():
    ...
```
(unlike JS, nothing needed to “export” - comes into play with backend JS)

game.py
```python
from score import get_high_score     # Note when importing another file - the .py is dropped

high = get_high_score()
```
