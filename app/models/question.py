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
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    details = db.Column(db.String(255), nullable=False)
    expectation = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())

    tags = db.relationship('Tag', secondary='question_tag', back_populates='questions')

    answers = db.relationship("Answer", back_populates='question', cascade="all, delete-orphan")

    comments = db.relationship("Comment",
            back_populates='question',
            primaryjoin='and_(foreign(Comment.type_id)==Question.id, Comment.type=="question")',
            cascade="all, delete-orphan")

    user = db.relationship('User', back_populates='questions')

    follows = db.relationship('Follow',
            back_populates='question',
            primaryjoin='and_(foreign(Follow.type_id) == Question.id, Follow.type=="question")',
            cascade='all, delete-orphan')

    saves = db.relationship('Save',
            back_populates='question',
            primaryjoin='and_(foreign(Save.type_id) == Question.id, Save.type=="question")',
            cascade='all, delete-orphan')

    up_down_votes = db.relationship('UpDownVote',
            back_populates='question',
            primaryjoin='and_(foreign(UpDownVote.type_id) == Question.id, UpDownVote.type=="question")',
            cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'title': self.title,
            'details': self.details,
            'expectation': self.expectation,
            'tags': [tag.to_dict() for tag in self.tags],
            'answers': [answer.to_dict_no_question() for answer in self.answers],
            'comments': [comment.to_dict() for comment in self.comments],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def to_dict_no_answers(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'details': self.details,
            'expectation': self.expectation,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
