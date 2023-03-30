from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, DecimalField, FileField, BooleanField
from wtforms.validators import DataRequired, Length, NumberRange,  ValidationError
from app.models import Product, Category

#? default image logic here?

def valid_picture(form, field):
    # checks if the picture is in correct format
    picture_url = field.data
    if len(picture_url):
        if not picture_url.lower().endswith(('.png', '.jpg', '.jpeg')):
            raise ValidationError("Not a valid image.")

# def title_exists(form, field):
#     # Checking if title is already in use
#     title = field.data
#     check = Product.query.filter(Product.title == title).first()
#     if check:
#         raise ValidationError('title already exists.')

# def num_to_currency(num):
#     return "%0.2f" % num



class ProductForm(FlaskForm):
    categories = {}

    for category in Category.query.all():
        categories[category.name] = BooleanField(f'category.name')
        print(category, 'CATEGORYYYY')


    user_id = IntegerField('user')
    title = StringField('title', validators=[DataRequired(), Length(max=40)])
    price = DecimalField('price', validators=[DataRequired(), NumberRange(min=1)], places=2)
    description = StringField('description', validators=[DataRequired(), Length(max=1000)])
    glitter_factor = StringField('glitter_factor', validators=[DataRequired(), Length(max=600)])
    product_image = FileField('product_image', validators=[valid_picture])


    #todo mapped categories buttons
        #create categories obj, loop through it
        #todo loop to map each category,
            #* for each, category becomes a BooleanField (turns into checkbox for HTML)
            #* spread looped values(...spead?) as stand alone boolean fields
