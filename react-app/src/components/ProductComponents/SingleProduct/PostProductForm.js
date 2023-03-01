import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../../store/product";
import { Redirect, useHistory } from "react-router-dom";
import "./PostProductForm.css";

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
  // const [product_image, setProductImage] = useState("");





  //*updates
  const updateTitle = (e) => setTitle(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateGlitterFactor = (e) => setGlitterFactor(e.target.value);
  const updateProductImage = (e) => setProductImage(e.target.value);

  // if (hasSubmitted === true) return <Redirect to="/" />;

  useEffect(() => {
    dispatch(productActions.getTheProducts());
  }, [dispatch]);

  const noImgURL = (e) => {
    const cover = e.target.files[0];
    if (cover) {
        setProductImage(cover);
    }
    else return updateProductImage
};

  useEffect(() => {
    const errors = [];
    if (!title.length) errors.push('Please title your game');
    if (!description.length) errors.push('Please provide a description');
    setErrors(errors);
  }, [title, description])

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true)

    setErrors([]);

    const payload = {
      user_id: user.id,
      title,
      price,
      description,
      glitter_factor,
      product_image,
    };

    let errs = [];

    allProducts.map((product) => {
      if (product.title === payload.title) {
        errs.push("This Title already exists");
        return errs;
      }
      if (payload.price < 0.01) {
        errs.push("Set a price above 0");
        return errs
      }
      // if (!payload.product_image) {
      //  return payload.product_image = 'https://onlyjamsbucket.s3.amazonaws.com/gaymeStop/gayStop-images/Screen+Shot+2023-02-27+at+19.55.02.png'
      // }
      return product;
    });

   dispatch(productActions.postTheProduct(payload));

   setErrors(errs)
  //  console.log(errors,"errorsss");
  //   console.log(data, 'DATAAAAAAAA');
  history.push('/');
    if (errs) {
      setErrors(errs);
    } else {
      dispatch(productActions.getTheProducts())
    }
  };

  return (

      <form className="product_form" onSubmit={handleSubmit}>
        <h1>Create a new Product</h1>

        <ul>
          {errors && errors.map((error, id) => <li key={id}>{error}</li>)}
        </ul>

        <label>
          Title
          <input
            className="new-product-title"
            type="text"
            value={title}
            onChange={updateTitle}
            placeholder="Title"
            required
          />
        </label>

        <label>
          Description
          <input
            className="new-product-description"
            type="text"
            rows={5}
            value={description}
            onChange={updateDescription}
            placeholder="Description"
            required
          />
        </label>

        <label>
          Price
          <input
            className="new-product-price"
            type="number"
            value={price}
            onChange={updatePrice}
            placeholder="Price"
            required
          />
        </label>

        <label>
          Glitter Factor
          <input
            className="new-product-glitter-factor"
            type="text"
            rows={5}
            value={glitter_factor}
            onChange={updateGlitterFactor}
            placeholder="Glitter Factor"
            required
          />
        </label>

        <label>
          Upload Cover Photo
          <input
            className="new-product-imageUrl"
            type="text"
            size={100}
            // type="file"
            // multiple="false"
            // accept="image/*"
            value={product_image}
            onChange={noImgURL}
            placeholder="Image Url"
          />
        </label>

        <button type="submit">Create</button>
      </form>

  );
}

export default PostProductForm;

//   return (
//     <>
//       <h1>Log In</h1>
//       <form onSubmit={handleSubmit}>
//         <ul>
//           {errors.map((error, idx) => (
//             <li key={idx}>{error}</li>
//           ))}
//         </ul>
//         <label>
//           Email
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Log In</button>
//       </form>
//     </>
//   );
// }
