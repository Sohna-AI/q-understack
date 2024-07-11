from datetime import datetime
from app.models import db, Comment, Question, User, Answer, environment, SCHEMA
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
    },
    {
        'title': 'Is HTML a programming language?',
        'user_comments': [
            {
                'username': 'bobbie',
                'comment': {
                    'comment': "HTML is a wizard in disguise.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Why is my code not working?",
        'user_comments': [
            {
                'username': 'Forest',
                'comment': {
                    'comment': "Your code needs a vacation.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How to write a 'Hello, World!' program?",
        'user_comments': [
            {
                'username': 'Singh',
                'comment': {
                    'comment': "Use invisible ink for the magic effect.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Why does my code not work when my computer is off?",
        'user_comments': [
            {
                'username': 'bobbie',
                'comment': {
                    'comment': "Your computer has stage fright.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How to center a button with CSS without using CSS?",
        'user_comments': [
            {
                'username': 'Singh',
                'comment': {
                    'comment': "Use a trampoline under your desk.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How to turn my laptop into a toaster using code?",
        'user_comments': [
            {
                'username': 'Forest',
                'comment': {
                    'comment': "ToastOS v2.0 is the best for this.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Can I write JavaScript in Python?",
        'user_comments': [
            {
                'username': 'Demo',
                'comment': {
                    'comment': "Only if you whisper it to the code.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Why is my loop infinite?",
        'user_comments': [
            {
                'username': 'Hdub',
                'comment': {
                    'comment': "Your loop is training for the marathon.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Why does my program crash when I throw my computer out the window?",
        'user_comments': [
            {
                'username': 'Singh',
                'comment': {
                    'comment': "Computers prefer soft landings.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How make computer fire?",
        'user_comments': [
            {
                'username': 'Forest',
                'comment': {
                    'comment': "Download the 'Dragon Breath' app.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Why rock no run code?",
        'user_comments': [
            {
                'username': 'bobbie',
                'comment': {
                    'comment': "Rocks are more into heavy metal.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How use stick to write program?",
        'user_comments': [
            {
                'username': 'Demo',
                'comment': {
                    'comment': "Only if it's a magic stick.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Why code no work on tree?",
        'user_comments': [
            {
                'username': 'Hdub',
                'comment': {
                    'comment': "Trees prefer leaves to code.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How make computer grow food?",
        'user_comments': [
            {
                'username': 'Forest',
                'comment': {
                    'comment': "Install the 'Farmville' plugin.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Is my code being watched?",
        'user_comments': [
            {
                'username': 'Demo',
                'comment': {
                    'comment': "Yes, by the invisible cat.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Can my computer read my mind?",
        'user_comments': [
            {
                'username': 'Hdub',
                'comment': {
                    'comment': "Only if you wear the special hat.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Is there a hidden message in my error logs?",
        'user_comments': [
            {
                'username': 'bobbie',
                'comment': {
                    'comment': "It's the ghost of debugging past.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Are my programs being controlled by someone else?",
        'user_comments': [
            {
                'username': 'Forest',
                'comment': {
                    'comment': "Elves are known to do that.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Can the government see my code?",
        'user_comments': [
            {
                'username': 'Demo',
                'comment': {
                    'comment': "Only if you use their special decoder ring.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How to program my virtual pet dragon to breathe fire on command?",
        'user_comments': [
            {
                'username': 'Singh',
                'comment': {
                    'comment': "Teach it to roar 'abracadabra'.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Can I use JavaScript to make my virtual castle float in the sky?",
        'user_comments': [
            {
                'username': 'Forest',
                'comment': {
                    'comment': "You'll need a flying carpet plugin.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How to write a program to make virtual cookies taste like real cookies?",
        'user_comments': [
            {
                'username': 'Demo',
                'comment': {
                    'comment': "Sprinkle some pixel sugar on them.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "Why does my virtual spaceship crash every time I try to land on the virtual moon?",
        'user_comments': [
            {
                'username': 'bobbie',
                'comment': {
                    'comment': "Try bribing the moon with some virtual cheese.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'title': "How to program a virtual reality dance party with dancing robots?",
        'user_comments': [
            {
                'username': 'Singh',
                'comment': {
                    'comment': "Make sure they have the groove module installed.",
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
    },
    {
        'text': 'Yes, if you close your eyes and believe hard enough.',
        'title': 'Is HTML a programming language?',
        'answerer_username': 'marnie',
        'user_comments': [
            {
                'username': 'bobbie',
                'comment': {
                    'comment': "That’s some next-level programming magic!",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Have you tried turning your monitor upside down?',
        'title': "Why is my code not working?",
        'answerer_username': 'bobbie',
        'user_comments': [
            {
                'username': 'Forest',
                'comment': {
                    'comment': "That’s how you make bugs fall out!",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Just shout "Hello, World!" at your computer. It’ll understand.',
        'title': "How to write a 'Hello, World!' program?",
        'answerer_username': 'Hdub',
        'user_comments': [
            {
                'username': 'Singh',
                'comment': {
                    'comment': "Computers love verbal encouragement.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Your code is shy and only works when it has an audience.',
        'title': "Why does my code not work when my computer is off?",
        'answerer_username': 'Demo',
        'user_comments': [
            {
                'username': 'bobbie',
                'comment': {
                    'comment': "Introverted code needs some love too.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Use a very strong magnet and place it at the center of your screen.',
        'title': "How to center a button with CSS without using CSS?",
        'answerer_username': 'Forest',
        'user_comments': [
            {
                'username': 'Singh',
                'comment': {
                    'comment': "That’s how you magnetize your code!",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Install the "BreadOS" operating system.',
        'title': "How to turn my laptop into a toaster using code?",
        'answerer_username': 'Singh',
        'user_comments': [
            {
                'username': 'Forest',
                'comment': {
                    'comment': "Toast all your code with that OS!",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Sure, if you write it very small in the comments section.',
        'title': "Can I write JavaScript in Python?",
        'answerer_username': 'marnie',
        'user_comments': [
            {
                'username': 'Demo',
                'comment': {
                    'comment': "Small code, big dreams.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'It’s trying to set a world record. Let it be.',
        'title': "Why is my loop infinite?",
        'answerer_username': 'Forest',
        'user_comments': [
            {
                'username': 'Hdub',
                'comment': {
                    'comment': "That loop has Olympic aspirations.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Computers are afraid of heights. Try keeping it grounded.',
        'title': "Why does my program crash when I throw my computer out the window?",
        'answerer_username': 'Hdub',
        'user_comments': [
            {
                'username': 'Singh',
                'comment': {
                    'comment': "Computers prefer to stay level-headed.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Rub two USB sticks together really fast.',
        'title': "How make computer fire?",
        'answerer_username': 'bobbie',
        'user_comments': [
            {
                'username': 'Forest',
                'comment': {
                    'comment': "That’s how you start a digital campfire.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Rocks are still in the Stone Age. They haven’t upgraded yet.',
        'title': "Why rock no run code?",
        'answerer_username': 'Demo',
        'user_comments': [
            {
                'username': 'bobbie',
                'comment': {
                    'comment': "Rocks need to download some updates.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Dip the stick in some magic ink and start writing on the clouds.',
        'title': "How use stick to write program?",
        'answerer_username': 'Singh',
        'user_comments': [
            {
                'username': 'Demo',
                'comment': {
                    'comment': "Cloud writing is the new coding.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Trees prefer being rooted, not routed.',
        'title': "Why code no work on tree?",
        'answerer_username': 'Forest',
        'user_comments': [
            {
                'username': 'Hdub',
                'comment': {
                    'comment': "Trees are into old-school programming.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Plant a keyboard in the ground and water it with binary code.',
        'title': "How make computer grow food?",
        'answerer_username': 'Hdub',
        'user_comments': [
            {
                'username': 'Forest',
                'comment': {
                    'comment': "You’ll have a byte farm in no time.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Only by the ghost in the machine.',
        'title': "Is my code being watched?",
        'answerer_username': 'Forest',
        'user_comments': [
            {
                'username': 'Demo',
                'comment': {
                    'comment': "Spooky surveillance is the best kind.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Only if you wear a tinfoil hat.',
        'title': "Can my computer read my mind?",
        'answerer_username': 'Demo',
        'user_comments': [
            {
                'username': 'Hdub',
                'comment': {
                    'comment': "Tinfoil hats are hacker-proof.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Yes, it’s trying to communicate in Morse code.',
        'title': "Is there a hidden message in my error logs?",
        'answerer_username': 'bobbie',
        'user_comments': [
            {
                'username': 'bobbie',
                'comment': {
                    'comment': "Listen for the beeps and boops.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Yes, by the tiny elves inside your computer.',
        'title': "Are my programs being controlled by someone else?",
        'answerer_username': 'Singh',
        'user_comments': [
            {
                'username': 'Forest',
                'comment': {
                    'comment': "Elfware is quite common these days.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Only if you write it in invisible ink.',
        'title': "Can the government see my code?",
        'answerer_username': 'Forest',
        'user_comments': [
            {
                'username': 'Demo',
                'comment': {
                    'comment': "Invisible ink is the ultimate security.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Feed it spicy virtual tacos.',
        'title': "How to program my virtual pet dragon to breathe fire on command?",
        'answerer_username': 'marnie',
        'user_comments': [
            {
                'username': 'Singh',
                'comment': {
                    'comment': "Dragons love a fiery diet.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Only if you tie a bunch of virtual balloons to it.',
        'title': "Can I use JavaScript to make my virtual castle float in the sky?",
        'answerer_username': 'Hdub',
        'user_comments': [
            {
                'username': 'Forest',
                'comment': {
                    'comment': "Balloons are the best lifting mechanism.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Add some virtual chocolate chips.',
        'title': "How to write a program to make virtual cookies taste like real cookies?",
        'answerer_username': 'Singh',
        'user_comments': [
            {
                'username': 'Demo',
                'comment': {
                    'comment': "Virtual chips, real taste.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'The virtual moon has a very strict parking policy.',
        'title': "Why does my virtual spaceship crash every time I try to land on the virtual moon?",
        'answerer_username': 'bobbie',
        'user_comments': [
            {
                'username': 'bobbie',
                'comment': {
                    'comment': "Parking permits are a must.",
                    'created_at': datetime.now()
                }
            }
        ]
    },
    {
        'text': 'Make sure the robots are programmed to love disco.',
        'title': "How to program a virtual reality dance party with dancing robots?",
        'answerer_username': 'Forest',
        'user_comments': [
            {
                'username': 'Singh',
                'comment': {
                    'comment': "Disco mode is essential for dancing bots.",
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
