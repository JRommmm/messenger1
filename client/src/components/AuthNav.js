import React from "react";
import { makeStyles, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { REGISTER, LOGIN } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 15
  },
  greyText: {
    color: "#B0B0B0",
    fontSize: 14
  },
  button: {
    color: theme.palette.primary.main,
    marginLeft: 20,
    backgroundColor: "white",
    fontSize: 14,
    boxShadow: "0 2px 12px 0 rgba(74,106,149,0.20)",
    borderRadius: 5
  }
}));

const AuthNav = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const { authPage } = props;

  let text = "";
  let buttonText = "";
  let route = "";
  if (authPage === REGISTER) {
    text = "Already have an account?";
    buttonText = "Login";
    route = "/login";
  }
  if (authPage === LOGIN) {
    text = "Don't have an account?";
    buttonText = "Create Account";
    route = "/register";
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.greyText}>{text}</Typography>
      <Button className={classes.button} onClick={() => history.push(`${route}`)}>
        {buttonText}
      </Button>
    </div>
  );
};
export default AuthNav;
