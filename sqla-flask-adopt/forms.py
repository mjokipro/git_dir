from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SelectField
from wtforms.validators import InputRequired, Optional, URL

ages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
        14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

class NewPetForm(FlaskForm):
    """Create wtform class for adding a pet."""
    
    name = StringField("Pet name", validators=[
        InputRequired(message="Pet name cannot be blank.")])
    species = SelectField("Species", choices=[
        ('dog', 'dog'), ('cat', 'cat'), ('por', 'porcupine')])
    photo_url = StringField("Photo URL", validators=[
        URL(message="URL cannot be empty."),
        Optional()])
    age = IntegerField("Pet age", validators=[
        Optional()])
    notes = TextAreaField("Notes", validators=[
        Optional()])
    