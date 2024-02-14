from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, FloatField, IntegerField, BooleanField, SelectField 
from wtforms.validators import DataRequired, Email, Length, InputRequired, Optional

states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]


class MessageForm(FlaskForm):
    """Form for adding/editing messages."""

    text = TextAreaField('text', validators=[DataRequired()])

class MessageForm2(FlaskForm):
    """Form for adding/editing messages."""

    name = StringField('Name', validators=[DataRequired()])
    state = StringField('State', validators=[Optional()])
    dept_code = SelectField("Category", choices=[
                        ('MIN', 'Ministry'),  ('TST', 'Test Department Code')])

class ScriptureForm(FlaskForm):
    """Form for adding/editing messages."""

    book_id = SelectField("Category", choices=[
                        ('ROM', 'Romans'),  ('MAT', 'Matthew'),  ('JHN', 'John'), ('REV', 'Revelation')])
    chapter = SelectField("Category", choices=[
                        ('1','Chapter 1'),  ('6', 'Chapter 6'),  ('7', 'Chapter 7'), ('8', 'Chapter 8')])
    
class UserAddForm(FlaskForm):
    """Form for adding users."""

    username = StringField('Username', validators=[DataRequired()])
    email = StringField('E-mail', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[Length(min=6)])
    image_url = StringField('(Optional) Image URL')


class UserEditForm(FlaskForm):
    """Form for editing users."""

    username = StringField('Username', validators=[DataRequired()])
    email = StringField('E-mail', validators=[DataRequired(), Email()])
    image_url = StringField('(Optional) Image URL')
    header_image_url = StringField('(Optional) Header Image URL')
    bio = TextAreaField('(Optional) Tell us about yourself')
    password = PasswordField('Password', validators=[Length(min=6)])


class LoginForm(FlaskForm):
    """Login form."""

    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[Length(min=6)])

class EmployeeForm(FlaskForm):
    name = StringField("Employee Name", validators=[
                       InputRequired(message="Name cannot be blank")])
    state = StringField("State" )
    dept_code = StringField("Department Code")

class ProjectForm(FlaskForm):
  
    proj_code = StringField("Project Code", validators=[
                       InputRequired(message="Project Code cannot be blank; Must be 3 letters CAPITALIZED")])
    proj_name = StringField("Project Name", validators=[
                       InputRequired(message="Project Name cannot be blank")])

class AddDepartmentForm(FlaskForm):
    """ Add Department Form. """
    
    dept_code = StringField("Department Code", validators=[InputRequired(message="Department Code cannot be blank")])
    dept_name = StringField("Department Name",  validators=[
                       InputRequired(message="Department Name can't be blank")])
    phone = StringField("Department Phone")

    # category = RadioField("Category", choices=[
    #                       ('ic', 'Ice Cream'),  ('chips', 'Potato Chips'),  ('candy', 'Candy/Sweets')])
    # category = SelectField("Category", choices=[
    #                       ('ic', 'Ice Cream'),  ('chips', 'Potato Chips'),  ('candy', 'Candy/Sweets')])


