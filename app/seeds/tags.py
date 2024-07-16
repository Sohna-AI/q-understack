from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text

from app.models.question import Question


tags = [
    {
        'tag': 'Caveman',
        'ids': [10, 11, 12, 13, 14]
    },
    {
        'tag': 'Virtual reality',
        'ids': [20, 21, 22, 23, 24]
    },
    {
        'tag': 'Paranoid',
        'ids': [15, 16, 17, 18, 19]
    },
    {
        'tag': 'Stupid',
        'ids': [1, 2, 3, 4, 5]
    },
    {
        'tag': 'Silly',
        'ids': [6, 7, 8, 9]
    },
    {
        'tag': 'Programming',
        'ids': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    }
]

def seed_tags():
    for info in tags:
        tag, ids = info.values()
        new_tag = Tag(
            tag_name=tag,
            questions=[]
        )
        for id in ids:
            question = Question.query.get(id)
            new_tag.questions.append(question)
        db.session.add(new_tag)

    db.session.commit()


def undo_tags():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.question_tags RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM question_tags"))
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
