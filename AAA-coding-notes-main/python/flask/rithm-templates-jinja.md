## Goals

-   Explain what HTML templates are, and why they are useful
-   Use Jinja to create HTML templates for our Flask applications
-   Debug Flask applications more easily by installing _Flask Debug Toolbar_
-   Serve static files (CSS, JS, etc) with Flask

## Review

### Views

Views are functions that return a **string** (a string of HTML)

### Routes

Routes define the URL that will run a view function.

They are declared by using _decorators_.

A route and view function:

```
@app.get('/simple')
def show_simple_form():
    """Show greeting form."""

    return """
    <!DOCTYPE html>
    <html>
        <head>
        <title>Hi There!</title>
        </head>
        <body>
        <h1>Hi There!</h1>
        <form action="/greet">
            What's your name? <input name="person">
            <button>Go!</button>
        </form>
        </body>
    </html>
    """

```

This is kind of messy to read through (and we don’t get nice things like color-highlighting in editors). Much better to keep HTML in a separate file.

## Templates

### How Can Templates Help?

-   Keep HTML in an HTML file
-   Allows HTML to have dynamic parts
    -   Can use variables passed from your views
    -   For loops, if/else statements
-   Can inherit from other templates to minimize repetition

### Jinja

- **Jinja** is a popular template system for Python, used by Flask.
- There are many template systems for Python. Jinja is a particularly popular one. Django has its own template system, which served as an inspiration for Jinja.

### Templates Directory

Your templates directory lives under your project directory. Flask knows to look for them there.
```
my-project-directory/
  venv/
  app.py
  templates/
    hello.html

```

### Our Template

demo/templates/hello.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <title>This is the hello page</title>
</head>
<body>
  <h1>HELLO!</h1>
</body>
</html>

```

You **can’t** view this yet at [http://localhost:5000/hello.html](http://localhost:5000/hello.html)

hello.html is the template filename — **we still have to have a route**.

### Rendering a Template

```
@app.get('/')
def index():
    """Return homepage."""

    html = render_template("hello.html")
    print("html is: ", html)

    return html

```

Will find hello.html in templates/ automatically.

## Dynamic Templates

```
const luckyNum = 12;
`Lucky num is ${luckyNum}`; // Lucky num is 12

```

Jinja will replace `{{ lucky_num }}` with value of lucky\_num passed when rendering:

templates/lucky.html

```
<h1>Hi!</h1>

<p>Lucky number: {{ lucky_num }}</p>

```

app.py

```
@app.get("/lucky")
def show_lucky_num():
    "Show lucky number."

    num = randint(1, 100)

    return render_template(
        "lucky.html",
        lucky_num=num)

```

## Example: Greeting

Let’s make a form that gathers a user’s name.

On form submission, it should use that name & compliment the user.

### Our Form

demo/templates/form.html
```
<!DOCTYPE html>
<html lang="en">
<body>
  <h1>Hi There!</h1>
  <form action="/greet">
    <p>What's your name?  <input name="person"></p>
    <button>Go!</button>
  </form>
</body>
</html>

```

### Our Template

demo/templates/compliment.html
```
<!DOCTYPE html>
<html lang="en">
<body>
  <p>Hi {{ name }}! You're so {{ compliment }}!</p>
</body>
</html>

```

### Our Route

```
@app.get('/greet')
def offer_greeting():
    """Give player compliment."""

    player = request.args["person"]
    nice_thing = choice(COMPLIMENTS)

    return render_template(
        "compliment.html",
        name=player,
        compliment=nice_thing)

```

## Example 2: Better Greeting!

Let’s improve this:
-   We’ll ask the user if they want compliments & only show if so
-   We’ll show a list of _3_ random compliments, like this:
    ```
    You're so:
    <ul>
      <li>clever</li>
      <li>tenacious</li>
      <li>smart</li>
    </ul>
    
    ```
    

### Our Form

demo/templates/form-2.html
```
<!DOCTYPE html>
<html lang="en">
<body>
  <h1>Better Hi There!</h1>
  <form action="/greet-2">
    <p>What's your name? <input name="person"></p>
    <p>Want compliments?
      <input type="checkbox" name="wants_compliments">
    </p>  
    <button>Go!</button>
  </form>
