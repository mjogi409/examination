from dotenv import load_dotenv
import os
import redis
from flask_session import Session


load_dotenv()


class Applicationconfig:
    SECRET_KEY = os.environ['SECRET_KEY']
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = "mysql://root:@localhost/oeps"

    SESSION_KEY = "acnijjcba"
    SESSION_TYPE = "filesystem"
    SESSION_PERMANENT = False
