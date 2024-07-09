from flask_wtf import FlaskForm
from wtforms.fields import IntegerField, SelectField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, ValidationError

class CommentForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    type_id = IntegerField('Type ID', validators=[DataRequired()])
    type = SelectField('Type', choices=[('question', 'Question'), ('answer', 'Answer')], validators=[DataRequired()])
    comment = TextAreaField('Comment', validators=[DataRequired()])
    submit = SubmitField('Submit')
    
    def validate_type(self, field):
        if field.data not in ['question', 'answer']:
            raise ValidationError("Type must be 'question' or 'answer'")