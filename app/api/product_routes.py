from app.forms import ProductForm
from flask import Blueprint, request, jsonify

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


@product_routes.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    return {"products": [product.to_dict() for product in products]}


@product_routes.route('/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)

    return jsonify(product.to_dict())


@product_routes.route('/new_product', methods=['POST'])
def post_product():
        form = ProductForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            product = Product(
               title=form.data['title'],
               price=form.data['price'],
               description=form.data['description'],
               glitter_factor=form.data['glitter_factor'],
               product_image=form.data['product_image']
            )
            db.session.add(product)
            db.session.commit()
            return product.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route('/<int:id>', methods=['PUT'])
def edit_product(id):
    product = Product.query.get(id)
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
