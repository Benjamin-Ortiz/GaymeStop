from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from flask_login import UserMixin
from sqlalchemy.sql import func



class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

    user = db.relationship("User", back_populates="carts")
    cart_items = db.relationship("CartItem", back_populates='carts', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'user': {
                'id': self.user.id,
                'username': self.user.username,
            }
        }
