from app import app
from flask import render_template, g, flash

from models import PitchforkReviews, MetacriticReviews
from .forms import PitchforkScores, PitchforkSearch


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html',
                           title='Home')


@app.route('/best new music')
def best_new_music():
    reviews = PitchforkReviews.get_best_new_music()
    return render_template('best new music.html',
                           title='Best New Music',
                           reviews=reviews)


@app.route('/pitchfork')
def pitchfork():
    reviews = PitchforkReviews.get_all_reviews()
    return render_template('pitchfork.html',
                           title='Pitchfork reviews',
                           reviews=reviews)


@app.route('/pitchfork and metacritic')
def combined_reviews():
    pitchfork_reviews = PitchforkReviews.get_all_reviews()
    metacritic_reviews = MetacriticReviews.get_all_reviews()
    return render_template('combined reviews.html',
                           title='Combined reviews',
                           pitchfork=pitchfork_reviews,
                           metacritic=metacritic_reviews)


@app.route('/acclaimed metacritic')
def acclaimed_metacritic():
    reviews = MetacriticReviews.get_universally_acclaimed_reviews()
    return render_template('acclaimed metacritic.html',
                           title='Best of Metacritic',
                           reviews=reviews)


@app.route('/metacritic')
def metacritic():
    reviews = MetacriticReviews.get_all_reviews()
    return render_template('metacritic.html',
                           title='All Metacritic Reviews',
                           reviews=reviews)


@app.route('/pitchfork search', methods=['GET', 'POST'])
def pitchfork_search():
    form = PitchforkSearch()
    if form.validate_on_submit():
        reviews = PitchforkReviews.get_reviews_from_criteria(form)
        g.standalone = True  # use this to skip the header for all reviews in the template
        return render_template('pitchfork.html',
                               title='Search results',
                               reviews=reviews)
    return render_template('pitchfork search.html',
                           title='Search',
                           form=form)


@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html'), 500