from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime


# cart_items = db.Table(
#     'cart_items',
#     db.Model.metadata,
#     db.Column('cart_id',db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), primary_key=True),
#     db.Column('product_id',db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True),

# )

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(40), unique=True, nullable = False)
    price = db.Column(db.Float(), nullable=False)
    description = db.Column(db.String(1000), nullable = False)
    glitter_factor = db.Column(db.String(600), nullable = False)
    product_image = db.Column(db.String, nullable = True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)


    #* related data
    user = db.relationship("User", back_populates="products")

    # cart = db.relationship("Cart", secondary=cart_products, back_populates="products")
    carts = db.relationship("CartItem", back_populates='product', cascade='all, delete-orphan')


# add logic for avg review rating

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title':self.title,
            'price':self.price,
            # change rating key to helper in future
            'description': self.description,
            'glitter_factor': self.glitter_factor,
            'product_image':self.product_image,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': {
                'id': self.user.id,
                'username': self.user.username,
                'email': self.user.email
            },

        }

    def to_cart_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title':self.title,
            'price':self.price,
            # change rating key to helper in future
            'product_image':self.product_image,
        }
