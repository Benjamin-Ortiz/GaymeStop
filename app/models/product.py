from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(40), unique=True, nullable = False)
    price = db.Column(db.Integer(), nullable = False)
    rating = db.Column(db.Integer())
    description = db.Column(db.String(1000), nullable = False)
    glitter_factor = db.Column(db.String(600), nullable = False)
    product_image = db.Column(db.String(300), nullable = True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)


    #* related data
    # one-to-many
    #? ex) reactions = db.relationship("Reaction", back_populates="answer", cascade="all, delete-orphan") for Answer table
    # reviews = db.relationship("Review")

    # many-to-one
    user = db.relationship("User", back_populates="products")

    # many-to-many/joins table

# add logic for avg review rating

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title':self.title,
            'price':self.price,
            # change rating key to helper in future
            'rating': self.rating,
            'description': self.description,
            'glitter_factor': self.glitter_factor,
            'product_image':self.product_image,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': {
                'id': self.user.id,
                'username': self.user.username,
                'email': self.user.email
            }
        }
