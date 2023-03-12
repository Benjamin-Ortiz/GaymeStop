import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { putTheCartItem, getTheCart } from "../../store/cart";

function EditQuantity({ item, userId }) {
  const dispatch = useDispatch();

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
    };

    useEffect(() => {
      dispatch(getTheCart(userId));
    }, [dispatch]);


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        min="1"
        max="99"
        size={1}
        value={tempQuantity}
        onChange={(e) => setTempQuantity(e.target.value)}
      />
      <button type="submit">Save</button>

    </form>
  );
}

export default EditQuantity;
