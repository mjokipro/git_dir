## Intro

### OO Review

- **class**
	- blueprint for new objects, defines attributes & methods
- **method**
	- function defined on class, can see/change attributes on instance
- **class method** _(“static method”_ in JS)
	- function defined on class, called on class, not individual instance

## OO Terminology Deep Dive

- Why do we use Object Orientation?
	- To help organize our code!
- Often makes it easier to manage complex software requirements

### Abstraction

-  OO can offer **abstraction**  
	- *to hide implementation details when not needed*
-  Not everyone should have to understand everything
	-  Don’t need to be a doorknob engineer to use a doorknob

### Encapsulation

- OO can offer **encapsulation**  
	- *to group functionality into logical pieces*
-   To get in a “capsule”
    -   Everything related to cat data/functionality lives in Cat
- *Data* with *Functionality*

### Inheritance

- OO can offer **inheritance**  
	- *ability to call methods/get properties defined on ancestors*
-   One class subclasses another, inheriting properties and methods
    -   A ColoredTriangle is a kind of Triangle; it should have sides a and b,  
        and can use Triangle methods for getting the area and hypotenuse
    -   These are _inherited_; we only need to define what is different about ColoredTriangle

### Polymorphism

- OO can offer **polymorphism** (“many shapes”)
	- *making classes interchangeable when similar*
-   The ability to make similar things work similarly
    -   We could have other kinds of animals with same API
    -   eg, dogs and cats could both have a speak() method, even though it works differently _(“Meow” vs “Woof”)_
        - All are basically doing the same thing, just returning a different noise.
- *Name things that do similar things the same.* Keeps this consistent and makes them interchangeable. 

- !! Meh… Instead of this:
```python
class Dog {
  bark() { return "woof!" }
}

class Cat {
  meow() { return "meow!" }
}

class Snake {
  hiss() { return "Sssssss...." }
}

// make all animals make noise
for (const pet of pets) {
  if (pet instanceof Dog) pet.bark();
  if (pet instanceof Cat) pet.meow();
  if (pet instanceof Snake) pet.hiss();
}
```
- For the above, if you were to add “Bird” now need to update this for loop, as well as the corresponding method. But instead, if these were all named the same, would have fewer things to update.

- $ Do this:      Yay, polymorphism!
```python
class Dog {
  speak() { return "woof!" }
}

class Cat {
  speak() { return "meow!" }
}

class Snake {
  speak() { return "Sssssss...." }
}

// make all animals make noise --- MUCH BETTER
for (const pet of pets) {
  pet.speak();
}
```

## Instances

- Like in JS, you make an instance by calling the class:
```python
from collections import Counter   # Python's built in freq counter 

# make instance of a counter
counts = Counter("hello world")

type(counts)    # 'collections.Counter'

isinstance(counts, Counter)    # True
```

- `type()`  is diffferent from ‘typeof’ in JS - In python, returns the *actual class* this instance was created from - does *not* support multilevel inheritance
- `isinstance()` is like ‘instanceof’ in JS - In python, also *supports* multilevel inheritance.

- Get/set attributes or find methods with `.` (like JS):
```python
# get most common letter
counts.most_common(1)
```

- JavaScript:
	-   get/set attribute of object: `o.name` _or_ `o['name']`
	-   call method: `o.method()` _or_ `o['method']()`
- Python:
	-   get/set attribute of object: `o.name`
	-   call method: `o.method()`
	-   retrieve value from dictionary using brackets: `o['my-key']`

### What Can I Do With This Object?

- `help(obj)`
	- Show help about object and methods
- `dir(obj)`
	- List methods/attributes of object

## Classes

- Making classes is similar to JS:
```python
class Triangle:
    """Right triangle."""

    def __init__(self, a, b):
        """"Create triangle from a and b sides."""
        self.a = a
        self.b = b

    def get_hypotenuse(self):
        """Get hypotenuse (length of 3rd side)."""
        return math.sqrt(self.a ** 2 + self.b ** 2)

    def get_area(self):
        """Get area of triangle."""
        return (self.a * self.b) / 2

    def describe(self):
        """Return description of area."""
        return f"My area is {self.get_area()}"

```

### Self

- *self* in python is similar to *this* in JS
	-   this is a bit magical: it automatically gets created
	-   self is explicit: you must list it as the first argument of methods
	    -   Otherwise self is just a normal variable

## Inheritance

Like in JS, classes can subclass other objects:

```
class ColoredTriangle(Triangle):
    """Triangle that has a color."""

    def __init__(self, a, b, color):
        # get parent class [`super()`], call its `__init__()`
        super().__init__(a, b)

        self.color = color

    def describe(self):
        """Return description of area and color."""
        return super().describe() + f" I am {self.color}"

```

### Super

Like in JS, super finds parent class:

-   JS: `super` is parent, `super(...)` calls parent constructor function
-   Python: `super()` is parent, `super().__init__(...)` is parent initializer.

### Multi-Level Inheritance

Like in JS, you can have multiple levels of inheritance

A hierarchy of geometric shapes[»](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/python-oo/handout/index.html?AWSAccessKeyId=AKIA6I7NF475LYNA7YJL&Signature=DkdszlKSQHynszZhnI2lPStuoiY%3D&Expires=1678242186#id4 "Permalink to this image")

## Documenting Classes

As always, good style to have comment explaining purpose of class & methods:

```
class Triangle:
    """Right triangle."""

    def __init__(self, a, b):
        """Create triangle from a and b sides."""
        self.a = a
        self.b = b

    def get_hypotenuse(self):
        """Get hypotenuse (length of 3rd side)."""
        return math.sqrt(self.a ** 2 + self.b ** 2)

    def get_area(self):
        """Get area of triangle."""
        return (self.a * self.b) / 2

```

### Documenting Instance

When you print an instance/examine in Python shell, often not helpful:

```
>>> tri = Triangle(3, 4)

>>> tri
<__main__.Triangle object at 0x1012a6358>

```

Would be nicer to see values for a and b

We can do this by making a \_\_repr\_\_ _(representation)_ method:

```
class Triangle:
    """Right triangle."""

    def __init__(self, a, b):
        """Create triangle from a and b sides."""
        self.a = a
        self.b = b

    def __repr__(self):
        return f"<Triangle a={self.a} b={self.b}>"

    def get_hypotenuse(self):
        """Get hypotenuse (length of 3rd side)."""
        return math.sqrt(self.a ** 2 + self.b ** 2)

    def get_area(self):
        """Get area of triangle."""
        return (self.a * self.b) / 2

```

```
>>> tri = Triangle(3, 4)

>>> tri
<Triangle a=3 b=4>

```