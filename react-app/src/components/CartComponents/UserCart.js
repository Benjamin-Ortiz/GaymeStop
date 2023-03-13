import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/cart";
import { NavLink } from "react-router-dom";
import "./UserCart.css";
import EditQuantity from "./EditQuantity";

function UserCart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);

  const allCartItems = useSelector((state) => Object.values(state.cart));


  const [editQuantity, setEditQuantity] = useState(false);

  const [quantity, setQuantity] = useState({});
  const [errors, setErrors] = useState([]);

  const cartSum = (items) => {
    return items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const calculateSalesTax = (subtotal) => {
    const taxRate = 0.07;
    return subtotal * taxRate;
  };

  const subtotal = cartSum(allCartItems);
  const salesTax = calculateSalesTax(subtotal);
  const total = subtotal + salesTax;

  useEffect(() => {
    dispatch(cartActions.getTheCart(user?.id));
  }, [dispatch, editQuantity]);


  return user && allCartItems ? (
    <>
      <div className="cart-header">Your Shopping Cart</div>
      <div className="cart-container">
        <div className="cart-items">

          {allCartItems.map((item, i) => (

            <div className="cart-item" key={item.product.id} >
              <div className="item-image">
                <NavLink
                  className="product-nav-link"
                  to={`/products/${item.product?.id}`}
                >
                  <img src={item.product?.product_image} />
                </NavLink>
              </div>
              <div className="item-details">
                <NavLink
                  className="product-nav-link"
                  to={`/products/${item?.product.id}`}
                >
                  <div className="item-title">{item.product.title}</div>
                </NavLink>
                <div className="item-price">${item.product.price}</div>
                <div className="item-quantity">
                  <div className="quantity-label">Quantity:
                  </div>
                  {editQuantity ? (
                    <>
                    <EditQuantity
                      item={item}
                      userId={user.id}
                      />
                    <span className="edit-cancel">
                  <button
                    className="cancel-button"
                    onClick={(e) => {
                      e.preventDefault();
                      setQuantity(item.quantity);
                      setEditQuantity(false);
                    }}
                    >
                    Cancel
                  </button>
                </span>
                    </>

) : (
  <>
                      {item.quantity}
                    <div className="quantity-container">
                      <button className="change-quantity-button"
                        onClick={() => {
                          setQuantity({ ...quantity, [i]: item.quantity });
                          setEditQuantity(true);
                        }}
                      >
                        Change quantity
                      </button>
                    </div>
                  </>
                  )
                }

                </div>
              </div>
              <div className="item-actions">
                <button
                  className="delete-button"
                  onClick={() => {
                    dispatch(cartActions.deleteTheCartItem(item.id)).then(
                      () => {
                        dispatch(cartActions.getTheCart(user.id));
                      }
                    );
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-total-container">
          <div className="cart-subtotal">
            Subtotal: ${subtotal.toFixed(2)}
          </div>
          <div className="cart-sales-tax">
            Sales Tax (7%): ${salesTax.toFixed(2)}
          </div>
          <div className="cart-total">Total: ${total.toFixed(2)}</div>
        </div>
      </div>
    </>
  ) : (
    <>
    <div className="not-logged-in-cart">
      <div>
      <h1>WHAT?!</h1>
      <h2> This isn't your cart!</h2>
      <h2> Get out of here!</h2>
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
  );
}

export default UserCart;
