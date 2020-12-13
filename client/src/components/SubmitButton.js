import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#FFFFFF",
    fontSize: 16,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 3
  }
}));

const SubmitButton = (props) => {
  const classes = useStyles();

  return (
    <Button variant="contained" size="large" className={classes.root}>
      {props.text}
    </Button>
  );
};

export default SubmitButton;
