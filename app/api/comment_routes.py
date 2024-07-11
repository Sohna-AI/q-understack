from flask import Blueprint, request
from datetime import datetime
from flask_login import current_user, login_required
from app.models import db, Comment
from app.forms.create_comment_form import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:comment_id>', methods=['PATCH', 'PUT'])
@login_required
def edit_comment(comment_id):
    """
    Edit a comment by id
    """
    comment = Comment.query.get(comment_id)
    
    if not comment:
        return {'errors': {'Comment could not be found'}}, 404
    
    if comment.user_id != current_user.id:
        return {'error': {'message': 'Unauthorized'}}, 401
    
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.comment = form.comment.data
        comment.updated_at = datetime.now()
        
        db.session.commit()
        return comment.to_dict()
    return form.errors, 400

@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    """
    Delete a comment by id
    """
    comment = Comment.query.get(comment_id)
    
    if not comment:
        return {'errors': {'Comment could not be found'}}, 404
    
    if comment.user_id != current_user.id:
        return {'error': {'message': 'Unauthorized'}}, 401
    
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Successfully deleted'}