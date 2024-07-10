from flask_wtf import FlaskForm
from wtforms.fields import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class QuestionForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=50)])
    details = TextAreaField('Details', validators=[DataRequired(), Length(max=1500)])
    expectation = TextAreaField('Expectation', validators=[DataRequired(), Length(max=1500)])
    