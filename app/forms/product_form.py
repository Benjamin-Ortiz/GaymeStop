from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, DecimalField,FileField
from wtforms.validators import DataRequired, Length, NumberRange,  ValidationError
from app.models import Product

#? default image logic here?

def valid_picture(form, field):
    # checks if the picture is in correct format
    picture_url = field.data
    if len(picture_url):
        if not picture_url.lower().endswith(('.png', '.jpg', '.jpeg')):
            raise ValidationError("Not a valid image.")



class ProductForm(FlaskForm):
    user_id = IntegerField('user')
    title = StringField('title', validators=[DataRequired(), Length(max=40)])
    price = DecimalField('price', rounding=2, validators=[DataRequired(), NumberRange(min=0)])
    rating = DecimalField('rating', rounding=2)
    description = StringField('description', validators=[DataRequired(), Length(max=1000)])
    glitter_factor = StringField('glitter_factor', validators=[DataRequired(), Length(max=600)])
    product_image = FileField('product_image', validators=[DataRequired(), Length(max=300), valid_picture])
