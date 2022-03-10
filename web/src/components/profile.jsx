import react from "react";
import { AuthContext } from "../contexts/auth-context";

function Profile() {
  const { user, handleLogout } = react.useContext(AuthContext);

  return (
    <div className="text-center">
      <h3>{user.name}</h3>
      <h4>{user.email}</h4>
      <h5>{user.role}</h5>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

export default Profile;
