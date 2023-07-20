import React, {useState, useEffect} from 'react'
import './UploadPicture.css'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

const UploadPicture = ({setImgDetail}) => {
const user = useSelector(state => state.session.user)


  const [image, setImage] = useState(null)
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(false);
  const [prevImgUrl, setPrevImgUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    setImageLoading(true);

    formData.append('image', image);

    const res = await fetch('/api/images', {
      method: 'POST',
      body: formData,
    })
    if (res.ok) {
      const img_url = await res.json();
      setImageLoading(false);
      setImgDetail(img_url.url);
      setUploadedImg(true);
      setPrevImgUrl(img_url.url);
    } else {
      setImageLoading(false);
    }

  }

const updateImage = (e) =>{
    if(e.target.files && e.target.files.length > 0)
    setImage(e.target.files[0])
  }

  return (
<div className="product-file-upload-div">
    <form onSubmit={handleSubmit}>

    <input
    type='file'
    accept="image/*"
    // id='product-upload'
    onChange={updateImage}
    // hidden
    />

    {image? (
      <div className="image-container">
        <center>

        <img
        className="product-image-preview"
        as='label'
        src={URL.createObjectURL(image)}
        alt='Image preview'
        width={'350px'}
        />
        {imageLoading && <p className="loading-image">...Loading</p>}
        </center>
          <button className='product-image-submit' type='submit'>Upload</button>
      </div>
    ): <>

<div
    as='label'
    // htmlFor='product-uti-upload'
    cursor='pointer'
    mb={4}
    >

      <div className="product-image-upload-div">

        <div className="product-image-center">

          <center>
            <div className="img-container">
            <img
            src={user?.userUrl}
            alt=""
            className="product-editImg" />
            {/* <CameraAltIcon className='userImgIcon'/> */}
            </div>
          </center>

        </div>

      </div>
    </div>
{/* <Button
    as='label'
    htmlFor='product-uti-upload'
    cursor='pointer'
    mb={4}
    >

      <div className="product-image-upload-div">

        <div className="product-image-center">

          <center>
            <div className="img-container">
            <img
            src={user?.userUrl}
            alt=""
            className="product-editImg" />
            <CameraAltIcon className='userImgIcon'/>
            </div>
          </center>

        </div>

      </div>
    </Button> */}
    </>}
    </form>
  </div>
  )
}

export default UploadPicture
