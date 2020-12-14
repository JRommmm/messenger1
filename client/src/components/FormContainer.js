import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LoginForm, RegisterForm, AuthNav } from "../components";
import { LOGIN, REGISTER } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 97,
    marginTop: 86,
    width: 380
  },
  title: {
    fontSize: 26,
    fontWeight: "bold"
  }
}));

const FormContainer = (props) => {
  const classes = useStyles();
  const { authPage, handleSubmit, errorMessage } = props;
  let text = "";
  if (authPage === LOGIN) {
    text = "Welcome back!";
  }
  if (authPage === REGISTER) {
    text = "Create an account.";
  }

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <AuthNav authPage={authPage} />
        <div className={classes.form}>
          <Typography className={classes.title}>{text}</Typography>
          {authPage === LOGIN ? (
            <LoginForm errorMessage={errorMessage} />
          ) : (
            <RegisterForm errorMessage={errorMessage} />
          )}
        </div>
      </form>
    </div>
  );
};

export default FormContainer;
