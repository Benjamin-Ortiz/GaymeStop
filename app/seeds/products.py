from app.models import db, Product, environment, SCHEMA


# Adds products seed data
def seed_products():
    cyberpunk = Product(
        user_id=1,
        title='CyberPunk2077',
        price= 59.99,
        description='CyberPunk is an, at launch N64 game set in the future',
        glitter_factor="Character Customization goes above and beyond and doesnt force default confromity between sexes, everything is customizable, maybe too much is customizable. Nothing holds you back from playing the game your way and there's many storyline npcs you can develope relations with, as expected in the year 2077",
        product_image='https://onlyjamsbucket.s3.amazonaws.com/gaymeStop/gayStop-images/cyberpunk2077.jpg'
        )
    cyberpunk2 = Product(
        user_id=1,
        title='CyberPunk1999',
        price= 59.99,
        description='CyberPunk is a game, boom',
        glitter_factor="Character Customization goes above and beyond and doesnt force default confromity between sexes, everything is customizable, maybe too much is customizable. Nothing holds you back from playing the game your way and there's many storyline npcs you can develope relations with, as expected in the year 2077",
        product_image='https://onlyjamsbucket.s3.amazonaws.com/gaymeStop/gayStop-images/cyberpunk2077.jpg'
        )





    db.session.add_all([cyberpunk, cyberpunk2])
    db.session.commit()


    # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
