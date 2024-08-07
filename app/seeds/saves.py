from app.models import db, Save, environment, SCHEMA
from sqlalchemy.sql import text

saves = [
    {
        'user_id': 1,
        'type_id': 4,
        'type': 'question'
    },
    {
        'user_id': 2,
        'type_id': 16,
        'type': 'question'
    },
    {
        'user_id': 3,
        'type_id': 22,
        'type': 'question'
    },
    {
        'user_id': 4,
        'type_id': 1,
        'type': 'question'
    },
    {
        'user_id': 5,
        'type_id': 5,
        'type': 'question'
    },
    {
        'user_id': 6,
        'type_id': 10,
        'type': 'question'
    },
    {
        'user_id': 1,
        'type_id': 5,
        'type': 'answer'
    },
    {
        'user_id': 2,
        'type_id': 9,
        'type': 'answer'
    },
    {
        'user_id': 3,
        'type_id': 18,
        'type': 'answer'
    },
    {
        'user_id': 4,
        'type_id': 1,
        'type': 'answer'
    },
    {
        'user_id': 5,
        'type_id': 13,
        'type': 'answer'
    },
    {
        'user_id': 6,
        'type_id': 23,
        'type': 'answer'
    }
]

def seed_saves():
    for save in saves:
        new_save = Save(
            user_id=save['user_id'],
            type_id=save['type_id'],
            type=save['type']
        )
        db.session.add(new_save)
    db.session.commit()


def undo_saves():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.saves RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM saves"))

    db.session.commit()
