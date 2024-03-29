import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { getTheProducts } from "../../store/product";
import { Link, NavLink } from "react-router-dom";
// import PostProductModal from "../ProductComponents/SingleProduct/PostProductModal.js";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
    // dispatch(getTheProducts())
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);



  return (
    <>

      <button onClick={openMenu}>
        <i className="fas fa-user-circle  fa-lg" />
      </button>

      <ul className={ulClassName} ref={ulRef}>

        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <Link to='/'>
              <button onClick={handleLogout}>Log Out</button>
              <i className="fas fa-portal-exit" style={{color: "#ffffff"}}/>

              </Link>
            </li>
            <NavLink
            exact to='/products/new_product'
            // onClick={closeMenu}
            >
              Post a New Product
            </NavLink>

          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}

      </ul>
    </>
  );
}

export default ProfileButton;
