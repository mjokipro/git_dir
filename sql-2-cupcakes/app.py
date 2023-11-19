"""Flask app for Cupcakes"""
"""https://thestayathomechef.com/wp-content/uploads/2017/12/Most-Amazing-Chocolate-Cupcakes-1-small.jpg"""

from flask import Flask, render_template, request, jsonify, redirect
from models import db, connect_db, Cupcake

import requests

app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "chickenzarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
# debug = DebugToolbarExtension(app)

connect_db(app)

@app.route("/")
def redirect_cupcakes_list():
    """Redirect to cupcakes."""
    return redirect("/api/cupcakes")

@app.route("/api/cupcakes")
def show_all_cupcakes_list():
    """Show all cupcakes list."""
    
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    
    return jsonify(cupcakes=cupcakes)

@app.route("/api/cupcakes/<int:cupcake_id>")
def show_cupcake_detail(cupcake_id):
    """Show a single cupcake."""
    
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    
    return jsonify(cupcake=cupcake.serialize())

@app.route("/api/cupcakes", methods=['POST'])
def post_add_cupcake_form():
    """Show all cupcakes list."""
    
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    
    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    image = request.json["image"]
    
    cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
    db.session.add(cupcake)
    db.session.commit()
    
    serialized = cupcake.serialize()
    
    return (jsonify(cupcake=serialized), 201)

if __name__ == '__main__':
    app.run(debug=True)