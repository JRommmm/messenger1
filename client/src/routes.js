import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./store/user";
import { Login, Home, SnackbarError, Auth } from "./components";
import { LOGIN, REGISTER } from "./constants";

const Routes = (props) => {
  const { user, fetchUser } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user.error) {
      // check to make sure error is what we expect, in case we get an unexpected server error object
      if (typeof user.error === "string") {
        setErrorMessage(user.error);
      } else {
        setErrorMessage("Internal Server Error. Please try again");
      }
      setSnackBarOpen(true);
    }
  }, [user.error]);

  if (props.user.isFetchingUser) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}
      <Switch>
        <Route
          exact
          path="/"
          render={
            props.user && props.user.id
              ? (props) => <Home {...props} />
              : (props) => <Auth {...props} authPage={REGISTER} />
          }
        />
        <Route path="/home" component={Home} />
        <Route path="/register" render={(props) => <Auth {...props} authPage={REGISTER} />} />
        <Route path="/login" render={(props) => <Auth {...props} authPage={LOGIN} />} />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser() {
      dispatch(fetchUser());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
