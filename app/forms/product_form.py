from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, DecimalField,FileField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length, NumberRange,  ValidationError
from app.aws_helpers import ALLOWED_EXTENSIONS


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
    user_id = IntegerField('user')
    title = StringField('title', validators=[DataRequired(), Length(max=40)])
    price = DecimalField('price', validators=[DataRequired(), NumberRange(min=1)], places=2)
    description = StringField('description', validators=[DataRequired(), Length(max=1000)])
    glitter_factor = StringField('glitter_factor', validators=[DataRequired(), Length(max=600)])
    product_image = FileField("product_image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
