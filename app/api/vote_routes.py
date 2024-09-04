from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, UpDownVote, Question, Answer
from datetime import datetime

vote_routes = Blueprint('votes', __name__)

@vote_routes.route('/questions/<int:type_id>', methods=['GET'])
def get_question_votes(type_id):
    
    votes = UpDownVote.query.filter_by(type_id=type_id, type='question')
    return [vote.to_dict() for vote in votes]

@vote_routes.route('/answers/<int:type_id>', methods=['GET'])
def get_answer_votes(type_id):
    
    votes = UpDownVote.query.filter_by(type_id=type_id, type='answer')
    return [vote.to_dict() for vote in votes]

@vote_routes.route('/', methods=['POST'])
@login_required
def vote(): 
    data = request.get_json()
    
    vote_type = data.get('type')
    type_id = data.get('type_id')
    vote_value = data.get('vote')
    
    if not vote_type or not type_id or vote_value is None:
        return ({'error': 'Missing required fields'}), 400
    
    if vote_type not in ['question', 'answer']:
        return ({'error': "Invalid type, must be 'question' or 'answer'" }), 400
    
    if vote_type == 'question':
        entity = Question.query.get(type_id)
    elif vote_type == 'answer':
        entity = Answer.query.get(type_id)
    
    if not entity:
        return ({'error': f'{vote_type.capitalize()} not found'}), 404
    
    existing_vote = UpDownVote.query.filter_by(user_id=current_user.id, type=vote_type, type_id=type_id).first()
    
    if existing_vote:
        existing_vote.vote = vote_value
        existing_vote.updated_at = datetime.now()
        db.session.commit()
        return existing_vote.to_dict()
    else:
        new_vote = UpDownVote(user_id=current_user.id, type=vote_type, type_id=type_id, vote=vote_value)
        db.session.add(new_vote)
        db.session.commit()
        return new_vote.to_dict()
    
@vote_routes.route('/<int:vote_id>/questions', methods=['DELETE'])
@login_required
def remove_vote(vote_id):
    """
    Delete vote by vote_id
    """
    vote = UpDownVote.query.filter_by(type='question', id=vote_id, user_id=current_user.id).first()
    if not vote:
        return {'errors': {'message': 'Vote could not be found'}}, 404

    if vote.user_id != current_user.id:
        return {'error': {'message': 'Unauthorized'}}, 401
    db.session.delete(vote)
    db.session.commit()
    return {'message': 'Successfully deleted'}
