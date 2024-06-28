from flask import Blueprint, redirect, render_template, url_for, jsonify, request
from datetime import datetime
from flask_login import current_user, login_required
from app.models import Question, User, db
from app.forms.create_question_form import QuestionForm

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

@question_routes.route('/new', method=['GET', 'POST'])
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
            expectation = form.expectation.data,
            created_at = datetime.utcnow(),
            updated_at = datetime.utcnow()
        )
        
        db.session.add(new_question)
        db.session.commit()
        return redirect(url_for('questions.questions'))
    return render_template('create_question.html', form=form)

@question_routes.route('/int:question_id', methods=['PATCH', 'PUT'])
@login_required
def update_question(question_id):
    """
    Update a question created by the current user
    """
    
    question = Question.query.get_or_404(question_id)

    if question.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.get_json()

    if 'title' in data:
        question.title = data['title']
    if 'details' in data:
        question.details = data['details']
    if 'expectation' in data:
        question.expectation = data['expectation']
    question.updated_at = datetime.utcnow()

    db.session.commit()
    return jsonify(question.to_dict())