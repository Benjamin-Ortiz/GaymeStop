import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import * as productActions from "../../../store/product";
import * as cartActions from "../../../store/cart";
import AddCartItem from "../../CartComponents/AddCartItem";

//* modal skeleton
import "./SingleProduct.css";

function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session?.user);
  const product = useSelector((state) => state.products);
  //* user.cart = array

  //states
  const [editProduct, setEditProduct] = useState(false);

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [glitter_factor, setGlitterFactor] = useState(product.glitter_factor);
  const [product_image, setProductImage] = useState(product.product_image);

  const [errors, setErrors] = useState([]);
  const [errors2, setErrors2] = useState([]);

  //*updates
  const updateTitle = (e) => setTitle(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateGlitterFactor = (e) => setGlitterFactor(e.target.value);
  const updateProductImage = (e) => setProductImage(e.target.value);

  //* check for cart duplicate
  // for (let i = 0; i < user.cart.length; i++) {
  //   const cartItem = user.cart[i];

  //   for (const i in cartItem) {
  //     if (Object.hasOwnProperty(`${user_id}`) && Object.) {
  //       const item = cartItem[i];
  //       console.log(item);

  //     }
  //   }
  // }

  const editSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    const payload = {
      id: product.id,
      user_id: user.id,
      title: title,
      price: price,
      description: description,
      glitter_factor: glitter_factor,
      product_image: product_image
    };

    dispatch(productActions.putTheProduct(payload)).then(
      async (res) => {
        setTitle(title);
        setDescription(description);
        setPrice(price);
        setGlitterFactor(glitter_factor);
        setProductImage(product_image);
        setEditProduct(false);
        dispatch(productActions.getTheProduct(payload.id))
      }
    )
  };

  useEffect(() => {
    dispatch(productActions.getTheProduct(id));
    // dispatch(cartActions.getTheCart(user?.id))

    // }, [dispatch, title, price, product_image, description, glitter_factor, id]);
  }, [dispatch]);

  return product ? (
    <div>
      <h1>{product.title}</h1>

      <div className="single-game-container">
        <div className="product-container">
          <img
            className="product-img"
            src={product.product_image}
            alt={product.title}
          />
        </div>

        {editProduct ? (
          <form className="product-edit-container" onSubmit={editSubmit}>
            {/* <div className="username-timestamp">
                    <div className="ind-ques-username">
                      {product.user.username} asks
                    </div>
                  </div> */}

            <div className="ques-product-con">
              <input
                className="edit-prod-title"
                type="text"
                placeholder="Title goes here"
                value={title}
                onChange={updateTitle}
              ></input>

              <input
                className="new-product-price"
                type="number"
                placeholder="Price"
                value={price}
                onChange={updatePrice}
              ></input>

              <textarea
                className="new-product-glitter-factor"
                type="text"
                value={glitter_factor}
                onChange={updateGlitterFactor}
                placeholder="Glitter Factor"
                required
                rows={10}
                cols={30}
              />

              <textarea
                className="edit-prod-desc"
                type="text"
                placeholder="Edit Description"
                value={description}
                onChange={updateDescription}
                rows={10}
                cols={30}
              />

              <input
                className="edit-prod-img"
                type="text"
                placeholder="Add Image here..."
                value={product_image}
                onChange={updateProductImage}
              ></input>
            </div>
            <div className="ques-edit-crud-buttons">
              <div className="edit-button">
                <span className="edit-button">
                  <button
                    className="cancel-button"
                    onClick={(e) => {
                      e.preventDefault();
                      setTitle(product.title);
                      setDescription(product.description);
                      setPrice(product.price);
                      setGlitterFactor(product.glitter_factor);
                      setProductImage(product.product_image);
                      setEditProduct(false);
                    }}
                  >
                    cancel
                  </button>
                </span>
              </div>
              {/* the submit button has tbe outside of the div. It needs to be a direct child of form */}
              <button
                className="edit-submit"
                type="submit"
              >
                Apply Changes
              </button>
            </div>

            <ul className="error">
              {errors.map((ele) => (
                <li>{ele}</li>
              ))}
            </ul>
          </form>
        ) : (
          <>
            <div className="product-container">
              <div className="title-descrip-con">
                <div className="ind-ques-title">{product.title}</div>
                <div className="ind-ques-body">{product.description}</div>
                <div>{product.price}</div>
                <div>{product.glitter_factor}</div>
{/*
                <div className="ind-ques-image">
                  {product?.product_image ? (
                    <img src={product.product_image} alt="" />
                  ) : null}
                </div> */}
              </div>
              {product?.user?.username === user?.username && (
                <>
                  <div className="ind-ques-cruds">
                    <button
                      className="edit-button"
                      onClick={() => {
                        setEditProduct(true);

                        setTitle(product.title);
                        setDescription(product.description);
                        setPrice(product.price);
                        setGlitterFactor(product.glitter_factor);
                        setProductImage(product.product_image);
                      }}
                    > Edit Product
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => {
                        dispatch(productActions.deleteTheProduct(id))
                          .then(() => {
                            history.push("/");
                          })
                          .catch(async (res) => {});
                      }}
                    >
                      Delete Product
                    </button>
                    <AddCartItem />
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* next line end of game-container  */}
      </div>
    </div>
  ) : (
    <>
        <div>
      <h1>{product.title}</h1>

      <div className="single-game-container">
        <div className="product-container">
          <img
            className="product-img"
            src={product.product_image}
            alt={product.title}
          />
        </div>
        </div>
        </div>
        </>
  );
}

export default SingleProduct;
