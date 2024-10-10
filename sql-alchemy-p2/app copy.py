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
    
    db.drop_all()
    db_sess = db.create_all()
    
    #########################
    # make tuples from 2 lists
    names = ['sushi', 'scout', 'pig', 'carrot']
    species = ['pig', 'cat', 'dog', 'turtle']
    
    zip(names, species)
    
    pets = [Pet(name=n, species=s) for n, s in zip(names, species)]
    #########################
    
    
    stevie = Pet(name="Stevie", species="chick", hunger=13)
    
    db.session.add()
    db.session.add_all(pets)
    db.session.commit()
    
    return render_template('home.html', db_sess=db_sess, stevie=stevie, pets=pets)

if __name__ == '__main__':
    app.run(debug=True)