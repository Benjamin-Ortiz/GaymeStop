import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../store/product";
import { getTheCart } from "../../store/cart";
import { NavLink } from "react-router-dom";
import "./ProductsIndex.css"

function ProductsIndex() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);

  const allProducts = useSelector((state) => Object.values(state.products))


  useEffect(() => {
    dispatch(productActions.getTheProducts());
  }, [dispatch]);







  return (
    <div>
      <div className="home-banner">
        Check out the Latest Gaymes
        </div>
{/* put banner here in future */}
      <div className="mapped-games">
      {allProducts && allProducts.reverse().map((product) => {
        // {product
        if(product.id && product.title)
          return (
            <div className="mapped-game-container" >
              <NavLink className="product-nav-link" to={`/products/${product?.id}`}>
              <img className="mapped-product-img" src={product?.product_image} alt={product?.title}/>
              </NavLink>
              <div className="mapped-title-price-container">

              </div>
              <div className="mapped-product-title">
                {product?.title}
                </div>
              <div className="mapped-product-price">
                {product?.price?.toFixed(2)}
              </div>
            </div>
          )
        // }
      })}
      {/* next line is end of games-container  */}
      </div>
    </div>
  );



}

export default ProductsIndex;
