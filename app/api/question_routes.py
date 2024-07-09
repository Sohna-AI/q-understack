from flask import Blueprint, request
from datetime import datetime
from flask_login import current_user, login_required
from app.models import Question, db, Save, Answer, Comment
from app.forms.create_question_form import QuestionForm
from app.forms.create_answer_form import AnswerForm
from app.forms.create_comment_form import CommentForm

question_routes = Blueprint('questions', __name__)

# TODO add pagination and limits
# TODO research / utilize Pagination object (SQLAlchemy)
@question_routes.route('/')
def questions():
    """
    Query for all questions and returns them in a list of question dictionaries
    """
    questions = Question.query.all()
    return {'questions': [question.to_dict_list_page() for question in questions]}


@question_routes.route('/current')
@login_required
def user_questions():
    """
    Query for all of the current users questions and returns them in
    a list of question dictionaries
    """
    user_id = current_user.get_id()
    questions = Question.query.filter(Question.user_id==user_id)
    return {'questions': [question.to_dict_list_page() for question in questions]}



@question_routes.route('/saves')
@login_required
def user_saves():
    """
    Query for all of the current users saved questions and returns them in
    a list of question dictionaries
    """
    user_id = current_user.get_id()
    questions = Question.query.join(Question.saves).filter(Save.user_id == user_id)
    return {'questions': [question.to_dict_list_page() for question in questions]}


@question_routes.route('/<int:question_id>')
def question_details(question_id):
    question = Question.query.get(question_id)
    
    if not question:
        return {'errors': {'message': 'Question could not be found'}}, 404
    
    return question.to_dict()
    
    
@question_routes.route('/new', methods=['POST'])
@login_required
def create_question():
    """
    Create a new question
    """
    
    form = QuestionForm()
    if form.validate_on_submit():
        new_question = Question(
            user_id = current_user.id,
            title = form.title.data,
            details = form.details.data,
            expectation = form.expectation.data
        )
        
        db.session.add(new_question)
        db.session.commit()
        return new_question.to_dict(), 201
    return form.errors, 400


@question_routes.route('/<int:question_id>', methods=['PATCH', 'PUT'])
@login_required
def update_question(question_id):
    """
    Update a question by question_id
    """

    question = Question.query.get(question_id)
    
    if not question:
        return {'errors': {'message': 'Question could not be found'}}, 404

    if question.user_id != current_user.id:
        return {'error': {'message': 'Unauthorized'}}, 401

    data = request.get_json()

    if 'title' in data:
        question.title = data['title']
    if 'details' in data:
        question.details = data['details']
    if 'expectation' in data:
        question.expectation = data['expectation']
    question.updated_at = datetime.now()

    db.session.commit()
    return question.to_dict()


@question_routes.route('/<int:question_id>', methods=['DELETE'])
@login_required
def delete_question(question_id):
    """
    Delete a question by question_id
    """
    
    question = Question.query.get(question_id)
    
    if not question:
        return {'errors': {'message': 'Question could not be found'}}, 404
    
    if question.user_id != current_user.id:
        return {'error': {'message': 'Unauthorized'}}, 401
    
    db.session.delete(question)
    db.session.commit()
    return {'message': 'Successfully deleted'}


#* Answer related question routes ------------------------------------------------------------------

@question_routes.route('/<int:question_id>/answers', methods=['GET'])
def get_all_answers_for_question(question_id):
    """
    Get all answers for a specific question by id
    """
    answers = Answer.query.filter(Answer.question_id == question_id).all()
    return {'answers': [answer.to_dict() for answer in answers]}

@question_routes.route('/<int:question_id>/answers', methods=['POST'])
@login_required
def create_answer(question_id):
    """
    Create an answer for a question by id
    """
    form = AnswerForm()
    if form.validate_on_submit():
        new_answer = Answer(
            user_id = current_user.id,
            question_id = question_id,
            text = form.text.data,
            created_at = datetime.now(),
            updated_at = datetime.now()
        )
        db.session.add(new_answer)
        db.session.commit()
        return new_answer.to_dict(), 201
    return form.errors, 400


#* Comment related question routes ------------------------------------------------------------------
@question_routes.route('/<int:question_id/comments', methods=['GET'])
def get_all_questions_comments(question_id):
    """
    Get all comments for a specific question by id.
    """
    comments = Comment.query.filter(Comment.question_id == question_id).all()
    return {'comments': [comment.to_dict() for comment in comments]}

@question_routes.route('/<int:question_id>/comments', methods=['POST'])
@login_required
def create_comment_question(question_id):
    """
    Create a comment for a question by id
    """
    form = CommentForm()
    if form.validate_on_submit():
        new_comment = Comment(
            user_id = current_user.id,
            type_id=question_id,
            type='question',
            comment=form.comment.data,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict(), 201
    return form.errors, 400