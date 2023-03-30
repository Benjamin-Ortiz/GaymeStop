from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductCategory(db.Model):
    __tablename__ = 'product_categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)

    category_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("categories.id")), nullable = False)

    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("products.id")), nullable = False)

    # category = db.relationship("Category", back_populates = "product_categories", cascade='all, delete-orphan')
    # product = db.relationship("Product", back_populates = "categories")

    def to_dict(self):
        return {
            'id': self.id,
            'category_id': self.category_id,
            'product_id': self.product_id,
        }
