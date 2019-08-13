import React from "react";
import "./Footer.scss";

const Footer = props => (
  <footer className="footer text-center w-100 mt-4 mb-4">
      &copy; {new Date().getFullYear()}, made with{" "}
      <i className="fa fa-heart heart" /> by <a href="http://github.com/pylnata">pylnata</a>
  </footer>
);

export { Footer };
