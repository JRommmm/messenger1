import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { register } from "../store/user";
import { Redirect } from "react-router-dom";
import { Button, Snackbar } from "@material-ui/core";
import { RegisterForm } from "../pages";

const Register = (props) => {
  const { user, register } = props;
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
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  console.log(props);
  return (
    <div>
      <Button type="button" onClick={() => props.history.push("/login")}>
        Login
      </Button>
      <RegisterForm handleSubmit={handleSubmit} errorMessage={errorMessage} />
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
    register: (credentials) => {
      dispatch(register(credentials));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
