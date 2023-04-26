import { useDispatch, useSelector } from "react-redux";
import React, {useEffect,useState} from 'react';
import * as cartActions from "../../store/cart";
import './CheckoutForm.css'


function CheckoutForm(userId) {


  return (
    <div className='checkout-form'>CheckoutForm
    <div className="full-name-con">
    First Name <input className="first-name">
        </input>
        Last Name <input className="last-name">
        </input>
    <div className="address-containers">
        S<input className="street-name"

        ></input>


        <input></input>
    </div>
    </div>

    </div>
  )
}

export default CheckoutForm
