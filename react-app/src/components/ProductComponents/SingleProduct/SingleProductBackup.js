import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import * as productActions from "../../../store/product";
import * as cartActions from "../../../store/cart";
import AddCartItem from "../../CartComponents/AddCartItem";
import UploadPicture from "../../AwsComponents/UploadPicture";

//* modal skeleton
import "./SingleProduct.css";

function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session?.user);
  const product = useSelector((state) => state.products[`${id}`]);

  //* user.cart = array

  //* states
  const [editProduct, setEditProduct] = useState(false);

  const [title, setTitle] = useState(product?.title);
  const [price, setPrice] = useState(product?.price);
  const [description, setDescription] = useState(product?.description);
  const [glitter_factor, setGlitterFactor] = useState(product?.glitter_factor);
  const [product_image, setProductImage] = useState(product?.product_image);
  const [changeImg, setChangeImg]= useState(false);

  const [errors, setErrors] = useState([]);
  const [errors2, setErrors2] = useState([]);

  //*updates
  const updateTitle = (e) => setTitle(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateGlitterFactor = (e) => setGlitterFactor(e.target.value);
  const updateProductImage = (e) => setProductImage(e.target.value);


  function changeImgToggle() {
    changeImg ? setChangeImg(false) : setChangeImg(true)
    console.log("change image toggle",changeImg);
  }


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
        // dispatch(productActions.getTheProduct(payload.id));
      });
    }
  };

  useEffect(() => {
    dispatch(productActions.getTheProduct(id));
    // dispatch(cartActions.getTheCart(user?.id))

    // }, [dispatch, title, price, image, description, glitter_factor, id]);
  }, [dispatch]);

  return product && user ? (
    <div>
      {editProduct ?
      (

<>
<div className="edit-single-game-container">
<div className="outer-img-container">
                <div className="product-image-container">
                  <img
                    className="product-img"
                    src={product.product_image}
                    alt={product.title}
                  />

                {changeImg? (
                  <>
                <UploadPicture setImgDetail={setProductImage} />

                  </>
                ) : (
                  <>
                <div className="edit-prod-img">
                  //todo add "change cover?" button with aws
                  Image URL:
                  <input
                    type="text"
                    placeholder="Add Image here..."
                    value={product_image}
                    onChange={updateProductImage}
                  ></input>

                  <button className='product-image-submit-success' onClick={changeImgToggle}>
                    Change Cover?
                  </button>
                </div>
                  </>
                )}


                </div>
              </div>


            {/* left half */}
        <form onSubmit={editSubmit}>
            <div className="product-left-half">





              <div className="desc-and-glitter-container">
                <div className="title-descrip-con">





                  <div className="product-description-con">
                    <span className="product-description-header">
                      Product Description
                    </span>
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





                  <div className="glitter-showcase">
                    <h4 className="glitter-font">
                      ☆*:.｡.˚✧₊⁎**･゜ﾟ･*:.｡.:*･'Glitter
                      Factor'･*:.｡.:*･゜ﾟ･**ཽ⁎⁺˳✧༚ .｡.:*☆
                    </h4>
                    <div className="glitter-factor-text">
                       <textarea
                      className="edit-glitter-factor-textarea"
                      type="text"
                      value={glitter_factor}
                      onChange={updateGlitterFactor}
                      placeholder="Glitter Factor"
                      rows={4}
                      cols={30}
                    />



                    </div>
                  </div>





                </div>
              </div>



            </div>

            {/* right half */}
            <div className="product-right-half">




              {/* <h1 className="right-title"> */}
                {/* {product.title} */}
                <input
                    className= "right-title"
                    type="text"
                    placeholder="Add Title here..."
                    value={title}
                    onChange={updateTitle}
                  ></input>
                {/* </h1> */}





              <div className="price-container">
                <div className="price">
                 Old Price:{" "}
                  <span className="price-number">
                    ${product.price?.toFixed(2)}
                    <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={updatePrice}
                  step="0.01"
                  cols={1}
                  min = "1"
                ></input>
                  {/* ${product.price?.toFixed(2)} */}
                  </span>

                    <br></br>
                    <div className="release-date">
                    Release Date: {product.created_at?.slice(7, 11)}
                    {product.created_at?.slice(4, 7)}{" "}
                    {product.created_at?.slice(12, 16)}
                    </div>
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
              <div className="prod-cart-container">

                {/* <div className="edit-button"> */}

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
                {/* </div> */}
                {/* the submit button has tbe outside of the div. It needs to be a direct child of form */}
                <button className="edit-submit-button" type="submit">
                  Apply Changes
                </button>

                <ul className="error">
                {errors.map((ele) => (
                  <li>{ele}</li>
                ))}
              </ul>

              </div>
            </div>
        </form>
          </div>
</>


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

            <div className="prod-cart-container">
              <AddCartItem />
            {product?.user?.username === user?.username && (
              <>

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
                      history.push("/");
                      dispatch(productActions.deleteTheProduct(id))
                        .then(() => {
                        })
                        .catch(async (res) => {});
                    }}
                  >
                    Delete Product
                  </button>

              </>
            ) }
              </div>
          </div>
        </div>
      </div>
    </>
      ) } {/* end of edit block */}


        {/* below is end of game container */}
    </div>
  ) : (
    // ! OUTSIDE Edit
    <>
      <div>
        <div className="single-game-container">
          {/* left half */}
          <div className="product-left-half">
            <div className="outer-img-container">
              <div className="product-image-container">
                <img
                  className="product-img"
                  src={product?.product_image}
                  alt={product?.title}
                />
              </div>
            </div>

            <div className="desc-and-glitter-container">
              <div className="title-descrip-con">
                <div className="product-description-con">
                  <span className="product-description-header">
                    Product Description
                  </span>
                  <p className="product-description-span">
                    {product?.description}
                  </p>
                </div>

                <div className="glitter-showcase">
                  <h4 className="glitter-font">
                    ☆*:.｡.˚✧₊⁎**･゜ﾟ･*:.｡.:*･'Glitter
                    Factor'･*:.｡.:*･゜ﾟ･**ཽ⁎⁺˳✧༚ .｡.:*☆
                  </h4>
                  <div className="glitter-factor-text">
                    ✧ {product?.glitter_factor} ✧
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right half */}
          <div className="product-right-half">
            <h1 className="right-title">{product?.title}</h1>

            <div className="price-container">
              <div className="price">
                Price:
                <span className="price-number">
                  ${product?.price?.toFixed(2)}
                  <br></br>
                  Release Date: {product?.created_at?.slice(7, 11)}
                  {product?.created_at?.slice(4, 7)}{" "}
                  {product?.created_at?.slice(12, 16)}
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
