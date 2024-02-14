import os

from flask import Flask, render_template, request, flash, redirect, session, g, abort
from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy.exc import IntegrityError
import requests
from forms import UserAddForm, UserEditForm, LoginForm, MessageForm, AddDepartmentForm, ProjectForm, MessageForm2, ScriptureForm
from models import db, connect_db, User, Message, Department, Project, Employee

CURR_USER_KEY = "curr_user"

app = Flask(__name__)

# Get DB_URI from environ variable (useful for production/testing) or,
# if not set there, use development local db.
app.config['SQLALCHEMY_DATABASE_URI'] = (
    os.environ.get('DATABASE_URL', 'postgres://gzgrixhy:5btnHTrIYkOQ_aW9a21G3LS_8dmkyHDc@bubble.db.elephantsql.com/gzgrixhy'))

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', "it's a secret")
toolbar = DebugToolbarExtension(app)

connect_db(app)

# db.create_all()

##############################################################################
# User signup/login/logout


@app.before_request
def add_user_to_g():
    """If we're logged in, add curr user to Flask global."""

    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])

    else:
        g.user = None


def do_login(user):
    """Log in user."""

    session[CURR_USER_KEY] = user.id


def do_logout():
    """Logout user."""

    if CURR_USER_KEY in session:
        del session[CURR_USER_KEY]


@app.route('/signup', methods=["GET", "POST"])
def signup():
    """Handle user signup.

    Create new user and add to DB. Redirect to home page.

    If form not valid, present form.

    If the there already is a user with that username: flash message
    and re-present form.
    """
    if CURR_USER_KEY in session:
        del session[CURR_USER_KEY]
    form = UserAddForm()

    if form.validate_on_submit():
        try:
            user = User.signup(
                username=form.username.data,
                password=form.password.data,
                email=form.email.data,
                image_url=form.image_url.data or User.image_url.default.arg,
            )
            db.session.commit()

        except IntegrityError as e:
            flash("Username already taken", 'danger')
            return render_template('users/signup.html', form=form)

        do_login(user)

        return redirect("/")

    else:
        return render_template('users/signup.html', form=form)


@app.route('/login', methods=["GET", "POST"])
def login():
    """Handle user login."""

    form = LoginForm()

    if form.validate_on_submit():
        user = User.authenticate(form.username.data,
                                 form.password.data)

        if user:
            do_login(user)
            flash(f"Hello, {user.username}!", "success")
            return redirect("/")

        flash("Invalid credentials.", 'danger')

    return render_template('users/login.html', form=form)


@app.route('/logout')
def logout():
    """Handle logout of user."""

    do_logout()

    flash("You have successfully logged out.", 'success')
    return redirect("/login")


##############################################################################
# General user routes:

@app.route('/users')
def list_users():
    """Page with listing of users.

    Can take a 'q' param in querystring to search by that username.
    """

    search = request.args.get('q')

    if not search:
        users = User.query.all()
    else:
        users = User.query.filter(User.username.like(f"%{search}%")).all()

    return render_template('users/index.html', users=users)


@app.route('/users/<int:user_id>')
def users_show(user_id):
    """Show user profile."""

    user = User.query.get_or_404(user_id)
    # snagging messages in order from the database;
    # user.messages won't be in order by default
    messages = (Message
                .query
                .filter(Message.user_id == user_id)
                .order_by(Message.timestamp.desc())
                .limit(100)
                .all())
    
    return render_template('users/show.html', user=user, messages=messages)

@app.route('/messages/<int:message_id>/like', methods=['POST'])
def add_like(message_id):
    """Toggle a liked message for the currently-logged-in user."""

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")

    liked_message = Message.query.get_or_404(message_id)
    if liked_message.user_id == g.user.id:
        return abort(403)

    user_likes = g.user.likes

    if liked_message in user_likes:
        g.user.likes = [like for like in user_likes if like != liked_message]
    else:
        g.user.likes.append(liked_message)

    db.session.commit()

    return redirect("/")


