from app.models import db, Question, User, environment, SCHEMA
from sqlalchemy.sql import text
import random
from datetime import datetime, timedelta

def random_datetime(start_date, end_date):
    delta = end_date - start_date
    int_delta = delta.days * 24 * 60 * 60 + delta.seconds
    random_second = random.randrange(int_delta)
    return start_date + timedelta(seconds=random_second)

start_date = datetime(2023, 1, 1)
end_date = datetime.now()

user_questions = [
    {
        'username': 'Demo',
        'questions': [
            {
                'title': 'Is HTML a programming language?',
                'details': "I'm trying to sum two variables together.",
                'expectation': 'I expected this to cause my page to render.',
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "Why is my code not working?",
                "details": "I wrote some code, but it's not working. What could be wrong?",
                "expectation": "An explanation of common mistakes that could cause code to not work.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "How to write a 'Hello, World!' program?",
                "details": "I need help writing a 'Hello, World!' program in any programming language.",
                "expectation": "Code examples for 'Hello, World!' programs in various languages.",
                "created_at": random_datetime(start_date, end_date),
            }
        ]
    },
    {
        'username': 'marnie',
        'questions': [
            {
                "title": "Why does my code not work when my computer is off?",
                "details": "My code only works when my computer is on. How can I fix this?",
                "expectation": "An explanation of why code requires the computer to be on and how to ensure code runs.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "How to center a button with CSS without using CSS?",
                "details": "I need to center a button on a web page but I don't want to use CSS. Any ideas?",
                "expectation": "Methods to center a button without CSS.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "How to turn my laptop into a toaster using code?",
                "details": "I want to use my laptop as a toaster. Is there any code that can help me achieve this?",
                "expectation": "Creative and humorous responses to turning a laptop into a toaster.",
                "created_at": random_datetime(start_date, end_date),
            },
        ]
    },
    {
        'username': 'bobbie',
        'questions': [
            {
                "title": "Can I write JavaScript in Python?",
                "details": "Is it possible to write JavaScript code directly within a Python script?",
                "expectation": "Explanation and examples of how or if this can be done.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "Why is my loop infinite?",
                "details": "I have a loop that never ends. What could be the reason?",
                "expectation": "Common causes of infinite loops and how to fix them.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "Why does my program crash when I throw my computer out the window?",
                "details": "My program stops working when I throw my computer out the window. How can I prevent this?",
                "expectation": "Humorous responses and the real reason why this happens.",
                "created_at": random_datetime(start_date, end_date),
            },
        ]
    },
    {
        'username': 'Hdub',
        'questions': [
            {
                "title": "How make computer fire?",
                "details": "Me want computer to make fire. How do?",
                "expectation": "Explanation on why computers can't produce fire and safety tips.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "Why rock no run code?",
                "details": "Me try put code on rock. Rock no run code. Why?",
                "expectation": "Explanation of why rocks are not programmable.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "How use stick to write program?",
                "details": "Me have stick. Me want write program. How?",
                "expectation": "Creative ideas on how to simulate programming using primitive tools.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "Why code no work on tree?",
                "details": "Me try run code on tree. Tree no work. Why?",
                "expectation": "Explanation of why trees can't run code.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "How make computer grow food?",
                "details": "Me want computer to grow food for me. How make?",
                "expectation": "Discussion of the limits of computers in agriculture and food production.",
                "created_at": random_datetime(start_date, end_date),
            }
        ]
    },
    {
        'username': 'Singh',
        'questions': [
            {
                "title": "Is my code being watched?",
                "details": "I feel like someone is monitoring my code every time I run it. How can I tell if I'm being watched?",
                "expectation": "Methods to check for unauthorized access or monitoring.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "Can my computer read my mind?",
                "details": "I think my computer knows what I'm thinking before I even type. Is it possible?",
                "expectation": "Explanation of privacy and security regarding computer usage.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "Is there a hidden message in my error logs?",
                "details": "I keep seeing strange patterns in my error logs. Could they be hidden messages?",
                "expectation": "Analysis of error logs and debunking hidden messages theories.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "Are my programs being controlled by someone else?",
                "details": "I think someone else is controlling my programs remotely. How can I stop them?",
                "expectation": "Steps to secure your computer and code from unauthorized access.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "Can the government see my code?",
                "details": "I'm worried the government is spying on my programming activities. Is there a way to hide my code?",
                "expectation": "Discussion on encryption and privacy measures for coding.",
                "created_at": random_datetime(start_date, end_date),
            }
        ]
    },
    {
        'username': 'Forest',
        'questions': [
            {
                "title": "How to program my virtual pet dragon to breathe fire on command?",
                "details": "I want my virtual pet dragon to breathe fire when I say 'fire breath'. How do I code this?",
                "expectation": "Creative ideas on simulating interactive behaviors in a virtual reality environment.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "Can I use JavaScript to make my virtual castle float in the sky?",
                "details": "I've built a virtual castle, but I want it to float in the sky. Is this possible with code?",
                "expectation": "Imaginative responses and why the laws of physics still apply in virtual worlds.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "How to write a program to make virtual cookies taste like real cookies?",
                "details": "I've baked virtual cookies, but they don't taste like real ones. Can I fix this with programming?",
                "expectation": "Funny ideas about simulating sensory experiences in a virtual environment.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "Why does my virtual spaceship crash every time I try to land on the virtual moon?",
                "details": "I'm having trouble landing my virtual spaceship safely on the virtual moon. What's going wrong?",
                "expectation": "Humorous responses and suggestions for improving piloting skills in virtual reality.",
                "created_at": random_datetime(start_date, end_date),
            },
            {
                "title": "How to program a virtual reality dance party with dancing robots?",
                "details": "I want to throw a virtual reality dance party with robots as the dancers. How should I code the dance moves?",
                "expectation": "Creative ideas for choreographing virtual dance routines and robot interactions.",
                "created_at": random_datetime(start_date, end_date),
            }
        ]
    }
]

def seed_questions():
    for info in user_questions:
        username, questions = info.values()
        user = User.query.filter(User.username == username).first()

        for questionInfo in questions:
            question = Question(
                user_id=user.id,
                title=questionInfo['title'],
                details=questionInfo['details'],
                expectation=questionInfo['expectation'],
                created_at=questionInfo['created_at'],
                updated_at=questionInfo['created_at']
            )
            db.session.add(question)

    db.session.commit()

def undo_questions():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
