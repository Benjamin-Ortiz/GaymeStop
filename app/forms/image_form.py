from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import IntegerField
from app.aws_helpers import ALLOWED_EXTENSIONS

class ImageForm(FlaskForm):
    user_id = IntegerField('user')
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
