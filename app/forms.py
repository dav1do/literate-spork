from flask_wtf import Form
from wtforms import DecimalField, StringField, SelectField, IntegerField
from wtforms.validators import NumberRange, DataRequired, length, optional


class PitchforkScores(Form):
    low_score = DecimalField('Low Score', validators=[NumberRange(0, 10), DataRequired()])
    high_score = DecimalField('High Score', validators=[NumberRange(0, 10), DataRequired()])


class PitchforkSearch(Form):
    low_score = DecimalField('Low Score', validators=[NumberRange(0, 10), optional()])
    high_score = DecimalField('High Score', validators=[NumberRange(0, 10), optional()])
    artist = StringField('Artist', validators=[length(max=80), optional()])
    reviewer = StringField('Reviewer', validators=[length(max=80), optional()])
    album = StringField('Album', validators=[length(max=100), optional()])
    accolades = SelectField('Accolades', choices=[('either', 'BNM or BNR'),
                                                  ('Best New Music', 'Best New Music'),
                                                  ('Best New Reissue', 'Best New Reissue'),
                                                  ('neither', 'Not BNM or BNR')])
    year = IntegerField('Year', validators=[optional()])
