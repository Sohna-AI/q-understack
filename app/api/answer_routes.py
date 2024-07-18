from flask import Blueprint, request
from datetime import datetime
from flask_login import current_user, login_required
from app.models import  Answer, db, Comment, Save, Follow
from app.forms.create_comment_form import CommentForm
from app.forms.create_answer_form import AnswerForm

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
    print('current_user:', current_user.id)
    print('answer user:', answer.user_id)
    if answer.user_id != current_user.id:
        return {'error': {'message': 'Unauthorized'}}, 401

    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        answer.text = form.text.data
        answer.updated_at = datetime.now()

        db.session.commit()
        return answer.to_dict()
    return form.errors, 400

@answer_routes.route('/<int:answer_id>', methods=['DELETE'])
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
    form['csrf_token'].data = request.cookies['csrf_token']
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


#* Save related question routes ------------------------------------------------------------------
@answer_routes.route('/<int:answer_id>/save', methods=['POST'])
@login_required
def save_answer(answer_id):
    """
    Save an answer by id
    """
    save = Save.query.filter_by(user_id = current_user.id, type_id = answer_id, type = 'answer').first()
    if save:
        return {'error': 'Answer already saved'}, 400

    new_save = Save(user_id = current_user.id, type_id = answer_id, type = 'answer')
    db.session.add(new_save)
    db.session.commit()
    return {'message': 'Answer saved successfully'}, 201

@answer_routes.route('/<int:answer_id>/save', methods=['DELETE'])
@login_required
def remove_save_answer(answer_id):
    """
    Remove an answer from save by id
    """
    save = Save.query.filter_by(user_id = current_user.id, type_id = answer_id, type = 'answer').first()
    if not save:
        return {'error': 'Answer not found'}, 404

    db.session.delete(save)
    db.session.commit()
    return {'message': 'Saved answer removed successfully'}


#* Follow related question routes ------------------------------------------------------------------
@answer_routes.route('/<int:answer_id>/follow', methods=['POST'])
@login_required
def follow_answer(answer_id):
    """
    Follow a answer by id
    """
    follow = Follow.query.filter_by(user_id = current_user.id, type_id = answer_id, type = 'answer').first()
    if follow:
        return {'error': 'Already following this answer'}, 400

    new_follow = Follow(user_id=current_user.id, type_id=answer_id, type='answer')
    db.session.add(new_follow)
    db.session.commit()
    return {'message': 'answer followed successfully'}, 201

@answer_routes.route('/<int:answer_id>/follow', methods=['DELETE'])
@login_required
def unfollow_answer(answer_id):
    """
    Unfollow a answer by id
    """
    follow = Follow.query.filter_by(user_id = current_user.id, type_id = answer_id, type = 'answer').first()
    if follow:
        return {'error': 'answer not found'}, 404

    db.session.delete(follow)
    db.session.commit()
    return {'message': 'Unfollowed answer successfully'}
