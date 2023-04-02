import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as searchActions from '../../store/search'
import "./SearchPage.css"


function SearchPage(query) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);
  const results = useSelector((state) => Object.values(state.searchResults))
  console.log(results);


  return (
    <div>SearchPage</div>
  )
}

export default SearchPage
