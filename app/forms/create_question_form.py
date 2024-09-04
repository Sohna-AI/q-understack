from flask_wtf import FlaskForm
from wtforms.fields import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class QuestionForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(message='Title is required'), Length(max=150, message='Title cannot be longer than 150 characters')])
    details = TextAreaField('Details', validators=[DataRequired(message='Details is required'), Length(max=1500, message='Details cannot be longer than 1500 characters')])
    expectation = TextAreaField('Expectation', validators=[DataRequired(message='Expectation is required'), Length(max=1500, message='Expectation cannot be longer than 1500 characters')])
