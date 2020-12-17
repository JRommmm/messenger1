import React from "react";
import { FormControl, FilledInput, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  filledInput: {
    height: 50,
    background: "#E9EEF9",
    borderRadius: 5,
    fontSize: 13,
    fontWeight: "bold",
    color: "#99A9C4",
    letterSpacing: 0,
    display: "flex",
    justifyContent: "center",
    marginBottom: 20
  },
  input: {
    "&::placeholder": {
      color: "#ADC0DE",
      opacity: 1
    }
  }
}));

const Search = (props) => {
  const classes = useStyles();
  return (
    <FormControl fullWidth hiddenLabel>
      <FilledInput
        classes={{ root: classes.filledInput, input: classes.input }}
        disableUnderline
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }></FilledInput>
    </FormControl>
  );
};

export default Search;