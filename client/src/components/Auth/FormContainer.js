import React from "react";
import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LoginForm, RegisterForm } from "../Auth";
import { LOGIN } from "../../constants";

const useStyles = makeStyles(() => ({
  root: {
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
  let text = authPage === LOGIN ? "Welcome back!" : "Create an account.";

  return (
    <form onSubmit={handleSubmit}>
      <Box className={classes.root}>
        <Typography className={classes.title}>{text}</Typography>
        {authPage === LOGIN ? (
          <LoginForm errorMessage={errorMessage} />
        ) : (
          <RegisterForm errorMessage={errorMessage} />
        )}
      </Box>
    </form>
  );
};

export default FormContainer;
