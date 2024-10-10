from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired

class UserForm(FlaskForm):
    """Add User form model."""
    
    username = StringField("Username", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])
    
class TweetForm(FlaskForm):
    """Add Tweet form model."""
    
    text = StringField("Tweet Text", validators=[InputRequired()])
    
    def __repr__(self):
        return f"{self.username} {self.password}"