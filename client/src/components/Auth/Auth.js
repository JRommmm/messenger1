import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { CssBaseline, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FormContainer, SideImage, AuthNav } from "../Auth";
import { REGISTER } from "../../constants";
import { register, login } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh"
  },
  content: {
    flexGrow: 1
  }
}));

const Auth = (props) => {
  const classes = useStyles();
  const { user, register, login, authPage } = props;

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

  const handleLogin = async (event) => {
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
      <SideImage />
      <Box className={classes.content}>
        <AuthNav authPage={authPage ? authPage : REGISTER} />
        <FormContainer
          authPage={authPage ? authPage : REGISTER}
          handleSubmit={authPage === REGISTER ? handleRegister : handleLogin}
          errorMessage={formErrorMessage}
        />
      </Box>
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
