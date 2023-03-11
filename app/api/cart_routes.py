from flask import Blueprint, request, jsonify, redirect, abort
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

# * get cart (by cart id)
@cart_routes.route('/<int:user_id>/cart', methods=['GET'])
@login_required
def get_cart(user_id):
       user = User.query.get(user_id)

       if (user.id == current_user.id) :
            return user.user_cart()


#*  GET one Cart Item
@cart_routes.route('get_cart_item/<int:cart_item_id>', methods=['GET'])
@login_required
def get_cart_item(cart_item_id):

     user = current_user
     cart_item_product = CartItem.query.get(cart_item_id)

     return cart_item_product.to_dict()



# * add product to cart.
@cart_routes.route('/add_product/<int:product_id>', methods=['POST'])
@login_required
def add_product_to_cart(product_id):
     form = CartItemForm()
     form['csrf_token'].data = request.cookies['csrf_token']
     user = current_user
     product = Product.query.get(product_id)

     if(not user) :
          return {"message" : "user id 404"}
     if(not product) :
        return {"message" : "product id 404"}

     for i in user.cart:
        if (i.product_id == product.id and i.user_id == user.id):
          i.quantity += 1
          db.session.commit()
          return {"message": f"added +1 {product.title} to cart"}

     if form.validate_on_submit():
               cart_item = CartItem(
               user_id = current_user.id,
               product_id = product.id,
               quantity = form.data['quantity']
          )

               db.session.add(cart_item)
               db.session.commit()
               return {"message" : f"sucessfully added {cart_item}"}
     else:
              return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400


#*  edit quantity of products
@cart_routes.route('/edit_product/<int:id>', methods=['PUT'])
@login_required
def edit_cart_item_quantity(id):
     form = CartItemForm()
     form['csrf_token'].data = request.cookies['csrf_token']

     # user = current_user
     cart_item_product = CartItem.query.get(id)

     if (cart_item_product):
            if form.validate_on_submit():
               cart_item_product.quantity = form.data['quantity']

               db.session.commit()
               return cart_item_product.to_edit_dict()
            else:
                return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400

     else :
            {'errors': "Item does not exist in cart"}
     return {'errors': validation_errors_to_error_messages(form.errors)}


#*  delete product by one
# @cart_routes.route('/<int:cart_id>/delete_by_one/<int:product_id>', methods=['DELETE'])
# @login_required
# def delete_by_one(cart_id, product_id):
#      user = User.query.get(cart_id)
#      product = Product.query.get(product_id)
#      cart_item_product = CartItem.query.filter((CartItem.product_id == product.id) & (CartItem.user_id == user.id)).one()#.to_edit_dict()


#      if(not user) :
#           return {"message" : "user id 404"}
#      if(not product) :
#         return {"message" : "product id 404"}
#      if(not cart_item_product) :
#         return {"message" : "product id 404"}

#      if(cart_item_product):
#        for i in user.cart:
#           if (i.product_id == product.id and i.user_id == user.id):
#             if(i.quantity <= 1):
#               db.session.delete(i)
#               db.session.commit()
#               return {f"{product.title}" : "Deleted from cart"}
#             else:
#               i.quantity -= 1
#               db.session.commit()
#               return user.user_cart()
#      else: return{'message' : f"{product.title}Deleted from cart"}


#*  delete item from cart
@cart_routes.route('/delete_all_items/<int:id>', methods=['DELETE'])
@login_required
def delete_whole_cart(id):
     user = current_user
     cart_item_product = CartItem.query.get(id)

     if (cart_item_product.user_id == user.id):
        db.session.delete(cart_item_product)
        db.session.commit()
        return {"message": "Item successfully deleted"}
     else:
         return {"message": "Not authorized to delete from this cart"}
