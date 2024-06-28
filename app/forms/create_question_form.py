from flask_wtf import FlaskForm
from wtforms.fields import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length

class QuestionForm(FlaskForm):
    title = StringField('Title', Length(max=50), validators=[DataRequired()])
    details = TextAreaField('Details', Length(max=1500), validators=[DataRequired()])
    expectation = TextAreaField('Expectation', Length(max=1500), validators=[DataRequired()])
    submit = SubmitField('Submit')