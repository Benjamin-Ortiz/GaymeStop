import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { putTheCartItem, getTheCart } from "../../store/cart";

function EditQuantity({ item, userId }) {
  const dispatch = useDispatch();

  console.log("ITEM IN HELPER : ",item.id, "USERID: ",userId);

  const [tempQuantity, setTempQuantity] = useState(item.quantity);




  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id:item.id,
      user_id: userId,
      quantity: tempQuantity,
      product_id: item.product.id
    };
    dispatch(putTheCartItem(payload))
    //? dispatch(getTheCart(userId))  creates infinite loop, use effect?
    // .then(
    //   () => {
    //?     console.log('WE ARE INSIDE THE .THEN');    we never make it here
    //     dispatch(getTheCart(userId));
    //   }
    // );;
    };

    //? useeffect for get cart?
    useEffect(() => {
      dispatch(getTheCart(userId));
    }, [dispatch]);


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        min="1"
        size={1}
        value={tempQuantity}
        onChange={(e) => setTempQuantity(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default EditQuantity;
