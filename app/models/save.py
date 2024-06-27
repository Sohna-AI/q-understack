from .db import db, environment, SCHEMA
from .question import Question
from .answer import Answer
from sqlalchemy.sql import func
from sqlalchemy.orm import validates


class Save(db.Model):
    __tablename__ = 'saves'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type_id = db.Column(db.Integer, nullable=False)
    type = db.Column('type', db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    user = db.relationship('User', back_populates='saves')

    question = db.relationship('Question',
            back_populates='saves',
            primaryjoin='and_(foreign(Save.type_id) == Question.id, Save.type=="question")')
    
    answer = db.relationship('Answer',
            back_populates='saves',
            primaryjoin='and_(foreign(Save.type_id) == Answer.id, Save.type=="answer")')

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

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'type_id': self.type_id,
            'type': self.type,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
