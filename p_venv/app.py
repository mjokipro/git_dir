from flask import Flask, request

app = Flask(__name__)


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
def hello():
    html = """
    <html>
        <body>
        <h1>Hello!</h1>
        <p>This is the hello page</p>
        </body>
    </html>
    """
    return html

#############

# Extracting data from query string here, and that's why vars;
# catches form data for MATCHING from db to send back to user,
# not STORING like POST 
@app.route('/search')
def search():
    """Handle requests like /search?term=fun"""
    term = request.args["term"]
    sort = request.args["sort"]
    print(request.args)
    return f'<h1>Searching for...{term}</h1> <p>Sorting by: {sort}</p>'

##############

# GET
@app.route("/post")
def get():
    """Get req ex; returns str"""
    return "YOU MADE GET REQUEST"

# POST
@app.route("/post", methods=["POST"])
def post_example():
    """Post req ex; returns str"""
    return "YOU MADE POST REQUEST"

##############

# GET req to add-comment, that loads form with method
# set to POST, name = db name field; this is 1st step GET


@app.route("/add-comment")
def add_comment_form():
    """Show form for adding a comment"""

    return """
        <h1>ENTER COMMENT</h1>
        <form method="POST">
            <input type='text' placeholder='comment' name='comment' />
            <input type='text' placeholder='username' name='username' />
            <button>Submit</button>
        </form>
        """

# on above form submit, catch form request "comment",
# return 'received' comment.  this is 2nd step POST


@app.route("/add-comment", methods=["POST"])
def save_comment_form():
    """Handle adding comment."""
    # [('comment', 'yo dude'), ('username', 'matthew')]
    comment = request.form["comment"]
    
    # key        /       value 'matthew'
    username = request.form["username"]

    # TODO: save that into a database!!!

    return f"""
        <h1>SAVED YOUR COMMENT</h1>
        <ul>
            <li>Username: {username}</li>
            <li>Comment: {comment}</li>
        </ul>      
    """


##########################################
# --SUBREDDIT--1 - https://www.reddit.com/r/AskReddit/
# comments/ei1m7x/what_sauce_do_you_prefer_to_dip_your_chicken
# /?sort=new
# /r/AskReddit/search - /?q=chickens&restrict_sr=1
# /r/<subreddit>/search - actual route & contents (URL Parameter)
# /?q=chickens&restrict_sr=1 - extra info (Query Parameter)
# passes dynamic name <subreddit> as arg, and needs 
# to be passed into the 'view' to be used


@app.route('/r/<subreddit>')

# MUST PASS 'subreddit' as arg
def show_subreddit(subreddit):
    
    # TODO: search db for subreddit and return
    
    return f"<h1>THIS IS SUBREDDIT: {subreddit}</h1>"

############
# --SUBREDDIT--2
# /r/<subreddit>/comments/<post_id>

@app.route("/r/<subreddit>/comments/<int:post_id>")
def show_comments(subreddit, post_id):

    return f"<h1>THIS IS SUBREDDIT: {subreddit} & {post_id}</h1>"
##############
# --SUBREDDIT--3

# dict - posts
POSTS = {
    1: "bla",
    2: "bla bla",
    3: "this is data in mock db",
}

# cannot be space between <int:id>
@app.route('/posts/<int:id>')
def find_post(id):
    
    # provide default for get()
    post = POSTS.get(id, "Post not found.")
    return f"<p>{post}</p>"

################
# --toys--
# /shop/<product>/<color>

@app.route('http://toys.com/shop/spinning-top?color=red')
def toy_detail(toy):
    ...