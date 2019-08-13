import React, { Component } from "react";
import PropTypes from "prop-types";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.scss";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className="modal"
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.object,
  modalClosed: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

export default Modal;
