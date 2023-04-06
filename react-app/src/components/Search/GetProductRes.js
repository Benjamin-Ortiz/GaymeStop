import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTheProduct } from '../../store/product';

function GetProductRes(id) {
  const dispatch = useDispatch();


  const product = useSelector((state) => state.products);
  //   console.log(`${product.title}`[product], "Product helper");
  // console.log(product, typeof(product), 'prod helper');

  useEffect(() => {
      dispatch(getTheProduct(id))
  }, [dispatch]);



    if (product) {
        return `${product.title}`[product]
    }
}

export default GetProductRes
