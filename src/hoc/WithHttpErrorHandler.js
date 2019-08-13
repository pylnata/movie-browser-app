import React, { Component } from "react";

import Modal from "@/views/components/Modal/Modal";

const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null
      };
      this.bindAxiosHandlers();
    }

    bindAxiosHandlers = () => {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
          throw error;
        }
      );
    };

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      let message = null;
      if (this.state.error) {
        message =
          this.state.error.response.status === 401
            ? "Your session is expired. Please, login again."
            : this.state.error.message;
      }
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {message}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default WithErrorHandler;
