from flask import Blueprint, request, jsonify, redirect
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime
from app.models import db, User, Cart, Product
from sqlalchemy.orm import joinedload
# from app.forms import CartItemForm

cart_routes = Blueprint('carts', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



    '''
        make cart first
        add items to cart.
        get cart + products
        edit quantity of products
        delete product
        delete cart (button/on completed checkout/on logout)

        '''

#* create cart

@cart_routes.route('/', methods=['POST'])
@login_required
def create_cart():
    new_cart = Cart(
        user_id = current_user.id,
        created_at = datetime.now()
        )
    db.session.add(new_cart)
    db.session.commit()
    return new_cart.to_dict()
    # return {'message': "hey!"

# * add items to cart.
#* get cart + products
#*  edit quantity of products
#*  delete product
#*  delete cart
