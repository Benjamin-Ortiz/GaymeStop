from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, DecimalField,FileField
from wtforms.validators import DataRequired, Length, NumberRange,  ValidationError
from app.models import Product, CartItem


# def validate_quantity(form, field):
#     if not field.data.isdigit():
#         print('Quantity must be a number')
#         raise ValidationError('Quantity must be a number')

class CartItemForm(FlaskForm):
    user_id = IntegerField('user')
    product_id = IntegerField('product')
    quantity = IntegerField('quantity', validators=[DataRequired(), NumberRange(min=1)])
