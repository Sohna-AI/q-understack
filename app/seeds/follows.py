from app.models import db, Follow, environment, SCHEMA
from sqlalchemy.sql import text

def seed_follows():
    question_demo = Follow(
        user_id=1,
        type_id=1,
        type='question'
    )
    
    answer_demo = Follow(
        user_id=2,
        type_id=1,
        type='answer'
    ) 
    
    db.session.add(question_demo)
    db.session.add(answer_demo)
    db.session.commit()
    
def undo_follows():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))
        
    db.session.commit()