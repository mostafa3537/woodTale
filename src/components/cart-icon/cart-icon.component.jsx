import React from "react";
import { connect } from "react-redux";

import { toggleCartHidden } from "../../redux/cart/cart.actions";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import "./cart-icon.styles.scss";

const CartIcon = ({ toggleCartHidden, cartCount }) => (
  <div
    className="cart-icon"
    onClick={(e) => {
      e.stopPropagation();
      toggleCartHidden();
    }}
  >
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{cartCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = (state) => ({
  cartCount: selectCartItemsCount(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
