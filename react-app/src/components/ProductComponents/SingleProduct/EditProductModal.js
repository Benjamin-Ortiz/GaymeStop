import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as productActions from "../../../store/product"
import "./EditProductModal.css";

function EditProductModal() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

}
