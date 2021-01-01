import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { LOGIN } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    marginLeft: 20,
    backgroundColor: "white",
    fontSize: 14,
    boxShadow: "0 2px 12px 0 rgba(74,106,149,0.20)",
    borderRadius: 5,
    height: 54
  },
  login: {
    width: 140,
    marginLeft: 32
  },
  create: {
    width: 170,
    marginLeft: 30
  }
}));

const NavButton = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { authPage } = props;

  const buttonText = authPage === LOGIN ? "Create Account" : "Login";
  const route = authPage === LOGIN ? "/register" : "/login";
  const buttonType = authPage === LOGIN ? "login" : "create";

  return (
    <Button
      className={`${classes.root} ${classes[buttonType]}`}
      onClick={() => history.push(`${route}`)}>
      {buttonText}
    </Button>
  );
};

export default NavButton;
