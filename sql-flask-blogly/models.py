"""SQLAlchemy models for blogly."""

from flask_sqlalchemy import SQLAlchemy
import datetime


db = SQLAlchemy()

DEFAULT_IMAGE_URL = "https://img.freepik.com/free-photo/african-american-man-white-t-shirt_273609-14750.jpg?t=st=1699552469~exp=1699553069~hmac=ed5ab56d704e3a81073c4822516912913c9a05a207ff1a3eee13898158f11008"


class User(db.Model):
    """Site user."""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=False, default=DEFAULT_IMAGE_URL)

    posts = db.relationship("Post", backref="user", cascade="all, delete", passive_deletes=True)

    @property
    def full_name(self):
        """Return full name of user."""

        return f"{self.first_name} {self.last_name}"


class Post(db.Model):
    """post """

    __tablename__ = "posts"
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(
        db.Integer,
            db.ForeignKey('users.id'),
                nullable=False)
    created_at = db.Column(
        db.DateTime,
            nullable=False,
                default=datetime.datetime.now)
    
    # # post = db.relationship("User", backref="post")
    
    @property
    def friendly_date(self):
        """Return nicely-formatted date."""

        return self.created_at.strftime("%a %b %-d  %Y, %-I:%M %p")
    
    def __repr__(self):
        return f"{self.id} {self.title} {self.created_at} {self.user_id}"

def connect_db(app):
    """Connect this database to provided Flask app.

    You should call this in your Flask app.
    """

    db.app = app
    db.init_app(app)
