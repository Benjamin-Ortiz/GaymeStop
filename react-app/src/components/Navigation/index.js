import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as productActions from '../../store/product'
import * as sessionActions from '../../store/session'
import './Navigation.css';

function Navigation({ isLoaded }){
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);

	const handleDemoLogin = (e) => {
		let email = "demo@aa.io";
		let password = "password";
		e.preventDefault();
		dispatch(sessionActions.login(email, password));
		history.push("/");
	  };

	useEffect(() => {
		dispatch(productActions.getTheProducts());
	  }, [dispatch]);

	return sessionUser ? (
		<div className='nav-bar'>
			<div>
				{/* left */}
				<NavLink exact to="/">Home</NavLink>
			</div>

			{/* middle */}


			{/* right side */}
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				<button >
					
				</button>
				</div>
			)}

		</div>
	):(
		<div className='nav-bar'>
		<div>
			{/* left */}
			<NavLink exact to="/">Home</NavLink>
		</div>

		{/* middle */}


		{/* right side */}
		{isLoaded && (
			<div>

	<button className='demo_login_button'
	onClick={handleDemoLogin}>Demo Login</button>
			<button >

			</button>
			</div>
		)}

	</div>
	)
}


export default Navigation;
