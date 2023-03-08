from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, DecimalField,FileField
from wtforms.validators import DataRequired, Length, NumberRange,  ValidationError
from app.models import Product, CartItem


class CartItemForm(FlaskForm):
    user_id = IntegerField('user')
    product_id = IntegerField('product')
    quantity = IntegerField('quantity', validators=[DataRequired(), NumberRange(min=1)])