@app.route('/users/profile', methods=["GET", "POST"])
def edit_profile():
    """Update profile for current user."""

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")

    user = g.user
    form = UserEditForm(obj=user)

    if form.validate_on_submit():
        if User.authenticate(user.username, form.password.data):
            user.username = form.username.data
            user.email = form.email.data
            user.image_url = form.image_url.data or "/static/images/default-pic.png"
            user.header_image_url = form.header_image_url.data or "/static/images/warbler-hero.jpg"
            user.bio = form.bio.data

            db.session.commit()
            return redirect(f"/users/{user.id}")

        flash("Wrong password, please try again.", 'danger')

    return render_template('users/edit.html', form=form, user_id=user.id)


@app.route('/users/delete', methods=["POST"])
def delete_user():
    """Delete user."""

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")

    do_logout()

    db.session.delete(g.user)
    db.session.commit()

    return redirect("/signup")


##############################################################################
# Departmentalities routes:

@app.route('/departments')
def list_departments():
    """Page with listing of departments.

    Can take a 'q' param in querystring to search by that username.
    """

    search = request.args.get('q')

    if not search:
        depts = Department.query.all()
    else:
        depts = Department.query.filter(Department.dept_name.like(f"%{search}%")).all()

    return render_template('departments/index.html', depts=depts)

@app.route('/departments/new', methods=["GET", "POST"])
def departments_add():
    """Add a department:

    Show form if GET. If valid, update message and redirect to user page.
    """

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")

    form = AddDepartmentForm()

    if form.validate_on_submit():
        
        
        dept = Department(dept_code=form.dept_code.data, dept_name=form.dept_name.data, phone=form.phone.data)
        db.session.add(dept)
        db.session.commit()

        return redirect(f"/departments")

    return render_template('departments/new.html', form=form)

@app.route('/departments/<dept_code>', methods=["GET", "POST"])
def departments_detail(dept_code):
    """Add a department:

    Show form if GET. If valid, update message and redirect to user page.
    """

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")
    
    dept = Department.query.get_or_404(dept_code)
    

    form = AddDepartmentForm()

    if form.validate_on_submit():
        
        dept_code = form.dept_code.data
        dept.dept_name = form.dept_name.data
        dept.phone = form.phone.data
        
        
        dept = Department(dept_code=dept.dept_code, dept_name=dept.dept_name, phone=dept.phone)
        # db.session.add(dept)
        db.session.commit()

        return redirect(f"/departments")

    return render_template('departments/show.html', dept=dept, form=form)

@app.route('/departments/<dept_code>/delete', methods=["POST"])
def delete_department(dept_code):
    """Delete user."""

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")

    dept = Department.query.get_or_404(dept_code)

    db.session.delete(dept)
    db.session.commit()

    return redirect("/departments")

##############################################################################
# Projects routes:

@app.route('/projects')
def list_projects():
    """Page with listing of projects.

    Can take a 'q' param in querystring to search by that username.
    """

    search = request.args.get('q')

    if not search:
        projs = Project.query.all()
    else:
        projs = Project.query.filter(Project.proj_name.like(f"%{search}%")).all()

    return render_template('projects/index.html', projs=projs)

@app.route('/projects/new', methods=["GET", "POST"])
def projects_add():
    """Add a project:

    Show form if GET. If valid, update message and redirect to user page.
    """

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")

    form = ProjectForm()

    if form.validate_on_submit():
        proj = Project(proj_code=form.proj_code.data, proj_name=form.proj_name.data)
        db.session.add(proj)
        db.session.commit()

        return redirect(f"/projects")

    return render_template('projects/new.html', form=form)

@app.route('/projects/<proj_code>', methods=["GET", "POST"])
def projects_detail(proj_code):
    """Add a department:

    Show form if GET. If valid, update message and redirect to user page.
    """

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")
    
    proj = Project.query.get_or_404(proj_code)

    form = ProjectForm()

    if form.validate_on_submit():
        
        proj.proj_code = form.proj_code.data
        proj.proj_name = form.proj_name.data
        
        proj = Project(proj_code=proj.proj_code, proj_name=proj.proj_name)

        # proj = Project(proj_code=proj.proj_code, proj_name=proj.proj_name)
        # db.session.add(dept)
        db.session.commit()

        return redirect(f"/projects")

    return render_template('projects/show.html', proj=proj, form=form)

##############################################################################
# Employees routes:

@app.route('/employees')
def list_employees():
    """Page with listing of employees.

    Can take a 'q' param in querystring to search by that username.
    """

    search = request.args.get('q')

    if not search:
        emps = Employee.query.all()
    else:
        emps = Employee.query.filter(Employee.proj_name.like(f"%{search}%")).all()

    return render_template('employees/index.html', emps=emps)

