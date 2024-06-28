from app.models import db, Answer, User, Question, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

question_answers = [
    {
        'title': 'Is HTML a programming language?',
        'user_answers': [
            {
                'username': 'marnie', 
                'answer': {
                        'text': 'Si',
                        'created_at': datetime.now()
                    }
            }
        ]
    }
]

def seed_answers():
    for info in question_answers:
        title, user_answers = info.values()
        question = Question.query.filter(Question.title == title).first()
        
        for user_info in user_answers:
            username, answer = user_info.values()
            
            user = User.query.filter(User.username == username).first()
            new_answer = Answer(
                user_id=user.id,
                text=answer['text'],
                created_at=answer['created_at'],
                updated_at=answer['created_at']
            )
            question.answers.append(new_answer)
    
    # demo = Answer(
    #     user_id = 2,
    #     question_id = 1,
    #     text = 'learn more languages to get a job'
    # )
    
    # db.session.add(demo)
    db.session.commit()
    
def undo_answers():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answers"))

    db.session.commit()