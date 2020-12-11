import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { login } from "../store/user";
import { Redirect } from "react-router-dom";
import { Button, Snackbar } from "@material-ui/core";
import { LoginForm } from "../pages";

const Login = (props) => {
  const { user, login } = props;
  const [errorMessage, setErrorMessage] = useState({});
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    if (user.error) {
      // check to make sure error is what we expect, in case we get an unexpected server error object
      if (typeof user.error === "string") {
        setErrorMessage({ server: user.error });
      } else {
        setErrorMessage({ server: "Internal Server Error. Please try again" });
      }
      setSnackBarOpen(true);
    }
  }, [user.error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <Button type="button" onClick={() => props.history.push("/register")}>
        Create an Account
      </Button>
      <LoginForm handleSubmit={handleSubmit} />
      <Snackbar
        open={snackBarOpen}
        onClose={() => setSnackBarOpen(false)}
        message={errorMessage.server || "Sorry, an error occured. Please try again"}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={() => setSnackBarOpen(false)}>
              X
            </Button>
          </React.Fragment>
        }
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
