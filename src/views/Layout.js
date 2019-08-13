import React from "react";
import PropTypes from "prop-types";

import { Footer } from "@/views/components/Footer/Footer";
import { Header } from "@/views/components/Header/Header";

import "./Layout.scss";

const Layout = props => (
  <>
    <div className="page-header w-100 bg-dark h-100 position-fixed fixed-top" />

    <Header isAuth={props.isAuthenticated} />
    <main>{props.children}</main>
    <Footer />
  </>
);

Layout.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export { Layout };
export default Layout;
