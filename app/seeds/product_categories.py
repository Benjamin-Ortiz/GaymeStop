from app.models import db, ProductCategory, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_product_categories():
    cyberpunk = ProductCategory(
        category_id = []
    )
    # action_adventure = Category(
    #     name= 'action-adventure')
    # simulation = Category(
    #     name= 'simulation')
    # rpg = Category(
    #     name= 'rpg')
    # shooter = Category(
    #     name= 'shooter')
    # dating_sim = Category(
    #     name= 'dating-sim')
    # sci_fi = Category(
    #     name= 'sci-fi')
    # fighting = Category(
    #     name= 'fighting')
    # puzzle = Category(
    #     name= 'puzzle')
    # strategy = Category(
    #     name= 'strategy')
    # platformer = Category(
    #     name= 'platformer'
    # )

    # lesbian = Category(
    #     name= 'lesbian')
    # gay = Category(
    #     name= 'gay')
    # bi = Category(
    #     name= 'bi')
    # trans = Category(
    #     name= 'trans')
    # queer = Category(
    #     name= 'queer')



    db.session.add_all([cyberpunk])


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_product_categories():

    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
