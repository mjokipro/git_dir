from flask import Flask, request, render_template, redirect
from random import choice, sample

from flask_debugtoolbar import DebugToolbarExtension


COMPLIMENTS = ["cool", "clever", "tenacious", "awesome", "Pythonic"]

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

###################################
# /


@app.route('/')
def index():
    """Return homepage."""

    return render_template("hello.html")

###################
# old-home-page


@app.route('/old-home-page')
def redirect_home():
    """redirects to new home page"""
    return redirect("/form-2")

#######################


MOVIES = ['amadaus', 'garfield', 'bla']

#####
# movies


@app.route('/movies')
def show_all_movies():
    """show list all movies"""
    return render_template('movies.html', movies=MOVIES)

######
# movies/new - post


@app.route('/movies/new', methods=["POST"])
def add_movie():
    title = request.form['title']

    # Add to pretend db
    MOVIES.append(title)

    return render_template('movies.html', movies=MOVIES)

# SIMPLE VERSION OF FORM/GREET


@app.route('/form')
def show_form():
    """Show greeting form."""

    return render_template("form.html")


@app.route('/greet')
def offer_greeting():
    """Give player compliment."""

    player = request.args["person"]
    nice_thing = choice(COMPLIMENTS)

    return render_template("compliment.html",
                           name=player,
                           compliment=nice_thing)


# BETTER VERSION OF FORM/GREET

@app.route('/form-2')
def show_better_form():
    """Show better greeting form."""

    return render_template("form-2.html")


@app.route('/greet-2')
def offer_better_greeting():
    """Give player optional compliments."""

    player = request.args["person"]

    # if they didn't tick box, `wants_compliments` won't be
    # in query args -- so let's use safe `.get()` method of
    # dict-like things
    wants = request.args.get("wants_compliments")

    nice_things = sample(COMPLIMENTS, 3) if wants else []

    return render_template("compliments.html",
                           compliments=nice_things,
                           name=player)


@app.route("/mypage")
def my_page():
    """Show mypage, an example of template inheritance"""

    return render_template("mypage.html")
