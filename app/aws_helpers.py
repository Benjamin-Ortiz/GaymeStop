import boto3
import botocore
import os
import uuid

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)

def allowed_file(filename):
    print(filename)
    print("." in filename)
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"
def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}


def remove_file_from_s3(image_url):
    # AWS needs the image file name, not the URL,
    # so we split that out of the URL
    key = image_url.rsplit("/", 1)[1]
    print(key)
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True


# def route_image_helper(route_request):
#     if 'image' not in route_request.files:
#             return {'errors': 'Please upload an image.'}, 400

#     image = route_request.files['image']
#     print(image.filename,"IMAGE FILE NAME BEFORE AWS HELPER" * 3, type(image.filename))
#     if (image.filename.rsplit(".", 1)[1].lower()) not in ALLOWED_EXTENSIONS:
#         return {'errors': 'File type is not supported. Please upload a file of one of these file types: PDF, PNG, JPG, JPEG, GIF'}

#     image.filename = get_unique_filename(image.filename)
#     upload = upload_file_to_s3(image)

#     if 'url' not in upload:
#         return upload, 400

#     url = upload['url']
#     # new_image = Image(user_id=current_user.id,
#     #                       image=url,
#     #                       )
#     return url