</body>
</html>

```

### Our Route

```
@app.get('/greet-2')
def offer_better_greeting():
    """Give player optional compliments."""

    player = request.args["person"]

    # if they didn't tick box, `wants_compliments` won't be
    # in query args -- so let's use safe `.get()` method of
    # dict-like things
    wants = request.args.get("wants_compliments")

    nice_things = sample(COMPLIMENTS, 3) if wants else []

    return render_template(
        "compliments.html",
        compliments=nice_things,
        name=player)

```

### Conditionals in Jinja

```
compliments = ["c1", "c2", "c3"]
# or
compliments = []
```

`{% if CONDITION_EXPR %} ... {% endif %}`

```
{% if compliments %}
  You're so:
  ...
{% endif %}
```

### Loops in Jinja

```
compliments = ["c1", "c2", "c3"]
```

`{% for VAR in ITERABLE %} ... {% endfor %}`

```
<ul>
  {% for compliment in compliments %}
    <li>{{ compliment }}</li>
  {% endfor %}
</ul>
```

### Our Template

demo/templates/compliments.html
```
<!DOCTYPE html>
<html lang="en">
<body>
<h1>Hi {{ name }}!</h1>
{% if compliments %}
  <p>You're so:</p>
  <ul>
    {% for compliment in compliments %}
      <li>{{ compliment }}</li>
    {% endfor %}
  </ul>
{% endif %}
</body>
</html>

```

## Template Inheritance

### Motivation

- Different pages on the same site often have the same headers, footers, and overall page structure.

### Repetition is Boring

Your templates have many things in common
```
<!DOCTYPE html>
<html>
<head>
  <title> TITLE GOES HERE </title>
  <link rel="stylesheet" href="/static/css/styles.css">
  <script src="http://unpkg.com/jquery"></script>
</head>
<body>
  <header>Fluffy Co</header>
  BODY CONTENT GOES HERE
  <footer>Copyright by Whiskey.</footer>
</body>
</html>

```

-   Make a `base.html` that will hold all the repetitive stuff
-   “Extend” that base template in your other pages
-   Substitute blocks in your extended pages

If you want the same stylesheet everywhere, you have to remember to include it in every template. If you forget in one template, that page won’t have your custom css that you spent so much time getting right. The same goes for scripts. If you want jquery everywhere, do you really want to have to remember to include it in the head in every template.

### Sample Base Template

`{% block BLOCKNAME %} ... {% endblock %}`

templates/base.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <title>{% block title %}TITLE GOES HERE{% endblock %}</title>
  <link rel="stylesheet" href="/static/css/styles.css">
  <script src="http://unpkg.com/jquery"></script>
</head>
<body>
  <header>Fluffy Co</header>
  {% block content %}BODY CONTENT GOES HERE{% endblock %}
  <footer>Copyright by Whiskey.</footer>
</body>
</html>

```

### Page Using Template

`{% block BLOCKNAME %} ... {% endblock %}`

templates/my-page.html
```
{% extends 'base.html' %}

{% block title %}My awesome page title{% endblock %}

{% block content %}

  <h2>I'm a header!</h2>
  <p>I'm a paragraph!</p>

{% endblock %}

```

## Where Other Project Files Go

### Do I Need Routes for CSS (or JS, etc)?

```
@app.get("my-css.css")
def my_css():
    return """
       b { color: red }
       ...
     """

```

No! That would be tedious — plus, everyone gets the _same_ CSS

### Static Files: CSS and JS

In static/ directory:

```
my-project-directory/
  venv/
  app.py
  templates/
    hello.html
  static/
    my-css.css
    my-script.js
    image.gif

```

Find files like:

```
<link rel="stylesheet" href="/static/my-css.css">

```

The static directory is where you put files that don’t change, unlike templates, which are parsed. The static directory can be divided in to the types of files that it contains: js for javascript, css for css files, img for images, etc., but that isn’t necessary.