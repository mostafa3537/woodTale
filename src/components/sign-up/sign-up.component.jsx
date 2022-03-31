import React from "react";

import { emailValidator } from "../../utiles/regex";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { axiosInstace } from "../../network/axiosConfig";
// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      nameError: "",
      emailError: "",
      passwordError: "",
      passwordConfirmError: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      // name,
      // email,
      // password,
      // passwordConfirm,
      nameError,
      emailError,
      passwordError,
      passwordConfirmError,
    } = this.state;

    // if (password !== passwordConfirm) {
    //   alert("passwords don't match");
    //   return;
    // }

    if (!nameError && !emailError && !passwordError && !passwordConfirmError) {
      try {
        axiosInstace.post("users/signup", this.state).then((response) => {
          console.log("response", response.data.status);
          localStorage.setItem("user_token", response.data.token);
          // if(response.data.status==="success){
          
          // }
        });
        this.setState({
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
          nameError: "",
          emailError: "",
          passwordError: "",
          passwordConfirmError: "",
        });


      } catch (error) {
        console.log(error);
      }
    }
  };

  handleChange = (event) => {
    // const { name, value } = event.target;

    switch (event.target.name) {
      case "name":
        this.setState({
          ...this.state,
          name: event.target.value,
          nameError:
            event.target.value.length === 0 ? "This field is required" : null,
        });
        console.log("length", event.target.value.length);
        console.log("state", this.state);

        break;
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

      case "passwordConfirm":
        this.setState({
          ...this.state,
          passwordConfirm: event.target.value,
          passwordConfirmError:
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
    const {
      name,
      email,
      password,
      passwordConfirm,
      nameError,
      emailError,
      passwordError,
      passwordConfirmError,
    } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <div className="container name-container">
            <FormInput
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              label="Name"
              required
            />
            <div className="error error-name">{nameError}</div>
          </div>

          <div className="container name-container">
            <FormInput
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              label="Email"
              required
            />
            <div className="error error-name">{emailError}</div>
          </div>

          <div className="container name-container">
            <FormInput
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              label="Password"
              required
            />
            <div className="error error-name">{passwordError}</div>
          </div>

          <div className="container name-container">
            <FormInput
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={this.handleChange}
              label="Confirm Password"
              required
            />
            <div className="error error-name">{passwordConfirmError}</div>
          </div>
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
