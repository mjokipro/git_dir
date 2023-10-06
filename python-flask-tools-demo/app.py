from random import randint,  choice, sample
from flask import Flask, request, render_template,  redirect, flash,  jsonify, session

from flask_debugtoolbar import DebugToolbarExtension

COMPLIMENTS = ["cool", "clever", "tenacious", "awesome", "Pythonic"]

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)

POSTS = {
    1: "What a nice post!",
    2: "An even nicer post!",
}


@app.route('/post/<post_id>')
def err_demo(post_id):
    """An example of a page that raises an error."""

    text = POSTS[post_id]

    return f"<html><body>{text}</body></html"


@app.route('/redirect-me')
def redirect_example():
    """Example redirect."""

    return redirect("/somewhere-else")


@app.route("/somewhere-else")
def somewhere_else():
    """Example route"""

    return "Yay! You got here!"


@app.route("/post-example")
def post_example_form():
    """Example of a post form."""

    return render_template("post-form.html")


@app.route("/post-example", methods=["POST"])
def post_example():
    """An example of good POST handling."""

    isbn = request.form["isbn"]

    print(f"\n\nBuying Book: {isbn}\n\n")

    # flash message: we'll talk about this soon
    # flash(f"Book {isbn} bought!")

    return redirect("/thanks")


@app.route("/thanks")
def say_thanks():
    """Thank user for buying a book."""

    return render_template("thanks.html")


@app.route("/example-json")
def example_json_route():
    """Return some JSON."""

    info = {"name": "Whiskey", "cute": "Hella"}
    return jsonify(info)

    # Alternate syntax
    # return jsonify(name="Whiskey", cute="Hella")


app = Flask(__name__)

app.config['SECRET_KEY'] = "chickenzarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

MOVIES = {'Amadeus', 'Chicken Run', 'Dances With Wolves'}


@app.route('/')
def home_page():
    """Shows home page"""
    session['fav_number'] = 42
    return render_template('home.html')


@app.route('/old-home-page')
def redirect_to_home():
    """Redirects to new home page"""
    flash('That page has moved!  This is our new home page!')
    return redirect("/")


@app.route('/movies')
def show_all_movies():
    """Show list of all movies in fake DB"""
    return render_template('movies.html', movies=MOVIES)


@app.route('/movies/json')
def get_movies_json():
    return jsonify(list(MOVIES))


@app.route('/movies/new', methods=["POST"])
def add_movie():
    title = request.form['title']
    # Add to pretend DB

    if title in MOVIES:
        flash('Movie Already Exists!', 'error')
    else:
        MOVIES.add(title)
        flash("Created Your Movie!", 'success')
    return redirect('/movies')
