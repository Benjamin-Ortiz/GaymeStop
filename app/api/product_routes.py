from app.forms import ProductForm
from flask import Blueprint, request, jsonify

from app.models import Product, db

product_routes = Blueprint('products', __name__)


@product_routes.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    return {"products": [product.to_dict() for product in products]}
