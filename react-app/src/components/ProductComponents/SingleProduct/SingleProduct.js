import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import EditProductModal from "./EditProductModal";

import OpenModalButton from "../../OpenModalButton";

//* modal skeleton

import * as productActions from "../../../store/product";
import "./SingleProduct.css";

function SingleProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const user = useSelector((state) => state.session?.user);
  const curr_product = useSelector((state) => state.products);

  const ulRef = useRef();

  const [showMenu, setShowMenu] = useState(false);

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    dispatch(productActions.getTheProduct(id));
    //* reviews

    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return curr_product ? (
    <div>
      <h1>{curr_product.title}</h1>

      <div className="single-game-container">
        <div className="product-container">
          <div className="product-title">{curr_product.title}</div>
          <img
            className="product-img"
            src={curr_product.product_image}
            alt={curr_product.title}
          />
        </div>
        <OpenModalButton
          buttonText="Edit Product"
          onItemClick={closeMenu}
          modalComponent={<EditProductModal />}
        />

        <button
          className="delete-button"
          onClick={() => {
            dispatch(productActions.deleteTheProduct(id))
              .then(() => {
                history.push("/");
              })
              .catch(async (res) => {});
          }}
        >
          Delete Product
        </button>

        {/* next line end of game-container  */}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default SingleProduct;
