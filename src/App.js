import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/homePage/homePage";
import ShopPage from "./pages/shopPage/shopPage";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import { createStructuredSelector } from "reselect";

import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "../src/redux/user/user.selectors";

import { selectCartHidden } from "../src/redux/cart/cart.selectors";

import { toggleCartHidden } from "../src/redux/cart/cart.actions";

import { connect } from "react-redux";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import "./App.css";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        //saving user data in state so we can use it in frontend
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    const { toggleCartHidden } = this.props;
    const { hidden } = this.props;
    return (
      <div
        onClick={() => {
          if (hidden === false) {
            toggleCartHidden();
          }
        }}
      >
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/shop" element={<ShopPage />} />
          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route
            exact
            path="/signin"
            element={
              this.props.currentUser ? (
                <Navigate replace to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => {
      dispatch(setCurrentUser(user));
    },
    toggleCartHidden: () => dispatch(toggleCartHidden()),
  };
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
