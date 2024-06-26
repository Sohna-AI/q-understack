from flask import Blueprint, request
from app.models import User, db, Follow, Question, Answer

test_routes = Blueprint('test', __name__)

@test_routes.route('/')
def test():
    q = Question.query.first()
    print(q.to_dict())
    return q.to_dict()