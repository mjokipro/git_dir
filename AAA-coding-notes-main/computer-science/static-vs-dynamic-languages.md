## Static Languages
- Have true `variables`
- In Joel’s example, when a variable is changed in a static language, we’re tearing the value away from that place in memory and replacing the value with something else. 

## Dynamic Languages
- Examples: python, javascript
- Don’t truly have `variables` instead “variables” in these languages act as identifiers
- With Joel’s sticky note example, when a primative/immutable “variable” is reassigned, we are ripping that sticky note off of that item and sticking it on something else. When a mutable object is changed, that item itself is changing at that reference location (or the person in the sticky note example).

### Late binding
- `late binding` is a feature of python, refering to binding a variable to its value at the last possible moment. 
- An example of `late binding` occurs on lines 78-80 below (highlighted). 
	- In this example, when line 83 runs, python says:
		- Do you, SpecialWordFinder, have an `__init__` ? No? Does your parent have an `__init__`? Yes, let’s use that
	- But then, when line 86 runs, python says:
		- Do you, SpecialWordFinder, have a `.parse` method? Yes, let’s use that
```python nums {78-80}
import random

class WordFinder:
"""Machine for finding random words from dictionary.

>>> wf = WordFinder("simple.txt")
3 words read

>>> wf.random() in ["cat", "dog", "porcupine"]
True

>>> wf.random() in ["cat", "dog", "porcupine"]
True

>>> wf.random() in ["cat", "dog", "porcupine"]
True

"""
	def __init__(self, path):
	"""Read dictionary and reports # items read."""
	
		file = open(path)
		self.words = self.parse(file)
		
		print(f"{len(self.words)} words read")
	
	def __repr__(self):
	# rather than having this hard-code WordFinder (which would mean
	# we'd need to subclass this in children to make sure they report
	# the correct class name, we can ask the instance for the name
	# of it's class, like so:
	
		return f"<{self.__class__.__name__} len(words)={len(self.words)}>"
	
	def parse(self, file):
	"""Parse file -> list of words."""
	# `.strip()` removes all whitespace characters at the start
	# and end of a line. This will remove the "newline" (\n) character
	# that appear at the end of Unix text files, as well as the
	# "carriage-return-then-newline" (\r\n) characters that appear at the
	# end of DOS/Windows text files. It is always safer to use .strip
	# rather than just removing "\n", as that won't do the right things
	# on files created by Windows users.
	
		return [line.strip() for line in file]
	
	def random(self):
	"""Return random word."""
	
		return random.choice(self.words)

class SpecialWordFinder(WordFinder):
"""Specialized WordFinder that excludes blank lines/comments.

>>> swf = SpecialWordFinder("complex.txt")
3 words read

>>> swf.random() in ["pear", "carrot", "kale"]
True

>>> swf.random() in ["pear", "carrot", "kale"]
True

>>> swf.random() in ["pear", "carrot", "kale"]
True

"""
	
	def parse(self, file):
	"""Parse file -> list of words, skipping blanks/comments."""
	
	# We could use `.strip` here and not use super() --- but it's better
	# design to trust your parent class to know exactly what it should do,
	# rather than just doing the same thing here. So we'll get the
	# stripped words from the parent, then filter out the words we don't
	# want.
	
		return [word for word in super().parse(file)
		
		if word != "" and not word.startswith("#")]


swf = SpecialWordFinder("foods.txt")
# 3 words read

swf.parse("foods.txt")
# file with many words
```

foods.txt file:
```txt
# Veggies

kale
parsnips

# Fruits

apple
mango
```
