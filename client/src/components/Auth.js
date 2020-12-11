import React, { useState } from "react";
import { connect } from "react-redux";
import { register, login } from "../store/user";
import { Redirect } from "react-router-dom";
import {
  Button,
  Avatar,
  CssBaseline,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography
} from "@material-ui/core";
import { RegisterForm, LoginForm } from "../components";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../assets/bg-img.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1
  },
  formContainer: {
    flexGrow: 1,
    alignItems: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 100,
    marginRight: 60,
    marginTop: 100,
    width: 300
    // alignItems: "center"
  },
  nav: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 20,
    marginTop: 15
  },
  title: {
    fontSize: "25px",
    fontWeight: "bold"
  },
  topButton: {
    color: "#3A8DFF",
    marginLeft: 20,
    backgroundColor: "white"
  },
  bottomButton: {
    backgroundColor: "#3A8DFF",
    color: "white",
    alignSelf: "center",
    marginTop: 10
  },
  greyText: {
    color: "grey"
  }
}));

const Auth = (props) => {
  const classes = useStyles();
  const { user, register, login } = props;
  const { authType } = props;

  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={5} className={classes.image} />
      {/* <Grid item> */}
      <div className={classes.container}>
        {authType === "login" ? (
          <LoginForm history={props.history} handleSubmit={handleSubmit} />
        ) : (
          <RegisterForm
            history={props.history}
            handleSubmit={handleRegister}
            errorMessage={formErrorMessage}
            classes={classes}
          />
        )}
      </div>
      {/* </Grid> */}
    </Grid>
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
    },
    login: (credentials) => {
      dispatch(login(credentials));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
