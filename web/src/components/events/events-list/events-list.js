import { Component } from 'react';
import moment from 'moment';
import faker from 'faker';
import EventItem from '../event-item/event-item';
import events from '../../../data/events';

class EventsList extends Component {
  
  state = {
    events: []
  }

  componentDidMount() {
    this.setState({ events });
  }

  handleDeleteEvent(id) {
    this.setState((state, props) => 
      ({ events: state.events.filter(event => event.id !== id)})
    )
  }

  handleCreateRandomEvent() {
    this.setState((state, props) => {
      const id = faker.random.uuid()
      const event = {
        id,
        title: faker.hacker.phrase(),
        image: `https://loremflickr.com/600/300?lock=${id}`,
        eventDt: faker.date.between(moment(), moment().add(1, 'Y'))
      }
      return {
        events: [...state.events, event]
      }
    })
  }

  render() {
    const { events } = this.state;
    return (
      <>
        <div className="d-flex justify-content-center mb-3">
          <button className='btn btn-primary' onClick={() => this.handleCreateRandomEvent()}>Add Random Event</button>
        </div>
        <div className="row g-2 row-cols-1 row-cols-md-3">
          {events.map((event) => (
            <div key={event.id} className="col">
              <EventItem {...event} onDeleteEvent={(id) => this.handleDeleteEvent(id)}/>
            </div>
          ))} 
          
        </div>
      </>
    );
  }
}

export default EventsList;