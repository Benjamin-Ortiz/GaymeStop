import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProductsIndex from "./components/ProductComponents/ProductsIndex";
import SingleProduct from "./components/ProductComponents/SingleProduct/SingleProduct";
import PostProductForm from "./components/ProductComponents/SingleProduct/PostProductForm";
import UserCart from "./components/CartComponents/UserCart";
import SearchPage from "./components/Search/SearchPage";
import UploadPicture from "./components/AwsComponents/UploadPicture";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route path="/searches/products/:query">
            <SearchPage />
          </Route>

          <Route path="/carts/:id/cart">
            <UserCart />
          </Route>

          <Route path="/products/new_product">
            <PostProductForm />
          </Route>

          <Route path="/images/upload">
            <UploadPicture />
          </Route>

          <Route exact path="/products/:id">
            <SingleProduct />
          </Route>

          <Route exact path="/">
            <ProductsIndex />
          </Route>



        </Switch>
      )}
    </>
  );
}

export default App;
