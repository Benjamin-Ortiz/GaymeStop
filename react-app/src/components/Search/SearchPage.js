import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as searchActions from '../../store/search'
import * as productActions from "../../store/product";
import "./SearchPage.css"
import { getTheProduct } from '../../store/product';


function SearchPage() {
  const {query} = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session?.user);
  // const products = useSelector((state) => Object.values(state.products))
  const allProducts = useSelector((state) => state.products)
  const results = useSelector((state) => Object.values(state.searchResults)) //* array

  let resArray = [] // populate with all of the results ids
  let finalRes = []

  useEffect(() => {
    dispatch(productActions.getTheProducts());
    dispatch(searchActions.getTheSearch(query))
  }, [dispatch])


  if (results) {
  results.forEach((array) => {

       for (let i = 0; i < array.length; i++) {
        const id = array[i];
        console.log(id, 'id');

        if (!resArray.includes(id)){
          resArray.push(id)
       }
      }
    })
    console.log(resArray, "resArr");
  }

  resArray.forEach((id) => {
    finalRes.push(allProducts[id])
  })

  console.log(finalRes, "finalres");

  return resArray.length ? (
  <>

    <div className='search-res-title'>
      {finalRes.length} Results for "{query}"
    </div>

    <div className='mapped-results'>
    {finalRes && finalRes.map((product) => {
        return (
          <div className="mapped-results-container" >
            <NavLink className="product-nav-link" to={`/products/${product?.id}`}>
            <img className="mapped-result-img" src={product?.product_image} alt={product?.title}/>
            </NavLink>
            <div className="mapped-result-title-price-container">

            </div>
            <NavLink className="mapped-product-title" to={`/products/${product?.id}`}>
              {product?.title}
              </NavLink>
            <div className="mapped-product-price">
              {product?.price?.toFixed(2)}
            </div>
          </div>
        )
    })}

    </div>

  </>
  )
   :  (
  <>

    <h1>NO WAY!</h1>
    <div>No results Matched your Search </div>
      <img src="https://onlyjamsbucket.s3.amazonaws.com/gaymeStop/gayStop-images/goose.gif"></img>
    <div>
      {/* <h2>This isn't your cart!</h2>
      <h2> Get out of here!</h2> */}
      <br></br>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p className='silly-goose'>you terribly unlucky silly goose</p>
      </div>
      <div className="goose">
      </div>

  </>

  )
}

export default SearchPage
