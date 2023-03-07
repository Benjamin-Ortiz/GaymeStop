from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, DecimalField,FileField
from wtforms.validators import DataRequired, Length, NumberRange,  ValidationError
from app.models import Product, CartItem


class CartItemForm(FlaskForm):
    user_id = IntegerField('user')
    products_id = IntegerField('product')
    quantity = IntegerField('price', validators=[DataRequired()])
