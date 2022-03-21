import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { signInWithGoogle, auth } from "../../firebase/firebase.utils";

import "./sign-in.styles.scss";

class SginIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }
  onChangeHandle = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };
  onSubmitHandle = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form>
          <FormInput
            name="email"
            value={this.state.email}
            type="email"
            handleChange={this.onChangeHandle}
            label="email"
            required
          />
          <FormInput
            name="password"
            value={this.state.password}
            type="password"
            handleChange={this.onChangeHandle}
            label="password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit"> Sign in </CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SginIn;
