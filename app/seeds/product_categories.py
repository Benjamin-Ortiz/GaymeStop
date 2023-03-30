from app.models import db, ProductCategory, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_product_categories():
    cyberpunk_1 = ProductCategory(
        category_id = 3,
        product_id = 1
    )
    cyberpunk_2 = ProductCategory(
        category_id = 4,
        product_id = 1
    )
    cyberpunk_3 = ProductCategory(
        category_id = 6,
        product_id = 1
    )
    cyberpunk_4 = ProductCategory(
        category_id = 16,
        product_id = 1
    )

    cyberpunk64_1 = ProductCategory(
        category_id = 3,
        product_id = 2
    )
    cyberpunk64_2 = ProductCategory(
        category_id = 4,
        product_id = 2
    )
    cyberpunk64_3 = ProductCategory(
        category_id = 6,
        product_id = 2
    )
    cyberpunk64_4 = ProductCategory(
        category_id = 16,
        product_id = 2
    )

    sims4_1 = ProductCategory(
        category_id = 16,
        product_id = 3
    )
    sims4_2 = ProductCategory(
        category_id = 2,
        product_id = 3
    )

    drag_age_1 = ProductCategory(
        category_id = 1,
        product_id = 4
    )
    drag_age_2 = ProductCategory(
        category_id = 3,
        product_id = 4
    )
    drag_age_3 = ProductCategory(
        category_id = 12,
        product_id = 4
    )
    drag_age_4 = ProductCategory(
        category_id = 12,
        product_id = 4
    )
    drag_age_5 = ProductCategory(
        category_id = 13,
        product_id = 4
    )
    drag_age_6 = ProductCategory(
        category_id = 15,
        product_id = 4
    )
    drag_age_7 = ProductCategory(
        category_id = 17,
        product_id = 4
    )

    #* 1 action_adventure   #* 13 lesbian
    #* 2 simulation         #* 14 gay
    #* 3 rpg                #* 15 bi
    #* 4 shooter            #* 16 trans
    #* 5 dating_sim         #* 17 queer
    #* 6 sci_fi
    #* 7 fighting
    #* 8 puzzle
    #* 9 strategy
    #* 10 platformer
    #* 11 horror
    #* 12 fantasy









    db.session.add_all([cyberpunk_1,cyberpunk_2,cyberpunk_3,cyberpunk_4,
    cyberpunk64_1,cyberpunk64_2,cyberpunk64_3,cyberpunk64_4,
    sims4_1, sims4_2,
    drag_age_1,drag_age_2,drag_age_3,drag_age_4,drag_age_5,drag_age_6,drag_age_7
    ])
    db.session.commit()


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
        db.session.execute("DELETE FROM product_categories")

    db.session.commit()
