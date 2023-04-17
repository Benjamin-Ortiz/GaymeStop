import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import * as productActions from "../../store/product";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import SearchBar from "../Search/SearchBar";
import AboutLinks from "./AboutLinks";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const allCartItems = useSelector((state) => Object.values(state.cart));


  const quantitySum = (items) => {
    return items?.reduce((total, item) => {
      return total + item?.quantity;
    }, 0);
  };

  const totalCartQuantity = quantitySum(allCartItems);

  const handleDemoLogin = (e) => {
    const id = 1;
    const email = "demo@aa.io";
    const password = "password";
    e.preventDefault();
    dispatch(sessionActions.login(email, password));
    history.push("/");
  };

  useEffect(() => {
    dispatch(productActions.getTheProducts());
  }, [dispatch]);

  return sessionUser ? (
    <div className="nav-bar">
      <div className="gaymestop-nav-button">
        {/* left */}
        <NavLink exact to="/">
          <span className="rainbow-text">Gayme</span>
          <span className="white-text">Stop</span>
        </NavLink>
        <h6 className="sub-logo">Power to the Gaymers</h6>
      </div>

      <AboutLinks />

      <SearchBar />

      {/* right side */}
      {isLoaded && (
        <>
          <div className="profile-cart-container">
            <ProfileButton user={sessionUser} />

            <NavLink
              className="cart-and-ping"
              exact
              to={`/carts/${sessionUser.id}/cart`}
            >
              <button>
                <i className="fas fa-shopping-cart  fa-lg"></i>

                {totalCartQuantity ? (
                  <>
                    <span className="cart-ping">{totalCartQuantity}</span>
                  </>
                ) : (
                  <></>
                )}
              </button>
            </NavLink>

            {/* </div> */}
          </div>
        </>
      )}
    </div>
  ) : (
    <div className="nav-bar">
      <div className="gaymestop-nav-button">
        {/* left */}
        <NavLink exact to="/">
          <span className="rainbow-text">Gayme</span>
          <span className="white-text">Stop</span>
        </NavLink>
        <h6 className="sub-logo">Power to the Gaymers</h6>
      </div>

      {/* middle */}
      <AboutLinks />
      <SearchBar />

      {/* right side */}
      {isLoaded && (
        <div>
          <button className="demo_login_button" onClick={handleDemoLogin}>
            Demo Login
          </button>
          <OpenModalButton
            buttonText="Log In"
            //   onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />

          <OpenModalButton
            buttonText="Sign Up"
            //   onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
        </div>
      )}
    </div>
  );
}

export default Navigation;
