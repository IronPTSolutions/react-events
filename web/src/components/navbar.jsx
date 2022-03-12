import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth-context";

function NavBar() {
  const [time, setTime] = React.useState(new Date());
  const { user } = React.useContext(AuthContext);

  const hour = time.getHours();
  const min = time.getMinutes();
  const seconds = time.getSeconds();

  React.useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand mb-0 h1">
          {hour}:{min > 9 ? min : `0${min}`}:
          {seconds > 9 ? seconds : `0${seconds}`} | Events
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
