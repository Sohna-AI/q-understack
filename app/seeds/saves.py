from app.models import db, Question, User, Save, environment, SCHEMA
from sqlalchemy.sql import text


def seed_saves():
    new_save = Save(
        user_id=1,
        type_id=4,
        type='question'
    )
    db.session.add(new_save)
    db.session.commit()
    

def undo_saves():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.saves RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM saves"))

    db.session.commit()