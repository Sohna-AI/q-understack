from .db import db, environment, SCHEMA
from sqlalchemy.sql import func

question_tag = db.Table('question_tag',
    db.Column('question_id', db.Integer, db.ForeignKey('questions.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True),
    )


class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    details = db.Column(db.String(255), nullable=False)
    expectation = db.Column(db.String(255), nullable=False)
    tags = db.relationship('Tag', secondary=question_tag, backref=db.backref('questions', lazy='dynamic'))
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'details': self.details,
            'expectation': self.expectation,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
