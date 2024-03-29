from app.forms import ProductForm
from flask import Blueprint, request, jsonify, redirect
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime


from app.models import Product, db

product_routes = Blueprint('products', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages




@product_routes.route('/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)

    return product.to_dict()


@product_routes.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    return {"products": [product.to_dict() for product in products]}


@product_routes.route('/new_product', methods=['POST'])
@login_required

def post_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():

        product = Product(
           user_id=current_user.id,
           title=form.data['title'],
           price=form.data['price'],
           description=form.data['description'],
           glitter_factor=form.data['glitter_factor'],
           product_image=form.data['product_image'],
            )
          # check_product = Product.query.filter(Product.title == form.title)
          # print (check_product, '-=-=-=-=-=-=')

        db.session.add(product)
        db.session.commit()
        return product.to_dict()
    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400

@product_routes.route('/<int:id>', methods=['PUT'])
@login_required



def edit_product(id):
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    product = Product.query.get(id)

    if form.validate_on_submit():
        product = Product.query.get(id)
        if product.user_id == current_user.id:
            product.title = form.data['title']
            product.price = form.data['price'] or product.price
            product.description = form.data['description']
            product.glitter_factor = form.data['glitter_factor']
            product.product_image = form.data['product_image']
            product.updated_at = datetime.now()

            # db.session.add(product)
            db.session.commit()
            return product.to_dict()
        else:
            return {"message": "You are not authorized to edit this product"}
    return {'errors': validation_errors_to_error_messages(form.errors)}

@product_routes.route('<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    current_product = Product.query.get(id)

    if not current_product:
        return {"message": "Nothing exists here"}

    if current_product.user_id == current_user.id:
        db.session.delete(current_product)
        db.session.commit()
        return {"message": "Product successfully deleted"}
    else:
        return {"message": "You cant to delete other peoples products you silly silly Goose"}
