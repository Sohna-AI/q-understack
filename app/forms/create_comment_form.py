from flask_wtf import FlaskForm
from wtforms.fields import IntegerField, SelectField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Length

class CommentForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    type_id = IntegerField('Type ID', validators=[DataRequired()])
    type = SelectField('Type', choices=[('question', 'Question'), ('answer', 'Answer')], validators=[DataRequired()])
    comment = TextAreaField('Comment', validators=[DataRequired(), Length(max=255)])
    
    def validate_type(self, field):
        if field.data not in ['question', 'answer']:
            raise ValidationError("Type must be 'question' or 'answer'")