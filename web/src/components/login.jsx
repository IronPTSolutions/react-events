import React from "react";
import { useNavigate, Navigate } from "react-router";
import { AuthContext } from "../contexts/auth-context";
import { login } from "../services/api-service";

function Login() {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const { handleLogin, user } = React.useContext(AuthContext);

  function handleChange(e) {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault(e);

    login(data)
      .then((response) => {
        handleLogin(response.data);
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          id="email"
          value={data.email}
          onChange={handleChange}
        />
      </div>

      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="password"
          value={data.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Log in
      </button>
    </form>
  );
}

export default Login;
