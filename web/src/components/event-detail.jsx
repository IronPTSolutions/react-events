import React from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { AuthContext } from "../contexts/auth-context";
import { deleteEvent, getEvent } from "../services/api-service";

function EventDetail() {
  const { user } = React.useContext(AuthContext);
  const [event, setEvent] = React.useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    getEvent(id).then((response) => {
      setEvent(response.data);
    });
  }, []);

  function handleDelete() {
    deleteEvent(event.id).then(() => {
      navigate("/");
    });
  }

  if (!event) {
    return null;
  }

  return (
    <div class="card mb-3">
      <img src={event.image} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{event.title}</h5>
        <small className="text-muted d-block">@ {event.ownerId.name}</small>
        <small className="text-muted">
          {new Date(event.eventDt).toDateString()}
        </small>

        {(user.id === event.ownerId.id || user.role === "admin") && (
          <div>
            <button className="btn btn-danger mt-3" onClick={handleDelete}>
              delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetail;
