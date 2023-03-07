from flask import Blueprint, request, jsonify, redirect
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime
from app.models import db, User, Product, CartItem
from app.forms import CartItemForm
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
#! Already created
# @cart_routes.route('/', methods=['POST'])
# @login_required
# def create_cart():
#     new_cart = CartItem(
#         user_id = current_user.id,
#         )
#     db.session.add(new_cart)
#     db.session.commit()
#     return new_cart.to_dict()

# * get cart (by cart id)
@cart_routes.route('/<int:user_id>', methods=['GET'])
@login_required
def get_cart(user_id):
       user = User.query.get(user_id)

       if (user.id == current_user.id) :
            return user.user_cart()

# * add product to cart.
@cart_routes.route('/<int:cart_id>/add_product/<int:product_id>', methods=['POST'])
@login_required
def add_product_to_cart(cart_id, product_id):
     form = CartItemForm()
     form['csrf_token'].data = request.cookies['csrf_token']

     user = User.query.get(cart_id)
     product = Product.query.get(product_id)
    #  cart_item_check = CartItem.query.where(
    #      CartItem.user_id == user.id # and CartItem.product_id == product.id
    #  )

    #  print (cart_item_check, 'YERRRR'*9)

     if(not user) :
          return {"message" : "user id 404"}
     if(not product) :
        return {"message" : "product id 404"}

     '''
     1. check for an entry that has both the user.id AND prod.id
        '''
     for i in user.cart:
        if (i.product_id == product.id and i.user_id == user.id):
          i.quantity += 1
          db.session.commit()
          return user.user_cart()


     if form.validate_on_submit():
          cart_item = CartItem(
               user_id = current_user.id,
               product_id = product.id,
               quantity = 1
          )

          db.session.add(cart_item)
          db.session.commit()
          return user.user_cart()
     return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400





#* get cart + products
#*  edit quantity of products
#*  delete product
#*  delete cart