@app.route('/employees/new', methods=["GET", "POST"])
def employees_add():
    """Add an employee:

    Show form if GET. If valid, update message and redirect to user page.
    """

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")

    form = MessageForm2()

    if form.validate_on_submit():
        emp = Employee(name=form.name.data, state=form.state.data, dept_code=form.dept_code.data)
        db.session.add(emp)
        db.session.commit()

        return redirect(f"/employees")

    return render_template('employees/new.html', form=form)

@app.route('/employees/<int:id>', methods=["GET", "POST"])
def employees_detail(id):
    """Add a department:

    Show form if GET. If valid, update message and redirect to user page.
    """

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")
    
    emp = Employee.query.get_or_404(id)
    depts = Department.query.all()

    form = MessageForm2()

    if form.validate_on_submit():
        
        emp.name = form.name.data
        emp.state = form.state.data
        emp.dept_code = form.dept_code.data
        
        emp = Employee(name=emp.name, state=emp.state, dept_code=emp.dept_code)

        # proj = Project(proj_code=proj.proj_code, proj_name=proj.proj_name)
        # db.session.add(dept)
        db.session.commit()

        return redirect(f"/employees")

    return render_template('employees/show.html', form=form)

##############################################################################
# scriptures routes:

@app.route('/scriptures')
def list_scriptures():
    """Page with listing of scriptures.
    """
    
    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")
    BIBLE_BASE_URL="https://bible-api.com/romans 8"
         
    response = requests.get(BIBLE_BASE_URL)
    app.logger.info("#################################")
    app.logger.info("Response", response)
    scriptures = response.json()['verses']
    app.logger.info("scriptures", scriptures)
    app.logger.info("#################################")
  

    form = ScriptureForm()

    if form.validate_on_submit():
        book_id = form.bood_id.data
        chapter = form.chapter.data
        db.session.commit()

        return redirect(f"/scriptures")    
    
    return render_template('scriptures/index.html', scriptures=scriptures)


##############################################################################
# Messages routes:

@app.route('/messages/new', methods=["GET", "POST"])
def messages_add():
    """Add a message:

    Show form if GET. If valid, update message and redirect to user page.
    """

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")

    form = MessageForm()

    if form.validate_on_submit():
        msg = Message(text=form.text.data)
        g.user.messages.append(msg)
        db.session.commit()

        return redirect(f"/users/{g.user.id}")

    return render_template('messages/new.html', form=form)


@app.route('/messages/<int:message_id>', methods=["GET"])
def messages_show(message_id):
    """Show a message."""

    msg = Message.query.get_or_404(message_id)
    return render_template('messages/show.html', message=msg)


@app.route('/messages/<int:message_id>/delete', methods=["POST"])
def messages_destroy(message_id):
    """Delete a message."""

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")

    msg = Message.query.get_or_404(message_id)
    if msg.user_id != g.user.id:
        flash("Access unauthorized.", "danger")
        return redirect("/")

    db.session.delete(msg)
    db.session.commit()

    return redirect(f"/users/{g.user.id}")


##############################################################################
# Homepage and error pages


@app.route('/')
def homepage():
    """Show homepage:

    - anon users: no messages
    - logged in: 100 most recent messages of followed_users
    """

    if g.user:
        following_ids = [g.user.id]

        messages = (Message
                    .query
                    
                    .order_by(Message.timestamp.desc())
                    .limit(100)
                    .all())

       

        return render_template('home.html', messages=messages)

    else:
        return render_template('home-anon.html')


@app.errorhandler(404)
def page_not_found(e):
    """404 NOT FOUND page."""

    return render_template('404.html'), 404


##############################################################################
# Turn off all caching in Flask
#   (useful for dev; in production, this kind of stuff is typically
#   handled elsewhere)
#
# https://stackoverflow.com/questions/34066804/disabling-caching-in-flask

@app.after_request
def add_header(req):
    """Add non-caching headers on every request."""

    req.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    req.headers["Pragma"] = "no-cache"
    req.headers["Expires"] = "0"
    req.headers['Cache-Control'] = 'public, max-age=0'
    return req

if __name__ == '__main__':
    app.run(debug=True)