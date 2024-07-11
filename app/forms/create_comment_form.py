from flask_wtf import FlaskForm
from wtforms.fields import TextAreaField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    comment = TextAreaField('Comment', validators=[DataRequired(), Length(max=255)])