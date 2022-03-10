import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth-context";

function NavBar() {
  const { user } = React.useContext(AuthContext);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand mb-0 h1">
          React Events
        </Link>

        {user && (
          <Link className="btn btn-secondary btn-sm" to="/profile">
            {user.name.slice(0, 6)}
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
