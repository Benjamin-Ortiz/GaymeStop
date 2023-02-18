from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, DecimalField
from wtforms.validators import DataRequired, Length
from app.models import Product

#? default image logic here?

class ProductForm(FlaskForm):
    user_id = IntegerField('user')
    title = StringField('title', validators=[DataRequired(), Length(max=40)])
    price = DecimalField('price', rounding=2)
    rating = DecimalField('rating', rounding=2)
    description = StringField('description', validators=[DataRequired(), Length(max=1000)])
    glitter_factor = StringField('glitter_factor', validators=[DataRequired(), Length(max=600)])
    product_image = StringField('product_image', validators=[DataRequired(), Length(max=100)])
