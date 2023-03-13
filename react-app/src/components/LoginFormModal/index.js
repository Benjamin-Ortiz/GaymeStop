import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { getTheCart } from "../../store/cart";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));

    if (data) {
      setErrors(data);
    } else {
      closeModal();
      dispatch(getTheCart);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1 className="login-header">Log In</h1>
      <ul className="errors">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label className="login-email">
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="login-password">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button className="login-button" type="submit">Log In</button>
    </form>
  );
}

export default LoginFormModal;




// const handleSubmit = async (e) => {
//   e.preventDefault();
//   // setSubmit(true);

//   const data = await dispatch(putTheProduct(
//       title,
//       price,
//       description,
//       glitter_factor,
//       product_image
//       ));
//   if (data) {
//     setErrors(data);
//   }else{closeModal(); window.alert('Your product has been submitted')}
// };
