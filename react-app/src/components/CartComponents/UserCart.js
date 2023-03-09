import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/cart";
import { NavLink } from "react-router-dom";
import "./UserCart.css";


function UserCart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);

  const allCartItems = useSelector((state) => Object.values(state.cart))
  const [editProduct, setEditProduct] = useState(false);

  // let product_idx;
  const [quantity, setQuantity] = useState("");
  const updateQuantity = (e) => setQuantity(e.target.value);

  // console.log(allCartItems, 'CART ITEMSS');

  useEffect(() => {
    dispatch(cartActions.getTheCart(user.id));
  }, [dispatch]);

  return (
    <div className='user-cart'>
      <h1> Your Cart </h1>

      <div className="mapped-games"> Cart Items
      {allCartItems && allCartItems.map((product) => {
        //! setQuantity(product.quantity)   Causes infinite loop


        return (
          <div className="single-product-container" >
            <div className='cart-showcase'>

            </div>
            <NavLink className="product-nav-link" to={`/products/${product?.product.id}`}>
            <div className="product-title">{product?.product.title}</div>
            <img className="product-img" src={product?.product.product_image} alt={product?.product.title}/>
            </NavLink>
            <div className="crud-buttons">
              {/* edit quantity wip */}
                    <div className="edit-qty-button" >
                      QTY
                    {/* <input></input> */}
                    <input
                className="edit-prod-title"
                type="text"
                rows = {40}
                columns = {1}
                placeholder="Enter a Quantity"
                value={product.quantity}
                onChange={(e)=> setQuantity(e.target.value)}
              ></input>

                    </div>

                    <button
                      className="delete-button"
                      onClick={() => {
                        if (product) {
                          console.log(dispatch(cartActions.deleteTheCartItem(product.id)),'DISPATCH');
                          dispatch(cartActions.deleteTheCartItem(product.id))
                            .then(res => console.log(res, "RESULT LOG"))
                          // dispatch(cartActions.deleteTheCartItem(product.id))
                            .then(() => {
                              dispatch(cartActions.getTheCart(user.id))
                            })
                        }
                      }}
                    >
                      Remove From Cart
                    </button>
                  </div>
            <div className='product-price'>
              {`$${product.product.price}.99`}
            </div>
          </div>
        )
      })}
      {/* next line is end of games-container  */}
      </div>
    </div>
  )
}

export default UserCart
