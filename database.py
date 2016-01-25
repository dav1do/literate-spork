from flask_sqlalchemy import declarative_base, SQLAlchemy
from sqlalchemy.orm import scoped_session, sessionmaker
from app import db

engine = db.engine
Base = declarative_base()
Base.metadata.reflect(engine)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base.query = db_session.query_property()
# session = db_session()


def init_db():
    # import all modules here that might define models so that
    # they will be registered properly on the metadata.  Otherwise
    # you will have to import them first before calling init_db()
    # TODO import yourapplication.models
    Base.metadata.create_all(bind=engine)


def add_item_to_database(db_session, db_item):
    try:
        db_session.add(db_item)
        db_session.commit()
    except:
        db_session.rollback()
        raise
    finally:
        db_session.close()
