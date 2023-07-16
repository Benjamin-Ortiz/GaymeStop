Generic single-database configuration.



from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


    # ### end Alembic commands ###

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    if environment == "production":
        op.execute(f"ALTER TABLE images SET SCHEMA {SCHEMA};")

    if environment == "production":
        op.execute(f"ALTER TABLE products SET SCHEMA {SCHEMA};")


    if environment == "production":
        op.execute(f"ALTER TABLE cart_items SET SCHEMA {SCHEMA};")







    if environment == "production":
        op.execute(f"ALTER TABLE carts SET SCHEMA {SCHEMA};")
