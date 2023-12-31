from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from random import randint, choice, sample

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
debug = DebugToolbarExtension(app)

@app.route('/')
def home_page():
    html = """
    <html>
        <body>
        <h1>Hello!</h1>
        <p>This is my simple app</p>
        <a href='/hello'>Go to hello page</a>
        </body>
    </html>
    """
    return html


@app.route("/hello")
def hello(name):

    return render_template("hello.html")

###############
# /form, /greet

@app.route('/form')
def show_form():
    return render_template("form.html")

@app.route('/greet')
def greet():
    username = request.args["username"]
    return render_template("greet.html", username=username, compliment=choice(COMPLIMENTS))

################
# /form2, /greet2

COMPLIMENTS = ["cool", "bla", "bla bla"]


@app.route('/form2')
def show_form2():
    return render_template("form2.html")

@app.route('/greet2')
def greet2():
    username = request.args["username"]
    wants = request.args.get("wants_compliments")
    samp = sample(COMPLIMENTS, 2)
    return render_template("greet2.html", username=username, wants_compliments=wants, compliments=samp)

#################
# /lucky

@app.route("/lucky")
def show_lucky_num():
    """Example of simple dynamic temp"""
    
    num = randint(1, 5)
    
    return render_template("lucky.html", lucky_num=num, msg="sup dude")

#################
# /spell/<word>

@app.route("/spell/<word>")
def spell_word(word):
    caps_word = word.upper()
    return render_template('spell.html', word=caps_word)