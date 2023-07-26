import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../store/product";
import { getTheCart } from "../../store/cart";
import { NavLink } from "react-router-dom";
import "./ProductsIndex.css"

function ProductsIndex() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => Object.values(state.products))

  useEffect(() => {
    dispatch(productActions.getTheProducts());
    console.log('HOME COMPONENT');

  }, [dispatch]);



  return (
    <>
      <div className="home-banner">
        Check out the Latest Gaymes
        </div>

      <div className="mapped-games">
      {allProducts && allProducts?.reverse().map((product) => {
        // {product
        if(product.id && product.title){
          return (
            <div className="mapped-game-container" >

              <NavLink className="product-nav-link" to={`/products/${product?.id}`}>
              <img className="mapped-product-img" src={product?.product_image} alt={product?.title}/>
           </NavLink>
              <div className="mapped-title-price-container">

              </div>
              <NavLink className="mapped-product-title" to={`/products/${product?.id}`}>
                {product?.title}
                </NavLink>
              <div className="mapped-product-price">
                {product?.price?.toFixed(2)}
              </div>
            </div>
          )
        }
        // }
      })}
      </div>
    </>
  );



}

export default ProductsIndex;
