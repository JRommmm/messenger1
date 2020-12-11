import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./store/user";
import Register from "./pages/Register";
import { Login, Home } from "./pages";

class Routes extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    if (this.props.isFetchingUser) {
      return <div>Loading...</div>;
    }
    return (
      <Switch>
        <Route exact path="/" component={this.props.user && this.props.user.id ? Home : Register} />
        <Route path="/home" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetchingUser: state.user.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser() {
      dispatch(fetchUser());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
