import React from "react";
// import { Link, useRoutes } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCollections } from "../../redux/shop/shop.selectors";

// import { ReactComponent as Logo } from "../../assets/logo.svg";

import "./header.styles.scss";

const Header = ({ currentUser, hidden, sections }) => {
  // let dropdown = false;
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        {/* <Logo className="logo" /> */}
        <span className="logo">WOOD TALE</span>
      </Link>
      <div className="options ">
        <div className="shop-page">
          <NavLink className="option " to="/shop">
            SHOP
          </NavLink>
          <div className="drop-down">
            <Link className="category " to="/shop/sofas">
              Sofas
            </Link>
            <Link className="category " to="/shop/living">
              Living
            </Link>
            <Link className="category " to="/shop/bedroom">
              Bedroom
            </Link>
            <Link className="category " to="/shop/dining">
              Dining
            </Link>
            <Link className="category " to="/shop/office">
              Office
            </Link>
          </div>
        </div>

        <Link className="option " to="/shop/hats">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
  sections: selectCollections,
});

export default connect(mapStateToProps)(Header);
