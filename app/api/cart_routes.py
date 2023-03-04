from app.forms import ProductForm
from flask import Blueprint, request, jsonify, redirect
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime


from app.models import Product, db

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





@cart_routes.route('/<int:id>', methods=['GET'])
@login_required

def get_cart(id):
    product = Product.query.get(id)

    return product.to_dict()
