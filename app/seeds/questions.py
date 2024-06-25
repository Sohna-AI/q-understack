from app.models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text

def seed_questions():
    demo = Question(
        user_id = 1,
        title = 'Wow how do you use flaskWTF?',
        details = 'this is actually flaskWTF not WTF',
        expectation = 'Hoping to get a job knowing flask'
    )
    
    db.session.add(demo)
    db.session.commit()
    
def undo_questions():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()