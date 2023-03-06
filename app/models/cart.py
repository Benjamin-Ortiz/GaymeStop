from .db import db, environment, SCHEMA, add_prefix_for_prod
from .cart_products import cart_products
import datetime
from flask_login import UserMixin
from sqlalchemy.sql import func


# cart_products = db.Table(
#     'cart_products',
#     db.Model.metadata,
#     db.Column('cart_id',db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), primary_key=True),
#     db.Column('product_id',db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True),

# )
class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    # quantity = db.Column(db.Integer(), default = 0)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)


    # products = db.relationship("Product", backref='cart', secondary=cart_products)
    products = db.relationship("Product", secondary=cart_products, back_populates='cart')

    user = db.relationship("User", back_populates="cart")
    # cart_items = db.relationship("CartItem", back_populates='cart', cascade='all')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'user': {
                'id': self.user.id,
                'username': self.user.username,
            },
            'products':self.products.to_cart_dict()
        }
