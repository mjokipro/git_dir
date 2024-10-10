from flask import Flask, render_template, redirect, session
from flask_debugtoolbar import DebugToolbarExtension
from models import Employee, Department, db, connect_db, phone_dir_nav

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///employees_db'
app.config['SQLALCHEMY_ECHO'] = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "abc123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
toolbar = DebugToolbarExtension(app)

connect_db(app)

@app.route("/")
def homepage():
    return redirect("/phones")

@app.route("/phones")
def phone_list():
    """Get list of users & dept phones.

    This version will be a 'n+1 query' --- it will query once for all
    users, and then for each department.

    There's a way to tell SQLAlchemy to load all the data in a single query,
    but don't worry about this for now.
    """

    
    
    emps = Employee.query.all()
    
    
    return render_template("phones.html", emps=emps)


if __name__ == '__main__':
    app.run(debug=True)