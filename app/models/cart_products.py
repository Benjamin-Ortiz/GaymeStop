from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
# from sqlalchemy.schema import Table



cart_products = db.Table(
    'cart_products',
    db.Model.metadata,
    # db.Column('user_id', db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column('cart_id', db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), primary_key=True),
    db.Column('product_id', db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True),
)

# ! OR THAT?

# class CartItem(db.Model):
#     __tablename__ = 'cart_items'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
#     quantity = db.Column(db.Integer(), default=None)
#     products_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
#     cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), nullable=False)

#     user = db.relationship("User", back_populates="cart_items")
#     cart = db.relationship("Cart", back_populates="cart_items")
#     products = db.relationship("Product", back_populates="cart_items")

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'quantity':self.quantity,
#             'cart_id': self.cart_id,
#             'products_id': self.products_id,
#             'cart': {
#                 'id': self.cart.id,
#                  'user': {
#                     'id': self.cart.user.id,
#                     'username': self.cart.user.username
#             },
#             },
#             'products': {
#             self.products.to_cart_dict()
#           }
#         }
