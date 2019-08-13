import React from "react";
import { Button } from "reactstrap";
import "./SocialLine.scss";

const SocialLine = props => (
  <div className="social-line text-center">
    <Button
      className="btn-neutral btn-just-icon mr-1"
      color="facebook"
      href="#"
      onClick={e => e.preventDefault()}
    >
      <i className="fab fa-facebook-square" />
    </Button>
    <Button
      className="btn-neutral btn-just-icon mr-1"
      color="google"
      href="#"
      onClick={e => e.preventDefault()}
    >
      <i className="fab fa-google-plus" />
    </Button>
    <Button
      className="btn-neutral btn-just-icon"
      color="twitter"
      href="#"
      onClick={e => e.preventDefault()}
    >
      <i className="fab fa-twitter" />
    </Button>
  </div>
);

export { SocialLine };
