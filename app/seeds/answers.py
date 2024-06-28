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
                    'text': 'Yes, if you close your eyes and believe hard enough.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Why is my code not working?",
        'user_answers': [
            {
                'username': 'bobbie',
                'answer': {
                    'text': 'Have you tried turning your monitor upside down?',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How to write a 'Hello, World!' program?",
        'user_answers': [
            {
                'username': 'Hdub',
                'answer': {
                    'text': 'Just shout "Hello, World!" at your computer. It\'ll understand.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Why does my code not work when my computer is off?",
        'user_answers': [
            {
                'username': 'Demo',
                'answer': {
                    'text': 'Your code is shy and only works when it has an audience.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How to center a button with CSS without using CSS?",
        'user_answers': [
            {
                'username': 'Forest',
                'answer': {
                    'text': 'Use a very strong magnet and place it at the center of your screen.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How to turn my laptop into a toaster using code?",
        'user_answers': [
            {
                'username': 'Singh',
                'answer': {
                    'text': 'Install the "BreadOS" operating system.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Can I write JavaScript in Python?",
        'user_answers': [
            {
                'username': 'marnie',
                'answer': {
                    'text': 'Sure, if you write it very small in the comments section.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Why is my loop infinite?",
        'user_answers': [
            {
                'username': 'Forest',
                'answer': {
                    'text': 'It\'s trying to set a world record. Let it be.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Why does my program crash when I throw my computer out the window?",
        'user_answers': [
            {
                'username': 'Hdub',
                'answer': {
                    'text': 'Computers are afraid of heights. Try keeping it grounded.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How make computer fire?",
        'user_answers': [
            {
                'username': 'bobbie',
                'answer': {
                    'text': 'Rub two USB sticks together really fast.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Why rock no run code?",
        'user_answers': [
            {
                'username': 'Demo',
                'answer': {
                    'text': 'Rocks are still in the Stone Age. They haven\'t upgraded yet.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How use stick to write program?",
        'user_answers': [
            {
                'username': 'Singh',
                'answer': {
                    'text': 'Dip the stick in some magic ink and start writing on the clouds.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Why code no work on tree?",
        'user_answers': [
            {
                'username': 'Forest',
                'answer': {
                    'text': 'Trees prefer being rooted, not routed.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How make computer grow food?",
        'user_answers': [
            {
                'username': 'Hdub',
                'answer': {
                    'text': 'Plant a keyboard in the ground and water it with binary code.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Is my code being watched?",
        'user_answers': [
            {
                'username': 'Forest',
                'answer': {
                    'text': 'Only by the ghost in the machine.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Can my computer read my mind?",
        'user_answers': [
            {
                'username': 'Demo',
                'answer': {
                    'text': 'Only if you wear a tinfoil hat.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Is there a hidden message in my error logs?",
        'user_answers': [
            {
                'username': 'bobbie',
                'answer': {
                    'text': 'Yes, it\'s trying to communicate in Morse code.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Are my programs being controlled by someone else?",
        'user_answers': [
            {
                'username': 'Singh',
                'answer': {
                    'text': 'Yes, by the tiny elves inside your computer.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Can the government see my code?",
        'user_answers': [
            {
                'username': 'Forest',
                'answer': {
                    'text': 'Only if you write it in invisible ink.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How to program my virtual pet dragon to breathe fire on command?",
        'user_answers': [
            {
                'username': 'marnie',
                'answer': {
                    'text': 'Feed it spicy virtual tacos.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Can I use JavaScript to make my virtual castle float in the sky?",
        'user_answers': [
            {
                'username': 'Hdub',
                'answer': {
                    'text': 'Only if you tie a bunch of virtual balloons to it.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How to write a program to make virtual cookies taste like real cookies?",
        'user_answers': [
            {
                'username': 'Singh',
                'answer': {
                    'text': 'Add some virtual chocolate chips.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Why does my virtual spaceship crash every time I try to land on the virtual moon?",
        'user_answers': [
            {
                'username': 'bobbie',
                'answer': {
                    'text': 'The virtual moon has a very strict parking policy.',
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How to program a virtual reality dance party with dancing robots?",
        'user_answers': [
            {
                'username': 'Forest',
                'answer': {
                    'text': 'Make sure the robots are programmed to love disco.',
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
    
    db.session.commit()

def undo_answers():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answers"))

    db.session.commit()
