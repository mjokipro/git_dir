from flask import Flask, request, render_template,  redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db,  connect_db, Department, Employee

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///employees_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "chickenzarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def homepage():
    """homepage"""
    
    
    return redirect('/phones')

@app.route('/phones')
def list_phones():
    """Renders directory of employees and phone numbers  (from dept)"""
    # can only create single instances of dept because unique text constraint
    # d = Department(dept_code="bla", dept_name="bla", phone="bla")
    
    
    bob = Employee(name="tung")
    # db.session.add(bob)
    # db.session.commit()
    
    emps = Employee.query.get(1)  
 
    depart = Department.query.get('mkg')
    
    
    
    return render_template('phones.html', depart=depart, bob=bob, emps=emps)

if __name__ == '__main__':
    app.run(debug=True)