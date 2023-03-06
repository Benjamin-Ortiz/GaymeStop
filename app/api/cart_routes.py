from flask import Blueprint, request, jsonify, redirect
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime
from app.models import db, User, Cart, Product
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
        add item to cart.
        make cart first
            if no cart exist
                make one then

                    add item to cart
            if cart exists
                add item to cart


        '''


@cart_routes.route('/', methods=['POST'])
@login_required

def new_cart ():
    new_cart = Cart(
        user_id = current_user.id
        )
    return new_cart.to_dict()


@cart_routes.route('/', methods=['POST'])
@login_required

def add_item_to_cart (cart_item_id, product_id):
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    cart_item = Product.query.get(product_id)

    if (cart_item):
        product = Product.query.get(cart_item.products_id)


        if (current_user.cart):
            return {"message": "cart exists"}
        else:
            new_cart = Cart(
                user_id = current_user.id
            )
            return new_cart.to_dict()


@cart_routes.route('/<int:cart_id>', methods=['GET'])
@login_required
def get_cart(id):
    cart = Cart.query.get(id)
    # print(cart, "CART ROUTE")

    if (cart.user_id == current_user.id):
        return cart.to_dict()
    else:
        return {'message' : 'You are not authorized access to this cart'}
