import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../store/user";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import { RegisterForm } from "../components";

const Register = (props) => {
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <Button type="button" onClick={() => props.history.push("/login")}>
        Login
      </Button>
      <RegisterForm handleSubmit={handleSubmit} errorMessage={formErrorMessage} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
