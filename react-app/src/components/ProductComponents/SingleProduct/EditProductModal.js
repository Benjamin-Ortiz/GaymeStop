import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import * as productActions from "../../../store/product"
import OpenModalButton from "../OpenModalButton";

import "./EditProductModal.css";

function EditProductModal() {
    const dispatch = useDispatch();
    const productId = useParams
    const user = useSelector((state) => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const current_product = useSelector((state) =>state.products[productId])
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // form fields

    const [title, setTitle] = useState(current_product.title);
    const [price, setPrice] = useState(current_product.price);
    const [description, setDescription] = useState(current_product.review);
    const [glitter_factor, setGlitterFactor] = useState(current_product.glitter_factor);
    const [product_image, setProductImage] = useState(current_product.product_image)
    const [submit, setSubmit] = useState(false);

    if (!user) return <Redirect to="/" />;


    const handleSubmit = async (e) => {
        e.preventDeafault();
    }
}

//* modal skeleton
// import OpenModalButton from "../OpenModalButton";
// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();

// useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);
//   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
//   const closeMenu = () => setShowMenu(false);
