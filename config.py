import os
basedir = os.path.abspath(os.path.dirname(__file__))

WTF_CSRF_ENABLED = True
SECRET_KEY = 'development key'

DATABASE = {
    'drivername': 'postgres',
    'host': 'localhost',
    'port': '5432',
    'username': 'pitchfork',
    'password': 'pitchfork',
    'database': 'scrape'
}

SQLALCHEMY_DATABASE_URI = 'postgres://pitchfork:***@localhost:5432/scrape'
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')
SQLALCHEMY_TRACK_MODIFICATIONS = False

# pagination
REVIEWS_PER_PAGE = 100

# searching
WHOOSH_BASE = os.path.join(basedir, 'search.db')
MAX_SEARCH_RESULTS = 50