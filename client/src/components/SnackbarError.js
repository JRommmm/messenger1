import React from "react";
import { Button, Snackbar } from "@material-ui/core";

const SnackbarError = (props) => {
  return (
    <Snackbar
      open={props.snackBarOpen}
      onClose={() => props.setSnackBarOpen(false)}
      message={props.errorMessage || "Sorry, an error occured. Please try again"}
      action={
        <React.Fragment>
          <Button color="secondary" size="small" onClick={() => props.setSnackBarOpen(false)}>
            X
          </Button>
        </React.Fragment>
      }
    />
  );
};

export default SnackbarError;
