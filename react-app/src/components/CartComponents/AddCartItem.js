import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import * as cartActions from "../../store/cart";

function AddCartItem() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session?.user);
  const product = useSelector((state) => state.products);

  const [errors, setErrors] = useState([]);

  const addToCart = (e) => {
    e.preventDefault();

    setErrors([]);

    const payload = {
        user_id: user.id,
        product_id: product.id,
        quantity: 1,
    };

    dispatch(cartActions.postTheCartItem(payload)).then(
        async (res) => {
            dispatch(cartActions.getTheCart(user.id))
        }
    )

    let errs = [];

    setErrors(errs);



    if (errs.length) {
      setErrors(errs);
    } else {
      return("ADDED TO CART!");
    }
  };

  return (
    <form className="add-to-cart-button"
    type="submit"
    onSubmit={addToCart}>
      <button>
        Add to cart
        </button>
    </form>
  );
}

export default AddCartItem;
