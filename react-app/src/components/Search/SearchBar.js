import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as searchActions from '../../store/search'
import "./SearchBar.css"


function SearchBar() {
    const dispatch = useDispatch();
	const history = useHistory();
    const [searchQuery, setSearchQuery] = useState("");

    const search = (e) => {
		e.preventDefault();

    if (searchQuery.length) {
      dispatch(searchActions.getTheSearch(searchQuery)).then(() =>
        history.push(`/searches/products/${searchQuery}`)
      );
      setSearchQuery("");
    }
	};




  return (
    <div className="search-bar">
    <i className="fa-solid fa-magnifying-glass"></i>
    <input
      className="search_input"
      type="search"
      name="q"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search for ..."
    />
    <button className="header_search_button" onClick={search}>Search</button>
  </div>
  )
}

export default SearchBar
