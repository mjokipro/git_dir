from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, IntegerField, RadioField, SelectField
from wtforms.validators import InputRequired, Optional, Email

class AddSnackForm(FlaskForm):
    """Form for adding snacks."""
    
    email = StringField('Email', validators=[Optional(), Email()])
    
    name = StringField("Snack Name", validators=[InputRequired(message='Please add snack name')])
    price = FloatField("Price in USD")
    quantity = IntegerField("Quantity of Snack")
    is_healthy = BooleanField("This is a Healthy Snack")
    # category = RadioField("Category", choices=[
    #     ('ic', 'Ice Cream'), ('chips', 'Potato Chips'), ('candy', 'Candy/Sweets')])
    category = SelectField("Category", choices=[
        ('ic', 'Ice Cream'), ('chips', 'Potato Chips'), ('candy', 'Candy/Sweets')])
    
# states for newemp form
states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

class EmployeeForm(FlaskForm):
    """Form for adding new employee."""
    
    name = StringField("Employee Name", validators=[InputRequired(message="Please do not leave blank.")])
    state = SelectField("State", choices=[(st, st) for st in states])
    dept = SelectField("Dept Code")