from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, DecimalField,FileField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length, NumberRange,  ValidationError
from app.aws_helpers import ALLOWED_EXTENSIONS

class ProductForm(FlaskForm):
    user_id = IntegerField('user')
    title = StringField('title', validators=[DataRequired(), Length(max=40)])
    price = DecimalField('price', validators=[DataRequired(), NumberRange(min=1)], places=2)
    description = StringField('description', validators=[DataRequired(), Length(max=1000)])
    glitter_factor = StringField('glitter_factor', validators=[DataRequired(), Length(max=600)])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
