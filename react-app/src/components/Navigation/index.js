import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as productActions from '../../store/product'
import * as sessionActions from '../../store/session'
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";

import './Navigation.css';


function Navigation({ isLoaded }){
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);

	const handleDemoLogin = (e) => {
		const id = 1;
		const email = "demo@aa.io";
		const password = "password";
		e.preventDefault();
		dispatch(sessionActions.login(email, password));
		history.push("/");
	  };

	useEffect(() => {
		dispatch(productActions.getTheProducts())
	  }, [dispatch]);

	return sessionUser ? (
		<div className='nav-bar'>
			<div className='gaymestop-nav-button'>
				{/* left */}
				<NavLink exact to="/">
				<span className='rainbow-text'>Gayme</span>
				<span className='white-text'>Stop</span>
					</NavLink>
				<h6 className='sub-logo'>Power to the Gaymers</h6>
			</div>


			{/* middle */}


			{/* right side */}
			{isLoaded && (
				<div className='profile-cart-container'>
					<ProfileButton user={sessionUser} />
					<NavLink exact to ={`/carts/${sessionUser.id}/cart`}>
        				<button>
							<i className="fas fa-shopping-cart" />
        					</button>
    			</NavLink>
				</div>
			)}

		</div>
	):

	(
	<div className='nav-bar'>
			<div className='gaymestop-nav-button'>
				{/* left */}
				<NavLink exact to="/">
				<span className='rainbow-text'>Gayme</span>
				<span className='white-text'>Stop</span>
					</NavLink>
				<h6 className='sub-logo'>Power to the Gaymers</h6>
			</div>

		{/* middle */}


		{/* right side */}
		{isLoaded && (
			<div>

	<button className='demo_login_button'
	onClick={handleDemoLogin}>Demo Login</button>
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
	)
}


export default Navigation;
