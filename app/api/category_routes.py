from flask import Blueprint, request, jsonify, redirect
from flask_login import current_user, login_user, logout_user, login_required

from app.models import db, Category, ProductCategory, Product

category_routes = Blueprint('category', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@category_routes.route('/<int:id>', methods=['GET'])
def get_category(id):
    category = Category.query.get(id)

    return category.to_dict()


#todo get games at this category
  #todo route'/api/categories/:cateId/products'
  #todo query for products .join to categories . filter(Category.id == params cateId)
