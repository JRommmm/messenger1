import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LoginForm, RegisterForm, AuthNav } from "../components";
import { LOGIN } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 100,
    marginTop: 100,
    width: 300
  },
  title: {
    fontSize: "25px",
    fontWeight: "bold"
  }
}));

const FormContainer = (props) => {
  const classes = useStyles();
  const { authPage, handleSubmit, errorMessage } = props;

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <AuthNav authPage={authPage} />
        <div className={classes.form}>
          <Typography className={classes.title}>Welcome back!</Typography>
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
