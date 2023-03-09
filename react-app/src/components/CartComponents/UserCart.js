import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/cart";
import { NavLink } from "react-router-dom";

function UserCart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);


  const allCartItems = useSelector((state) => Object.values(state.cart))
  console.log(allCartItems, 'CART ITEMSS');

  useEffect(() => {
    dispatch(cartActions.getTheCart(user.id));
  }, [dispatch]);

  return (
    <div>
      <h1> UserCart </h1>
      <div className="mapped-games"> Cart Items
      {allCartItems && allCartItems.map((product) => {
        console.log(product, 'PRADUCT');
        return (
          <div className="single-game-container" >
            <NavLink className="product-nav-link" to={`/products/${product?.product.id}`}>
            <div className="product-title">{product?.product.title}</div>
            <img className="product-img" src={product?.product.product_image} alt={product?.product.title}/>
            </NavLink>
          </div>
        )
      })}
      {/* next line is end of games-container  */}
      </div>
    </div>
  )
}

export default UserCart
