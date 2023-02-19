import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../store/product";
// import "./ProductIndex.css"
function ProductIndex() {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => Object.values(state.products))


  useEffect(() => {
    dispatch(productActions.getTheProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>All Games</h1>
{/* put banner here in future */}
      <div className="mapped-games">
      {allProducts.map((product, i) => {
        return (
          <div key={i} className="single-game-container">
            <img className="" src={product.product_image} alt={product.title}/>
          </div>
        )
      })}
      {/* next line end of games-container  */}
      </div>
    </div>
  );
}

export default ProductIndex;
