from .db import db, environment, SCHEMA
from sqlalchemy.sql import func


class Follow(db.Model):
    __tablename__ = 'follows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    type_id = db.Column(db.Integer, nullable=False)
    _type = db.Column('type', db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())

    def __init__(self, user_id, type_id, type):
        self.user_id = user_id
        self.type_id = type_id
        self.type = type

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
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
