import React, { useState, useSelector } from "react";
import { useDispatch } from "react-redux";
import * as cartActions from "../../store/cart";

function EditQuantity({item, index, setQuantity}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);
//

  console.log(item, "ITEM FROM HELPER");

  const [tempQuantity, setTempQuantity] = useState(item.quantity);

  //treat it like a reducer
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuantity((quantity) => ({
      ...quantity,
      [index]: tempQuantity,
    }));

    const payload = {
      quantity: tempQuantity
    }

    // if (item.)
    dispatch(cartActions.putTheCartItem(payload, item.product.id));
    dispatch(cartActions.getTheCart(user.id))
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
