from .db import db, environment, SCHEMA
from .question import question_tag
from sqlalchemy.sql import func


class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())

    questions = db.relationship('Question', secondary='question_tag', back_populates='tags')


    def to_dict(self):
        return {
            'id': self.id,
            'tag_name': self.tag_name,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
