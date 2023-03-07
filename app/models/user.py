from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_url = db.Column(db.String(255), nullable=True)
    dateCreated = db.Column(db.DateTime(timezone=True), server_default=func.now())


    products = db.relationship("Product", back_populates='user', cascade='all, delete-orphan')
    # cart = db.relationship("Cart", back_populates='user', cascade='all, delete-orphan')
    cart = db.relationship("CartItem", uselist=True, back_populates='user', cascade='all, delete-orphan')
    # cart_products = db.relationship("Product")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_url': self.profile_url,
            'cart': [cart_item.to_dict() for cart_item in self.cart]
        }

    def user_cart(self):
        return {
            'username': self.username,
            'cart': [cart_item.to_dict() for cart_item in self.cart]
        }
