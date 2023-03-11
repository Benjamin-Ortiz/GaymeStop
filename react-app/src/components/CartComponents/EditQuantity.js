import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { putTheCartItem } from "../../store/cart";

function EditQuantity({ item, userId }) {
  const dispatch = useDispatch();

  console.log("ITEM IN HELPER : ",item, "USERID: ",userId);

  const [tempQuantity, setTempQuantity] = useState(item.quantity);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id:item.id,
      user_id: userId,
      quantity: tempQuantity,
      product_id: item.product.id
     };
    dispatch(putTheCartItem(payload));
  };

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
