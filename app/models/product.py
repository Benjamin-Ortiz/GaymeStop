from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Product(db.Model, UserMixin):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_type = db.Column(String(40), nullable = False)
    title = db.Column(String(40), nullable = False)
    price = db.Column(db.Float(precision=2), nullable = False)
    description = db.Column(String(1000), nullable = False)
    glitter_factor = db.Column(String(600), nullable = False)



    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    user = db.relationship("User", back_populates="products")
