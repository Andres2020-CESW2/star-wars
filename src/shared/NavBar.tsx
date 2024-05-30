import { Link, useMatch } from "react-router-dom";
import Logo from "../assets/images/brand-logo.webp";

export const NavBar = () => {
  const matchAlbum = useMatch("/star-wars/");
  const matchGetLaminates = useMatch("/star-wars/getLaminates");
  return (
    <nav
      className="navbar sticky-top navbar-expand-lg bg-dark"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/star-wars/">
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
            <Link
              className={`nav-link ${matchAlbum ? "active" : ""}`}
              to="/star-wars/"
            >
              My album
            </Link>
            <Link
              className={`nav-link ${matchGetLaminates ? "active" : ""}`}
              to="/star-wars/getLaminates"
            >
              Get Plates
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
