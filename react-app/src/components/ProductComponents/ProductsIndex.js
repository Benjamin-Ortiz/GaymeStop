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
      {allProducts.map((product) => {
        return (
          <div>
            {product.image_url}
          </div>
        )
      })}
    </div>
  );
}

export default ProductIndex;
