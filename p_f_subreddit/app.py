from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

@app.route("/welcome")
def home_page():
    html = """
    <html>
        <body>
        <h1>Welcome!</h1>
        </body>
    </html>
    """
    return html

@app.route("/welcome/home")
def welcome_home_page():
    html = """
    <html>
        <body>
        <h1>Welcome home!</h1>
        </body>
    </html>
    """
    return html

@app.route("/welcome/back")
def welcome_back_page():
    html = """
    <html>
        <body>
        <h1>Welcome back!</h1>
        </body>
    </html>
    """
    return 


app = Flask(__name__)

@app.route("/add")
def do_add():
    """Add a and b parameters."""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = add(a, b)

    return str(result)

@app.route("/sub")
def do_sub():
    """Subtract and b parameters."""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = sub(a, b)

    return str(result)

@app.route("/mult")
def do_mult():
    """Multiply a and b parameters."""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = mult(a, b)

    return str(result)

@app.route("/div")
def do_div():
    """Divide a and b parameters."""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = div(a, b)

    return str(result)

operators = {
        "add": add,
        "sub": sub,
        "mult": mult,
        "div": div,
        }

@app.route("/math/<oper>")
def do_math(oper):
    """Do math on a and b."""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = operators[oper](a, b)

    return str(result)

