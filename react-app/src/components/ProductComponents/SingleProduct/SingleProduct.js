import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import * as productActions from "../../../store/product";
import * as sessionActions from "../../../store/session";
//* modal skeleton
import "./SingleProduct.css";

function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session?.user);
  const product = useSelector((state) => state.products);

  console.log(product);

  //states
  const [editProduct, setEditProduct] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [glitter_factor, setGlitterFactor] = useState("");
  const [product_image, setProductImage] = useState("");

  const [errors, setErrors] = useState([]);
  const [errors2, setErrors2] = useState([]);

  //*updates
  const updateTitle = (e) => setTitle(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateGlitterFactor = (e) => setGlitterFactor(e.target.value)
  const updateProductImage = (e) => setProductImage(e.target.value);

  const editSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    const payload = {
      id: product.id,
      user_id: user.id,
      title,
      price,
      description,
      glitter_factor,
      product_image,
    };

    let errs = [];
    dispatch(productActions.putTheProduct(payload));
  };

  useEffect(() => {
    dispatch(productActions.getTheProduct(id));
    // dispatch(sessionActions.authenticate());
    // }, [dispatch, title, price, product_image, description, glitter_factor, id]);
  }, [dispatch]);

  return product ? (
    <div>
      <h1>{product.title}</h1>

      <div className="single-game-container">
        <div className="product-container">
          {/* <div className="product-title">{product.title}</div>
          <img
            className="product-img"
            src={product.product_image}
            alt={product.title}
          /> */}
        </div>

        {editProduct ? (
          <form className="product-edit-container" onSubmit={editSubmit}>
            {/* <div className="username-timestamp">
                    <div className="ind-ques-username">
                      {product.user.username} asks
                    </div>
                  </div> */}

            <div className="ques-input-con">
              <input
                className="edit-ques-title"
                type="text"
                placeholder="Title goes here"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>
              <textarea
                className="edit-ques-body"
                type="text"
                placeholder="Edit Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                rows={3}
                cols={5}
              />
              <label>
                <input
                  className="new-product-price"
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={updatePrice}
                  required
                />
              </label>

              <label>
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

              <input
                className="edit-ques-url"
                type="text"
                placeholder="Add Image here..."
                value={product_image}
                onChange={(e) => {
                  setProductImage(e.target.value);
                }}
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
              <button className="edit-submit" type="submit">
                Apply Changes
              </button>
            </div>

            <ul className="error">
              {errors.map((ele) => (
                <li>{ele}</li>
              ))}
            </ul>

            <div className="edit-product-image">
              {product.product_image ? (
                <img src={product.product_image} alt="" />
              ) : null}
            </div>
          </form>
        ) : (
          <>
            <div className="individual-question-container">
              <div className="user-timestamp-question-con">
                <div className="ind-ques-title">{product.title}</div>
                <div className="ind-ques-body">{product.description}</div>
                <div>{product.price}</div>
                <div>{product.glitter_factor}</div>

                <div className="ind-ques-image">
                  {product?.product_image ? (
                    <img src={product.product_image} alt="" />
                  ) : null}
                </div>
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
                        setProductImage(product.product_image);
                      }}
                    >
                      Edit question
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
    <></>
  );
}

export default SingleProduct;
