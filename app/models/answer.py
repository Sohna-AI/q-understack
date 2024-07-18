from .db import add_prefix_for_prod, db, environment, SCHEMA
from sqlalchemy.sql import func
from flask_login import current_user

class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=False)
    text = db.Column(db.String(1500), nullable=False)
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
        up_votes = len([vote for vote in self.up_down_votes if vote.vote == True])
        down_votes = len([vote for vote in self.up_down_votes if vote.vote == False])
        num_votes = up_votes - down_votes
        return {
            'id': self.id,
            'user_id': self.user_id,
            'question_id': self.question_id,
            'text': self.text,
            'question': self.question.to_dict_list_page(),
            'comments': [comment.to_dict() for comment in self.comments],
            'num_votes': num_votes,
            'author': self.user.to_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict()
        }

    def to_dict_no_question(self):
        user_id = None
        if current_user.is_active:
            user_id = current_user.id

        up_votes = len([vote for vote in self.up_down_votes if vote.vote == True])
        down_votes = len([vote for vote in self.up_down_votes if vote.vote == False])
        num_votes = up_votes - down_votes

        user_save = False
        for save in self.saves:
            if save.user_id == user_id:
                user_save = True
        return {
            'id': self.id,
            'user_id': self.user_id,
            'question_id': self.question_id,
            'comments': [comment.to_dict() for comment in self.comments],
            'num_votes': num_votes,
            'text': self.text,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict(),
            'user_save': user_save
        }
