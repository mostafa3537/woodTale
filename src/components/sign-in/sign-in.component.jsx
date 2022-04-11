import React from "react";

import { emailValidator } from "../../utiles/regex";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { axiosInstace } from "../../network/axiosConfig";

import "./sign-in.styles.scss";

class SginIn extends React.Component {
  constructor() {
    super();
    this.state = { email: "", password: "", emailError: "", passwordError: "" };
  }

  onSubmitHandle = async (event) => {
    event.preventDefault();

    const { emailError, passwordError } = this.state;

    if (!emailError && !passwordError) {
      try {
        console.log("123");
        axiosInstace.post("users/login", this.state).then((response) => {
          console.log("response", response);
          localStorage.setItem("user_token", response.data.token);
          if (response.data.status === "success") {
            window.location.replace("/")
          }
        });

        // this.setState({ email: "", password: "" });
      } catch (error) {
        console.log(error);
      }
    }
  };

  onChangeHandle = (event) => {
    // const { value, name } = event.target;

    switch (event.target.name) {
      case "email":
        this.setState({
          ...this.state,
          email: event.target.value,
          emailError:
            event.target.value.length === 0
              ? "This field is required"
              : emailValidator.test(event.target.value) === false
              ? "please inter a valid email"
              : null,
        });
        console.log("length", event.target.value.length);
        console.log("state", this.state);
        break;

      case "password":
        this.setState({
          ...this.state,
          password: event.target.value,
          passwordError:
            event.target.value.length === 0 ? "This field is required" : null,
        });
        console.log("length", event.target.value.length);
        console.log("state", this.state);
        break;

      default:
        break;
    }
  };

  render() {
    const { emailError, passwordError } = this.state;
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.onSubmitHandle}>
          <div className="container name-container">
            <FormInput
              name="email"
              value={this.state.email}
              type="email"
              handleChange={this.onChangeHandle}
              label="email"
              required
            />
            <div className="error error-name">{emailError}</div>
          </div>

          <div className="container name-container">
            <FormInput
              name="password"
              value={this.state.password}
              type="password"
              handleChange={this.onChangeHandle}
              label="password"
              required
            />
            <div className="error error-name">{passwordError}</div>
          </div>
          <div className="buttons">
            <CustomButton type="submit"> Sign in </CustomButton>
            {/* <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign in with Google
            </CustomButton> */}
          </div>
        </form>
      </div>
    );
  }
}

export default SginIn;
