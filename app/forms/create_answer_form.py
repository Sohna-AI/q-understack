from flask_wtf import FlaskForm
from wtforms.fields import TextAreaField
from wtforms.validators import DataRequired, Length

class AnswerForm(FlaskForm):
    text = TextAreaField('text', validators=[DataRequired(), Length(max=1500)])
