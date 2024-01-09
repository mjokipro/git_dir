## Returning JSON

JSON is just a string — so you don’t _need_ to do anything special

```python
@app.get("/some/route")
def some_route():
    """Route that returns JSON."""

    return '{"name": "Whiskey", "cute": "hella"}'

```

BUT Two considerations:
-   It’s finicky to hand-write JSON and get it right
-   It’s sometimes helpful to send header to browser that “this is JSON”
    -   Some AJAX libraries are better than others in guessing in absence of this
- & flask has a function **jsonify** that add this header and converts to JSON automatically

demo/app.py
```python
@app.get("/example-json")
def example_json_route():
    """Return some JSON."""

    info = {"name": "Whiskey", "cute": "Hella"}
    return jsonify(info)

    # Alternate syntax
    # return jsonify(name="Whiskey", cute="Hella")
```
