from app.models import db, Follow, environment, SCHEMA
from sqlalchemy.sql import text


follows = [
    {
        'user_id': 1,
        'type_id': 5,
        'type': 'question'
    },
    {
        'user_id': 2,
        'type_id': 17,
        'type': 'question'
    },
    {
        'user_id': 3,
        'type_id': 23,
        'type': 'question'
    },
    {
        'user_id': 4,
        'type_id': 2,
        'type': 'question'
    },
    {
        'user_id': 5,
        'type_id': 6,
        'type': 'question'
    },
    {
        'user_id': 6,
        'type_id': 11,
        'type': 'question'
    },
    {
        'user_id': 1,
        'type_id': 1,
        'type': 'answer'
    },
    {
        'user_id': 2,
        'type_id': 8,
        'type': 'answer'
    },
    {
        'user_id': 3,
        'type_id': 19,
        'type': 'answer'
    },
    {
        'user_id': 4,
        'type_id': 4,
        'type': 'answer'
    },
    {
        'user_id': 5,
        'type_id': 14,
        'type': 'answer'
    },
    {
        'user_id': 6,
        'type_id': 22,
        'type': 'answer'
    }
]

def seed_follows():
    for follow in follows:
        new_follow = Follow(
            user_id=follow['user_id'],
            type_id=follow['type_id'],
            type=follow['type']
        )
        db.session.add(new_follow)
    db.session.commit()


def undo_follows():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()
