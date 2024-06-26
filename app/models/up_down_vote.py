from .db import db, environment, SCHEMA
from sqlalchemy.sql import func


class UpDownVote(db.Model):
    __tablename__ = 'up_down_votes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type_id = db.Column(db.Integer, nullable=False)
    _type = db.Column('type', db.String(20), nullable=False)
    vote = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    user = db.relationship('user', back_populates='up_down_votes')
    question = db.relationship('Question',
                               back_populates='up_down_votes',
                               primaryjoin='and_(foreign(UpDownVote.type_id) == Question.id, UpDownVote._type=="question")',
                               cascade='all, delete-orphan'
                               )
    answer = db.relationship('Answer',
                             back_populates='up_down_votes',
                             primaryjoin='and_(foreign(UpDownVote.type_id) == Answer.id, UpDownVote._type=="answer")',
                             cascade='all, delete-orphan')

    def __init__(self, user_id, type_id, type, vote):
        self.user_id = user_id
        self.type_id = type_id
        self.type = type
        self.vote = vote

    @property
    def type(self):
        return self._type

    @type.setter
    def type(self, value):
        if value not in ('answer', 'question'):
            raise ValueError("Type must be 'answer' or 'question'")
        self._type = value

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'type_id': self.type_id,
            'type': self.type,
            'vote': self.vote,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
