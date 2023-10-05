from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from stories import story

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
debug = DebugToolbarExtension(app)


@app.route("/")
def home():
    """home page"""

    return render_template("home.html")


@app.route("/form")
def form():
    """show form"""
    prompts = story.prompts
    return render_template("form.html", prompts=prompts)

@app.route("/stories")
def get_form():
    """render form"""
    text = story.generate(request.args)
    return render_template("stories.html", text=text)