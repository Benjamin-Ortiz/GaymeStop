import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../../store/product";
import { Redirect } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import "./PostProductModal.css";

function PostProductModal() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);
  //states
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [glitter_factor, setGlitterFactor] = useState("");
  const [product_image, setProductImage] = useState("");

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

  // dispatch(productActions.postTheProduct());

  // }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: user.id,
      title,
      price,
      description,
      glitter_factor,
      product_image,
    };

    const data = dispatch(productActions.postTheProduct(payload));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <form className="product_form" onSubmit={handleSubmit}>
        <h1>Create a new Product</h1>

        <ul>
          {errors.map((error, id) => (
            <li key={id}>{error}</li>
          ))}
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
            require
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
          New Image URL
          <input
            className="new-product-imageUrl"
            type="text"
            //   accept=".jpg, .jpeg, .png"
            value={product_image}
            onChange={updateProductImage}
            placeholder="Image Url"
          />
        </label>

        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default PostProductModal;

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
