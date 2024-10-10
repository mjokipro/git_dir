## Message Flashing

- Often you want to provide feedback at “the next page user sees”
	- Only displayed for that temporary time at the next page, if page is refreshed, message disappears

This is most common when you will redirect
```python
from flask import flash

@app.get("/your/route")
def your_route():
  """Some route that redirects."""

  flash("Message for user!")
  return redirect("/somewhere/else")

```

template used by /somewhere/else using [[jinja]]: 
```Jinja
{% for msg in get_flashed_messages() %}
  <p>{{ msg }}</p>
{% endfor %}

```

