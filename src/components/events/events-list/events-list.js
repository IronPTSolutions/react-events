import { Component } from 'react';
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
      const event = {
        id: faker.random.uuid(),
        title: faker.hacker.phrase(),
        image: 'https://picsum.photos/seed/picsum/600/300',
        eventDt: faker.date.between(new Date(), new Date(365 * 24 * 3600 * 1000))
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
        <div className="row row-cols-1 row-cols-md-3">
          {events.map((event) => (
            <div key={event.id} className="col mb-2">
              <EventItem {...event} onDeleteEvent={(id) => this.handleDeleteEvent(id)}/>
            </div>
          ))} 
          
        </div>
      </>
    );
  }
}

export default EventsList;