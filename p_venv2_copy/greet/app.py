from flask import Flask

app = Flask(__name__)

@app.route("/welcome")
def home_page():
    html = """
    <html>
        <body>
        <h1>Hello!</h1>
        <p>This is my simple app</p>
        <a href='/hello'>Go to hello page</a>
        </body>
    </html>
    """
    return html