import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as searchActions from '../../store/search'
import "./SearchPage.css"


function SearchPage(query) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session?.user);
  const results = useSelector((state) => Object.values(state.searchResults)) //* object
  const allProducts =  useSelector
  console.log(results, 'RESTIULTS');
  //todo create new Set()
  let descriptionRes;
  let titleRes;
  let factorRes;

  if (results) {
     descriptionRes = results[0];
     factorRes = results[1];
     titleRes = results[2];
    // console.log(descriptionRes, 'DESCR', typeof(descriptionRes));
    // console.log(factorRes, 'FACTOR', typeof(factorRes));
    // console.log(titleRes, 'TITLE', typeof(titleRes));

    for (let i = 0; i < descriptionRes.length; i++) {
      const id = descriptionRes[i];
      console.log(id, 'DES ARR ID');

    }
  }

  for (const key in descriptionRes) {
      const element = descriptionRes[key];

      console.log(element, 'ELEMENT', typeof(element));

  }

  return (
  // <>

    <div>SearchPage</div>

  // </>
  )
  //  :  (
  // <>

  // </>

  // )
}

export default SearchPage
