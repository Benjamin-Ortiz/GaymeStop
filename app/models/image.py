from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Image(db.Model):
    __tablename__ = 'images'

    if environment == 'production':
        __table_args__ == {'schema' : SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    url = db.Column(db.String, nullable = False)

    product = db.relationship("Product", back_populates='image')


    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'url': self.url
        }
