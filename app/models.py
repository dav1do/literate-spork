from collections import OrderedDict
from sqlalchemy import and_
from database import Base


class PitchforkReviews(Base):
    """"""
    __table__ = Base.metadata.tables['reviews']
    __searchable__ = ['artist', 'album']

    @staticmethod
    def get_best_new_music():
        """Returns a query object you can access using methods such as count, all, etc"""
        best_new_music = PitchforkReviews.query.filter(PitchforkReviews.accolades == 'Best New Music').\
            order_by(PitchforkReviews.review_date.desc())
        return best_new_music

    @staticmethod
    def get_reviews_between_scores(low, high):
        if not low and not high:
            raise ValueError
        if not low:
            low = 0
        if not high:
            high = 10
        reviews = PitchforkReviews.query.filter(and_(PitchforkReviews.score >= low,
                                                     PitchforkReviews.score <= high)).\
            order_by(PitchforkReviews.review_date.desc())
        return reviews

    @staticmethod
    def get_all_reviews():
        reviews = PitchforkReviews.query.all()
        return reviews

    @staticmethod
    def get_reviews_from_criteria(criteria):
        try:
            reviews = PitchforkReviews.get_reviews_between_scores(criteria.low_score.data, criteria.high_score.data)
        except ValueError:
            # make it a query object at least
            reviews = PitchforkReviews.query
        # NOTE: the results may be a bit unexpected because we filter the results set by whichever column
        # comes up first in the for loop. To prevent that, need to use union/intersect
        # score and accolades can be collected as is
        # making an alphabetical list of elements for better control.
        l = {c.id: c for c in criteria}
        l = OrderedDict(sorted(l.items()))
        r_artist = r_album = r_reviewer = False
        for i in l:
            # in this order:
            # ['accolades', 'album', 'artist', 'csrf_token', 'high_score', 'low_score', 'reviewer', 'year']
            c = l[i]
            if not c.data:
                # assume empty means wasn't entered
                continue
            elif c.id == 'accolades':
                # start with accolades because it will reduce dataset size and will be same set if it's first/last
                if c.data == 'either':
                    # don't do anything since reviews is either everything or everything between the scores given
                    pass
                elif c.data == 'neither':
                    reviews = reviews.filter((and_(PitchforkReviews.accolades != 'Best New Music',
                                                   PitchforkReviews.accolades != 'Best New Reissue')))
                else:
                    reviews = reviews.filter(PitchforkReviews.accolades == c.data)
            elif c.id == 'artist':
                r_artist = reviews.filter(PitchforkReviews.artist.ilike('%s%s%s' % ('%', c.data, '%')))
            elif c.id == 'album':
                r_album = reviews.filter(PitchforkReviews.album.ilike('%s%s%s' % ('%', c.data, '%')))
            elif c.id == 'reviewer':
                r_reviewer = reviews.filter(PitchforkReviews.reviewer.ilike('%s%s%s' % ('%', c.data, '%')))
            elif c.id == 'year':
                reviews = reviews.filter(PitchforkReviews.year == str(c.data))
            else:
                continue
        if r_artist:
            reviews = reviews.intersect(r_artist)
        if r_album:
            reviews = reviews.intersect(r_album)
        if r_reviewer:
            reviews = reviews.intersect(r_reviewer)
        return reviews

    """
    ===================================
    from the original table definition
    ===================================
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True)
    album = Column('album', String)
    artist = Column('artist', String)
    review_date = Column('review_date', DateTime)
    score = Column('score', Float)
    # year is in inconsistent format from pitchfork so stick with string
    year = Column('year', String, nullable=True)
    label = Column('label', String, nullable=True)
    accolades = Column('accolades', String, nullable=True)
    review_text = Column('review_text', String, nullable=True)
    reviewer = Column('reviewer', String, nullable=True)
    splash_artist = Column('splash_artist', String)
    splash_album = Column('splash_album', String)
    review_url = Column('review_url', String)
    """


class MetacriticReviews(Base):
    __table__ = Base.metadata.tables['metacritic']

    @staticmethod
    def get_universally_acclaimed_reviews():
        reviews = MetacriticReviews.query.filter(MetacriticReviews.critic_score > 80).\
            order_by(MetacriticReviews.review_date.desc())
        return reviews

    @staticmethod
    def get_reviews_between_scores(low, high):
        reviews = MetacriticReviews.query.filter(and_(MetacriticReviews.critic_score >= low,
                                                      MetacriticReviews.critic_score <= high)).\
            order_by(MetacriticReviews.review_date.desc())
        return reviews

    @staticmethod
    def get_all_reviews():
        reviews = MetacriticReviews.query.all()
        return reviews

    """
    ===================================
    from the original table definition
    ===================================
    __tablename__ = "metacritic"

    id = Column(Integer, primary_key=True)
    album = Column('album', String)
    artist = Column('artist', String)
    review_date = Column('review_date', DateTime, nullable=True)
    year = Column('year', Integer, nullable=True)
    critic_score = Column('critic_score', Float)
    user_score = Column('user_score', Float, nullable=True)

    # enforce unique row with 'artist+album+review_date' unique constraint
    # this seems cleaner/simpler than a composite primary key
    __table_args__ = (
        UniqueConstraint('artist', 'album', 'review_date', name='_mc_artist_album_review_date_uc'),
    )
    """
