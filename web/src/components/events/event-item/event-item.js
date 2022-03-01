import moment from 'moment';
import './event-item.css';

function EventItem({ className, id, title, image, eventDt, onDeleteEvent }) {
  let date = moment().add(1, 'M').isAfter(eventDt) ? moment(eventDt).fromNow() : moment(eventDt).calendar();
  return (
    <div className={`event-item card bg-dark text-white ${className}`}>
      <img src={image} className="card-img" alt={title} />
        <div className="card-img-overlay d-flex flex-column">
          <div className="d-flex justify-content-between">
            <i className="text-danger fa fa-times" role="button" onClick={() => onDeleteEvent(id)} />
            <span className="badge rounded-pill bg-light text-dark">{date}</span>
          </div>
          <span className="card-title text-start badge bg-light text-dark align-self-start mt-auto text-wrap"><h5 className="m-0 fs-6">{title}</h5></span>
        </div>
    </div>
  );
}

EventItem.defaultProps = {
  onDeleteEvent: () => {}
}

export default EventItem;