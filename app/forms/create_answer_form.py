from flask_wtf import FlaskForm
from wtforms.fields import TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length

class AnswerForm(FlaskForm):
    text = TextAreaField('Text', validators=[DataRequired(), Length(max=1500)])
    submit = SubmitField('Submit')