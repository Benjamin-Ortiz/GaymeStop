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
  // console.log(product, "Product");
  //* user.cart = array

  //* states
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

  const editSubmit = (e) => {
    e.preventDefault();

    let errs = [];

    const payload = {
      id: product.id,
      user_id: user.id,
      title: title,
      price: price,
      description: description,
      glitter_factor: glitter_factor,
      product_image: product_image,
    };

    if (payload.title === "") {
      errs.push("So. . . . no title?");
    }

    if (payload.price < 0.01) {
      errs.push("Set a price above 0");
    }

    if (payload.description.length < 5) {
      errs.push("Thats not description, write a little more :) ");
    }

    if (payload.glitter_factor.length < 5) {
      errs.push("Don't skimp the glitter factor, that's illegal");
    }

    setErrors([...new Set(errs)]);
    if (errs.length === 0) {
      dispatch(productActions.putTheProduct(payload)).then(async (res) => {
        setTitle(title);
        setDescription(description);
        setPrice(price);
        setGlitterFactor(glitter_factor);
        setProductImage(product_image);
        setEditProduct(false);
        dispatch(productActions.getTheProduct(payload.id));
      });
    }
  };

  useEffect(() => {
    dispatch(productActions.getTheProduct(id));
    // dispatch(cartActions.getTheCart(user?.id))

    // }, [dispatch, title, price, product_image, description, glitter_factor, id]);
  }, [dispatch]);

  return product && user ? (
    <div>
      <div className="single-game-container">
        {/* left half */}
        <div className="product-left-half">
          <div className="outer-img-container">
            <div className="product-image-container">
              <img
                className="product-img"
                src={product.product_image}
                alt={product.title}
              />
            </div>
          </div>
          {editProduct ? (

            <form className="product-edit-info" onSubmit={editSubmit}>
              {/* put on top of right side title */}
              <ul className="error">
                {errors.map((ele) => (
                  <li>{ele}</li>
                ))}
              </ul>

              <div className="edit-product-container">

                <div className="edit-prod-img">
                  Enter an Image URL
                  <input
                    type="text"
                    placeholder="Add Image here..."
                    value={product_image}
                    onChange={updateProductImage}
                  ></input>
                </div>

                <div className="edit-product-description-con">
                  <div className="edit-product-description-header">
                    Edit DESCRIPTION
                  </div>

                  <div className="edit-product-description-span">
                    <textarea
                      type="text"
                      placeholder="Edit Description"
                      value={description}
                      onChange={updateDescription}
                      rows={3}
                      cols={1}
                    />
                  </div>
                </div>

                <div className="edit-glitter-showcase">
                  <h4 className="glitter-font"> *Glitter Factor*</h4>
                  <div className="glitter-factor-text">
                    <textarea
                      className="edit-glitter-factor-textarea"
                      type="text"
                      value={glitter_factor}
                      onChange={updateGlitterFactor}
                      placeholder="Glitter Factor"
                      // required
                      rows={4}
                      cols={30}
                    />
                  </div>
                </div>
              </div>

              <div className="ques-edit-crud-buttons">
                <div className="edit-button">
                  <span className="cancel-button-span">
                    <button
                      className="cancel-button"
                      onClick={(e) => {
                        e.preventDefault();
                        setTitle(product.title);
                        setDescription(product.description);
                        setPrice(product.price?.toFixed(2));
                        setGlitterFactor(product.glitter_factor);
                        setProductImage(product.product_image);
                        setErrors([]);
                        setEditProduct(false);
                      }}
                    >
                      Cancel
                    </button>
                  </span>
                </div>
                {/* the submit button has tbe outside of the div. It needs to be a direct child of form */}
                <button className="edit-submit-button" type="submit">
                  Apply Changes
                </button>
              </div>

            </form>
          ) : (
            <>

          <div className="desc-and-glitter-container">
            <div className="title-descrip-con">
              {/* <div className="ind-ques-title">{product.title}</div> */}
              <div className="product-description-con">
                <span className="product-description-header">
                  Product Description
                </span>
                <p className="product-description-span">
                  {product.description}
                </p>
              </div>

              <div className="glitter-showcase">
                <h4 className="glitter-font">
                  {" "}
                  ☆*:.｡.˚✧₊⁎**･゜ﾟ･*:.｡.:*･'Glitter Factor'･*:.｡.:*･゜ﾟ･**ཽ⁎⁺˳✧༚
                  .｡.:*☆
                </h4>
                <div className="glitter-factor-text">
                  ✧ {product.glitter_factor} ✧
                </div>
              </div>
            </div>
          </div>
          </>
          )}


        </div>

        {/* right half */}
        <div className="product-right-half">
          <h1 className="right-title">{product.title}</h1>

          <div className="price-container">
            <div className="price">
              Price:
              <span className="price-number">
                ${product.price?.toFixed(2)}
                <br></br>
                Release Date: {product.created_at?.slice(7, 11)}
                {product.created_at?.slice(4, 7)}{" "}
                {product.created_at?.slice(12, 16)}
              </span>
            </div>
          </div>

          <div className="shipping-div">
            <div className="icon-column">
              <i
                className="fas fa-shipping-fast"
                style={{ color: "#ffffff" }}
              />
            </div>

            <div className="shipping-details">
              <span className="shipping-launch-day">*☆Happy Launch Day!☆*</span>
              <br></br>
              Enjoy Free Shipping on all orders
            </div>
          </div>

          <div className="prod-cart-container">
            <AddCartItem />
            {/* if you own it */}
            {product?.user?.username === user?.username && (
              <>
                <div className="ind-ques-cruds">
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditProduct(true);

                      setTitle(product.title);
                      setDescription(product.description);
                      setPrice(product.price.toFixed(2));
                      setGlitterFactor(product.glitter_factor);
                      setProductImage(product.product_image);
                    }}
                  >
                    Edit Product
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
            ) }
          </div>
        </div>

        {/* below is end of game container */}
      </div>
    </div>
  ) : (
    <>
      <div>
        <div className="single-game-container">
          {/* left half */}
          <div className="product-left-half">
            <div className="outer-img-container">
              <div className="product-image-container">
                <img
                  className="product-img"
                  src={product.product_image}
                  alt={product.title}
                />
              </div>
            </div>

            <div className="desc-and-glitter-container">
              <div className="title-descrip-con">
                {/* <div className="ind-ques-title">{product.title}</div> */}
                <div className="product-description-con">
                  <span className="product-description-header">
                    Product Description
                  </span>
                  <p className="product-description-span">
                    {product.description}
                  </p>
                </div>

                <div className="glitter-showcase">
                  <h4 className="glitter-font">
                    {" "}
                    ☆*:.｡.˚✧₊⁎**･゜ﾟ･*:.｡.:*･'Glitter
                    Factor'･*:.｡.:*･゜ﾟ･**ཽ⁎⁺˳✧༚ .｡.:*☆
                  </h4>
                  <div className="glitter-factor-text">
                    ✧ {product.glitter_factor} ✧
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right half */}
          <div className="product-right-half">
            <h1 className="right-title">{product.title}</h1>

            <div className="price-container">
              <div className="price">
                Price:
                <span className="price-number">
                  ${product.price?.toFixed(2)}
                  <br></br>
                  Release Date: {product.created_at?.slice(7, 11)}
                  {product.created_at?.slice(4, 7)}{" "}
                  {product.created_at?.slice(12, 16)}
                </span>
              </div>
            </div>

            <div className="shipping-div">
              <div className="icon-column">
                <i
                  className="fas fa-shipping-fast"
                  style={{ color: "#ffffff" }}
                />
              </div>

              <div className="shipping-details">
                <span className="shipping-launch-day">
                  *☆Happy Launch Day!☆*
                </span>
                <br></br>
                Enjoy Free Shipping on all orders
              </div>
            </div>

            <div className="prod-cart-container">Log in to add to cart</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
