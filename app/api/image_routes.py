from flask import Blueprint, request
from app.models import db, Image
from flask_login import current_user, login_required
from app.aws_helpers import ( upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint("images", __name__)



@image_routes.route('', methods=['POST'])
@login_required
def post_image():
    '''
    Image post route. Check the image filenames, and upload to AWS.
    If succeed, return a url to render the picture.
    '''
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if 'image' not in request.files:
            return {'errors': 'Please upload an image.'}, 400

        image = request.files['image']
        if not allowed_file(image.filename):
            return {'errors': 'File type is not supported. Please upload a file of one of these file types: PDF, PNG, JPG, JPEG, GIF'}

        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if 'url' not in upload:
            return upload, 400

        url = upload['url']
        new_image = Image(user_id=request.form["user_id"],
                          image_url=url,
                          caption=request.form["caption"],
                          created_at=datetime.now(),
                          updated_at=datetime.now()
                          )
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()
    else:
        return {'errors': 'missing data'}



# @image_routes.route("/post", methods=["POST"])
# @login_required

# def upload_image():
#     if 'image' not in request.files:
#         return {'errors': 'image required'}, 400

#     image = request.files['image']

#     if not allowed_file(image.filename):
#         return {'errors': 'file type not permitted'}, 400

#     image.filename = get_unique_filename(image.filename)
#     upload = upload_file_to_s3(image)

#     if 'url' not in upload:
#         return upload, 400

#     url = upload['url']
#     final_image = Image(user = current_user, url=url)


#     db.session.add(final_image)
#     db.session.commit()

#     return {'url': url}


# @image_routes.route("/get",  methods=["GET"])
# def get_all_images():
#     images = Image.query.order_by(Image.id.desc()).all()
#     return {"images": [image.to_dict() for image in images]}
