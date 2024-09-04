from flask_wtf import FlaskForm
from wtforms.fields import TextAreaField
from wtforms.validators import DataRequired, Length

class AnswerForm(FlaskForm):
    text = TextAreaField('Text', validators=[DataRequired(message='Answer field cannot be empty'), Length(max=1500, message='Answers cannot be longer than 1500 characters')])