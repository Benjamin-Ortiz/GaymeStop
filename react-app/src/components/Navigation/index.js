import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as productActions from '../../store/product'
import './Navigation.css';

function Navigation({ isLoaded }){
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);

	useEffect(() => {
		dispatch(productActions.getTheProducts());
	  }, [dispatch]);

	return (
		<div>
			<div>
				<NavLink exact to="/">Home</NavLink>
			</div>
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
