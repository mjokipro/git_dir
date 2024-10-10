from random import randint,  choice, sample
from flask import Flask, request, render_template,  redirect, flash,  jsonify, session
from flask_debugtoolbar import DebugToolbarExtension


app = Flask(__name__)

app.config['SECRET_KEY'] = "oh-so-secret1"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)
COMPLIMENTS = ["cool", "clever", "tenacious", "awesome", "Pythonic"]

POSTS = {
    1: "What a nice post!",
    2: "An even nicer post!",
}
###########################################
# /post/<post_id>

"""
def func():
    import pdb
    pdb.set_trace()
"""

@app.route('/post/<post_id>')
def err_demo(post_id):
    """An example of a page that raises an error."""

    text = POSTS[post_id]

    return f"<html><body>{text}</body></html"

# redirect-me


@app.route('/redirect-me')
def redirect_example():
    """Example redirect."""

    return redirect("/somewhere-else")

# /somewhere-else


@app.route("/somewhere-else")
def somewhere_else():
    """Example route"""

    return "Yay! You got here!"

# /post-example


@app.route("/post-example")
def post_example_form():
    """Example of a post form."""

    return render_template("post-form.html")

# "/post-example", methods=["POST"]


@app.route("/post-example", methods=["POST"])
def post_example():
    """An example of good POST handling."""

    isbn = request.form["isbn"]

    print(f"\n\nBuying Book: {isbn}\n\n")

    # flash message: we'll talk about this soon
    # flash(f"Book {isbn} bought!")

    return redirect("/thanks")

# /thanks


@app.route("/thanks")
def say_thanks():
    """Thank user for buying a book."""

    return render_template("thanks.html")

# /example-json


@app.route("/example-json")
def example_json_route():
    """Return some JSON."""

    info = {"name": "Whiskey", "cute": "Hella"}
    return jsonify(info)

    # Alternate syntax
    # return jsonify(name="Whiskey", cute="Hella")

###################################


MOVIES = {'Amadeus', 'Chicken Run', 'Dances With Wolves'}

# /(home)


@app.route('/')
def home_page():
    """Shows home page"""
    session['fav_number'] = 42
    return render_template('home.html')

# /old-home-page


@app.route('/old-home-page')
def redirect_to_home():
    """Redirects to new home page"""
    flash('That page has moved!  This is our new home page!')
    return redirect("/")

# /movies


@app.route('/movies')
def show_all_movies():
    """Show list of all movies in fake DB"""
    return render_template('movies.html', movies=MOVIES)

# /movies/json


@app.route('/movies/json')
def get_movies_json():
    return jsonify(list(MOVIES))

# '/movies/new', methods=["POST"]


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
