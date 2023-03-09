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

  // const [quantity, setQuantity] = useState(product.quantity);
  // const updateQuantity = (e) => setQuantity(e.target.value);




  console.log(allCartItems, 'CART ITEMSS');

  useEffect(() => {
    dispatch(cartActions.getTheCart(user.id));
  }, [dispatch]);

  return (
    <div className='user-cart'>
      <h1> Your Cart </h1>

      <div className="mapped-games"> Cart Items
      {allCartItems && allCartItems.map((product) => {
        // console.log(product, 'PRADUCT');
        return (
          <div className="single-product-container" >
            <div className='cart-showcase'>

            </div>
            <NavLink className="product-nav-link" to={`/products/${product?.product.id}`}>
            <div className="product-title">{product?.product.title}</div>
            <img className="product-img" src={product?.product.product_image} alt={product?.product.title}/>
            </NavLink>
            <div className="crud-buttons">
                    {/* <form
                      className="edit-button"
                       onClick={() => {
                        setEditProduct(true);

                        setTitle(product.title);
                        setDescription(product.description);
                        setPrice(product.price);
                        setGlitterFactor(product.glitter_factor);
                        setProductImage(product.product_image);
                      }}
                    > Quantity
                    </form> */}

                    <button
                      className="delete-button"
                      onClick={()=> {
                      dispatch(cartActions.deleteTheCartItem(product.id))
                          .then(() => {
                            dispatch(cartActions.getTheCart(user.id))
                          })
                      }}
                    >
                      Delete Product
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
