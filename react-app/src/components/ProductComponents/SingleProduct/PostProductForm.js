import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../../store/product";
import { Redirect, useHistory } from "react-router-dom";
import "./PostProductForm.css";
import UploadPicture from "../../AwsComponents/UploadImamge";

function PostProductForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session?.user);
  const allProducts = useSelector((state) => Object.values(state.products));


  //* states
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [glitter_factor, setGlitterFactor] = useState("");
  const [product_image, setProductImage] = useState("https://onlyjamsbucket.s3.amazonaws.com/gaymeStop/gayStop-images/bbCover.png");


  //*updates
  const updateTitle = (e) => setTitle(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateGlitterFactor = (e) => setGlitterFactor(e.target.value);
  const updateProductImage = (e) => setProductImage(e.target.value);


  //   let isImage = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tif", ".tiff"];

  //   if (payload.product_image !== "") {
  //     let i = 0;


  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true)

    const payload = {
      user_id: user.id,
      title,
      price,
      description,
      glitter_factor,
      product_image,
    };

    let errs = [];

    if (allProducts.find(product => product.title === payload.title)) {
      errs.push("This Title already exists");
    }

    if (payload.price < 0.01) {
      errs.push("Set a price above 0");
    }

    if (payload.description.length < 5) {
      errs.push("Thats not description, write a little more :) ")
    }

    if (payload.glitter_factor.length < 5) {
      errs.push("Don't skimp the glitter factor, that's illegal")

    }

    setErrors([...new Set(errs)]);
    if (errs.length === 0) {
      dispatch(productActions.postTheProduct(payload));
      history.push('/');
    }
  };

  return user ?  (
    <>
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="name-tag">
      <h1 className="header">HELLO</h1>
      <h2> MY <span className="line-through">NAME</span> PRODUCT IS</h2>
      </div>


      <ul className="errors">
        {errors && errors.map((error, id) => <li key={id}> {error} </li>)}
      </ul>

      <label className="new-product-title">
        Title
        <input

          type="text"
          value={title}
          onChange={updateTitle}
          placeholder="Title"
          // required
        />
      </label>

      <label className="new-product-description">
        Description
        <textarea

          type="text"
          rows={2}
          cols={20}
          value={description}
          onChange={updateDescription}
          placeholder="Description"
          // required
        />
      </label>

      <label className="new-product-price">
        Price
        <input

          type="number"
          // min="1"
          max="9999"
          value={price}
          onChange={updatePrice}
          placeholder="Price"
          // required
        />
      </label>

      <label className="new-product-glitter-factor">
        Glitter Factor
        <textarea

          type="text"
          rows={2}
          cols={20}
          value={glitter_factor}
          onChange={updateGlitterFactor}
          placeholder="LGBTQ+ p'zazz goes here"
          // required
        ></textarea>
      </label>

      <label className="new-product-imageUrl">
        Upload Cover Photo
        <UploadPicture />
        {/* <input

          type="text"
          size={80}
          // type="file"
          // multiple="false"
          // accept="image/*"
          value={product_image}
          onChange={updateProductImage}
          placeholder="Image Url"
        /> */}
      </label>

      <button type="submit">Create</button>
    </form>
    </>
  ) : (
    <>
        <div className="not-logged-in-cart">
      <div className="not-logged-in-words">
      <h1>WHAT?!</h1>
      <h2> YOU'RE NOT EVEN LOGGED IN!</h2>
      <h2> heres $2, go get yourself a log in</h2>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>you terribly silly silly goose</p>
      </div>
      <div className="goose">
      <img src="https://onlyjamsbucket.s3.amazonaws.com/gaymeStop/gayStop-images/goose.gif"></img>
      </div>
    </div>

    </>
  )
}

export default PostProductForm;
