import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/cart";
import { NavLink } from "react-router-dom";
import "./UserCart.css";
import EditQuantity from "./EditQuantity";

function UserCart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);

  const allCartItems = useSelector((state) => Object.values(state.cart));
  const [editQuantity, setEditQuantity] = useState(false);

  const [quantity, setQuantity] = useState({});
  const [errors, setErrors] = useState([]);

  const cartSum = (items) => {
    return items.reduce((total, item) => {

      return total + item.product.price * item.quantity;
    }, 0);
  };

  const calculateSalesTax = (subtotal) => {
    const taxRate = 0.07;
    return subtotal * taxRate;
  };

  const subtotal = cartSum(allCartItems);
  const salesTax = calculateSalesTax(subtotal);
  const total = subtotal + salesTax;

  useEffect(() => {
    dispatch(cartActions.getTheCart(user.id));
  }, [dispatch, editQuantity]);


  return user && allCartItems ? (
    <>
        {editQuantity ?
            (
                <h1>ON</h1>
            ) :
            (
                  <h1>ON</h1>
            )
        }
    </>
  ) : (
    <>
      <h1>Log in to access cart feature</h1>
    </>
  );
}

export default UserCart;
