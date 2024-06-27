from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    demo = Comment(
        user_id=3,
        type_id=1,
        type='question',
        comment='this is a comment added to the question'
    )
    
    demo2 = Comment(
        user_id=3,
        type_id=1,
        type='answer',
        comment='this is a comment added to the answer'
    )
    
    db.session.add(demo)
    db.session.add(demo2)
    db.session.commit()
    

def undo_comments():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()