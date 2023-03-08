from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
# from sqlalchemy.schema import Table



# cart_products = db.Table(
#     'cart_products',
#     db.Model.metadata,
#     # db.Column('user_id', db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
#     db.Column('cart_id', db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), primary_key=True),
#     db.Column('product_id', db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True),
# )

class CartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("products.id")), nullable=False, primary_key=True)
    quantity = db.Column(db.Integer(), default=1,)

    user = db.relationship("User", back_populates="cart")
    product = db.relationship("Product", back_populates="carts")

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'product': self.product.to_cart_dict()
        }

    def to_edit_dict(self):
        return {
            'user_id': self.user_id,
            'product_id': self.product_id,
            'quantity': self.quantity
        }
