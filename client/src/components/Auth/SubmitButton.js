import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LOGIN } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#FFFFFF",
    fontSize: 16,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 3,
    width: 160,
    height: 56,
    marginTop: 40,
    alignSelf: "center"
  },
  login: {
    marginTop: 60
  },
  create: {
    marginTop: 40
  }
}));

const SubmitButton = (props) => {
  const classes = useStyles();
  const { authType } = props;

  const text = authType === LOGIN ? "Login" : "Create";
  const buttonClass = authType === LOGIN ? "login" : "create";

  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      className={`${classes.root} ${classes[buttonClass]}`}>
      {text}
    </Button>
  );
};

export default SubmitButton;
