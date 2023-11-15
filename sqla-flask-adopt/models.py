from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMAGE_URL = "https://images.all-free-download.com/images/graphicwebp/squirrel_pets_nature_214475.webp"

class Pet(db.Model):
    """Pet model."""
    
    __tablename__ = "pets"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    species = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text, default=DEFAULT_IMAGE_URL)
    age = db.Column(db.Integer)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean, nullable=False, default=True)
    
    def __repr__(self):
        """Return readable representation of data."""
        
        p = self
        return f"<Pet {p.name} {p.species} {p.age} {p.available}>"
    
    def image_url(self):
        """Return default image or custom url."""
        
        return self.photo_url or DEFAULT_IMAGE_URL
    
def connect_db(app):
    """Connect this database to provided Flask app.

    You should call this in your Flask app.
    """

    db.app = app
    db.init_app(app)