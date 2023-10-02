from flask import Flask
# from werkzeug.urls import url_encode


app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, Flask!"
