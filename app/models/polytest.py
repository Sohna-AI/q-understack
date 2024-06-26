from .db import db
# from .db import User
from .db import environment, SCHEMA
from sqlalchemy.sql import func
from sqlalchemy.orm import validates


class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    text = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    followers = db.relationship("Follow", primaryjoin="and_(Follow.type=='answer', foreign(Follow.type_id)==Answer.id)")
    
    
class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    details = db.Column(db.String(255), nullable=False)
    expectation = db.Column(db.String(255), nullable=False)
    # tags = db.relationship('Tag', secondary=question_tag, backref=db.backref('questions', lazy='dynamic'))
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    user = db.relationship('User')
    
    followers = db.relationship('Follow', primaryjoin="and_(Follow.type=='question', foreign(Follow.type_id)==Question.id)")

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'title': self.title,
            'details': self.details,
            'expectation': self.expectation,
            # 'tags': [tag.to_dict() for tag in self.tags],
            # 'answers': [answer.to_dict_no_question() for answer in self.answers],
            # 'comments': [comment.to_dict() for comment in self.comments],
            'follows': [follow.to_dict() for follow in self.followers],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }


class Follow(db.Model):
    __tablename__ = 'follows'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type_id = db.Column(db.Integer, nullable=False)
    type = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    user = db.relationship("User", back_populates='follows')

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    @property
    def content(self):
        if self.type == 'question':
            return Question.query.filter(id=self.type_id).first()
        elif self.type == 'answer':
            return Answer.query.filter(id=self.type_id).first()
        else:
            raise Exception("Unknown type")
    
    @validates('type')
    def validate_type(self, key, type):
        if type != 'question' and type != 'answer':
            raise AssertionError("type must be 'question' or 'answer'")
        return type