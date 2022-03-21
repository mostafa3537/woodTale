import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/homePage/homePage";
import ShopPage from "./pages/shopPage/shopPage";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import setCurrentUser from "./redux/user/user.action";
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
    // // const navigate = useNavigate();
    // if(this.props.currentUser){
    //   let shouldRedirect = true; 
    // }else{
    //   shouldRedirect = false
    // }
    return (
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/shop" element={<ShopPage />} />
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
  // console.log("dispatch", dispatch);
  return {
    setCurrentUser: (user) => {
      dispatch(setCurrentUser(user));
      // console.log("setCurrentUser", setCurrentUser);
    },
  };
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
