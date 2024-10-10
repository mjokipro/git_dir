from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()

bcrypt = Bcrypt()

def connect_db(app):

    db.app = app
    db.init_app(app)
    
class User(db.Model):
    """User model."""
    
    __tablename__ = 'users'
    
    username = db.Column(
        db.String(20),
        nullable=False,
        unique=True,
        primary_key=True,
    )
    
    password = db.Column(db.Text, nullable=False)
    email = db.Column(db.String(50), nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    
    feedback = db.relationship("Feedback", backref="user", cascade="all, delete")
    
    def __repr__(self):
        s = self
        return f"<User { s.username }, { s.email }, { s.first_name }, { s.last_name } { s.feedback }>"
    
    @classmethod
    def register(cls, username, password, first_name, last_name, email):
        """Register username and password."""
        
        hashed = bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode("utf8")
        user = cls(
            username=username,
            password=hashed_utf8,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        db.session.add(user)
        return user
    
    @classmethod
    def authenticate(cls, username, password):
        """Validate user authenticity.
        Return user if valid; else return False.
        """
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return False
    
class Feedback(db.Model):
    """Feedback model."""
    
    __tablename__ = 'feedbacks'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    
    username = db.Column(
        db.String(20),
        db.ForeignKey('users.username'),
        nullable=False,
    )
    
    def __repr__(self):
        s = self
        return f"<Feedback { s.id } { s.title } { s.content } { s.username }>"
    