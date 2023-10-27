"""Demo app using SQLAlchemy."""
from flask import Flask, request, redirect, render_template, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

db = SQLAlchemy()
db.app = app
db.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///movies_example'


app.config['SECRET_KEY'] = "SECRET!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

@app.route("/")
def home_page():
    """show homepage"""
    
    return render_template('home.html')

if __name__ == '__main__':
    app.run()