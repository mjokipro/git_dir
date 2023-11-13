"""Demo app using SQLAlchemy."""
from flask import Flask, request, redirect, render_template, flash, json, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post, Tag

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = "SECRET!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()


@app.route('/')
def root():
    """Homepage redirects to list of users."""

    posts = Post.query.order_by(Post.created_at.desc()).all()

    return render_template("posts/homepage.html", posts=posts)

@app.errorhandler(404)
def page_not_found():
    """returns status code 404"""
    
    return render_template('404.html'), 404

@app.route('/users')
def users_index():
    """Show a page with info on all users"""

    users = User.query.order_by(User.last_name, User.first_name).all()

    return render_template('users/index.html', users=users)


@app.route('/users/new', methods=["GET"])
def users_new_form():
    """Show a form to create a new user"""

    return render_template('users/new.html')



@app.route("/users/new", methods=["POST"])
def users_new():
    """Handle form submission for creating a new user"""

    new_user = User(
        first_name=request.form['first_name'],
        last_name=request.form['last_name'],
        image_url=request.form['image_url'] or None)

    db.session.add(new_user)
    db.session.commit()

    return redirect("/users")


@app.route('/users/<int:user_id>')
def users_show(user_id):
    """Show a page with info on a specific user"""

    user = User.query.get_or_404(user_id)
    return render_template('users/show.html', user=user)


@app.route('/users/<int:user_id>/edit')
def users_edit(user_id):
    """Show a form to edit an existing user"""

    user = User.query.get_or_404(user_id)
    return render_template('users/edit.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=["POST"])
def users_update(user_id):
    """Handle form submission for updating an existing user"""

    user = User.query.get_or_404(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['image_url']

    db.session.add(user)
    db.session.commit()

    return redirect("/users")


@app.route('/users/<int:user_id>/delete', methods=["POST"])
def users_destroy(user_id):
    """Handle form submission for deleting an existing user"""

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return redirect("/users")

############### Posts routes ########

@app.route('/users/<int:user_id>/posts/new')
def post_show(user_id):
    """Show a page with info on a specific user"""

    tags = Tag.query.all()

    user = User.query.get_or_404(user_id)
    
    
    return render_template('posts/new.html', tags=tags, user=user)

@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def post_new_post(user_id):
    """post a new post"""
    
    user = User.query.get(user_id)
    
    tag_ids = [int(num) for num in request.form.getlist("tags")]
    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
    
    title = request.form['title']
    content = request.form['content']
    
    new_post = Post(title=title, content=content, user=user, tags=tags)
    
    db.session.add(new_post)
    db.session.commit()
    
    flash(f"Successfully created new post:  {new_post.title}")
    
    return redirect(f"/users/{user.id}")

@app.route('/posts/<int:post_id>')
def get_post(post_id):
    """get a post"""
    
    post = Post.query.get_or_404(post_id)
    
    return render_template('posts/show.html', post=post)

@app.route('/posts/<int:post_id>/edit')
def edit_post(post_id):
    """return form for edit post"""
    
    post = Post.query.get_or_404(post_id)
    
    tags = Tag.query.all()
    
    return render_template('posts/edit.html', tags=tags, post=post)

@app.route('/posts/<int:post_id>/edit', methods=["POST"])
def update_post(post_id):
    """post to db, redirect to posts"""
    
    post = Post.query.get_or_404(post_id)
    post.title = request.form['title']
    post.content = request.form['content']
    
    tag_ids = [int(num) for num in request.form.getlist("tags")]
    post.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
    
    db.session.add(post)
    db.session.commit()
    
    flash(f"Successfully added: '{ post.title }'. ")
    
    return redirect(f"/users/{post.user_id}")

@app.route('/posts/<int:post_id>/delete', methods=["POST"])
def delete_post(post_id):
    """delete post and redirect"""
    
    post = Post.query.get_or_404(post_id)
    
    db.session.delete(post)
    db.session.commit()
    
    flash(f"Successfully deleted post:  '{ post.title }'.")
    
    return redirect(f'/users/{ post.user_id }')

@app.route("/tags")
def get_all_tags():
    """Get and return all tags."""
    
    tags = Tag.query.all()
    
    return render_template('tags/index.html', tags=tags)

@app.route("/tags/<int:tag_id>")
def show_tag_detail(tag_id):
    """Show info on a tag."""
    
    tag = Tag.query.get_or_404(tag_id)
    tags = db.session.query(Tag.id, Tag.name).all()
    
    return render_template('tags/show.html', tags=tags, tag=tag)

@app.route("/tags/new")
def add_new_tag_form():
    """Show add a new tag form."""
    
    return render_template('tags/new.html')

@app.route('/tags/new', methods=["POST"])
def post_new_tag():
    """Post a new tag."""
    
    name = request.form['name']
    
    tag = Tag(name=name)
    
    db.session.add(tag)
    db.session.commit()
    
    flash(f"Successfully created new post:  {tag.name}")
    
    return redirect(f"/tags/{tag.id}")

@app.route('/tags/<int:tag_id>/edit')
def show_edit_tag_form(tag_id):
    """Show form to edit a tag."""
    
    tag = Tag.query.get_or_404(tag_id)
    
    return render_template('tags/edit.html', tag=tag)

@app.route('/tags/<int:tag_id>/edit', methods=["POST"])
def post_edit_tag_form(tag_id):
    """Show form to edit a tag."""
    
    tag = Tag.query.get_or_404(tag_id)
    
    tag.name = request.form['name']
    
    db.session.add(tag)
    db.session.commit()
    
    flash(f"Successfully added: '{ tag.name }'. ")
    
    return redirect(f"/tags/{tag.id}")

@app.route('/tags/<int:tag_id>/delete', methods=["POST"])
def post_delete_tag(tag_id):
    """Show form to edit a tag."""
    
    tag = Tag.query.get_or_404(tag_id)
    
    db.session.delete(tag)
    db.session.commit()
    
    flash(f"Successfully deleted: '{ tag.name }'. ")
    
    return redirect(f"/tags")
    
# if __name__ == '__main__':
#     app.run(debug=True)