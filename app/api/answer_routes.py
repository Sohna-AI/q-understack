from flask import Blueprint, request
from datetime import datetime
from flask_login import current_user, login_required
from app.models import Question, Answer, User, answer, db

answer_routes = Blueprint('answers', __name__)

@answer_routes.route('/<int:answer_id>', methods=['PATCH', 'PUT'])
@login_required
def edit_answer(answer_id):
    """
    Edit an answer by its id
    """
    pass