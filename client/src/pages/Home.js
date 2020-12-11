import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/user";

const Home = (props) => {
  const { user, logout } = props;

  if (!user.id) {
    return <Redirect to="/register" />;
  }

  const handleLogout = async () => {
    await logout();
    props.history.push("/register");
  };

  return (
    <div>
      Home Page Placeholder
      <button onClick={handleLogout}>Logout</button>
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
    logout: () => {
      dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
