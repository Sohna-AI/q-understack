from flask import Blueprint
from flask_login import current_user, login_required
from app.models import Question, User

question_routes = Blueprint('questions', __name__)

@question_routes.route('/')
def questions():
    """
    Query for all questions and returns them in a list of question dictionaries
    """
    questions = Question.query.all()
    return {'questions': [question.to_dict() for question in questions]}

@question_routes.route('/current')
@login_required
def user_questions():
    """
    Query for all of the current users questions and returns them in
    a list of question dictionaries
    """
    user_id = current_user.get_id()
    # user_id = 1 #! Hard coded in for testing without login, remove once unneeded
    questions = Question.query.filter(Question.user_id==user_id)
    return {'questions': [question.to_dict() for question in questions] }


# @question_routes.route('/saves')
# @login_required
# def user_saves():
#     """
#     Query for all 
#     """