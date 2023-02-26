import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../../store/product";
import { useParams, Redirect } from "react-router-dom";
import { useModal } from "../../../context/Modal";

// import './EditProductForm.css';

function EditProductForm() {
  const dispatch = useDispatch();
  const currProductId = useParams();
  const curr_product = useSelector((state) => state.products);

  //states
  const [title, setTitle] = useState(curr_product.title);
  const [price, setPrice] = useState(curr_product.price);
  const [description, setDescription] = useState(curr_product.description);
  const [glitter_factor, setGlitterFactor] = useState(curr_product.glitter_factor);
  const [product_image, setProductImage] = useState(curr_product.product_image);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const err = [];

  //updates
  const updateTitle = (e) => setTitle(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateGlitterFactor = (e) => setGlitterFactor(e.target.value);
  const updateProductImage = (e) => setProductImage(e.target.value);

  // useEffect(() => {

    dispatch(productActions.putTheProduct(currProductId));


  // }, [dispatch]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      price,
      description,
      glitter_factor,
      product_image,
    };

    dispatch(productActions.putTheProduct(payload, currProductId));


  };

  return (
    <form className="product_form" onSubmit={handleSubmit}>
      <h1>Update Product</h1>

      <ul>
        {errors.map((error, id) => (
          <li key={id}>{error}</li>
        ))}
      </ul>

      <label>
        Title
        <input
          className="edit-product-title"
          type="text"
          value={title}
          onChange={updateTitle}
          placeholder="Title"
        />
      </label>

      <label>
        Description
        <input
          className="edit-product-description"
          type="text"
          value={description}
          onChange={updateDescription}
          placeholder="Description"
        />
      </label>

      <label>
        Price
        <input
          className="edit-product-price"
          type="text"
          value={price}
          onChange={updatePrice}
          placeholder="Price"
        />
      </label>

      <label>
        Glitter Factor
        <input
          className="edit-product-glitter-factor"
          type="text"
          value={glitter_factor}
          onChange={updateGlitterFactor}
          placeholder="Glitter Factor"
        />
      </label>

      <label>
        New Image URL
        <input
          className="edit-product-imageUrl"
          type="text"
          accept=".jpg, .jpeg, .png"
          value={product_image}
          onChange={updateProductImage}
          placeholder="Image Url"
        />
      </label>

      <button type="submit">Update Product</button>
    </form>
  );
}

export default EditProductForm;

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
