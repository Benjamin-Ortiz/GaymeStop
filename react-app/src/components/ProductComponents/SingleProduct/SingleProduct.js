import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";

import * as productActions from "../../../store/product";
import "./SingleProduct.css"

function SingleProduct() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const product = useSelector((state) =>state.products[id])

  const user = useSelector((state) => state.session?.user)

useEffect(() => {
    dispatch(productActions.getTheProduct(id));
    //* reviews
  }, [dispatch, id]);

  return (
    <div>
      <h1>{product.title}</h1>

          <div className="single-game-container">
            <div className="product-container">
            <div className="product-title">{product.title}</div>
            <img className="product-img" src={product.product_image} alt={product.title}/>
            
            </div>
      {/* next line end of games-container  */}
      </div>
    </div>
  );
}

export default SingleProduct;
