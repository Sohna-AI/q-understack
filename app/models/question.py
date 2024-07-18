from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from flask_login import current_user

question_tag = db.Table('question_tags',
    db.Column('question_id', db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), primary_key=True),
    )


if environment == 'production':
    question_tag.schema = SCHEMA


class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    details = db.Column(db.String(1500), nullable=False)
    expectation = db.Column(db.String(1500), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())

    tags = db.relationship('Tag', secondary=question_tag, back_populates='questions')

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
        num_answers = len(self.answers)
        up_votes = len([vote for vote in self.up_down_votes if vote.vote == True])
        down_votes = len([vote for vote in self.up_down_votes if vote.vote == False])
        # votes = up_votes - down_votes

        return {
            'id': self.id,
            'title': self.title,
            'details': self.details,
            'expectation': self.expectation,
            'tags': [tag.to_dict() for tag in self.tags],
            'answers': [answer.to_dict_no_question() for answer in self.answers],
            'comments': [comment.to_dict() for comment in self.comments],
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'author': self.user.to_dict(),
            'num_answers': num_answers,
            'up_votes': up_votes,
            'down_votes': down_votes,
        }

    def to_dict_list_page(self):
        num_answers = len(self.answers)
        up_votes = len([vote for vote in self.up_down_votes if vote.vote == True])
        down_votes = len([vote for vote in self.up_down_votes if vote.vote == False])
        num_votes = up_votes - down_votes

        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'details': self.details,
            'num_answers': num_answers,
            'num_votes': num_votes,
            'tags': [tag.to_dict() for tag in self.tags],
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'author': self.user.to_dict()
        }

    def to_dict_details(self):
        user_id = current_user.id

        up_votes = len([vote for vote in self.up_down_votes if vote.vote == True])
        down_votes = len([vote for vote in self.up_down_votes if vote.vote == False])
        num_votes = up_votes - down_votes
        votes = [vote.to_dict() for vote in self.up_down_votes if vote.user_id == user_id]
        user_vote = None
        if len(votes):
            user_vote = votes[0]['vote']

        user_save = False
        for save in self.saves:
            if save.user_id == user_id:
                user_save = True

        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'details': self.details,
            'expectation': self.expectation,
            'num_votes': num_votes,
            'tags': [tag.to_dict() for tag in self.tags],
            'comments': [comment.to_dict() for comment in self.comments],
            'answers': [answer.to_dict_no_question() for answer in self.answers],
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'author': self.user.to_dict(),
            'user_vote': user_vote,
            'user_save': user_save
        }
