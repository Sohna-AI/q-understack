from .db import add_prefix_for_prod, db, environment, SCHEMA
from sqlalchemy.sql import func


class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=False)
    text = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())

    question = db.relationship("Question", back_populates="answers")

    comments = db.relationship("Comment",
            back_populates='answer',
            primaryjoin='and_(foreign(Comment.type_id)==Answer.id, Comment.type=="answer")',
            cascade="all, delete-orphan")
    
    user = db.relationship('User', back_populates="answers")
    
    follows = db.relationship('Follow',
            back_populates='answer',
            primaryjoin='and_(foreign(Follow.type_id) == Answer.id, Follow.type=="answer")',
            cascade='all, delete-orphan')
    
    saves = db.relationship('Save',
            back_populates='answer',
            primaryjoin='and_(foreign(Save.type_id) == Answer.id, Save.type=="answer")',
            cascade='all, delete-orphan')

    up_down_votes = db.relationship('UpDownVote',
            back_populates='answer',
            primaryjoin='and_(foreign(UpDownVote.type_id) == Answer.id, UpDownVote.type=="answer")',
            cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'question_id': self.question_id,
            'text': self.text,
            'question': self.question.to_dict_no_answers(),
            'comments': [comment.to_dict() for comment in self.comments],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def to_dict_no_question(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'question_id': self.question_id,
            'text': self.text,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
