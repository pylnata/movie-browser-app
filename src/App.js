import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import PropTypes from "prop-types";

import Routes from "@/routes";
import { Layout } from "@/views";
import actions from "@/features/Auth/actions";

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    const { isAutoSignupInProcess, isAuthenticated } = this.props;

    if (isAutoSignupInProcess) return <Spinner />;

    return (
      <>
        <Layout isAuthenticated={isAuthenticated}>
          <Suspense fallback={<Spinner />}>
            <Routes isAuthenticated={isAuthenticated} />
          </Suspense>
        </Layout>
      </>
    );
  }
}

App.propTypes = {
  onTryAutoSignup: PropTypes.func.isRequired,
  isAutoSignupInProcess: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = ({ auth }) => ({
  isAutoSignupInProcess: auth.isLoading,
  isAuthenticated: auth.data.token !== null
});

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

const AppConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export { AppConnected as App };
