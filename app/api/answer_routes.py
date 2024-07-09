from flask import Blueprint, request
from datetime import datetime
from flask_login import current_user, login_required
from app.models import Question, Answer, User, answer, db, Comment
from app.forms.create_comment_form import CommentForm

answer_routes = Blueprint('answers', __name__)

@answer_routes.route('/<int:answer_id>', methods=['PATCH', 'PUT'])
@login_required
def edit_answer(answer_id):
    """
    Edit an answer by its id
    """
    answer = Answer.query.get(answer_id)
    
    if not answer:
        return {'errors': {'Answer could not be found'}}, 404
    
    if answer.user_id != current_user.id:
        return {'error': {'message': 'Unauthorized'}}, 401
    
    data = request.get_json()
    
    if 'text' in data:
        answer.text = data['text']
    answer.updated_at = datetime.now()
    
    db.session.commit()
    return answer.to_dict()

@answer_routes.route('/<int:answer_id', methods=['DELETE'])
@login_required
def delete_answer(answer_id):
    """
    Delete a answer by answer_id
    """
    answer = Answer.query.get(answer_id)
    
    if not answer:
        return {'error': {'message': 'Answer could not be found'}}, 404
    
    if answer.user_id != current_user.id:
        return {'error': {'message': 'Unauthorized'}}, 401
    
    db.session.delete(answer)
    db.session.commit()
    return {'message': 'Successfully deleted'}


#* Comment related Answer routes ------------------------------------------------------------------
@answer_routes.route('/<int:answer_id>/comments', methods=['GET'])
def get_all_answers_comments(answer_id):
    """
    Get all comments for a answer by id
    """
    comments = Comment.query.filter(Comment.type == 'answer', Comment.type_id == answer_id).all()
    return {'comments': [comment.to_dict() for comment in comments]}

@answer_routes.route('/<int:answer_id>/comments', methods=['POST'])
@login_required
def create_comment_answer(answer_id):
    """
    Create a comment for a answer by id
    """
    form = CommentForm()
    if form.validate_on_submit():
        new_comment = Comment(
            user_id = current_user.id,
            type_id=answer_id,
            type='answer',
            comment=form.comment.data,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict(), 201
    return form.errors, 400