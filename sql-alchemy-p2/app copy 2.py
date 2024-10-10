"""Demo app using SQLAlchemy."""
from flask import Flask, request, redirect, render_template, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_shop_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = "SECRET!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route("/")
def home_page():
    """show homepage"""
    
    # drop / create
    db.drop_all()
    db_sess = db.create_all()
   
    ###########################
    # Create vars to combine
    names = ['sushi', 'scout', 'pig', 'carrot']
    species = ['pig', 'cat', 'dog', 'turtle']
    
    # Combine vars
    zip(names, species)
    pets = [Pet(name=n, species=s) for n, s in zip(names, species)]
    
    # Create record (SQL INSERT)
    stevie = Pet(name="Stevie", species="chick", hunger=13)

    stevie.name = 'scout bla'
         
    db.session.add(stevie)
    db.session.add_all(pets)
    db.session.commit()
    
    ###########################
    
    query = Pet.query.get(1)
    hun = Pet.query.filter_by(hunger=20).all()
    filt = Pet.query.filter(Pet.species=='turtle').all()
    not_e = Pet.query.filter(Pet.species!='pig').first()
    filt_hun = Pet.query.filter(Pet.hunger > 19).all()
    filt_all = Pet.query.filter_by(species='cat').all()
    filt_and = Pet.query.filter(Pet.species=='cat', Pet.hunger>19).all()
    filt_one = Pet.query.filter_by(hunger=13).one()
    
    ### Demo of class method / decorator
    all_pets = Pet.query.all()
    
    for p in all_pets:
        print(p.feed())
        
    
    ### Calls to custom class decorator get_all_by_species('turtle') ###    
    ### Returns [<Pet 1...>, <Pet 2...>] ###    
    turtles = Pet.get_all_by_species('turtle')

    ### Calls to custom class decorator to get all hungry pets ###    
    ### Returns [<Pet 1...>, <Pet 2...>] ###    
    hungry = Pet.get_all_by_hunger()
    
    ### get one Pet ###
    pet2 = Pet.query.get(3)
    pet2.hunger = 57
    
    ###  ###
    
    return render_template('home.html', pet2=pet2, hungry=hungry, turtles=turtles, filt_one=filt_one, filt_and=filt_and, not_e=not_e, db_sess=db_sess, pets=pets, stevie=stevie, query=query, filt=filt, filt_hun=filt_hun, hun=hun, filt_all=filt_all)

if __name__ == '__main__':
    app.run(debug=True)