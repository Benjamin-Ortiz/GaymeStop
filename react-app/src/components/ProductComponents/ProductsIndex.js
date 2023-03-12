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
        All Games
        </div>
{/* put banner here in future */}
      <div className="mapped-games">
      {allProducts && allProducts.reverse().map((product) => {
        return (
          <div className="single-game-container" >
            <NavLink className="product-nav-link" to={`/products/${product?.id}`}>
            <div className="product-title">{product?.title}</div>
            <img className="product-img" src={product?.product_image} alt={product?.title}/>
            </NavLink>
          </div>
        )
      })}
      {/* next line is end of games-container  */}
      </div>
    </div>
  );



}

export default ProductsIndex;
