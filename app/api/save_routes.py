from flask import Blueprint, request
from datetime import datetime
from flask_login import current_user, login_required
from app.models import Question, db, Save, Answer, Comment, Follow
from app.forms.create_question_form import QuestionForm
from app.forms.create_answer_form import AnswerForm
from app.forms.create_comment_form import CommentForm

save_routes = Blueprint('saves', __name__)

@save_routes.route('')
@login_required
def user_saves():
    """
    Query for all of the current users saved questions and answers, then returns them in
    a list of question dictionaries and a list of answer dictionaries.
    """
    user_id = current_user.get_id()
    questions = Save.query.filter(Save.user_id==user_id, Save.type=='question')
    answers = Save.query.filter(Save.user_id==user_id, Save.type=='answer')
    
    return { 'questions': [save.question.to_dict_details() for save in questions],
            'answers': [save.answer.to_dict() for save in answers],
            'saves': [[save.to_dict() for save in questions], [save.to_dict() for save in answers]]}
