import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/cart";
import { NavLink } from "react-router-dom";
import "./UserCart.css";
import EditQuantity from "./EditQuantity";

function UserCart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);
  // console.log('user : ',user);

  const allCartItems = useSelector((state) => Object.values(state)[0].user.cart);
  // console.log(allCartItems);

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
    dispatch(cartActions.getTheCart(user.id));
  }, [dispatch]);


  return user ? (
    <>
      <div className="cart-header">My Cart</div>
      <div className="cart-container">
        <div className="cart-items">
          {allCartItems.map((item, i) => (
            <div className="cart-item" key={item.product.id}>
              <div className="item-image">
                <NavLink
                  className="product-nav-link"
                  to={`/products/${item?.product.id}`}
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
                  <div className="quantity-label">Quantity:</div>
                  {editQuantity ? (
                    <EditQuantity
                      item={item}
                      userId={user.id}
                    />
                  ) : (
                    <div>
                      {item.quantity}
                      <button
                        onClick={() => {
                          setQuantity({ ...quantity, [i]: item.quantity });
                          setEditQuantity(true);
                        }}
                      >
                        Change quantity
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="item-actions">
                <button
                  className="delete-button"
                  onClick={() => {
                    dispatch(cartActions.deleteTheCartItem(item.product.id)).then(
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
      <h1>Log in to access cart feature</h1>
    </>
  );
}

export default UserCart;
