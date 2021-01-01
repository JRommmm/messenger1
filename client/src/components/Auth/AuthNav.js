import React from "react";
import { makeStyles, Typography, Box } from "@material-ui/core";
import { NavButton } from "./index";
import { LOGIN } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 42,
    marginTop: 30
  },
  greyText: {
    color: theme.palette.secondary.main,
    fontSize: 14
  }
}));

const AuthNav = (props) => {
  const classes = useStyles();
  const { authPage } = props;

  const text = authPage === LOGIN ? "Don't have an account?" : "Already have an account?";

  return (
    <Box className={classes.root}>
      <Typography className={classes.greyText}>{text}</Typography>
      <NavButton authPage={authPage} />
    </Box>
  );
};

export default AuthNav;
