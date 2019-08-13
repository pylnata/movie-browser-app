import React from "react";
import PropTypes from "prop-types";

import "./Backdrop.scss";

const backdrop = props =>
  props.show ? <div className="backdrop w-100 h-100 position-fixed fixed-top" onClick={props.clicked} /> : null;

backdrop.propTypes = {
  clicked: PropTypes.func.isRequired
};

export default backdrop;
