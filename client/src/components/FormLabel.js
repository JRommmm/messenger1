import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.main,
    marginBottom: 21,
    marginTop: 40
  },
  topLogin: {
    marginTop: 33
  },
  topRegister: {
    marginTop: 12
  }
}));

const FormLabel = (props) => {
  const classes = useStyles();
  return (
    <Typography className={`${classes.root} ${classes[props.topMarginClass]}`}>
      {props.label}
    </Typography>
  );
};

export default FormLabel;
