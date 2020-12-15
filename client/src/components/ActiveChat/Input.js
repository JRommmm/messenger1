import React from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end"
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20
  }
}));

const Input = (props) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.root} fullWidth hiddenLabel>
      <FilledInput
        classes={{ root: classes.input }}
        disableUnderline
        placeholder="Type something..."
      />
    </FormControl>
  );
};

export default Input;
