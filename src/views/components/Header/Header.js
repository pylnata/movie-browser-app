import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import {
  Button,
  Collapse,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";
import { NavLink as NavLinkRouter } from "react-router-dom";
import { withRouter } from "react-router-dom";

import MovieSearchForm from "@/features/Search/MovieSearchForm/MovieSearchForm";

import "./Header.scss";

class Header extends Component {
  state = { navbarColor: "navbar-transparent", navbarCollapse: false };

  toggleNavbarCollapse = () => {
    this.setState(prevState => ({ navbarCollapse: !prevState.navbarCollapse }));
    document.documentElement.classList.toggle("nav-open");
  };

  componentDidMount() {
    this.updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 199 ||
        document.body.scrollTop > 199
      ) {
        this.setState({ navbarColor: "" });
      } else if (
        document.documentElement.scrollTop < 200 ||
        document.body.scrollTop < 200
      ) {
        this.setState({ navbarColor: "navbar-transparent" });
      }
    };
    window.addEventListener("scroll", this.updateNavbarColor);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateNavbarColor);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.navbarCollapse &&
      prevProps.location.pathname !== this.props.location.pathname
    ) {
      this.setState({ navbarCollapse: false });
      document.documentElement.classList.toggle("nav-open");
    }
  }

  render() {
    return (
      <Navbar
        className={classnames("fixed-top", this.state.navbarColor)}
        color-on-scroll="200"
        expand="lg"
      >
        <Container className="pt-2">
          <div className="navbar-translate d-flex align-content-center">
            <NavLinkRouter to="/">
              <i className="fas fa-video nav-logo" />{" "}
            </NavLinkRouter>
            <NavLinkRouter to="/" className="nav-app-title">
              MovieBrowser
            </NavLinkRouter>
            <MovieSearchForm />
            <button
              aria-expanded={this.state.navbarCollapse}
              className={classnames("navbar-toggler navbar-toggler", {
                toggled: this.state.navbarCollapse
              })}
              onClick={this.toggleNavbarCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            navbar
            isOpen={this.state.navbarCollapse}
          >
            <Nav navbar>
              {/*
              <NavItem>
                <NavLinkRouter to="/" className="nav-link">
                  <i className="far fa-list-alt" /> Movies
                </NavLinkRouter>
              </NavItem>
              */}
              {this.props.isAuth && (
                <NavItem>
                  <NavLinkRouter to="/watchlist" className="nav-link">
                    <i className="far fa-bookmark" /> My watchlist
                  </NavLinkRouter>
                </NavItem>
              )}

              <NavItem>
                <NavLink
                  href="https://github.com/pylnata/movie-browser-app"
                  target="_blank"
                  title="Star on GitHub"
                >
                  <i className="fab fa-github" />{" "}
                  <p className="d-lg-none">GitHub</p>
                </NavLink>
              </NavItem>
              <NavItem>
                {this.props.isAuth ? (
                  <NavLinkRouter to="/logout">
                    <Button className="btn-round btn-sign">SIGN OUT</Button>
                  </NavLinkRouter>
                ) : (
                  <NavLinkRouter to="/auth" exact>
                    <Button color="danger" className="btn-round btn-sign">
                      SIGN IN
                    </Button>
                  </NavLinkRouter>
                )}
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Header.propTypes = {
  isAuth: PropTypes.bool
};

const enhauncedHeader = withRouter(Header);

export { enhauncedHeader as Header };

export default enhauncedHeader;
