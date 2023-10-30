from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)    
    
class Pet(db.Model):
    
    __tablename__ = "pets"
    """Constructor for table"""
    
    @classmethod
    def get_all_by_species(cls, species):
        """Get all pets matching bla
        >>> Pet.get_all_by_species('dog')
            [<Pet ...>, <Pet...>]"""
        
        return cls.query.filter_by(species=species).all()
    
    @classmethod
    def get_all_by_hunger(cls):
        """Get all pets matching hunger
        >>> Pet.get_all_by_hunger('dog')
            [<Pet ...>, <Pet...>]"""
        
        return cls.query.filter(Pet.hunger < 20).all()
    
    @classmethod
    def delete_all_by_species(cls, species):
        """delete method"""
        
        return cls.query.filter_by(species=species).delete()

    def __repr__(self):
        """Show info about pet"""
        p = self
        return(f"<Pet {p.id} {p.name}, {p.species}, {p.hunger}>")
    
    
    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    name = db.Column(db.String(50),
                     nullable=False,
                     unique=True)
    
    species = db.Column(db.String(30), nullable=True)
            
    hunger = db.Column(db.Integer, nullable=False, default=20)
    
    #####################
    
    def greet(self):
        """Greet using name"""
        p = self
        
        return f"I'm {p.name} the {p.species or 'thing'}"
    
    def feed(self, units=10):
        """Feed using hunger (units)"""
        
        self.hunger -= units
        # set to max of which ever is greater; self or 0
        self.hunger = max(self.hunger, 0)
        
        return f"Hunger: {self.hunger}"