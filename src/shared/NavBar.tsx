import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/images/brand-logo.webp";

export const NavBar = () => {
  return (
    <nav
      className="navbar sticky-top navbar-expand-lg bg-dark"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="Bootstrap" width="45" height="27" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink
              exact
              activeClassName="active"
              className="nav-link"
              to="/album"
            >
              My album
            </NavLink>
            <NavLink
              exact
              activeClassName="active"
              className="nav-link"
              to="/getLaminates"
            >
              Get Plates
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
