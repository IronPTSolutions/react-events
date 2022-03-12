import React from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../services/api-service";

function EventList() {
  const [events, setEvents] = React.useState(null);

  React.useEffect(() => {
    getEvents().then((response) => {
      setEvents(response.data.reverse());
    });
  }, []);

  if (!events) {
    return null;
  }

  return (
    <div>
      {events.map((e) => (
        <Link
          to={`/events/${e.id}`}
          className="text-decoration-none"
          key={e.id}
        >
          <div className="card mb-3">
            <img src={e.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{e.title}</h5>
              <small className="text-muted d-block">@ {e.ownerId.name}</small>
              <small className="text-muted">
                {new Date(e.eventDt).toDateString()}
              </small>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default EventList;
