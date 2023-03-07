from flask import Blueprint, request, jsonify, redirect
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime
from app.models import db, User, Product, CartItem
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
    new_cart = CartItem(
        user_id = current_user.id,
        created_at = datetime.now()
        )
    db.session.add(new_cart)
    db.session.commit()
    return new_cart.to_dict()

# * get cart (by cart id)
@cart_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_cart(id):
       cart = CartItem.query.get(id)
       return cart.to_dict()

# * add product to cart.
@cart_routes.route('/<int:cart_id>/add_product/<int:product_id>', methods=['POST'])
@login_required
def add_product_to_cart(cart_id, product_id):
     cart = CartItem.query.get(cart_id)
     product = Product.query.get(product_id)

     cart.products

     if(not cart) :
          return {"message" : "cart id 404"}
     if(not product) :
        return {"message" : "product id 404"}

     return cart.to_dict()




#* get cart + products
#*  edit quantity of products
#*  delete product
#*  delete cart
