from app.models import db, environment, SCHEMA, UpDownVote
from sqlalchemy.sql import text


votes = [
    {
        'user_id': 1,
        'type_id': 4,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 1,
        'type_id': 9,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 1,
        'type_id': 12,
        'type': 'question',
        'vote': 0
    },
    {
        'user_id': 1,
        'type_id': 16,
        'type': 'question',
        'vote': 0
    },
    {
        'user_id': 1,
        'type_id': 20,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 1,
        'type_id': 23,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 2,
        'type_id': 1,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 2,
        'type_id': 7,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 2,
        'type_id': 19,
        'type': 'question',
        'vote': 0
    },
    {
        'user_id': 2,
        'type_id': 20,
        'type': 'question',
        'vote': 0
    },
    {
        'user_id': 2,
        'type_id': 22,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 2,
        'type_id': 23,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 3,
        'type_id': 2,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 3,
        'type_id': 4,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 3,
        'type_id': 12,
        'type': 'question',
        'vote': 0
    },
    {
        'user_id': 3,
        'type_id': 17,
        'type': 'question',
        'vote': 0
    },
    {
        'user_id': 3,
        'type_id': 21,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 3,
        'type_id': 23,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 4,
        'type_id': 1,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 4,
        'type_id': 7,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 4,
        'type_id': 19,
        'type': 'question',
        'vote': 0
    },
    {
        'user_id': 4,
        'type_id': 20,
        'type': 'question',
        'vote': 0
    },
    {
        'user_id': 4,
        'type_id': 22,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 4,
        'type_id': 23,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 5,
        'type_id': 4,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 5,
        'type_id': 9,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 5,
        'type_id': 12,
        'type': 'question',
        'vote': 0
    },
    {
        'user_id': 5,
        'type_id': 16,
        'type': 'question',
        'vote': 0
    },
    {
        'user_id': 5,
        'type_id': 20,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 5,
        'type_id': 23,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 6,
        'type_id': 1,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 6,
        'type_id': 7,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 6,
        'type_id': 19,
        'type': 'question',
        'vote': 0
    },
    {
        'user_id': 6,
        'type_id': 20,
        'type': 'question',
        'vote': 0
    },
    {
        'user_id': 6,
        'type_id': 22,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 6,
        'type_id': 23,
        'type': 'question',
        'vote': 1
    },
    {
        'user_id': 1,
        'type_id': 3,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 1,
        'type_id': 9,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 1,
        'type_id': 12,
        'type': 'answer',
        'vote': 0
    },
    {
        'user_id': 1,
        'type_id': 17,
        'type': 'answer',
        'vote': 0
    },
    {
        'user_id': 1,
        'type_id': 20,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 1,
        'type_id': 23,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 2,
        'type_id': 2,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 2,
        'type_id': 8,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 2,
        'type_id': 19,
        'type': 'answer',
        'vote': 0
    },
    {
        'user_id': 2,
        'type_id': 21,
        'type': 'answer',
        'vote': 0
    },
    {
        'user_id': 2,
        'type_id': 22,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 2,
        'type_id': 23,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 3,
        'type_id': 1,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 3,
        'type_id': 4,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 3,
        'type_id': 12,
        'type': 'answer',
        'vote': 0
    },
    {
        'user_id': 3,
        'type_id': 16,
        'type': 'answer',
        'vote': 0
    },
    {
        'user_id': 3,
        'type_id': 21,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 3,
        'type_id': 24,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 4,
        'type_id': 1,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 4,
        'type_id': 7,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 4,
        'type_id': 19,
        'type': 'answer',
        'vote': 0
    },
    {
        'user_id': 4,
        'type_id': 20,
        'type': 'answer',
        'vote': 0
    },
    {
        'user_id': 4,
        'type_id': 22,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 4,
        'type_id': 23,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 5,
        'type_id': 4,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 5,
        'type_id': 9,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 5,
        'type_id': 13,
        'type': 'answer',
        'vote': 0
    },
    {
        'user_id': 5,
        'type_id': 16,
        'type': 'answer',
        'vote': 0
    },
    {
        'user_id': 5,
        'type_id': 20,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 5,
        'type_id': 23,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 6,
        'type_id': 1,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 6,
        'type_id': 7,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 6,
        'type_id': 18,
        'type': 'answer',
        'vote': 0
    },
    {
        'user_id': 6,
        'type_id': 20,
        'type': 'answer',
        'vote': 0
    },
    {
        'user_id': 6,
        'type_id': 22,
        'type': 'answer',
        'vote': 1
    },
    {
        'user_id': 6,
        'type_id': 23,
        'type': 'answer',
        'vote': 1
    }
]

def seed_up_down_votes():
    for vote in votes:
        new_vote = UpDownVote(
            user_id=vote['user_id'],
            type_id=vote['type_id'],
            type=vote['type'],
            vote=vote['vote']
        )
        db.session.add(new_vote)
    db.session.commit()


def undo_up_down_votes():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.up_down_votes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM up_down_votes"))

    db.session.commit()
