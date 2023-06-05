from app.models import db, Product, environment, SCHEMA



# Adds products seed data
def seed_products():
    cyberpunk = Product(
        user_id=2,
        title='CyberPunk2077',
        price= 59.99,
        description='CyberPunk is an, at launch N64 game set in the future',
        glitter_factor="Character Customization goes above and beyond and doesnt force default confromity between sexes, everything is customizable, maybe too much is customizable. Nothing holds you back from playing the game your way and there's many storyline npcs you can develope relations with, as expected in the year 2077",
        product_image='https://onlyjamsbucket.s3.amazonaws.com/gaymeStop/gayStop-images/cyberpunk2077.jpg'
        )
    cyberpunk2 = Product(
        user_id=1,
        title='CyberPunk64',
        price= 59.99,
        description='CyberPunk is a game, boom',
        glitter_factor="Character Customization goes above and beyond and doesnt force default confromity between sexes, everything is customizable, maybe too much is customizable. Nothing holds you back from playing the game your way and there's many storyline npcs you can develope relations with, as expected in the year 2077",
        product_image='https://onlyjamsbucket.s3.amazonaws.com/gaymeStop/gayStop-images/cyberpunk64.jpg'
        )
    sims4 = Product(
        user_id=1,
        title='The Sims 4',
        price= 19.99,
        description='DISSOCIATION TIME BAYBEEEEEE',
        glitter_factor="It's the Sims, nuff said.You could see some first hints at LGBTQ+ households in some of The Sims 3 Worlds, however they wouldn’t be added in until the game’s ending cycle. The real story begins with The Sims 4, where more and more proper LGBTQ+ representation is shown.",
        product_image='https://onlyjamsbucket.s3.amazonaws.com/gaymeStop/gayStop-images/sims4.png'
        )
    dragon_age = Product(
        user_id=2,
        title='Dragon Age: Inquisition',
        price= 59.99,
        description="The latest entry into the Dragon Age saga sees the player become the Inquisitor, a ‘chosen one’ style character who must journey to settle civil unrest in the continent of Thedas and close a mysterious tear in the sky that’s unleashing demons upon the world.",
        glitter_factor="The game features an elaborate romance system, allowing players to win over a number of potential lovers including a 10-foot bull-man voiced by Freddie Prinze Jr (you know, Fred from the live-action Scooby Doo movies). It also featured Bioware’s first trans character, Cremisius Acclasi, which received praise from the community. Dragon Age: Inquisition was honoured with a Special Recognition award from LGBTQ advocacy group GLAAD for its inclusion of queer characters.",
        product_image="https://onlyjamsbucket.s3.amazonaws.com/gaymeStop/gayStop-images/dragon_age_inquisition1.jpg"
        )
    dad_dating = Product(
        user_id=2,
        title='Dream Daddy: A Dad Dating Simulator',
        price= 14.99,
        description="Conveniently, you’ve just moved to seaside town Maple Bay, where seemingly everyone is a single, dateable dad. The artwork is great, the dialogue is hilarious, and the dad puns just keep on coming.",
        glitter_factor="While there aren’t many high-quality entries in the genre that cater to LGBTQ players, Dream Daddy does a very good job of filling that gap. Players take on the role of a single dad whose goal is to meet and romance other hot dads.",
        product_image="https://onlyjamsbucket.s3.amazonaws.com/gaymeStop/gayStop-images/dream-daddy.jpg"
        )
    life_is_strange = Product(
        user_id=2,
        title='Life Is Strange',
        price= 19.99,
        description="The award-winning Life Is Strange was a standout of the episodic video game format when it launched in 2015, allowing players to ‘tune in’ to new chapters of the game every other month, with their in-game decisions effecting the direction (and ultimately the ending) of the story. The game focuses on 18-year-old photography student Max Caulfield, who discovers she has the ability to reverse time at any moment and must use her powers to save her town from being destroyed by an oncoming storm.",
        glitter_factor="Max’s queerness was hinted at in the original game, while 2017 prequel series Before The Storm gave fans the same-sex romance they were waiting for. Both entries are worth your time.",
        product_image="https://onlyjamsbucket.s3.amazonaws.com/gaymeStop/gayStop-images/life-is-strange.jpg"
        )
    hades = Product(
        user_id=1,
        title='Hades',
        price= 19.99,
        description="Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler as the immortal Prince of the Underworld, you'll wield the powers and mythic weapons of Olympus to break free from the clutches of the god of the dead himself, while growing stronger and unraveling more of the story with each unique escape attempt.",
        glitter_factor="The protagonist of Hades, Zagreus, is able to date both a man (Thanatos) and a woman (Megara) at the same time, which will prompt other characters to acknowledge and discuss polyamory. There are also several queer NPCs in Hades, including Achilles, who is gay (as he is in Greek mythology), Chaos, who uses they/them pronouns, and Dusa, who implies when you pursue a relationship with her that she may be asexual or aromantic.",
        product_image="https://onlyjamsbucket.s3.amazonaws.com/gaymeStop/gayStop-images/hades.jpg"
        )
    # title = Product(
    #     user_id=2,
    #     title='',
    #     price= 60.00,
    #     description="",
    #     glitter_factor="",
    #     product_image=""
    #     )




    db.session.add_all([cyberpunk, cyberpunk2, sims4, dragon_age, dad_dating, life_is_strange, hades])
    db.session.commit()


    # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
