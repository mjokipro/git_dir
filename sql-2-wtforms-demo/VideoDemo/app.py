from flask import Flask, request, render_template,  redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db,  connect_db, Department, Employee, get_directory, get_directory_join, get_directory_join_class, get_directory_all_join, Project, EmployeeProject
from forms import AddSnackForm, EmployeeForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///employees_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "chickenzarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def home_page():
    """Homepage"""
    
    return render_template('home.html')

@app.route('/phones')
def list_phones():
    """Render home page"""
    
    emps = Employee.query.all()
    
    return render_template("phones.html", emps=emps)

@app.route('/snacks/new', methods=['GET', 'POST'])
def add_snack():
    """Render add snack page"""
    
    form = AddSnackForm()
    
    # look raise
    
    if form.validate_on_submit():
        name = form.name.data
        price = form.price.data
        flash(f"Added { name } at { price }")
        return redirect("/")
    
    else:
        return render_template("add_snack.html", form=form)

@app.route('/employees/new', methods=['GET', 'POST'])
def new_employee_form_show():
    """Show form for new employee"""
    # Create new form model
    form = EmployeeForm()
    
    # for select list
    # depts = [(d.dept_code, d.dept_name) for d in Department.query.all()]
    depts = db.session.query(Department.dept_code, Department.dept_name)
    form.dept_code.choices = depts
    
    if form.validate_on_submit():
        name = form.name.data
        state = form.state.data
        dept = form.dept_code.data
    
        emp = Employee(name=name, state=state, dept_code=dept)
        db.session.add(emp)
        db.session.commit()
        
        return redirect('/phones')
    
    else:
        return render_template('add_employee_form.html', form=form)
    
@app.route('/employees/<int:id>/edit', methods=['GET', 'POST'])
def edit_employee(id):
    """Show employee edit form."""
    
    # Step 1: Get info to pull and load emp info into form
    emp = Employee.query.get_or_404(id)
    form = EmployeeForm(obj=emp)
    depts = db.session.query(Department.dept_code, Department.dept_name)
    form.dept_code.choices = depts
    
    # Step 2: Validate and Post to db
    if form.validate_on_submit():
        emp.name = form.name.data
        emp.state = form.state.data
        emp.dept_code = form.dept_code.data
    
        # emp = Employee(name=name, state=state, dept_code=dept)
        db.session.commit()
        
        return redirect('/phones')
    
    else:
        return render_template('edit_employee_form.html', form=form)
    

if __name__ == '__main__':
    app.run(debug=True)