from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, User, Feedback
from forms import RegisterForm, LoginForm, DeleteForm, FeedbackForm
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import Unauthorized


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///feedback_exercise"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "abc123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

toolbar = DebugToolbarExtension(app)

connect_db(app)
db.create_all()


@app.route('/')
def redirect_to_users_register():
    """Redirect root."""
    
    return redirect('/users/register')

@app.route('/users/register', methods=['GET', 'POST'])
def add_user_register_form():
    """Show form for posting / adding new user."""
    
    if "username" in session:   
        return redirect(f"/users/{ session['username'] }")
    
    form = RegisterForm()
    
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        new_user = User.register(username, password, first_name, last_name, email)
        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username taken.  Please choose another')
            return render_template('users/register.html', form=form)
    
        session['username'] = new_user.username
        flash('Welcome! Successfully Created Your Account!', 'success')
        return redirect('/users/{ user.username }')
    else:  
        return render_template('users/register.html', form=form)

@app.route('/users/login', methods=['GET', 'POST'])
def show_user_login():
    """Show login screen and handle."""
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        
        user = User.authenticate(username, password)
        if user:
            session['username'] = user.username
            return redirect(f"/users/{ user.username }")
        else:
            form.username.errors = ["Invalid username/password."]
            return render_template("users/login.html", form=form)
    return render_template('users/login.html', form=form)

@app.route("/logout")
def logout():
    """Log current user out."""
    
    session.pop("username")
    return redirect("/users/login")

@app.route('/users/<username>')
def show_info_one_user(username):
    """Show info for a single username."""
    
    if "username" not in session or username != session['username']:
        raise Unauthorized()
    user = User.query.get(username)
    form = DeleteForm()
    
    return render_template('users/show.html', user=user, form=form)

@app.route('/users/<username>/delete', methods=["POST"])
def remove_user(username):
    """Remove user."""
    
    if "username" not in session or username != session['username']:
        raise Unauthorized()
        
    user = User.query.get(username)
    db.session.delete(user)
    db.session.commit()
    session.pop('username')
    
    return redirect("/users/login")

@app.route("/users/<username>/feedback/new", methods=["GET", "POST"])
def new_feedback(username):
    """Show feedback form."""
    
    if "username" not in session or username != session['username']:
        raise Unauthorized()
    
    form = FeedbackForm()
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        
        feedback = Feedback(
            title=title, 
            content=content,
            username=username,
        )
        db.session.add(feedback)
        db.session.commit()
        
        return redirect(f"/users/{ feedback.username }")
    
    return render_template("feedback/new.html", form=form)
    
@app.route("/users/<username>/feedback/update", methods=["GET", "POST"])
def update_feedback(feedback_id):
    """Show feedback form."""
    
    feedback = Feedback.query.get(feedback_id)
    
    if "username" not in session or feedback.username != session['username']:
        raise Unauthorized()
    
    form = FeedbackForm(obj=feedback)
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        
        db.session.commit()
        
        return redirect(f"/users/{ feedback.username }")
    
    return render_template("feedback/edit.html", form=form, feedback=feedback)

@app.route("/feedback/<feedback_id>/delete", methods=['POST'])
def delete_feedback(feedback_id):
    """Delete feedback."""
    
    feedback = Feedback.query.get(feedback_id)
    if "username" not in session or feedback.username != session['username']:
        raise Unauthorized()
    
    form = DeleteForm()
    if form.validate_on_submit():
        db.session.delete(feedback)
        db.session.commit()
        
    return redirect(f"users/{ feedback.username }")
    
    
    

if __name__ == '__main__':
    app.run(debug=True)