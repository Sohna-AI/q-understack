from app.models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text

def seed_answers():
    demo = Answer(
        user_id = 2,
        question_id = 1,
        text = 'learn more languages to get a job'
    )
    
    db.session.add(demo)
    db.session.commit()
    
def undo_answers():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answers"))

    db.session.commit()