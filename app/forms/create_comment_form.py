from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.fields import TextAreaField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    type = StringField('Type')
    typeId  = IntegerField('TypeId')
    comment = TextAreaField('Comment', validators=[DataRequired(message='Comment field cannot be empty'), Length(max=1500, message='Comment cannot be longer than 1500 characters')])
