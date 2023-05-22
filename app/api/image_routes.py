from flask import Blueprint, request
from app.models import db, Image
from flask_login import current_user, login_required
from app.aws_helpers import ( upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint("images", __name__)

@image_routes.route("/post", methods=["POST"])
@login_required

def upload_image():
    if 'image' not in request.files:
        return {'errors': 'image required'}, 400

    image = request.files['image']

    if not allowed_file(image.filename):
        return {'errors': 'file type not permitted'}, 400

    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    if 'url' not in upload:
        return upload, 400

    url = upload['url']
    final_image = Image(user = current_user, url=url)

    
    db.session.add(final_image)
    db.session.commit()

    return {'url': url}


@image_routes.route("/get",  methods=["GET"])
def get_all_images():
    images = Image.query.order_by(Image.id.desc()).all()
    return {"images": [image.to_dict() for image in images]}
