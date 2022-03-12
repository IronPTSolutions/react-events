import React from "react";
import { createEvent } from "../services/api-service";

function EventNew({ onClose }) {
  const [data, setData] = React.useState({
    title: "",
    image: "",
    eventDt: "",
  });
  const [error, setError] = React.useState("");

  function handleChange(e) {
    const { id, value } = e.target;

    setData({
      ...data,
      [id]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    createEvent(data)
      .then((response) => {
        onClose();
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  return (
    <div className="EventNew">
      <div className="modal-dialog">
        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New Event</h5>
              <button
                onClick={onClose}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <div class="mb-3">
                <label for="title" class="form-label">
                  Title
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  value={data.title}
                  onChange={handleChange}
                />
              </div>

              <div class="mb-3">
                <label for="title" class="form-label">
                  Image
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  value={data.image}
                  onChange={handleChange}
                />
              </div>

              <div class="mb-3">
                <label for="title" class="form-label">
                  Date
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="eventDt"
                  value={data.eventDt}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventNew;
