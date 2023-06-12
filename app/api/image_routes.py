from flask import Blueprint, request, render_template, redirect, jsonify
from app.models import db, Image
from app.forms import ImageForm
from flask_login import current_user, login_required
from app.aws_helpers import (upload_file_to_s3, get_unique_filename, ALLOWED_EXTENSIONS)

image_routes = Blueprint('images', __name__)


@image_routes.route('/upload', methods=['POST'])
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
        # print(image.filename," IMAGE FILE" * 10, type(image.filename))
        if (image.filename.rsplit(".", 1)[1].lower()) not in ALLOWED_EXTENSIONS:
            return {'errors': 'File type is not supported. Please upload a file of one of these file types: PDF, PNG, JPG, JPEG, GIF'}

        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if 'url' not in upload:
            return upload, 400

        url = upload['url']
        new_image = Image(user_id=current_user.id,
                          image=url,
                          )
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()
    else:
        return {'errors': 'missing data'}
