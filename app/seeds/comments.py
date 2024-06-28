from datetime import datetime
from app.models import answer, db, Comment, Question, User, Answer, environment, SCHEMA
from sqlalchemy.sql import text

question_comments = [
    {
        'title': 'Is HTML a programming language?',
        'user_comments': [
            {
                'username': 'bobbie',
                'comment': {
                    'comment': "Now we're getting into some serious territory",
                    'created_at': datetime.now()
                }
            }
        ]
    }
]

answer_comments = [
    {
        'text': 'Si',
        'title': 'Is HTML a programming language?',
        'answerer_username': 'marnie',
        'user_comments': [
            {
                'username': 'bobbie',
                'comment': {
                    'comment': "Woah now",
                    'created_at': datetime.now()
                }
            }
        ]
    }
]

def seed_comments():
    for info in question_comments:
        title, user_comments = info.values()
        question = Question.query.filter(Question.title == title).first()
        
        for comment_info in user_comments:
            username, comment = comment_info.values()
            
            user = User.query.filter(User.username == username).first()
            new_comment = Comment(
                user_id=user.id,
                comment=comment['comment'],
                type='question',
                created_at=comment['created_at'],
                updated_at=comment['created_at']
            )
            question.comments.append(new_comment)
    
    for info in answer_comments:
        text, title, answerer_username, user_comments = info.values()
        question = Question.query.filter(Question.title == title).first()
        answerer = User.query.filter(User.username == answerer_username).first()
        answer = Answer.query.filter(Answer.question_id == question.id and
                                    Answer.user_id == answerer.id and
                                    Answer.text == text).first()
        
        for comment_info in user_comments:
            username, comment = comment_info.values()
            
            user = User.query.filter(User.username == username).first()
            new_comment = Comment(
                user_id=user.id,
                comment=comment['comment'],
                type='answer',
                created_at=comment['created_at'],
                updated_at=comment['created_at']
            )
            answer.comments.append(new_comment) 
    
    # demo = Comment(
    #     user_id=3,
    #     type_id=1,
    #     type='question',
    #     comment='this is a comment added to the question'
    # )
    
    # demo2 = Comment(
    #     user_id=3,
    #     type_id=1,
    #     type='answer',
    #     comment='this is a comment added to the answer'
    # )
    
    # db.session.add(demo)
    # db.session.add(demo2)
    db.session.commit()
    

def undo_comments():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()