from flask.cli import AppGroup

from app.seeds.follows import seed_follows, undo_follows
from app.seeds.tags import seed_tags, undo_tags
from app.seeds.up_down_votes import seed_up_down_votes, undo_up_down_votes
from .users import seed_users, undo_users
from .questions import seed_questions, undo_questions
from .answers import seed_answers, undo_answers
from .comments import seed_comments, undo_comments
from .saves import seed_saves, undo_saves

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_tags()
        undo_follows()
        undo_up_down_votes()
        undo_saves()
        undo_comments()
        undo_answers()
        undo_questions()
        undo_users()
    seed_users()
    seed_questions()
    seed_answers()
    seed_comments()
    seed_saves()
    seed_up_down_votes()
    seed_follows()
    seed_tags()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_tags()
    undo_follows()
    undo_up_down_votes()
    undo_saves()
    undo_comments()
    undo_answers()
    undo_questions()
    undo_users()
    # Add other undo functions here
