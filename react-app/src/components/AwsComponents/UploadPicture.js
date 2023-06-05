import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addImage, getTheImages } from "../../store/images";

import "./UploadPicture.css";

function UploadPicture() {
  const sessionUser = useSelector((state) => state.session?.user);

  const history = useHistory();
  const dispatch = useDispatch();

//   const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState("Current Image: ");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    // formData.append("caption", caption);
    formData.append("user_id", sessionUser.id);

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
    let res = await dispatch(addImage(formData));
    if (res.ok) {
      setImageLoading(false);
      return history.push(`/images/`);
    } else {
      setImageLoading(false);
      // res returns an errors stirng, display it
      const { errors } = res;
      setError(errors);
      return;
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const path = e.target.value.split("\\");
    console.log(path, 'PATH', typeof(path));
    const fileName = path[path.length - 1];
    console.log(fileName, 'FILENAME', typeof(fileName));

    setImageFile("Current Image: " + fileName);
  };

  useEffect(() => {
    dispatch(getTheImages());
    // dispatch(cartActions.getTheCart(user?.id))

    // }, [dispatch, title, price, product_image, description, glitter_factor, id]);
  }, [dispatch]);

  return (
    <div className="form_page_body">
      <form onSubmit={handleSubmit} className='upload_img_container'>
        <div className='upload_img_container_logo' />
        <h3>Make a Post</h3>
        {error && <h3 className='error'>{error}</h3>}
        <div className='upload_img_add_image'>
          <div className='upload_img_add_image_label'>
            <label
             className={`fas fa-plus ${'upload_img_file_input'}`}
            ></label>
          </div>
          <div>
            <input
              className='upload_img_file_input'
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
          </div>
        </div>
        <div className='upload_img_img_file'>{imageFile}</div>
        <div>

          {/* <textarea
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className='upload_img_caption_text'
            placeholder="Add a caption..."
          /> */}

        </div>
        <div>
          <button type="submit" className='upload_img_btns'>
            Share
          </button>
          <Link to="/" className='upload_img_btns'>
            Cancel
          </Link>
          {imageLoading && <p>Loading...</p>}
        </div>
      </form>
    </div>
  );
}

export default UploadPicture;
