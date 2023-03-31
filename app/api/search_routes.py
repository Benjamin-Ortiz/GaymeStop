from flask import Blueprint, request
from app.models import Product, Search, db
# from app.forms import SearchForm
# from flask_login import current_user, login_required
# from sqlalchemy import inspect

search_routes = Blueprint("searches", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@search_routes.route("/products/<query>", methods=["GET"])
def get_results(query):
    # if (current_user.is_authenticated):
    #     desired_search = Search(search=query, user_id=current_user.id)
    #     db.session.add(desired_search)
    #     db.session.commit()

    # title_search = Product.query.filter(Product.title.contains('Cyber'))
    title_search = Product.query.filter(Product.title.contains(query)).all()


    description_search = Product.query.filter(Product.description.contains(query))
    glitter_factor_search = Product.query.filter(Product.glitter_factor.contains(query))

    if title_search:
    #    results.append(title_search)
        print([product.to_dict() for product in title_search], " title searchhhhhh " *9)

        # return {title.to_dict() for title in title_search}
        return {'Search Results' : [product.title for product in title_search]}
    # return {product.to_dict() for product in title_search}
    else:
        return {"message": "No results found"}
