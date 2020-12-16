import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { CssBaseline, Grid, Typography, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Image from "../../assets/bg-img.png";
import { ReactComponent as ChatIcon } from "../../assets/chat-bubble.svg";

import { FormContainer } from "../Auth";
import { LOGIN, REGISTER } from "../../constants";
import { register, login } from "../../store/user";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `linear-gradient(180deg, #3A8DFF 0%, #86B9FF55 100%), url(${Image})`,
    opacity: 0.85,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center"
  },
  container: {
    display: "flex",
    flexGrow: 1
  },
  overlayContainer: {
    textAlign: "center",
    marginTop: 199
  },
  overlayText: {
    fontSize: 26,
    color: "#FFFFFF"
  },
  icon: {
    marginBottom: 39
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
      <Grid item xs={false} sm={false} md={4} className={classes.image}>
        <Hidden xsDown smDown>
          <div className={classes.overlayContainer}>
            <ChatIcon className={classes.icon} />
            <Typography className={classes.overlayText}>Converse with anyone</Typography>
            <Typography className={classes.overlayText}>with any language</Typography>
          </div>
        </Hidden>
      </Grid>
      <div className={classes.container}>
        <FormContainer
          authPage={authPage ? authPage : REGISTER}
          handleSubmit={authPage === LOGIN ? handleLogin : handleRegister}
          errorMessage={formErrorMessage}
        />
      </div>
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
