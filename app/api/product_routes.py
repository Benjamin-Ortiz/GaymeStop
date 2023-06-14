from flask import Blueprint, request, jsonify, redirect
from app.models import Product, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import ProductForm
from app.aws_helpers import (upload_file_to_s3, get_unique_filename, route_image_helper, remove_file_from_s3)
from datetime import datetime

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

    #todo add aws code, turn image part into helper func
        print(request.files['image'], 'REQ!!!' * 5)
        url = route_image_helper(request)
        print(url, 'URL!!!' * 10)

        product = Product(
           user_id=current_user.id,
           title=form.data['title'],
           price=form.data['price'],
           description=form.data['description'],
           glitter_factor=form.data['glitter_factor'],
           image=url,
        )

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

    #todo modify for edit

    if form.validate_on_submit():

        remove_file_from_s3(product.image)
        url = route_image_helper(request)
        # print(url, 'URL!!!' * 10, product.image)


        product = Product.query.get(id)
        if product.user_id == current_user.id:
            product.title = form.data['title']
            product.price = form.data['price'] or product.price
            product.description = form.data['description']
            product.glitter_factor = form.data['glitter_factor']
            product.image = url
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
        title = current_product.title

        remove_file_from_s3(current_product.image)
        db.session.delete(current_product)
        db.session.commit()
        return {"message": f"{title} successfully deleted"}
    else:
        return {"message": "You cant to delete other peoples products you silly silly Goose"}
