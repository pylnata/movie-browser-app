import React from "react";
import { Button, Card, Alert, FormGroup } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

import actions from "./actions";
import { translateErrorMessage } from "./helpers";

import "./Auth.scss";

export class Auth extends React.Component {
  state = { isSignup: false };

  switchAuthModeHandler = e => {
    e.preventDefault();
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <Alert color="warning" className="error">
          {translateErrorMessage(this.props.error.message)}
        </Alert>
      );
    }

    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <Helmet>
          <title>Authentification | MovieBrowser</title>
        </Helmet>
        <Card className="card-register">
          <h3 className="title mx-auto" >
            {this.state.isSignup ? "Create account" : "Sign In"}
          </h3>
          {/* TODO
          <SocialLine />
*/}
          {errorMessage}

          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email()
                .required("Email is required"),
              password: Yup.string().required("Password is required")
            })}
            onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
              setStatus();
              this.props.onAuth(email, password, this.state.isSignup);
              setSubmitting(false);
            }}
            render={({ errors, status, touched, isSubmitting }) => (
              <Form className="register-form" data-testid="login-form">
                <FormGroup>
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className={
                      "form-control" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="password">Password</label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className={
                      "form-control" +
                      (errors.password && touched.password ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>

                <FormGroup>
                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {!isSubmitting ? (
                      this.state.isSignup ? (
                        "Create account"
                      ) : (
                        "Sign In"
                      )
                    ) : (
                      <img
                        alt="Wait..."
                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                      />
                    )}
                  </Button>
                </FormGroup>

                {status && <Alert color="danger">{status}</Alert>}
              </Form>
            )}
          />

          <span>
            <span className="inline">
              {this.state.isSignup ? "Already User?" : "Not an User?"}{" "}
            </span>

            <a
              href="/"
              onClick={this.switchAuthModeHandler}
              className="text-white font-weight-bold"
            >
              {this.state.isSignup ? "Sign In" : "Create account"}
            </a>
          </span>
        </Card>
      </div>
    );
  }
}

Auth.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  onAuth: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => {
  return {
    isLoading: auth.isLoading,
    error: auth.error,
    isAuthenticated: auth.data.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
