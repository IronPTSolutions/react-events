import React from "react";
import { useNavigate } from "react-router";
import { AlertContext } from "../contexts/alert-context";
import { register } from "../services/api-service";
function Register() {
  const [data, setData] = React.useState({
    email: "",
    name: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = React.useState();
  const { showAlert } = React.useContext(AlertContext);

  function handleChange(event) {
    const key = event.target.id;
    const value = event.target.value;

    setData({
      ...data,
      [key]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    register(data)
      .then((response) => {
        showAlert("successfully registered");
        navigate("/login");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="name" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">
            Email
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
          <label for="password" class="form-label">
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

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
