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
db.drop_all()
db.create_all()
   
###########################
# Create vars to combine
names = ['sushi', 'yo momma', 'deez nuts', 'scout', 'dick','stup', 'carrot']
species = ['pig', 'pig', 'turtle', 'cat', 'cat', 'dog', 'turtle']
    
# Combine vars
zip(names, species)
pets = [Pet(name=n, species=s) for n, s in zip(names, species)]
db.session.add_all(pets)
db.session.commit()

####-####-("/")-####-####
@app.route("/")
def home_page():
    """show homepage"""
    # drop / create
    
    ###########################
    
    
    ### Demo of class method / decorator
    pets = Pet.query.all()

    
    return render_template('list.html', pets=pets )

###########################-("/", ["POST"])-####
# creats single instance
@app.route("/", methods=["POST"])
def add_pet():
    """Add pet and redirect to list."""
    
    
    name = request.form['name']
    species = request.form['species']
    hunger = request.form['hunger']
    hunger = int(hunger) if hunger else None
    
    pet = Pet(name=name, species=species, hunger=hunger)
    
    db.session.add(pet)
    db.session.commit()
    
    return redirect(f"/{pet.id}")
    
############# /<int:pet_id> pet detail ########

@app.route("/<int:pet_id>")
def show_pet(pet_id):
    """Show detail.html on single pet."""
    
    pet = Pet.query.get_or_404(pet_id)
    
    return render_template("detail.html", pet=pet)

############ /<int:pet_id> species detail ########

@app.route("/species/<species_id>")
def show_pet_by_species(species_id):
    """Show all species using get_by_spe."""
    
    pets = Pet.get_all_by_species(species_id)
    
    return render_template("species.html", pets=pets, species=species_id)
    
if __name__ == '__main__':
    app.run(debug=True)