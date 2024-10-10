from flask import Flask, request, render_template,  redirect, flash, session, jsonify, json
from flask_debugtoolbar import DebugToolbarExtension
from models import db,  connect_db, Pet
from forms import NewPetForm
# from forms import 

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pets_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "chickenzarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def home_page():
    """Homepage"""
    
    pets = Pet.query.all()
    
    return render_template('homepage.html', pets=pets)

@app.route('/pets/new', methods=['GET', 'POST'])
def show_new_pet_form():
    """Show form for adding a new pet."""
    form = NewPetForm()
    
    
    if form.validate_on_submit():
        name = form.name.data
        species = form.name.data
        photo_url = form.photo_url.data
        age = int(form.age.data)
        notes = form.notes.data
        
        pet = Pet(name=name, species=species, photo_url=photo_url, age=age, notes=notes)
        db.session.add(pet)
        db.session.commit()
        
        flash(f"Created { name }")
        return redirect('/')
    
    else:
        return render_template('pets/new_pet_form.html', form=form)
    
@app.route('/pets/<int:pet_id>/edit')
def edit_pet_form(pet_id):
        """Show detail / edit form for pet."""
        
        pet = Pet.query.get_or_404(pet_id)
        form = 
        
        return render_template('pets/edit_pet_form.html')
        

if __name__ == '__main__':
    app.run(debug=True)